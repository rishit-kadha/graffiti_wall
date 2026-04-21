require("dotenv").config();
const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);
const express = require("express");
const mongoose = require("mongoose");
const cron = require("node-cron");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { randomUUID } = require("crypto");
const { getTodayChallenge } = require("./challenges");
const Tile = require("./models/Tile");

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

const getToday = () => new Date().toISOString().split("T")[0];

app.use((req, res, next) => {
  let sessionId = req.cookies.sessionId;
  if (!sessionId) {
    sessionId = randomUUID();
    res.cookie("sessionId", sessionId, { httpOnly: false, sameSite: "lax" });
  }
  req.sessionId = sessionId;
  next();
});

cron.schedule("0 0 * * *", () => {
  console.log(`[cron] new day started: ${getToday()}`);
});

app.get("/tiles", async (req, res) => {
  try {
    const limit = Math.min(parseInt(req.query.limit) || 20, 100);
    const offset = parseInt(req.query.offset) || 0;

    const tiles = await Tile.find({ date: getToday() })
      .sort({ likes: -1, createdAt: -1 })
      .skip(offset)
      .limit(limit)
      .lean();

    res.json(tiles);
  } catch (err) {
    console.error("ERROR /tiles", err);
    res.status(500).json({ error: "server error" });
  }
});

app.get("/tiles/:type", async (req, res) => {
  try {
    const { type } = req.params;

    const tiles = await Tile.find({ date: getToday(), type })
      .sort({ likes: -1, createdAt: -1 })
      .lean();

    res.json(tiles);
  } catch (err) {
    console.error("ERROR /tiles/:type", err);
    res.status(500).json({ error: "server error" });
  }
});

app.post("/publish", async (req, res) => {
  try {
    const { imageUrl, type, sessionId: bodySessionId } = req.body;
    const sessionId = bodySessionId || req.sessionId;

    if (!imageUrl || !type || typeof imageUrl !== "string") {
      return res.status(400).json({ error: "invalid data" });
    }

    const today = getToday();
    const count = await Tile.countDocuments({ date: today, type });

    if (count >= 100) {
      return res.status(400).json({ error: "grid full" });
    }

    const tile = await Tile.create({
      id: randomUUID(),
      imageUrl,
      type,
      likes: 0,
      likedBy: [],
      createdBy: sessionId,
      createdAt: Date.now(),
      date: today,
    });

    res.json({ ok: true, id: tile.id });
  } catch (err) {
    console.error("ERROR /publish", err);
    res.status(500).json({ error: "server crash" });
  }
});

app.post("/like", async (req, res) => {
  try {
    const { tileId, sessionId: bodySessionId } = req.body;

    if (!tileId) return res.status(400).json({ error: "missing tileId" });

    const sessionId = bodySessionId || req.sessionId;
    if (!sessionId) return res.status(400).json({ error: "missing sessionId" });

    const alreadyLiked = await Tile.exists({ id: tileId, likedBy: sessionId });

    let updated;
    if (alreadyLiked) {
      updated = await Tile.findOneAndUpdate(
        { id: tileId },
        { $pull: { likedBy: sessionId }, $inc: { likes: -1 } },
        { new: true },
      );
    } else {
      updated = await Tile.findOneAndUpdate(
        { id: tileId },
        { $addToSet: { likedBy: sessionId }, $inc: { likes: 1 } },
        { new: true },
      );
    }

    if (!updated) return res.status(404).json({ error: "tile not found" });

    res.json({ ok: true, likes: Math.max(0, updated.likes) });
  } catch (err) {
    console.error("ERROR /like", err);
    res.status(500).json({ error: "server crash" });
  }
});

app.get("/challenge/today", (req, res) => {
  try {
    res.json(getTodayChallenge(getToday()));
  } catch (err) {
    console.error("ERROR /challenge/today", err);
    res.status(500).json({ error: "server crash" });
  }
});

app.get("/challenge/status", async (req, res) => {
  try {
    const today = getToday();
    const sessionId = req.query.sessionId || req.sessionId;
    const done = !!(await Tile.exists({ date: today, type: "prompt", createdBy: sessionId }));
    res.json({ done });
  } catch (err) {
    console.error("ERROR /challenge/status", err);
    res.status(500).json({ error: "server crash" });
  }
});

const PORT = process.env.PORT || 3001;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("[mongo] connected");
    app.listen(PORT, () => console.log(`[server] running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("[mongo] connection failed:", err.message);
    process.exit(1);
  });
