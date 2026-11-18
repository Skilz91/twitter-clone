// components/TweetCard.tsx
"use client";

import { useState } from "react";
import Link from "next/link";

interface TweetProps {
  tweet: {
    id: number;
    title: string;
    body: string;
    tags: string[];
    reactions: {
      likes: number;
      dislikes: number;
    };
    views: number;
    userId: number;
  };
}

export default function TweetCard({ tweet }: TweetProps) {
  // Track the like count and whether the user has already liked it
  const [likes, setLikes] = useState(tweet.reactions.likes);
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault(); // Stops the <Link> from navigating to /tweet/[id]
    if (isLiked) {
      setLikes(likes - 1);
      setIsLiked(false);
    } else {
      setLikes(likes + 1);
      setIsLiked(true);
    }
  };

  return (
    <Link href={`/tweet/${tweet.id}`} style={{ textDecoration: "none", color: "inherit" }}>
      <div style={{ border: "1px solid #ddd", padding: "15px", margin: "15px", borderRadius: "8px", cursor: "pointer" }}>
        <h3 style={{ margin: "0 0 8px 0" }}>{tweet.title}</h3>
        <p style={{ margin: "0 0 10px 0", color: "#333" }}>{tweet.body}</p>

        <div style={{ display: "flex", alignItems: "center", gap: "15px", margin: "0 0 8px 0", fontSize: "14px", color: "#666" }}>
          <button
            onClick={handleLike}
            style={{
              backgroundColor: isLiked ? "#e0f2fe" : "#f3f4f6",
              color: isLiked ? "#0284c7" : "#333",
              border: isLiked ? "1px solid #38bdf8" : "1px solid #ddd",
              borderRadius: "20px",
              padding: "4px 12px",
              cursor: "pointer",
              fontWeight: isLiked ? "bold" : "normal",
            }}
          >
            👍 {likes}
          </button>

          <span>👎 {tweet.reactions.dislikes}</span>
          <span>👁️ {tweet.views}</span>
        </div>

        <p style={{ margin: 0, color: "#1DA1F2", fontSize: "14px" }}>Tags: {tweet.tags.join(", ")}</p>
      </div>
    </Link>
  );
}
