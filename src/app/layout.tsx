// Import Next.js's metadata type so the page metadata is checked by TypeScript.
import type { Metadata } from "next";
// Import the local Google font helpers provided by Next.js.
import { Inter, Space_Mono } from "next/font/google";
// Import the global stylesheet containing the portfolio design system.
import "./globals.css";

// Load Inter for readable body copy.
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
// Load Space Mono for headings, labels, numbers, and the visual developer aesthetic.
const spaceMono = Space_Mono({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-space-mono" });

// Define the browser and social metadata for the portfolio.
export const metadata: Metadata = {
  // Set the browser tab title.
  title: "Mariam Ali Akbar — Software Engineer",
  // Set the description used by search engines and previews.
  description: "Portfolio of Mariam Ali Akbar, a software engineer and full-stack developer building practical web and AI/RAG applications.",
};

// Define the root HTML shell shared by every route.
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  // Return the document structure Next.js will render.
  return (
    // Set the document language for accessibility and search engines.
    <html lang="en">
      {/* Apply both font variables to the entire application. */}
      <body className={`${inter.variable} ${spaceMono.variable}`}>
        {/* Render the active route inside the shared document shell. */}
        {children}
      </body>
    </html>
  );
}
