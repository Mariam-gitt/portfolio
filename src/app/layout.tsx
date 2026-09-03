// "Metadata" is Next.js's built-in way of setting the browser tab title and
// description (and search-engine/social-preview info) — this replaces the
// old portfolio's bug where the tab just said "Document".
import type { Metadata } from "next";
// next/font/google downloads and self-hosts Google Fonts at build time,
// so the browser never has to make a separate request to Google for them —
// faster loading, and no external font request for visitors.
import { Fraunces, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import { profile } from "@/data/content"; // "@/" is a shortcut alias for "src/", set up in tsconfig.json
import "./globals.css"; // Loads the global styles/design tokens defined above

// Fraunces: the display serif used for the name/headings — assigned to the
// CSS variable --font-fraunces, which globals.css then maps to --font-display.
const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap", // shows a fallback font instantly, then swaps in Fraunces once it loads
});

// IBM Plex Sans: the body/UI font — clean and slightly technical, fitting for a dev portfolio.
const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex-sans",
  display: "swap",
});

// IBM Plex Mono: used only for small tech-stack tags — a deliberate, thematic
// use of monospace (not decoration) since this is literally a coding portfolio.
const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

// This object controls the browser tab title and the description search
// engines/link previews show. Edit profile.name/profile.tagline in
// content.ts and this updates automatically.
export const metadata: Metadata = {
  title: `${profile.name} — ${profile.role}`,
  description: profile.tagline,
};

// RootLayout wraps every page in the app. children = whatever page.tsx renders.
// This is a Server Component by default (no "use client" at the top), meaning
// it renders on the server — faster first load, smaller JS sent to the browser.
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode; // "ReactNode" = anything React can render (JSX, text, etc.)
}>) {
  return (
    <html lang="en">
      {/* The font "variable" classNames below make each font's CSS variable
          available to every element inside <body>, which is how globals.css
          is able to reference --font-fraunces etc. */}
      <body
        className={`${fraunces.variable} ${plexSans.variable} ${plexMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
