// components/TweetCard.tsx
"use client"; // Marks this as a Client Component so we can use useState and onClick events

import { useState } from "react";
import Link from "next/link";

// Define the expected shape of the tweet object passed into this component
interface TweetProps {
  tweet: {
    id: string | number;
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
  // Track the current like and dislike counts displayed on screen
  const [likes, setLikes] = useState(tweet.reactions.likes);
  const [dislikes, setDislikes] = useState(tweet.reactions.dislikes);

  // Track whether the user has currently liked or disliked this tweet
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);

  // Helper function to send a PATCH request to update the vote count in MongoDB
  const sendVoteUpdate = async (field: "likes" | "dislikes", amount: number) => {
    await fetch(`/api/tweets/${tweet.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ field, amount }),
    });
  };

  // Handle clicking the Like (👍) button
  const handleLike = async (e: React.MouseEvent) => {
    e.preventDefault(); // Stop the outer <Link> from opening the individual tweet page

    if (isLiked) {
      // If already liked, undo the like (-1)
      setLikes(likes - 1);
      setIsLiked(false);
      await sendVoteUpdate("likes", -1);
    } else {
      // Otherwise, add a like (+1)
      setLikes(likes + 1);
      setIsLiked(true);
      await sendVoteUpdate("likes", 1);

      // If the user previously disliked this tweet, remove the dislike (-1)
      if (isDisliked) {
        setDislikes(dislikes - 1);
        setIsDisliked(false);
        await sendVoteUpdate("dislikes", -1);
      }
    }
  };

  // Handle clicking the Dislike (👎) button
  const handleDislike = async (e: React.MouseEvent) => {
    e.preventDefault(); // Stop the outer <Link> from opening the individual tweet page

    if (isDisliked) {
      // If already disliked, undo the dislike (-1)
      setDislikes(dislikes - 1);
      setIsDisliked(false);
      await sendVoteUpdate("dislikes", -1);
    } else {
      // Otherwise, add a dislike (+1)
      setDislikes(dislikes + 1);
      setIsDisliked(true);
      await sendVoteUpdate("dislikes", 1);

      // If the user previously liked this tweet, remove the like (-1)
      if (isLiked) {
        setLikes(likes - 1);
        setIsLiked(false);
        await sendVoteUpdate("likes", -1);
      }
    }
  };

  return (
    // Clicking anywhere on the card navigates to /tweet/[id]
    <Link href={`/tweet/${tweet.id}`} style={{ textDecoration: "none", color: "inherit" }}>
      <div style={{ border: "1px solid #ddd", padding: "15px", margin: "15px", borderRadius: "8px", cursor: "pointer" }}>
        {/* Tweet Title and Body */}
        <h3 style={{ margin: "0 0 8px 0" }}>{tweet.title}</h3>
        <p style={{ margin: "0 0 10px 0", color: "#333" }}>{tweet.body}</p>

        {/* Vote Buttons and View Count Row */}
        <div style={{ display: "flex", alignItems: "center", gap: "15px", margin: "0 0 8px 0", fontSize: "14px", color: "#666" }}>
          {/* Like Button (highlights in blue when active) */}
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

          {/* Dislike Button (highlights in red when active) */}
          <button
            onClick={handleDislike}
            style={{
              backgroundColor: isDisliked ? "#fee2e2" : "#f3f4f6",
              color: isDisliked ? "#dc2626" : "#333",
              border: isDisliked ? "1px solid #f87171" : "1px solid #ddd",
              borderRadius: "20px",
              padding: "4px 12px",
              cursor: "pointer",
              fontWeight: isDisliked ? "bold" : "normal",
            }}
          >
            👎 {dislikes}
          </button>

          {/* Views Counter */}
          <span>👁️ {tweet.views}</span>
        </div>

        {/* Comma-separated list of tags */}
        <p style={{ margin: 0, color: "#1DA1F2", fontSize: "14px" }}>Tags: {tweet.tags.join(", ")}</p>
      </div>
    </Link>
  );
}
