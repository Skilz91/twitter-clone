// models/Tweet.ts
import mongoose from "mongoose";

const TweetSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    tags: {
      type: [String],
      default: ["general"],
    },
    reactions: {
      likes: { type: Number, default: 0 },
      dislikes: { type: Number, default: 0 },
    },
    views: {
      type: Number,
      default: 1,
    },
    userId: {
      type: Number,
      default: 100,
    },
  },
  { timestamps: true }
);

// Prevent model overwrite errors during Next.js hot reloading
export const Tweet =
  mongoose.models.Tweet ?? mongoose.model("Tweet", TweetSchema);
