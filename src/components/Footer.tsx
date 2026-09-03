import { profile } from "@/data/content";

export default function Footer() {
  // new Date().getFullYear() reads the current year from the visitor's
  // device clock, so the copyright year updates on its own every January —
  // no need to ever edit this by hand.
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-hairline">
      <div className="mx-auto max-w-3xl px-6 py-8 text-xs text-mist">
        © {year} {profile.name}. Built with Next.js and TypeScript.
      </div>
    </footer>
  );
}
