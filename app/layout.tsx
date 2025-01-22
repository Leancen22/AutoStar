import type { Metadata } from "next";
import './globals.css'

export const metadata: Metadata = {
  title: "AutoStar",
  description: "Tu automotora de confianza",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}