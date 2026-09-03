import { profile } from "@/data/content";

// This is a Server Component (no "use client" — it has no interactivity,
// so it can render fully on the server, which is the more efficient default).
export default function Hero() {
  return (
    <section id="top" className="mx-auto max-w-3xl px-6 pt-20 pb-16">
      {/* A small "currently" status line — plain text with a dot, not a
          tracked-out ALL-CAPS badge, keeping the tone quiet and human. */}
      <p className="mb-6 flex items-center gap-2 text-sm text-mist">
        <span className="h-1.5 w-1.5 rounded-full bg-amber" />
        Currently a Software Engineering Intern at Fantech Labs
      </p>

      {/* The one deliberately bold moment on the page: an oversized serif
          name, set tight, as the design's single memorable element. */}
      <h1 className="font-display text-6xl leading-[0.95] text-ink sm:text-7xl">
        {profile.name}
      </h1>

      <p className="mt-4 max-w-md text-lg text-mist">{profile.tagline}</p>

      {/* Plain text links instead of pill-shaped buttons with arrows —
          simple underline-on-hover keeps them understated. */}
      <div className="mt-8 flex gap-6 text-sm">
        <a
          href="#contact"
          className="border-b border-ink text-ink transition-colors hover:border-teal hover:text-teal"
        >
          Get in touch
        </a>
        <a
          href={profile.github}
          target="_blank" // Opens in a new tab, since it takes the visitor off-site
          rel="noopener noreferrer" // Security best practice whenever target="_blank" is used
          className="border-b border-transparent text-mist transition-colors hover:border-teal hover:text-teal"
        >
          View GitHub
        </a>
      </div>
    </section>
  );
}
