import { profile, skills } from "@/data/content";

export default function About() {
  // Object.entries turns the {Languages: [...], Frontend: [...]} object into
  // an array of [groupName, itemsArray] pairs, which is easy to loop over below.
  const skillGroups = Object.entries(skills);

  return (
    <section id="about" className="border-t border-hairline">
      <div className="mx-auto max-w-3xl px-6 py-16">
        <h2 className="font-display text-2xl text-ink">About</h2>
        <p className="mt-4 max-w-xl text-mist leading-relaxed">
          {profile.bio}
        </p>

        {/* Skills shown as small labelled clusters of tags rather than a
            grid of identical bordered boxes — each group gets a plain
            sentence-case label, not a tracked-out caps eyebrow. */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {skillGroups.map(([group, items]) => (
            <div key={group}>
              <p className="text-sm text-mist">{group}</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {items.map((item) => (
                  <span
                    key={item}
                    className="rounded border border-hairline px-2 py-1 font-mono text-xs text-ink"
                  >
                    {item}
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
