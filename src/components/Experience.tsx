// Mark this file as a "client component" (code that runs in the visitor's browser, not on the server) because it uses hooks and animations.
"use client";

// Import React hooks: useEffect = run code after render, useRef = hold a DOM element, useState = remember a value between renders.
import { useEffect, useRef, useState } from "react";
// Import the experience list (an "array" = an ordered list of items) from the data file.
import { experience } from "@/data/content";
// Import the reusable divider line shown above the section heading.
import SectionDivider from "./SectionDivider";

// Describe the shape of one experience item (TypeScript "type" = a description of what data looks like).
type ExperienceItem = {
  // The year shown on the timeline.
  year: string;
  // The job title.
  role: string;
  // The company name.
  company: string;
  // The list of résumé bullet points (readonly = the list cannot be changed).
  bullets: readonly string[];
  // Optional company link (the "?" means some jobs, like Bytewise, may not have one).
  link?: string;
  // Optional image path inside the public folder (also optional).
  image?: string;
};

// Small component that shows the year text (used when there is no image, or on the opposite side of the image).
function YearLabel({ year }: { year: string }) {
  // Render the year; "hidden md:block" = invisible on phones, visible on medium screens and up.
  return <span className="hidden md:block font-mono-display text-sm font-bold text-plum">{year}</span>;
}

// Small component that shows the company image, stretched to fill the whole height of the card next to it.
function SideImage({ item }: { item: ExperienceItem }) {
  // Remember whether the image failed to load (false at first).
  const [failed, setFailed] = useState(false);
  // If there is no image path, or the file could not be loaded, show nothing (so the year is not repeated on both sides).
  if (!item.image || failed) return null;
  // Build the <img> element once so we can wrap it in a link below if needed.
  const picture = (
    <img
      // "src" = where the image file lives; "/experience/..." means the public/experience folder.
      src={item.image}
      // "alt" = text read by screen readers and shown if the image breaks (accessibility).
      alt={`${item.company} photo`}
      // If the browser cannot load the file, flip "failed" to true so the image disappears cleanly.
      onError={() => setFailed(true)}
      // Fill the whole box (h-full w-full) and crop instead of stretching (object-cover keeps the photo's proportions).
      className="h-full w-full object-cover"
    />
  );
  // Render a box that sits on top of its parent cell (absolute inset-0 = stick to all four edges), so the image copies the card's height.
  return (
    <div className="absolute inset-0 overflow-hidden rounded-2xl border-2 border-ink shadow-[6px_6px_0_var(--color-blush)]">
      {/* If this company has a link, make the picture clickable; otherwise show the picture alone. */}
      {item.link ? (
        <a
          // Where the link goes.
          href={item.link}
          // Open in a new tab so visitors don't leave your portfolio.
          target="_blank"
          // Security: stops the new tab from controlling your page (noopener) or seeing where it came from (noreferrer).
          rel="noopener noreferrer"
          // Make the link fill the whole box so the entire image is clickable.
          className="block h-full w-full"
        >
          {/* The picture inside the link. */}
          {picture}
        </a>
      ) : (
        // No link: show the picture alone.
        picture
      )}
    </div>
  );
}

// Define a small component that reveals itself when visible.
function TimelineCard({ item, index }: { item: ExperienceItem; index: number }) {
  // Create a DOM reference for the observer (a "ref" points at the real HTML element).
  const ref = useRef<HTMLDivElement | null>(null);
  // Track whether the card is visible on screen.
  const [visible, setVisible] = useState(false);

  // Observe the card after it mounts (appears on the page).
  useEffect(() => {
    // Read the current DOM node.
    const element = ref.current;
    // Stop if the node does not exist.
    if (!element) return;
    // Create an IntersectionObserver (a browser tool that tells us when an element enters the screen).
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.2 });
    // Start observing the card.
    observer.observe(element);
    // Disconnect the observer on cleanup (when the component leaves the page).
    return () => observer.disconnect();
  }, []);

  // Decide which side gets the image: even items = image on the right, odd items = image on the left (always opposite the year).
  const imageOnRight = index % 2 === 0;

  // Render one alternating timeline item.
  return (
    <div
      // Attach the ref so the observer can watch this element.
      ref={ref}
      // Layout classes plus the reveal animation classes.
      className={`relative grid gap-5 md:grid-cols-3 items-stretch ${index % 2 === 0 ? "timeline-left" : "timeline-right"} ${
        visible ? "reveal-visible" : "reveal-hidden"
      }`}
    >
      {/* Left column: year when the image is on the right, image when the image is on the left. */}
      <div className="relative hidden items-center md:order-1 md:flex md:justify-end">
        {/* Pick what to show in the left column. */}
        {imageOnRight ? <YearLabel year={item.year} /> : <SideImage item={item} />}
      </div>

      {/* Middle column: the card content. */}
      <article className="md:order-2 rounded-3xl border-2 border-ink bg-paper p-6 shadow-[6px_6px_0_var(--color-blush)]">
        {/* Show the role. */}
        <h3 className="font-mono-display text-xl font-bold">{item.role}</h3>
        {/* Show the company name; make it a clickable link when a link exists. */}
        <p className="mt-1 text-sm font-semibold text-plum">
          {/* Ternary = short if/else: link exists ? show <a> : show plain text. */}
          {item.link ? (
            <a
              // Where the link goes.
              href={item.link}
              // Open in a new tab.
              target="_blank"
              // Security attributes for new-tab links.
              rel="noopener noreferrer"
              // Underline in mustard so visitors can tell it is clickable.
              className="underline decoration-mustard decoration-2 underline-offset-4 hover:text-ink"
            >
              {/* Company name plus a small arrow to hint it opens elsewhere. */}
              {item.company} ↗
            </a>
          ) : (
            // No link: show the company name as plain text.
            item.company
          )}
        </p>
        {/* Render the résumé bullet points. */}
        <ul className="mt-5 space-y-3 text-sm leading-7 text-muted">
          {/* Loop over each bullet string with .map (turns every item of a list into an element). */}
          {item.bullets.map((bullet) => (
            // Each list item needs a unique "key" so React can track it.
            <li key={bullet} className="flex gap-3">
              {/* Use a mustard square as the custom bullet. */}
              <span className="mt-2 h-2 w-2 shrink-0 bg-mustard" />
              {/* Render the bullet text. */}
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      </article>

      {/* Right column: image when the image is on the right, year otherwise. */}
      <div className="relative hidden items-center md:order-3 md:flex md:justify-start">
        {/* Pick what to show in the right column. */}
        {imageOnRight ? <SideImage item={item} /> : <YearLabel year={item.year} />}
      </div>

    </div>
  );
}

// Export the full experience timeline so page.tsx can use it.
export default function Experience() {
  // Render the timeline section.
  return (
    <section id="experience" className="mx-auto max-w-6xl px-6 py-24">
      {/* Add the section divider. */}
      <SectionDivider label="experience" />
      {/* Add the heading area. */}
      <div className="mb-14">
        {/* Show the section heading. */}
        <h2 className="mt-4 font-mono-display text-4xl font-bold tracking-tight md:text-6xl">Experience<span className="text-mustard">.</span></h2>
      </div>
      {/* Draw the vertical timeline behind the cards. */}
      <div className="relative space-y-12 before:absolute before:bottom-0 before:left-[7px] before:top-0 before:w-px before:bg-line md:before:left-1/2">
        {/* Loop over every job in the data file. */}
        {experience.map((item: ExperienceItem, index) => (
          // Render one animated experience card for each role.
          <TimelineCard key={`${item.company}-${item.year}`} item={item} index={index} />
        ))}
      </div>
    </section>
  );
}
