// Mark this component as a client component because it observes viewport visibility.
"use client";

// Import the small decorative icon used between sections.
import { Sparkles } from "lucide-react";
// Import React hooks needed for the intersection observer.
import { useEffect, useRef, useState } from "react";

// Define the component's optional label prop.
type SectionDividerProps = {
  // Allow each section to provide a short label beside the accent.
  label?: string;
};

// Export a reusable animated divider component.
export default function SectionDivider({ label = "keep building" }: SectionDividerProps) {
  // Create a DOM reference so the observer knows which element to watch.
  const ref = useRef<HTMLDivElement | null>(null);
  // Track whether the divider has entered the viewport.
  const [visible, setVisible] = useState(false);

  // Set up the observer after the component mounts in the browser.
  useEffect(() => {
    // Read the referenced DOM element.
    const element = ref.current;
    // Stop if the reference is not available yet.
    if (!element) return;
    // Create an observer that fires when enough of the divider becomes visible.
    const observer = new IntersectionObserver(([entry]) => {
      // Store the visibility state so the CSS animation can begin.
      setVisible(entry.isIntersecting);
    }, { threshold: 0.35 });
    // Start observing the divider element.
    observer.observe(element);
    // Clean up the observer when the component unmounts.
    return () => observer.disconnect();
  }, []);

  // Render the divider line and its small animated accent.
  return (
    // Wrap the divider in a semantic decorative container.
    <div ref={ref} className="mx-auto flex max-w-6xl items-center gap-4 px-6 py-6" aria-hidden="true">
      {/* Draw the left horizontal line. */}
      <span className="h-px flex-1 bg-line" />
      {/* Render the small icon and label in the center. */}
      <span className={`flex items-center gap-2 font-mono-display text-[10px] uppercase tracking-[0.24em] text-muted ${visible ? "accent-pop" : "opacity-0"}`}>
        {/* Render the plum accent icon. */}
        <Sparkles size={13} className="text-plum" />
        {/* Render the small divider label. */}
        {label}
      </span>
      {/* Draw the right horizontal line. */}
      <span className="h-px flex-1 bg-line" />
    </div>
  );
}
