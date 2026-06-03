import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Diamesh — Private Clinical Intelligence",
  description: "Privacy-first clinical intelligence platform powered by local multi-agent AI",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full">
        {children}
      </body>
    </html>
  );
}
