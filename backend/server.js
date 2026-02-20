import "dotenv/config";
import express from "express";
import cors from "cors";
import pg from "pg";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});

app.get("/api/health", async (_req, res) => {
  try {
    await pool.query("SELECT 1");
    res.json({ ok: true, db: "connected" });
  } catch (err) {
    res.status(500).json({ ok: false, db: "disconnected", error: err.message });
  }
});

// Vertical slice: Display name - GET user
app.get("/api/users/:id", async (req, res) => {
  try {
    const { rows } = await pool.query(
      "SELECT \"UserID\", \"Name\", \"Email\" FROM \"Users\" WHERE \"UserID\" = $1",
      [req.params.id]
    );
    if (rows.length === 0) return res.status(404).json({ error: "User not found" });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Vertical slice: Display name - PATCH user name
app.patch("/api/users/:id", async (req, res) => {
  const { name } = req.body;
  if (typeof name !== "string" || !name.trim()) {
    return res.status(400).json({ error: "Name is required" });
  }
  try {
    const { rows } = await pool.query(
      "UPDATE \"Users\" SET \"Name\" = $1 WHERE \"UserID\" = $2 RETURNING \"UserID\", \"Name\", \"Email\"",
      [name.trim(), req.params.id]
    );
    if (rows.length === 0) return res.status(404).json({ error: "User not found" });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
