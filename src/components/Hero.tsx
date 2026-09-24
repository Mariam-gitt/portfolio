// Mark the hero as a client component because it uses timed entrance classes.
"use client";

// Import the arrow icon for the call-to-action button.
import { ArrowDownRight, Github, Linkedin, Mail } from "lucide-react";
// Import the profile data used by the hero.
import { profile } from "@/data/content";
// Import the résumé action.
import ResumeModal from "./ResumeModal";
// Import the typing effect used in the profile card.
import Typewriter from "./Typewriter";

// Export the animated hero section.
export default function Hero() {
  // Render the hero section at the top of the page.
  return (
    <section id="top" className="relative overflow-hidden">
      {/* Add a large decorative blush circle behind the content. */}
      <div className="pointer-events-none absolute -right-32 -top-24 h-72 w-72 rounded-full bg-blush/70 blur-[2px]" />
      {/* Add a tiny plum accent block to echo the concept's editorial details. */}
      <div className="pointer-events-none absolute right-8 top-36 h-3 w-3 rotate-45 bg-plum" />
      {/* Constrain and vertically center the hero content. */}
      <div className="mx-auto grid min-h-[calc(100vh-73px)] max-w-6xl items-center gap-12 px-6 py-20 lg:grid-cols-[1.4fr_0.6fr]">
        {/* Keep the main hero copy on the left. */}
        <div>
          {/* Add a small label before the main heading. */}
          <p className="hero-enter mb-5 font-mono-display text-xs uppercase tracking-[0.28em] text-plum [animation-delay:80ms]">Software Engineer · Full-Stack Developer</p>
          {/* Render the main personal heading with a strong editorial scale. */}
          <h1 className="hero-enter max-w-4xl font-mono-display text-[clamp(3.5rem,10vw,8.8rem)] font-bold leading-[0.88] tracking-[-0.08em] [animation-delay:180ms]">Mariam<span className="text-plum">.</span></h1>
          {/* Add the concise résumé-derived tagline. */}
          <p className="hero-enter mt-7 max-w-2xl text-lg leading-8 text-muted md:text-xl [animation-delay:300ms]">{profile.tagline} I enjoy turning ideas into practical products across the UI, API, database, and AI layers.</p>
          {/* Group the primary actions. */}
          <div className="hero-enter mt-9 flex flex-wrap items-center gap-4 [animation-delay:420ms]">
            {/* Render the résumé action. */}
            <ResumeModal />
            {/* Link to the projects section. */}
            <a href="#projects" className="inline-flex items-center gap-2 rounded-full border-2 border-ink bg-paper px-5 py-3 font-mono-display text-xs font-bold uppercase tracking-[0.12em] transition hover:-translate-y-1 hover:bg-blush">
              {/* Label the secondary call to action. */}
              See my work
              {/* Show the directional arrow. */}
              <ArrowDownRight size={16} />
            </a>
          </div>
          {/* Render contact shortcuts beneath the buttons. */}
          <div className="hero-enter mt-8 flex items-center gap-4 [animation-delay:540ms]">
            {/* Link to GitHub. */}
            <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="rounded-full border border-line bg-paper p-3 transition hover:-translate-y-1 hover:border-plum hover:text-plum"><Github size={18} /></a>
            {/* Link to LinkedIn. */}
            <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="rounded-full border border-line bg-paper p-3 transition hover:-translate-y-1 hover:border-plum hover:text-plum"><Linkedin size={18} /></a>
            {/* Open the user's email client. */}
            <a href={`mailto:${profile.email}`} aria-label="Email" className="rounded-full border border-line bg-paper p-3 transition hover:-translate-y-1 hover:border-plum hover:text-plum"><Mail size={18} /></a>
            {/* Show the location from the résumé. */}
            <span className="ml-2 font-mono-display text-[10px] uppercase tracking-[0.16em] text-muted">{profile.location}</span>
          </div>
        </div>
        {/* Use the right side for a visual profile card rather than a stock photo. */}
        <div className="hero-enter relative mx-auto w-full max-w-sm [animation-delay:360ms]">
          {/* Create a layered paper card using the requested palette. */}
          <div className="relative rotate-2 rounded-[2rem] border-2 border-ink bg-blush p-4 shadow-[10px_10px_0_var(--color-plum)]">
            {/* Create the inner paper area. */}
            <div className="flex min-h-[260px] flex-col justify-center rounded-[1.5rem] border border-ink/20 bg-paper p-7">
              {/* Show the availability status with a typing animation. */}
              <div>
                {/* Add a small label with a softly pulsing green "live" dot. */}
                <p className="flex items-center gap-2 font-mono-display text-[10px] uppercase tracking-[0.22em] text-muted">
                  <span className="relative flex h-2 w-2" aria-hidden="true">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                  </span>
                  status
                </p>
                {/* Type the availability message, then keep the cursor blinking. */}
                <p className="mt-3 min-h-[2.5rem] font-mono-display text-3xl font-bold leading-tight">
                  <Typewriter text="Open to work" />
                </p>
                {/* Keep the résumé-based focus line as quiet supporting text. */}
                <p className="mt-3 text-sm leading-6 text-muted">Web apps, APIs &amp; AI/RAG systems.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
