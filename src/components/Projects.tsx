// Mark this component as client-side because it manages scroll position and a details modal.
"use client";

// Import React hooks for state, refs and effects.
import { useEffect, useRef, useState } from "react";
// Import the icons used across the cards and modal.
import { Check, ChevronLeft, ChevronRight, ExternalLink, Github, Mic, Monitor, X } from "lucide-react";
// Import the project data.
import { projects, type Project } from "@/data/content";
// Import the reusable divider.
import SectionDivider from "./SectionDivider";

// Show a project's screenshot, or a tidy placeholder if it hasn't been added yet or fails to load.
function Thumbnail({ project }: { project: Project }) {
  // Track whether this project's image failed to load.
  const [failed, setFailed] = useState(false);
  // Decide whether a real screenshot can be shown.
  const showImage = Boolean(project.image) && !failed;
  return (
    <div className="relative h-32 w-full shrink-0 bg-sand">
      {/* Show a small badge naming the kind of project. */}
      <span className="absolute right-2 top-2 z-10 rounded-full border-2 border-ink bg-mustard px-2.5 py-0.5 font-mono-display text-[9px] font-bold uppercase tracking-wider text-ink">{project.kind}</span>
      {showImage ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={project.image}
          alt={`Screenshot of the ${project.name} project`}
          loading="lazy"
          onError={() => setFailed(true)}
          className="h-full w-full object-cover object-top"
        />
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center gap-1.5 text-muted">
          <Monitor size={22} aria-hidden="true" />
          <p className="font-mono-display text-[8px] uppercase tracking-[0.14em]">Screenshot coming soon</p>
        </div>
      )}
    </div>
  );
}

