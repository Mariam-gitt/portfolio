import { projects } from "@/data/content";

export default function Projects() {
  return (
    <section id="projects" className="border-t border-hairline">
      <div className="mx-auto max-w-3xl px-6 py-16">
        <h2 className="font-display text-2xl text-ink">Projects</h2>

        <div className="mt-10 space-y-px">
          {/* .map() loops over the projects array from content.ts, rendering
              one block per project. "index" tells us the position (0, 1, 2...)
              so we can alternate the background tint below. */}
          {projects.map((project, index) => (
            <div
              key={project.name}
              // Alternating background tint (index % 2 checks odd/even) instead
              // of identical cards with the same border-radius and shadow —
              // gives each row a distinct rhythm without extra decoration.
              className={`border-b border-hairline px-6 py-8 -mx-6 ${
                index % 2 === 1 ? "bg-thread" : ""
              }`}
            >
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="font-display text-xl text-ink">
                  {project.name}
                </h3>
                <div className="flex gap-4 text-sm">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border-b border-transparent text-mist transition-colors hover:border-teal hover:text-teal"
                  >
                    GitHub
                  </a>
                  {/* project.live is optional (marked with "?" in the Project
                      type) — this line only renders the "Live" link at all
                      when a live URL was actually provided in content.ts. */}
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="border-b border-transparent text-mist transition-colors hover:border-teal hover:text-teal"
                    >
                      Live
                    </a>
                  )}
                </div>
              </div>

              <p className="mt-2 max-w-xl text-sm text-mist leading-relaxed">
                {project.description}
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-xs text-teal"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
