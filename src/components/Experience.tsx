import { experience } from "@/data/content";

export default function Experience() {
  return (
    <section id="experience" className="border-t border-hairline">
      <div className="mx-auto max-w-3xl px-6 py-16">
        <h2 className="font-display text-2xl text-ink">Experience</h2>

        {/* A real vertical timeline — justified here because internships
            genuinely are a chronological sequence, unlike a fake numbered
            list used just for visual rhythm. */}
        <ol className="mt-10 space-y-10 border-l border-hairline pl-8">
          {experience.map((job) => (
            <li key={`${job.org}-${job.period}`} className="relative">
              {/* A small dot marking this entry's position on the timeline
                  line, positioned to sit exactly on top of the border-l above. */}
              <span className="absolute top-1.5 -left-[calc(2rem+3px)] h-1.5 w-1.5 rounded-full bg-teal" />

              <p className="font-mono text-xs text-mist">{job.period}</p>
              <h3 className="mt-1 text-lg text-ink">{job.role}</h3>
              <p className="text-sm text-teal">{job.org}</p>
              <p className="mt-2 max-w-lg text-sm text-mist leading-relaxed">
                {job.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