// Render one fixed-size project card.
function ProjectCard({ project, onOpen }: { project: Project; onOpen: () => void }) {
  return (
    <article className="flex h-[300px] w-[230px] shrink-0 snap-start flex-col overflow-hidden rounded-2xl border-2 border-ink bg-paper shadow-[5px_5px_0_var(--color-ink)]">
      {/* Show the fixed-height screenshot area with its badge. */}
      <Thumbnail project={project} />
      {/* Keep the text area flexible so the button always lands at the bottom. */}
      <div className="flex flex-1 flex-col p-4">
        {/* Show the project name. */}
        <h3 className="font-mono-display text-sm font-bold leading-tight">{project.name}</h3>
        {/* Clamp the description to three lines so every card stays the same height. */}
        <p className="mt-1.5 flex-1 text-xs leading-5 text-muted [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:3] overflow-hidden">{project.description}</p>
        {/* Show Details and, when the project has one, a direct link to the live deployment. */}
        <div className="mt-3 flex gap-2">
          {/* Open the details modal for this project. */}
          <button
            type="button"
            onClick={onOpen}
            className={`rounded-full border-2 border-ink py-1.5 font-mono-display text-[10px] font-bold uppercase tracking-wider transition hover:bg-mustard ${project.live ? "flex-1" : "w-full"} bg-paper`}
          >
            Details
          </button>
          {/* Link straight to the deployed project, opened in a new tab, when a live link exists. */}
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noreferrer"
              aria-label={`Open the live ${project.name} deployment`}
              className="flex flex-1 items-center justify-center gap-1 rounded-full border-2 border-ink bg-mustard py-1.5 font-mono-display text-[10px] font-bold uppercase tracking-wider transition hover:-translate-y-0.5"
            >
              <ExternalLink size={11} aria-hidden="true" /> Live
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

// Render the full project details in an accessible, always-closable modal.
function DetailsModal({ project, onClose }: { project: Project; onClose: () => void }) {
  // Close on Escape and lock page scroll while the modal is open.
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose]);

  return (
    // Close when the dimmed backdrop itself is clicked (not the card inside it).
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/60 p-4" onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-label={`${project.name} details`}
        onClick={(event) => event.stopPropagation()}
        className="relative flex max-h-[85vh] w-full max-w-lg flex-col overflow-hidden rounded-2xl border-2 border-ink bg-paper shadow-[8px_8px_0_var(--color-ink)]"
      >
        {/* Keep the close button fixed to the card, not the page, so it is always reachable. */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 border-ink bg-paper"
        >
          <X size={16} aria-hidden="true" />
        </button>
        {/* Let only the body content scroll, so the close button never moves off-screen. */}
        <div className="overflow-y-auto p-6">
          <span className="rounded-full border-2 border-ink bg-mustard px-2.5 py-0.5 font-mono-display text-[9px] font-bold uppercase tracking-wider">{project.kind}</span>
          <h3 className="mt-3 font-mono-display text-2xl font-bold">{project.name}</h3>
          <p className="mt-3 text-sm leading-6 text-muted">{project.description}</p>
          {project.highlight && (
            <div className="mt-5 rounded-2xl border-2 border-ink bg-blush/50 p-4">
              <p className="flex items-center gap-2 font-mono-display text-xs font-bold uppercase tracking-[0.14em]"><Mic size={15} aria-hidden="true" /> {project.highlight.title}</p>
              <p className="mt-2 text-sm leading-6">{project.highlight.text}</p>
            </div>
          )}
          <p className="mt-5 font-mono-display text-[10px] uppercase tracking-[0.2em] text-plum">features</p>
          <ul className="mt-2 space-y-2">
            {project.features.map((feature) => (
              <li key={feature} className="flex items-start gap-2.5 text-sm leading-6">
                <Check size={16} className="mt-1 shrink-0 text-plum" aria-hidden="true" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
          <div className="mt-5 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span key={tag} className="rounded-full border border-line bg-sand px-3 py-1.5 font-mono-display text-[10px] uppercase tracking-wider">{tag}</span>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href={project.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border-2 border-ink bg-mustard px-4 py-2.5 font-mono-display text-xs font-bold uppercase tracking-wider hover:-translate-y-0.5"><Github size={15} /> GitHub</a>
            {project.live && <a href={project.live} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border-2 border-ink px-4 py-2.5 font-mono-display text-xs font-bold uppercase tracking-wider hover:-translate-y-0.5"><ExternalLink size={15} /> Live</a>}
          </div>
        </div>
      </div>
    </div>
  );
}

// Export the projects section: a horizontally scrolling carousel of fixed-size cards.
export default function Projects() {
  // Keep a reference to the scrollable track so the arrow buttons can move it.
  const trackRef = useRef<HTMLDivElement | null>(null);
  // Track which project's details modal is open, if any.
  const [openProject, setOpenProject] = useState<Project | null>(null);

  // Scroll the track by roughly one card width in either direction.
  const scrollBy = (direction: 1 | -1) => trackRef.current?.scrollBy({ left: direction * 250, behavior: "smooth" });

  return (
    <section id="projects" className="mx-auto max-w-6xl px-6 py-24">
      {/* Add the section divider. */}
      <SectionDivider label="projects" />
      {/* Add the heading row with the carousel arrows. */}
      <div className="mb-8 flex items-end justify-between">
        <div>
          <p className="font-mono-display text-xs uppercase tracking-[0.2em] text-plum">02 / projects</p>
          <h2 className="mt-4 font-mono-display text-4xl font-bold tracking-tight md:text-6xl">Things I&apos;ve built<span className="text-mustard">.</span></h2>
        </div>
        {/* Render the carousel navigation arrows. */}
        <div className="flex gap-2">
          <button type="button" onClick={() => scrollBy(-1)} aria-label="Scroll projects left" className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-ink bg-paper hover:bg-sand"><ChevronLeft size={16} /></button>
          <button type="button" onClick={() => scrollBy(1)} aria-label="Scroll projects right" className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-ink bg-mustard hover:-translate-y-0.5"><ChevronRight size={16} /></button>
        </div>
      </div>
      {/* Render the horizontally scrolling, snap-aligned, scrollbar-free carousel. */}
      <div ref={trackRef} className="no-scrollbar flex gap-5 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-2">
        {projects.map((project) => (
          <ProjectCard key={project.name} project={project} onOpen={() => setOpenProject(project)} />
        ))}
      </div>
      {/* Show the details modal when a card's button is clicked. */}
      {openProject && <DetailsModal project={openProject} onClose={() => setOpenProject(null)} />}
    </section>
  );
}
