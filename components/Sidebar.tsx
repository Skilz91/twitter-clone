// components/Sidebar.tsx
import Link from "next/link";

export default function Sidebar() {
  return (
    <aside style={{ width: "200px", padding: "20px", borderRight: "1px solid #ddd" }}>
      <nav style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        <Link href="/" style={{ textDecoration: "none", color: "#333", fontWeight: "bold" }}>
          🏠 Home
        </Link>
        <Link href="/" style={{ textDecoration: "none", color: "#333" }}>
          🔍 Explore
        </Link>
        <Link href="/" style={{ textDecoration: "none", color: "#333" }}>
          👤 Profile
        </Link>
      </nav>
    </aside>
  );
}
