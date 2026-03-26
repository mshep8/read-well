import "dotenv/config";
import express from "express";
import cors from "cors";
import pg from "pg";
import { randomBytes, scrypt as scryptCallback, timingSafeEqual } from "crypto";
import { promisify } from "util";

const app = express();
const PORT = process.env.PORT || 3001;
const scrypt = promisify(scryptCallback);

app.use(cors());
app.use(express.json());

function createPoolConfig() {
  if (process.env.DATABASE_URL) {
    const url = new URL(process.env.DATABASE_URL);
    const config = {
      host: url.hostname,
      port: url.port ? Number(url.port) : 5432,
      database: url.pathname.replace(/^\//, ""),
    };

    if (url.username) {
      config.user = decodeURIComponent(url.username);
    }

    if (url.password) {
      config.password = decodeURIComponent(url.password);
    } else if (process.env.PGPASSWORD) {
      config.password = process.env.PGPASSWORD;
    }

    return config;
  }

  return {
    host: process.env.PGHOST || "localhost",
    port: Number(process.env.PGPORT || 5432),
    database: process.env.PGDATABASE || "learn2read",
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
  };
}

const pool = new pg.Pool(createPoolConfig());

async function hashPassword(password) {
  const salt = randomBytes(16).toString("hex");
  const derivedKey = await scrypt(password, salt, 64);
  return `${salt}:${Buffer.from(derivedKey).toString("hex")}`;
}

async function verifyPassword(password, storedHash) {
  if (typeof storedHash !== "string") {
    return false;
  }

  const parts = storedHash.split(":");
  if (parts.length !== 2) {
    return false;
  }

  const [salt, keyHex] = parts;
  const storedKey = Buffer.from(keyHex, "hex");

  if (!salt || storedKey.length === 0) {
    return false;
  }

  const derivedKey = await scrypt(password, salt, storedKey.length);
  return timingSafeEqual(storedKey, Buffer.from(derivedKey));
}

app.get("/api/health", async (_req, res) => {
  try {
    await pool.query("SELECT 1");
    res.json({ ok: true, db: "connected" });
  } catch (err) {
    res.status(500).json({ ok: false, db: "disconnected", error: err.message });
  }
});

// Vertical slice: Username - GET user
app.get("/api/users/:id", async (req, res) => {
  try {
    const { rows } = await pool.query(
      "SELECT userid AS \"UserID\", name AS \"Username\", email AS \"Email\" FROM users WHERE userid = $1",
      [req.params.id]
    );
    if (rows.length === 0) return res.status(404).json({ error: "User not found" });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Vertical slice: Username - PATCH username
app.patch("/api/users/:id", async (req, res) => {
  const { username } = req.body;
  if (typeof username !== "string" || !username.trim()) {
    return res.status(400).json({ error: "Username is required" });
  }
  try {
    const { rows } = await pool.query(
      "UPDATE users SET name = $1 WHERE userid = $2 RETURNING userid AS \"UserID\", name AS \"Username\", email AS \"Email\"",
      [username.trim(), req.params.id]
    );
    if (rows.length === 0) return res.status(404).json({ error: "User not found" });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Auth: register user credentials
app.post("/api/auth/register", async (req, res) => {
  const { username, password } = req.body ?? {};

  if (typeof username !== "string" || !username.trim()) {
    return res.status(400).json({ error: "Username is required" });
  }

  if (typeof password !== "string" || password.length < 8) {
    return res.status(400).json({ error: "Password must be at least 8 characters" });
  }

  try {
    const passwordHash = await hashPassword(password);
    const { rows } = await pool.query(
      "INSERT INTO users (name, password) VALUES ($1, $2) RETURNING userid AS \"UserID\", name AS \"Username\"",
      [username.trim(), passwordHash]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Auth: login user credentials
app.post("/api/auth/login", async (req, res) => {
  const { username, password } = req.body ?? {};

  if (typeof username !== "string" || !username.trim()) {
    return res.status(400).json({ error: "Username is required" });
  }

  if (typeof password !== "string" || !password) {
    return res.status(400).json({ error: "Password is required" });
  }

  try {
    const { rows } = await pool.query(
      "SELECT userid AS \"UserID\", name AS \"Username\", password AS \"Password\" FROM users WHERE name = $1 LIMIT 1",
      [username.trim()]
    );

    if (rows.length === 0) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    const user = rows[0];
    const isValidPassword = await verifyPassword(password, user.Password);

    if (!isValidPassword) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    res.json({ UserID: user.UserID, Username: user.Username });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
