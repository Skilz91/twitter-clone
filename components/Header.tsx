// components/Header.tsx
import Link from "next/link";

export default function Header() {
  return (
    <header style={{ borderBottom: "1px solid #ddd", padding: "15px 20px", backgroundColor: "#fff" }}>
      <div style={{ maxWidth: "900px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Link href="/" style={{ fontSize: "20px", fontWeight: "bold", color: "#1DA1F2", textDecoration: "none" }}>
          🐦 Twitter Clone
        </Link>
        <span style={{ color: "#666", fontSize: "14px" }}>Home</span>
      </div>
    </header>
  );
}
