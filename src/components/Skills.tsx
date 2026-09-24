// Mark the skills section as client-side because the icon reveal depends on viewport visibility.
"use client";

// Import React hooks for the viewport observer.
import { useEffect, useRef, useState } from "react";
// Import the icon type so the mapping below is fully typed.
import type { IconType } from "react-icons";
// Import the real brand logos (Simple Icons) for every technology that has one.
import {
  SiCplusplus,
  SiCss,
  SiDocker,
  SiExpress,
  SiGit,
  SiGithub,
  SiGoogleanalytics,
  SiGoogletagmanager,
  SiHtml5,
  SiHubspot,
  SiJavascript,
  SiJsonwebtokens,
  SiMongodb,
  SiMysql,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiPostman,
  SiPrisma,
  SiPython,
  SiReact,
  SiShadcnui,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
} from "react-icons/si";
// Import clean line icons for concepts that are not a single brand (SQL, REST, RAG, LLMs, TF-IDF, OCR).
import { LuBrainCircuit, LuCode, LuDatabase, LuLibraryBig, LuScanText, LuTextSearch, LuWebhook } from "react-icons/lu";
// Import the skills data.
import { skills } from "@/data/content";
// Import the reusable divider.
import SectionDivider from "./SectionDivider";

// Describe how one technology is drawn: which icon, and which color.
type SkillIcon = { icon: IconType; color: string };

// Map every skill name in content.ts to its real logo and official brand color.
const icons: Record<string, SkillIcon> = {
  // Languages
  JavaScript: { icon: SiJavascript, color: "#F7DF1E" },
  TypeScript: { icon: SiTypescript, color: "#3178C6" },
  Python: { icon: SiPython, color: "#3776AB" },
  "C++": { icon: SiCplusplus, color: "#00599C" },
  SQL: { icon: LuDatabase, color: "#5A2D4F" },
  // Frontend
  "React.js": { icon: SiReact, color: "#149ECA" },
  "Next.js": { icon: SiNextdotjs, color: "#000000" },
  HTML: { icon: SiHtml5, color: "#E34F26" },
  CSS: { icon: SiCss, color: "#663399" },
  "Tailwind CSS": { icon: SiTailwindcss, color: "#06B6D4" },
  "shadcn/ui": { icon: SiShadcnui, color: "#000000" },
  // Backend
  "Node.js": { icon: SiNodedotjs, color: "#5FA04E" },
  "Express.js": { icon: SiExpress, color: "#000000" },
  "REST APIs": { icon: LuWebhook, color: "#5A2D4F" },
  "JWT Authentication": { icon: SiJsonwebtokens, color: "#D63AFF" },
  // Databases
  PostgreSQL: { icon: SiPostgresql, color: "#4169E1" },
  MongoDB: { icon: SiMongodb, color: "#47A248" },
  MySQL: { icon: SiMysql, color: "#4479A1" },
  Prisma: { icon: SiPrisma, color: "#2D3748" },
  // AI
  RAG: { icon: LuLibraryBig, color: "#5A2D4F" },
  "LLM Integration": { icon: LuBrainCircuit, color: "#5A2D4F" },
  "TF-IDF": { icon: LuTextSearch, color: "#5A2D4F" },
  OCR: { icon: LuScanText, color: "#5A2D4F" },
  // Tools
  Git: { icon: SiGit, color: "#F05032" },
  GitHub: { icon: SiGithub, color: "#181717" },
  Docker: { icon: SiDocker, color: "#2496ED" },
  Vercel: { icon: SiVercel, color: "#000000" },
  Postman: { icon: SiPostman, color: "#FF6C37" },
  HubSpot: { icon: SiHubspot, color: "#FF7A59" },
  GTM: { icon: SiGoogletagmanager, color: "#246FDB" },
  "Google Analytics": { icon: SiGoogleanalytics, color: "#E37400" },
};

// Use a neutral code icon if a new skill is added to content.ts before it is added to the map above.
const fallback: SkillIcon = { icon: LuCode, color: "#2C2520" };

// Flatten the grouped skill data into a single animated list.
const skillItems = Object.entries(skills).flatMap(([group, items]) => items.map((name) => ({ group, name })));

// Export the animated skills section.
export default function Skills() {
  // Keep a reference to the section root.
  const ref = useRef<HTMLElement | null>(null);
  // Track whether the skills area has entered the viewport.
  const [visible, setVisible] = useState(false);

  // Set up one observer for the whole skills cloud.
  useEffect(() => {
    // Read the section node.
    const element = ref.current;
    // Stop if the node is unavailable.
    if (!element) return;
    // Create the observer.
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.15 });
    // Start observing the section.
    observer.observe(element);
    // Clean up when the section unmounts.
    return () => observer.disconnect();
  }, []);

  // Render the skills section.
  return (
    <section id="skills" ref={ref} className="mx-auto max-w-6xl px-6 py-24">
      {/* Add the animated divider. */}
      <SectionDivider label="toolbox" />
      {/* Add the heading area. */}
      <div className="mb-12">
        {/* Show the section index. */}
        <p className="font-mono-display text-xs uppercase tracking-[0.2em] text-plum">03 / skills</p>
        {/* Show the section title. */}
        <h2 className="mt-4 font-mono-display text-4xl font-bold tracking-tight md:text-6xl">Tools I reach for<span className="text-mustard">.</span></h2>
      </div>
      {/* Render a responsive cloud of icon tiles. */}
      <ul className="flex flex-wrap justify-center gap-4 md:gap-5">
        {skillItems.map((skill, index) => {
          // Look up the logo for this skill.
          const { icon: Icon, color } = icons[skill.name] ?? fallback;
          return (
            // Render each skill with a different starting edge to create the fly-in effect.
            <li
              key={skill.name}
              tabIndex={0}
              aria-label={`${skill.name} (${skill.group})`}
              className={`${visible ? "skill-enter" : "opacity-0"} group relative flex h-16 w-16 items-center justify-center rounded-2xl border-2 border-ink bg-paper shadow-[4px_4px_0_var(--color-line)] transition-colors hover:bg-white focus-visible:bg-white md:h-20 md:w-20`}
              style={{ ["--start-x" as string]: `${((index % 5) - 2) * 120}px`, ["--start-y" as string]: `${(index % 3 === 0 ? -1 : 1) * (40 + (index % 4) * 25)}px`, animationDelay: `${index * 45}ms` }}
            >
              {/* Show the real technology logo in its brand color. */}
              <Icon aria-hidden="true" color={color} className="h-8 w-8 transition-transform duration-200 group-hover:scale-110 md:h-10 md:w-10" />
              {/* Show the technology name (and its category) as a tooltip on hover or keyboard focus. */}
              <span role="tooltip" className="pointer-events-none absolute -top-11 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-lg bg-plum px-3 py-1.5 text-center opacity-0 transition group-hover:opacity-100 group-focus-visible:opacity-100">
                <span className="block font-mono-display text-[11px] font-bold leading-tight text-paper">{skill.name}</span>
                <span className="block font-mono-display text-[8px] uppercase tracking-wider text-blush">{skill.group}</span>
              </span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
