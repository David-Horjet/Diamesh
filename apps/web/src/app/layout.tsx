import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import "./globals.css";

const raleway = Raleway({
  subsets: ["latin"],
  variable: "--font-raleway",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Diamesh — Private Clinical Intelligence",
  description: "Privacy-first clinical intelligence platform powered by local multi-agent AI",
};

const THEME_SCRIPT = `
(function () {
  try {
    var stored = localStorage.getItem("diamesh-theme");
    var theme = stored === "light" || stored === "dark"
      ? stored
      : (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    if (theme === "dark") document.documentElement.classList.add("dark");
  } catch (e) {}
})();
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`h-full ${raleway.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      <body className="h-full font-sans">
        <div className="ambient-bg" aria-hidden="true">
          <span />
          <span />
        </div>
        {children}
      </body>
    </html>
  );
}
