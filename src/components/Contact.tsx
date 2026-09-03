import { profile } from "@/data/content";

export default function Contact() {
  return (
    <section id="contact" className="border-t border-hairline">
      <div className="mx-auto max-w-3xl px-6 py-16">
        <h2 className="font-display text-2xl text-ink">Get in touch</h2>
        <p className="mt-4 max-w-md text-mist leading-relaxed">
          Feel free to reach out about internships, collaborations, or just to
          say hi.
        </p>

        {/* Three plain contact links, stacked. A "mailto:" href opens the
            visitor's default email app with this address pre-filled —
            no contact form, so there's no third-party form service to
            configure or break (the exact bug the old portfolio had). */}
        <div className="mt-8 flex flex-col gap-3 text-sm">
          <a
            href={`mailto:${profile.email}`}
            className="w-fit border-b border-transparent text-ink transition-colors hover:border-teal hover:text-teal"
          >
            {profile.email}
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="w-fit border-b border-transparent text-ink transition-colors hover:border-teal hover:text-teal"
          >
            GitHub — Mariam-gitt
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="w-fit border-b border-transparent text-ink transition-colors hover:border-teal hover:text-teal"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
}
