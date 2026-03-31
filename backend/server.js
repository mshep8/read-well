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
const FRONTEND_CATEGORY_LABEL_TO_ID = {
  "Letters & Sounds": "phonics",
  "Words You'll Use": "sight-words",
  "Sentences & Stories": "sentences",
  "Real-World Reading": "real-world",
};
const FRONTEND_LESSON_PREFIX_BY_CATEGORY_ID = {
  phonics: "phonics",
  "sight-words": "sight",
  sentences: "sentence",
  "real-world": "real-world",
};

function isUniqueViolation(err) {
  return err && typeof err === "object" && err.code === "23505";
}

function parsePositiveInt(value) {
  const parsed = Number.parseInt(String(value), 10);
  if (!Number.isInteger(parsed) || parsed <= 0) {
    return null;
  }
  return parsed;
}

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

// Users: GET by username
app.get("/api/users/by-username/:username", async (req, res) => {
  const username = String(req.params.username || "").trim();
  if (!username) {
    return res.status(400).json({ error: "Username is required" });
  }

  try {
    const { rows } = await pool.query(
      "SELECT userid AS \"UserID\", name AS \"Username\", email AS \"Email\" FROM users WHERE name = $1 LIMIT 1",
      [username]
    );
    if (rows.length === 0) return res.status(404).json({ error: "User not found" });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
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
    const normalizedUsername = username.trim();
    const duplicate = await pool.query(
      "SELECT 1 FROM users WHERE name = $1 AND userid <> $2 LIMIT 1",
      [normalizedUsername, req.params.id]
    );
    if (duplicate.rows.length > 0) {
      return res.status(409).json({ error: "Username already exists" });
    }

    const { rows } = await pool.query(
      "UPDATE users SET name = $1 WHERE userid = $2 RETURNING userid AS \"UserID\", name AS \"Username\", email AS \"Email\"",
      [normalizedUsername, req.params.id]
    );
    if (rows.length === 0) return res.status(404).json({ error: "User not found" });
    res.json(rows[0]);
  } catch (err) {
    if (isUniqueViolation(err)) {
      return res.status(409).json({ error: "Username already exists" });
    }
    res.status(500).json({ error: err.message });
  }
});
 
