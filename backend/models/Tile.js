const mongoose = require("mongoose");

const tileSchema = new mongoose.Schema(
  {
   
    id: { type: String, required: true, unique: true },
    imageUrl: { type: String, required: true },
    type: { type: String, enum: ["free", "prompt"], required: true },
    likes: { type: Number, default: 0 },
    likedBy: { type: [String], default: [] },
   
    createdBy: { type: String, default: "" },
   
    createdAt: { type: Number, required: true },
   
    date: { type: String, required: true },
  },
  {
   
    timestamps: false,
  },
);

tileSchema.index({ date: 1, type: 1 });
tileSchema.index({ date: 1, likes: -1, createdAt: -1 });

module.exports = mongoose.model("Tile", tileSchema);
