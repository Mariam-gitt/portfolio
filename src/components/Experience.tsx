// Mark this component as client-side because the timeline cards animate when they enter the viewport.
"use client";

// Import React hooks for intersection-observer based reveals.
import { useEffect, useRef, useState } from "react";
// Import the experience data.
import { experience } from "@/data/content";
// Import the reusable divider.
import SectionDivider from "./SectionDivider";

// Define a small component that reveals itself when visible.
function TimelineCard({ item, index }: { item: (typeof experience)[number]; index: number }) {
  // Create a DOM reference for the observer.
  const ref = useRef<HTMLDivElement | null>(null);
  // Track whether the card is visible.
  const [visible, setVisible] = useState(false);

  // Observe the card after it mounts.
  useEffect(() => {
    // Read the current DOM node.
    const element = ref.current;
    // Stop if the node does not exist.
    if (!element) return;
    // Create an observer for the card.
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.2 });
    // Start observing the card.
    observer.observe(element);
    // Disconnect the observer on cleanup.
    return () => observer.disconnect();
  }, []);

  // Render one alternating timeline item.
  return (
    <div ref={ref} className={`relative grid gap-5 md:grid-cols-2 ${index % 2 === 0 ? "timeline-left" : "timeline-right"} ${visible ? "reveal-visible" : "reveal-hidden"}`}>
      {/* Render the timeline year on the opposite side of the card on desktop. */}
      <div className={`${index % 2 === 0 ? "md:text-right" : "md:order-2 md:text-left"} flex items-start md:justify-end`}>
        {/* Show the experience year in Space Mono. */}
        <span className="font-mono-display text-sm font-bold text-plum">{item.year}</span>
      </div>
      {/* Render the experience detail card. */}
      <article className={`${index % 2 === 0 ? "md:order-2" : "md:order-1"} rounded-3xl border-2 border-ink bg-paper p-6 shadow-[6px_6px_0_var(--color-blush)]`}>
        {/* Show the role. */}
        <h3 className="font-mono-display text-xl font-bold">{item.role}</h3>
        {/* Show the company. */}
        <p className="mt-1 text-sm font-semibold text-plum">{item.company}</p>
        {/* Render the résumé bullet points. */}
        <ul className="mt-5 space-y-3 text-sm leading-7 text-muted">
          {item.bullets.map((bullet) => (
            // Render each résumé bullet as a list item.
            <li key={bullet} className="flex gap-3">
              {/* Use a mustard square as the custom bullet. */}
              <span className="mt-2 h-2 w-2 shrink-0 bg-mustard" />
              {/* Render the bullet text. */}
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      </article>
      {/* Draw the central timeline node on larger screens. */}
      <span className="absolute left-1/2 top-1/2 hidden h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-ink bg-mustard md:block" aria-hidden="true" />
    </div>
  );
}

// Export the full experience timeline.
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
        {experience.map((item, index) => (
          // Render one animated experience card for each role.
          <TimelineCard key={`${item.company}-${item.year}`} item={item} index={index} />
        ))}
      </div>
    </section>
  );
}
