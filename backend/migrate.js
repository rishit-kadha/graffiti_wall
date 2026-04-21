

require("dotenv").config();
const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);
const fs = require("fs");
const mongoose = require("mongoose");
const Tile = require("./models/Tile");

const STORE = "./tiles.json";
const getToday = () => new Date().toISOString().split("T")[0];

async function migrate() {
  if (!fs.existsSync(STORE)) {
    console.log("No tiles.json found — nothing to migrate.");
    return;
  }

  const raw = fs.readFileSync(STORE, "utf8");
  if (!raw.trim()) {
    console.log("tiles.json is empty — nothing to migrate.");
    return;
  }

  let store;
  try {
    store = JSON.parse(raw);
  } catch {
    console.error("tiles.json is corrupted — aborting.");
    process.exit(1);
  }

  const tiles = (store.tiles || []).filter(
    (t) => t && t.id && t.imageUrl && t.type && t.createdAt,
  );

  if (tiles.length === 0) {
    console.log("No valid tiles in tiles.json — nothing to migrate.");
    return;
  }

  console.log(`[migrate] found ${tiles.length} tile(s) in tiles.json`);

  const tileDate = store.date || getToday();

  let inserted = 0;
  let skipped = 0;

  for (const t of tiles) {
    try {
      await Tile.updateOne(
        { id: t.id },
        {
          $setOnInsert: {
            id: t.id,
            imageUrl: t.imageUrl,
            type: t.type,
            likes: t.likes ?? 0,
            likedBy: t.likedBy ?? [],
            createdAt: t.createdAt,
            date: tileDate,
          },
        },
        { upsert: true },
      );
      inserted++;
    } catch (err) {
      console.warn(`  [skip] tile ${t.id}: ${err.message}`);
      skipped++;
    }
  }

  console.log(`[migrate] done — inserted: ${inserted}, skipped: ${skipped}`);
}

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("[mongo] connected");
    await migrate();
  })
  .catch((err) => {
    console.error("[mongo] connection failed:", err.message);
    process.exit(1);
  })
  .finally(() => mongoose.disconnect());
