// app/tweet/[id]/page.tsx
import Link from "next/link";

export default async function TweetPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <main style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
      <Link href="/" style={{ color: "#1DA1F2", textDecoration: "none" }}>
        ← Back to Feed
      </Link>
      <div style={{ marginTop: "20px", border: "1px solid #ddd", padding: "20px", borderRadius: "8px" }}>
        <h1>Tweet ID: {id}</h1>
        <p>Viewing details for tweet #{id}.</p>
      </div>
    </main>
  );
}
