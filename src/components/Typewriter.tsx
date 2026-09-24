// Mark this as a client component because it animates with timers.
"use client";

// Import React state and effect hooks.
import { useEffect, useState } from "react";

// Describe the props the typewriter accepts.
type TypewriterProps = {
  // The full text to type out.
  text: string;
  // Milliseconds between characters (a little random jitter is added so it feels human).
  speed?: number;
  // Milliseconds to wait before the first character appears.
  startDelay?: number;
  // Extra classes for the wrapper.
  className?: string;
};

// Export a text-typing effect followed by a blinking cursor.
export default function Typewriter({ text, speed = 85, startDelay = 900, className = "" }: TypewriterProps) {
  // Track how many characters are currently visible.
  const [count, setCount] = useState(0);

  // Run the typing timer once when the component mounts.
  useEffect(() => {
    // Skip the animation for people who asked their OS to reduce motion.
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Track the current position.
    let index = 0;
    // Keep the active timer so it can be cleared on unmount.
    let timer: ReturnType<typeof setTimeout>;
    // Reveal one more character, then schedule the next one.
    const tick = () => {
      index += 1;
      setCount(index);
      if (index < text.length) timer = setTimeout(tick, speed + Math.random() * 60);
    };
    // Show everything at once for reduced motion, otherwise start typing after the delay.
    timer = reduced ? setTimeout(() => setCount(text.length), 0) : setTimeout(tick, startDelay);
    // Stop the timer if the component unmounts.
    return () => clearTimeout(timer);
  }, [text, speed, startDelay]);

  // Render the typed text and the cursor.
  return (
    <span className={className}>
      {/* Give screen readers the complete text immediately instead of letter by letter. */}
      <span className="sr-only">{text}</span>
      {/* Show the animated text and cursor to sighted users. */}
      <span aria-hidden="true">
        {text.slice(0, count)}
        {/* The cursor blinks the whole time; it pauses blinking while characters are being typed. */}
        <span className={`ml-1 inline-block h-[0.9em] w-[3px] translate-y-[0.12em] bg-plum ${count < text.length ? "" : "cursor-blink"}`} />
      </span>
    </span>
  );
}
