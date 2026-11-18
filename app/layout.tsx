// app/layout.tsx
import type { Metadata } from "next";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

export const metadata: Metadata = {
  title: "Twitter Clone",
  description: "Next.js Twitter Clone",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body style={{ fontFamily: "system-ui, sans-serif", margin: 0, padding: 0, backgroundColor: "#f9fafb" }}>
        <Header />
        <div style={{ maxWidth: "900px", margin: "0 auto", display: "flex", backgroundColor: "#fff", minHeight: "100vh" }}>
          <Sidebar />
          <div style={{ flex: 1 }}>{children}</div>
        </div>
      </body>
    </html>
  );
}
