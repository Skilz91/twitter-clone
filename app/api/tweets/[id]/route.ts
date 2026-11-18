// app/api/tweets/[id]/route.ts
import { NextRequest } from "next/server";
import { makeSureDbIsReady } from "@/lib/db";
import { Tweet } from "@/models/Tweet";

// PATCH /api/tweets/[id] -> increment or decrement likes/dislikes in MongoDB
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await makeSureDbIsReady();

  const { id } = await params;
  const { field, amount } = await request.json();

  // Only allow updating likes or dislikes
  if (field !== "likes" && field !== "dislikes") {
    return Response.json({ error: "Invalid vote field" }, { status: 400 });
  }

  try {
    const updatedTweet = await Tweet.findByIdAndUpdate(
      id,
      { $inc: { [`reactions.${field}`]: amount } },
      { new: true }
    );

    if (!updatedTweet) {
      return Response.json({ error: "Tweet not found" }, { status: 404 });
    }

    return Response.json(updatedTweet);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to update vote";
    return Response.json({ error: message }, { status: 400 });
  }
}
