"use client"; // This component uses useState (interactivity), so it must run in the
// browser, not just on the server — "use client" opts it into that.

import { useState } from "react"; // React's hook for storing state that changes over time
import { profile } from "@/data/content";

// The sections the nav links jump to, in the order they appear on the page.
// Each "id" must exactly match the id={"..."} on that section in page.tsx —
// this is the exact bug the old portfolio had (ids that didn't match).
const links = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

export default function Navbar() {
  // "isOpen" holds whether the mobile menu is currently open (true/false).
  // "setIsOpen" is the only function allowed to change it — calling it
  // triggers React to re-render this component with the new value.
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-hairline bg-paper/90 backdrop-blur">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
        {/* Clicking the name scrolls back to the top of the page */}
        <a href="#top" className="font-display text-lg text-ink">
          {profile.name}
        </a>

        {/* Desktop links: hidden on small screens (hidden), shown from the
            "sm" breakpoint up (sm:flex) — Tailwind's responsive prefix system. */}
        <nav className="hidden gap-8 sm:flex">
          {links.map((link) => (
            <a
              key={link.id} // React needs a unique "key" on list items to track each one
              href={`#${link.id}`}
              className="text-sm text-mist transition-colors hover:text-ink"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Mobile menu button: only shown below the "sm" breakpoint (sm:hidden).
            Clicking it flips isOpen between true and false. */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 sm:hidden"
          aria-label="Toggle menu" // Read aloud by screen readers, since there's no visible text label
          aria-expanded={isOpen} // Tells screen readers whether the menu is currently open
        >
          {/* Three lines that form the hamburger icon. Each one rotates/fades
              into an "X" shape when the menu is open, using inline style
              instead of a separate icon image (so there's nothing to break). */}
          <span
            className="h-0.5 w-6 bg-ink transition-transform"
            style={
              isOpen
                ? { transform: "translateY(6px) rotate(45deg)" }
                : undefined
            }
          />
          <span
            className="h-0.5 w-6 bg-ink transition-opacity"
            style={isOpen ? { opacity: 0 } : undefined}
          />
          <span
            className="h-0.5 w-6 bg-ink transition-transform"
            style={
              isOpen
                ? { transform: "translateY(-6px) rotate(-45deg)" }
                : undefined
            }
          />
        </button>
      </div>

      {/* The dropdown mobile menu itself — only rendered in the DOM at all
          when isOpen is true. This is the piece the old portfolio was
          missing entirely (its version was commented out). */}
      {isOpen && (
        <nav className="flex flex-col gap-1 border-t border-hairline px-6 pb-4 sm:hidden">
          {links.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={() => setIsOpen(false)} // Close the menu once a link is tapped
              className="py-2 text-sm text-mist transition-colors hover:text-ink"
            >
              {link.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
