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
  // The year shown as a small badge on the card.
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

// Small component that shows a landscape (horizontal) company image; it keeps the same width even when there is no image.
// DATA FLOW: PARENT -> CHILD. TimelineCard (parent) passes `item` down into SideImage (child) as a prop. Nothing is sent back up.
function SideImage({ item }: { item: ExperienceItem }) {
  // Remember whether the image failed to load (false at first). This is the component's own private state, not shared with any parent.
  const [failed, setFailed] = useState(false);
  // If there is no image (or it failed), render an invisible spacer of the same width so every card stays the same size.
  if (!item.image || failed) return <div className="hidden w-[280px] shrink-0 md:block" aria-hidden="true" />;
  // Build the <img> element once so we can wrap it in a link below if needed.
  const picture = (
    <img
      // "src" = where the image file lives; "/experience/..." means the public/experience folder.
      src={item.image}
      // "alt" = text read by screen readers and shown if the image breaks (accessibility).
      alt={`${item.company} photo`}
      // If the browser cannot load the file, flip "failed" to true so the image is replaced by the spacer.
      onError={() => setFailed(true)}
      // Fill the landscape box and crop instead of squashing (object-cover keeps the photo's proportions).
      className="h-full w-full object-cover"
    />
  );
  // Render the landscape box: fixed 280px wide, 3:2 shape (aspect-[3/2] = width : height ratio), rounded, bordered, hidden on phones.
  return (
    <div className="hidden aspect-[3/2] w-[280px] shrink-0 overflow-hidden rounded-2xl border-2 border-ink shadow-[6px_6px_0_var(--color-blush)] md:block">
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
// DATA FLOW: PARENT -> CHILD. Experience (parent) passes `item` and `index` down to this component (child) as props. Nothing is sent back up.
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

  // Render one row: card + image side by side on desktop, card only on phones.
  return (
    <div
      // Attach the ref so the observer can watch this element.
      ref={ref}
      // Flex row (items side by side). Even rows: card left, image right. Odd rows: "flex-row-reverse" flips it so the image is on the left.
      className={`md:flex md:items-center md:gap-8 ${index % 2 === 0 ? "md:flex-row timeline-left" : "md:flex-row-reverse timeline-right"} ${
        visible ? "reveal-visible" : "reveal-hidden"
      }`}
    >
      {/* The card: "flex-1" = take all the space the image does not use, so the card is wide and therefore short. */}
      <article className="flex-1 rounded-3xl border-2 border-ink bg-paper p-5 shadow-[6px_6px_0_var(--color-blush)]">
        {/* Header row: role + company on the left, year badge on the right. */}
        <div className="flex items-start justify-between gap-4">
          {/* Left side of the header. */}
          <div>
            {/* Show the role. */}
            <h3 className="font-mono-display text-lg font-bold">{item.role}</h3>
            {/* Show the company name; make it a clickable link when a link exists. */}
            <p className="mt-0.5 text-sm font-semibold text-plum">
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
          </div>
          {/* Year badge (shown once per card, so no more duplicate years on both sides). */}
          <span className="shrink-0 font-mono-display text-sm font-bold text-plum">{item.year}</span>
        </div>
        {/* Render the résumé bullet points in smaller, tighter text so the card stays short. */}
        <ul className="mt-3 space-y-1.5 text-[13px] leading-6 text-muted">
          {/* Loop over each bullet string with .map (turns every item of a list into an element). */}
          {item.bullets.map((bullet) => (
            // Each list item needs a unique "key" so React can track it.
            <li key={bullet} className="flex gap-3">
              {/* Use a mustard square as the custom bullet. */}
              <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-mustard" />
              {/* Render the bullet text. */}
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      </article>

      {/* The landscape image (or an invisible spacer) on the opposite side of the card. */}
      <SideImage item={item} />
    </div>
  );
}

// Export the full experience timeline so page.tsx can use it.
export default function Experience() {
  // Render the timeline section (smaller top/bottom padding than before so everything fits on one screen).
  return (
    <section id="experience" className="mx-auto max-w-6xl px-6 py-12">
      {/* Add the section divider. */}
      <SectionDivider label="experience" />
      {/* Add the heading area with a smaller bottom gap. */}
      <div className="mb-6">
        {/* Show the section heading (smaller than before). */}
        <h2 className="mt-3 font-mono-display text-3xl font-bold tracking-tight md:text-5xl">Experience<span className="text-mustard">.</span></h2>
      </div>
      {/* Stack the rows with a small gap between them (space-y-5 = 1.25rem). */}
      <div className="space-y-5">
        {/* Loop over every job in the data file. */}
        {experience.map((item: ExperienceItem, index) => (
          // DATA FLOW: PARENT -> CHILD. Pass this job (`item`) and its position (`index`) down to TimelineCard.
          <TimelineCard key={`${item.company}-${item.year}`} item={item} index={index} />
        ))}
      </div>
    </section>
  );
}
