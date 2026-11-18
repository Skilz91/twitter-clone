// app/api/tweets/route.ts
import { NextRequest } from "next/server";
import { makeSureDbIsReady } from "@/lib/db";
import { Tweet } from "@/models/Tweet";

// GET /api/tweets -> return all tweets, newest first
export async function GET() {
  await makeSureDbIsReady();

  const tweets = await Tweet.find({}).sort({ createdAt: -1 }).lean();

  const formattedTweets = tweets.map((t) => ({
    ...t,
    id: String(t._id),
  }));

  return Response.json(formattedTweets);
}

// POST /api/tweets -> create a new tweet
export async function POST(request: NextRequest) {
  await makeSureDbIsReady();

  const bodyData = await request.json();

  try {
    const tweet = await Tweet.create({
      title: bodyData.title,
      body: bodyData.body,
      tags: bodyData.tags && bodyData.tags.length > 0 ? bodyData.tags : ["general"],
    });

    const formattedTweet = {
      ...tweet.toObject(),
      id: String(tweet._id),
    };

    return Response.json(formattedTweet, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to create tweet";
    return Response.json({ error: message }, { status: 400 });
  }
}
