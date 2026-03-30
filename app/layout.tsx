import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FinArc POC",
  description: "Unified financial observability — proof of concept",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
