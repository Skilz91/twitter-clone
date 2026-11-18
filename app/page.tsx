// app/page.tsx
"use client";

import { useState, useEffect } from "react";
import TweetCard from "@/components/TweetCard";

interface Tweet {
  id: number;
  title: string;
  body: string;
  tags: string[];
  reactions: { likes: number; dislikes: number };
  views: number;
  userId: number;
}

export default function HomePage() {
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [tagsInput, setTagsInput] = useState("");

  // 1. Fetch tweets from your backend API when the page loads
  useEffect(() => {
    async function loadTweets() {
      const res = await fetch("/api/tweets");
      const data = await res.json();
      setTweets(data);
    }
    loadTweets();
  }, []);

  // 2. Send new tweet to your backend API on form submit
  const handleAddTweet = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !body.trim()) return;

    const parsedTags = tagsInput
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag !== "");

    const res = await fetch("/api/tweets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, body, tags: parsedTags }),
    });

    if (res.ok) {
      const savedTweet = await res.json();
      setTweets([savedTweet, ...tweets]);
      setTitle("");
      setBody("");
      setTagsInput("");
    }
  };

  return (
    <main style={{ padding: "20px" }}>
      <h1 style={{ paddingBottom: "15px", borderBottom: "1px solid #ddd", marginTop: 0 }}>
        📝 Latest Tweets
      </h1>

      {/* New Tweet Form */}
      <form
        onSubmit={handleAddTweet}
        style={{
          border: "1px solid #ddd",
          padding: "15px",
          margin: "15px",
          borderRadius: "8px",
          backgroundColor: "#f8fafc",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <input
          type="text"
          placeholder="Tweet title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={{ padding: "10px", borderRadius: "6px", border: "1px solid #ccc", fontSize: "15px" }}
        />
        <textarea
          placeholder="What's happening?"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          required
          rows={3}
          style={{ padding: "10px", borderRadius: "6px", border: "1px solid #ccc", fontSize: "15px", fontFamily: "inherit" }}
        />
        <input
          type="text"
          placeholder="Tags separated by commas (e.g. nextjs, coding)"
          value={tagsInput}
          onChange={(e) => setTagsInput(e.target.value)}
          style={{ padding: "10px", borderRadius: "6px", border: "1px solid #ccc", fontSize: "14px" }}
        />
        <button
          type="submit"
          style={{
            alignSelf: "flex-end",
            backgroundColor: "#1DA1F2",
            color: "#fff",
            border: "none",
            borderRadius: "20px",
            padding: "10px 20px",
            fontWeight: "bold",
            cursor: "pointer",
            fontSize: "15px",
          }}
        >
          Post Tweet
        </button>
      </form>

      {/* Tweet Feed */}
      <div>
        {tweets.map((tweet) => (
          <TweetCard key={tweet.id} tweet={tweet} />
        ))}
      </div>
    </main>
  );
}