// Lessons: frontend lesson map to DB lesson ids
app.get("/api/lessons", async (_req, res) => {
  try {
    const { rows } = await pool.query(
      `WITH lesson_base AS (
        SELECT
          l.lessonid,
          c.name AS category_name,
          sc.name AS topic_name,
          l.lessondifficulty
        FROM lessons l
        JOIN subcategories sc ON sc.subcategoryid = l.subcategoryid
        JOIN categories c ON c.categoryid = sc.categoryid
        WHERE c.name = ANY($1::text[])
      ),
      ordered AS (
        SELECT
          lessonid,
          category_name,
          topic_name,
          lessondifficulty,
          ROW_NUMBER() OVER (
            PARTITION BY category_name
            ORDER BY lessondifficulty NULLS LAST, lessonid
          ) AS lesson_number
        FROM lesson_base
      )
      SELECT
        lessonid AS "LessonID",
        category_name AS "CategoryName",
        topic_name AS "Topic",
        lessondifficulty AS "LessonDifficulty",
        lesson_number AS "LessonNumber"
      FROM ordered
      ORDER BY category_name, lesson_number`
      ,
      [Object.keys(FRONTEND_CATEGORY_LABEL_TO_ID)]
    );

    const payload = rows
      .map((row) => {
        const categoryId = FRONTEND_CATEGORY_LABEL_TO_ID[row.CategoryName];
        if (!categoryId) {
          return null;
        }
        const lessonPrefix = FRONTEND_LESSON_PREFIX_BY_CATEGORY_ID[categoryId];
        if (!lessonPrefix) {
          return null;
        }
        return {
          ...row,
          CategoryID: categoryId,
          FrontendLessonID: `${lessonPrefix}-${row.LessonNumber}`,
        };
      })
      .filter(Boolean);

    res.json(payload);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Progress: GET user progress (rows + summary)
app.get("/api/users/:id/progress", async (req, res) => {
  const userId = parsePositiveInt(req.params.id);
  if (!userId) {
    return res.status(400).json({ error: "Valid user id is required" });
  }

  try {
    const userCheck = await pool.query("SELECT 1 FROM users WHERE userid = $1", [userId]);
    if (userCheck.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    const [rowsResult, totalsResult, categoryResult, streakResult] = await Promise.all([
      pool.query(
        `SELECT
          lessonid AS "LessonID",
          completion AS "Completion",
          completeddate AS "CompletedDate"
        FROM lessonprogress
        WHERE userid = $1
        ORDER BY lessonid`,
        [userId]
      ),
      pool.query(
        `SELECT
          COALESCE(SUM(CASE WHEN completion THEN 1 ELSE 0 END), 0)::int AS "CompletedLessons",
          (SELECT COUNT(*)::int FROM lessons) AS "TotalLessons"
        FROM lessonprogress
        WHERE userid = $1`,
        [userId]
      ),
      pool.query(
        `SELECT
          c.categoryid AS "CategoryID",
          c.name AS "CategoryName",
          COUNT(l.lessonid)::int AS "TotalLessons",
          COALESCE(SUM(CASE WHEN lp.completion THEN 1 ELSE 0 END), 0)::int AS "CompletedLessons"
        FROM categories c
        JOIN subcategories sc ON sc.categoryid = c.categoryid
        JOIN lessons l ON l.subcategoryid = sc.subcategoryid
        LEFT JOIN lessonprogress lp
          ON lp.lessonid = l.lessonid
         AND lp.userid = $1
        GROUP BY c.categoryid, c.name
        ORDER BY c.categoryid`,
        [userId]
      ),
      pool.query(
        `SELECT DISTINCT completeddate::date AS day
        FROM lessonprogress
        WHERE userid = $1
          AND completion = TRUE
          AND completeddate IS NOT NULL
        ORDER BY day DESC`,
        [userId]
      ),
    ]);

    const totals = totalsResult.rows[0] ?? { CompletedLessons: 0, TotalLessons: 0 };
    const overallPercent =
      totals.TotalLessons > 0
        ? Math.round((totals.CompletedLessons / totals.TotalLessons) * 100)
        : 0;

    const streakDays = streakResult.rows.map((r) => new Date(r.day));
    let streak = 0;
    if (streakDays.length > 0) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const first = new Date(streakDays[0]);
      first.setHours(0, 0, 0, 0);

      if (first.getTime() === today.getTime()) {
        streak = 1;
        for (let i = 1; i < streakDays.length; i += 1) {
          const prev = new Date(streakDays[i - 1]);
          const curr = new Date(streakDays[i]);
          prev.setHours(0, 0, 0, 0);
          curr.setHours(0, 0, 0, 0);

          const diffDays = Math.round((prev.getTime() - curr.getTime()) / 86400000);
          if (diffDays === 1) {
            streak += 1;
          } else {
            break;
          }
        }
      }
    }

    res.json({
      UserID: userId,
      Lessons: rowsResult.rows,
      Summary: {
        CompletedLessons: totals.CompletedLessons,
        TotalLessons: totals.TotalLessons,
        OverallPercent: overallPercent,
        StreakDays: streak,
        ByCategory: categoryResult.rows.map((row) => ({
          ...row,
          Percent: row.TotalLessons > 0
            ? Math.round((row.CompletedLessons / row.TotalLessons) * 100)
            : 0,
        })),
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Progress: upsert completion for one lesson
app.put("/api/users/:id/progress/:lessonId", async (req, res) => {
  const userId = parsePositiveInt(req.params.id);
  const lessonId = parsePositiveInt(req.params.lessonId);
  if (!userId || !lessonId) {
    return res.status(400).json({ error: "Valid user id and lesson id are required" });
  }

  const { completion = true, completedDate } = req.body ?? {};
  if (typeof completion !== "boolean") {
    return res.status(400).json({ error: "Completion must be a boolean" });
  }

  let normalizedCompletedDate = null;
  if (completedDate != null) {
    const parsedDate = new Date(completedDate);
    if (Number.isNaN(parsedDate.getTime())) {
      return res.status(400).json({ error: "completedDate must be a valid ISO date string" });
    }
    normalizedCompletedDate = parsedDate.toISOString();
  }

  try {
    const [userCheck, lessonCheck] = await Promise.all([
      pool.query("SELECT 1 FROM users WHERE userid = $1", [userId]),
      pool.query("SELECT 1 FROM lessons WHERE lessonid = $1", [lessonId]),
    ]);

    if (userCheck.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    if (lessonCheck.rows.length === 0) {
      return res.status(404).json({ error: "Lesson not found" });
    }

    const { rows } = await pool.query(
      `INSERT INTO lessonprogress (userid, lessonid, completion, completeddate)
      VALUES ($1, $2, $3, $4)
      ON CONFLICT (userid, lessonid)
      DO UPDATE SET
        completion = EXCLUDED.completion,
        completeddate = EXCLUDED.completeddate
      RETURNING
        userid AS "UserID",
        lessonid AS "LessonID",
        completion AS "Completion",
        completeddate AS "CompletedDate"`,
      [userId, lessonId, completion, normalizedCompletedDate ?? (completion ? new Date().toISOString() : null)]
    );

    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Progress: clear all progress for user
app.delete("/api/users/:id/progress", async (req, res) => {
  const userId = parsePositiveInt(req.params.id);
  if (!userId) {
    return res.status(400).json({ error: "Valid user id is required" });
  }

  try {
    const userCheck = await pool.query("SELECT 1 FROM users WHERE userid = $1", [userId]);
    if (userCheck.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    await pool.query("DELETE FROM lessonprogress WHERE userid = $1", [userId]);
    res.json({ ok: true });
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
    const normalizedUsername = username.trim();
    const duplicate = await pool.query("SELECT 1 FROM users WHERE name = $1 LIMIT 1", [normalizedUsername]);
    if (duplicate.rows.length > 0) {
      return res.status(409).json({ error: "Username already exists" });
    }

    const passwordHash = await hashPassword(password);
    const { rows } = await pool.query(
      "INSERT INTO users (name, password) VALUES ($1, $2) RETURNING userid AS \"UserID\", name AS \"Username\"",
      [normalizedUsername, passwordHash]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    if (isUniqueViolation(err)) {
      return res.status(409).json({ error: "Username already exists" });
    }
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
