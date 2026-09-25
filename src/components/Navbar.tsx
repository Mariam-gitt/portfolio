// Mark the navigation as a client component because it has mobile menu state.
"use client";

// Import the menu and close icons used by the responsive navigation.
import { Menu, X } from "lucide-react";
// Import React state for the mobile menu.
import { useState } from "react";

// Export the responsive site navigation.
export default function Navbar() {
  // Track whether the mobile navigation drawer is open.
  const [open, setOpen] = useState(false);
  // Define the navigation links once so desktop and mobile menus stay consistent.
  const links = ["about", "experience", "skills", "projects", "contact"];

  // Render the fixed-style top navigation.
  return (
    // Keep the navigation above the page content with a warm translucent background.
    <header className="sticky top-0 z-40 border-b border-line/70 bg-sand/90 backdrop-blur-md">
      {/* Center the navigation content and constrain its width. */}
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4" aria-label="Main navigation">
        {/* Use the first initial as a compact brand mark. */}
        <a href="#top" className="font-mono-display text-lg font-bold tracking-tight text-ink">Mariam </a>
        {/* Render the desktop navigation links. */}
        <div className="hidden items-center gap-7 md:flex">
          {links.map((link) => (
            // Render one anchor for each section.
            <a key={link} href={`#${link}`} className="font-mono-display text-xs uppercase tracking-[0.18em] text-muted transition hover:text-plum">
              {/* Show the human-readable section name. */}
              {link}
            </a>
          ))}
        </div>
        {/* Render the mobile menu button on smaller screens. */}
        <button type="button" className="rounded-full border border-line p-2 md:hidden" aria-label={open ? "Close navigation" : "Open navigation"} onClick={() => setOpen((value) => !value)}>
          {/* Swap the icon based on menu state. */}
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>
      {/* Render the mobile navigation only while it is open. */}
      {open && (
        <div className="border-t border-line/70 px-6 py-5 md:hidden">
          {links.map((link) => (
            // Close the menu after the user chooses a section.
            <a key={link} href={`#${link}`} onClick={() => setOpen(false)} className="block border-b border-line/50 py-3 font-mono-display text-xs uppercase tracking-[0.18em] text-muted">
              {/* Display the section label. */}
              {link}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
