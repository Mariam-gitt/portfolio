// Mark the project carousel as a client component because its current page changes interactively.
"use client";

// Import the carousel navigation icons.
import { ArrowLeft, ArrowRight, Check, ExternalLink, Github, Mic, Monitor } from "lucide-react";
// Import React state for the active project index.
import { useState } from "react";
// Import project data.
import { projects } from "@/data/content";
// Import the reusable divider.
import SectionDivider from "./SectionDivider";

// Export the paged project carousel.
export default function Projects() {
  // Track which project is currently visible.
  const [active, setActive] = useState(0);
  // Remember which screenshots failed to load so a tidy placeholder shows instead of a broken image.
  const [failed, setFailed] = useState<string[]>([]);
  // Read the currently selected project from the data array.
  const project = projects[active];
  // Decide whether a real screenshot can be shown for this project.
  const showImage = Boolean(project.image) && !failed.includes(project.name);

  // Move to the previous project and wrap around at the beginning.
  const previous = () => setActive((current) => (current - 1 + projects.length) % projects.length);
  // Move to the next project and wrap around at the end.
  const next = () => setActive((current) => (current + 1) % projects.length);

  // Render the project section.
  return (
    <section id="projects" className="mx-auto max-w-6xl px-6 py-24">
      {/* Add the animated divider. */}
      <SectionDivider label="selected work" />
      {/* Add the section heading and pagination count. */}
      <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
        {/* Render the section title. */}
        <div>
          {/* Show the section number. */}
          <p className="font-mono-display text-xs uppercase tracking-[0.2em] text-plum">04 / projects</p>
          {/* Show the project heading. */}
          <h2 className="mt-4 font-mono-display text-4xl font-bold tracking-tight md:text-6xl">Selected work<span className="text-mustard">.</span></h2>
        </div>
        {/* Show the current project number. */}
        <p className="font-mono-display text-xs uppercase tracking-[0.18em] text-muted">{String(active + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}</p>
      </div>
      {/* Render only one project card at a time, so there is no horizontal scroll. */}
      <article className="relative overflow-hidden rounded-[2rem] border-2 border-ink bg-paper p-6 shadow-[10px_10px_0_var(--color-mustard)] md:p-10">
        {/* Add a large decorative project number. */}
        <div className="pointer-events-none absolute right-8 top-4 font-mono-display text-8xl font-bold text-blush/60">{String(active + 1).padStart(2, "0")}</div>
        {/* Split the card into a screenshot column and a details column. */}
        <div className="relative grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10">
          {/* Show the project screenshot inside a simple browser frame. */}
          <div className="self-start overflow-hidden rounded-2xl border-2 border-ink bg-sand shadow-[6px_6px_0_var(--color-line)]">
            {/* Render the browser toolbar dots. */}
            <div className="flex items-center gap-1.5 border-b-2 border-ink bg-paper px-4 py-2.5" aria-hidden="true">
              <span className="h-2.5 w-2.5 rounded-full bg-line" />
              <span className="h-2.5 w-2.5 rounded-full bg-line" />
              <span className="h-2.5 w-2.5 rounded-full bg-line" />
            </div>
            {/* Show the screenshot, or a placeholder until one is added to /public/projects. */}
            <div className="relative aspect-[16/10] w-full">
              {showImage ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={project.name}
                  src={project.image}
                  alt={`Screenshot of the ${project.name} project`}
                  loading="lazy"
                  onError={() => setFailed((current) => [...current, project.name])}
                  className="h-full w-full object-cover object-top"
                />
              ) : (
                <div className="flex h-full w-full flex-col items-center justify-center gap-3 text-muted">
                  <Monitor size={34} aria-hidden="true" />
                  <p className="font-mono-display text-[10px] uppercase tracking-[0.18em]">Screenshot coming soon</p>
                </div>
              )}
            </div>
          </div>
          {/* Keep the written details in the second column. */}
          <div>
            {/* Show the project name. */}
            <h3 className="font-mono-display text-3xl font-bold md:text-4xl">{project.name}</h3>
            {/* Show the project description. */}
            <p className="mt-5 text-base leading-7 text-muted">{project.description}</p>
            {/* Show the spotlight box for a standout feature, when the project has one. */}
            {project.highlight && (
              <div className="mt-6 rounded-2xl border-2 border-ink bg-blush/50 p-4">
                <p className="flex items-center gap-2 font-mono-display text-xs font-bold uppercase tracking-[0.14em]"><Mic size={15} aria-hidden="true" /> {project.highlight.title}</p>
                <p className="mt-2 text-sm leading-6">{project.highlight.text}</p>
              </div>
            )}
            {/* List the key features. */}
            <p className="mt-7 font-mono-display text-[10px] uppercase tracking-[0.2em] text-plum">features</p>
            <ul className="mt-3 space-y-2">
              {project.features.map((feature) => (
                // Render one checked line for each feature.
                <li key={feature} className="flex items-start gap-2.5 text-sm leading-6">
                  <Check size={16} className="mt-1 shrink-0 text-plum" aria-hidden="true" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            {/* Render the technology tags. */}
            <div className="mt-6 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                // Render one pill for each technology.
                <span key={tag} className="rounded-full border border-line bg-sand px-3 py-1.5 font-mono-display text-[10px] uppercase tracking-wider">{tag}</span>
              ))}
            </div>
            {/* Render project links. */}
            <div className="mt-7 flex flex-wrap gap-3">
              {/* Link to the GitHub repository. */}
              <a href={project.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border-2 border-ink bg-mustard px-4 py-2.5 font-mono-display text-xs font-bold uppercase tracking-wider hover:-translate-y-0.5"><Github size={15} /> GitHub</a>
              {/* Render the live link only when one exists. */}
              {project.live && <a href={project.live} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border-2 border-ink px-4 py-2.5 font-mono-display text-xs font-bold uppercase tracking-wider hover:-translate-y-0.5"><ExternalLink size={15} /> Live</a>}
            </div>
          </div>
        </div>
      </article>
      {/* Render carousel controls beneath the card. */}
      <div className="mt-8 flex items-center justify-between gap-6">
        {/* Render previous/next buttons. */}
        <div className="flex gap-2">
          {/* Go backward one project. */}
          <button type="button" onClick={previous} aria-label="Previous project" className="rounded-full border-2 border-ink bg-paper p-3 transition hover:-translate-y-1 hover:bg-blush"><ArrowLeft size={18} /></button>
          {/* Go forward one project. */}
          <button type="button" onClick={next} aria-label="Next project" className="rounded-full border-2 border-ink bg-paper p-3 transition hover:-translate-y-1 hover:bg-blush"><ArrowRight size={18} /></button>
        </div>
        {/* Render accessible pagination dots. */}
        <div className="flex items-center gap-2" aria-label="Project pagination">
          {projects.map((item, index) => (
            // Render one button per project.
            <button key={item.name} type="button" onClick={() => setActive(index)} aria-label={`Show ${item.name}`} aria-current={active === index ? "true" : undefined} className={`h-2.5 rounded-full border border-ink transition-all ${active === index ? "w-10 bg-mustard" : "w-2.5 bg-paper"}`} />
          ))}
        </div>
      </div>
    </section>
  );
}
