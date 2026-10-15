// Import the education data shown alongside the about copy.
import { education, profile } from "@/data/content";
// Import the reusable animated divider.
import SectionDivider from "./SectionDivider";

// Export the about and education section.
export default function About() {
  // Render the section.
  return (
    // Give the section an anchor target for the navigation.
    <section id="about" className="mx-auto max-w-6xl px-6 py-24">
      {/* Add the animated section divider above the content. */}
      <SectionDivider label="about me" />
      {/* Create a two-column editorial layout. */}
      <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        {/* Render the section heading. */}
        <div>
          {/* Add a small section index. */}
          <p className="font-mono-display text-xs uppercase tracking-[0.2em] text-plum">01 / about</p>
          {/* Add the main heading. */}
          <h2 className="mt-4 font-mono-display text-4xl font-bold tracking-tight md:text-6xl">Curious by default<span className="text-mustard">.</span></h2>
        </div>
        {/* Render the résumé-derived story and education cards. */}
        <div className="space-y-8">
          {/* Show the résumé summary in readable prose. */}
          <p className="text-xl leading-9 text-muted">{profile.summary} I like building end-to-end products and learning by shipping real things.</p>

          {/* University degree card. */}
          <div className="rounded-3xl border-2 border-ink bg-paper p-7 shadow-[7px_7px_0_var(--color-mustard)]">
            <p className="font-mono-display text-[10px] uppercase tracking-[0.2em] text-plum">education</p>
            <h3 className="mt-3 text-2xl font-bold">{education.degree}</h3>
            <p className="mt-2 text-muted">{education.institution} · {education.period}</p>
            <p className="mt-5 font-mono-display text-sm">CGPA {education.cgpa}</p>
          </div>

          {/* College and School shown as separate cards underneath. */}
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="rounded-3xl border-2 border-ink bg-paper p-6 shadow-[6px_6px_0_var(--color-blush)]">
              <p className="font-mono-display text-[10px] uppercase tracking-[0.2em] text-plum">college</p>
              <p className="mt-3 text-lg font-semibold">{education.college?.name}</p>
              {education.college?.marks && <p className="mt-1 text-sm text-muted">Marks: {education.college.marks}</p>}
            </div>

            <div className="rounded-3xl border-2 border-ink bg-paper p-6 shadow-[6px_6px_0_var(--color-blush)]">
              <p className="font-mono-display text-[10px] uppercase tracking-[0.2em] text-plum">school</p>
              <p className="mt-3 text-lg font-semibold">{education.school?.name}</p>
              {education.school?.marks && <p className="mt-1 text-sm text-muted">Marks: {education.school.marks}</p>}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
