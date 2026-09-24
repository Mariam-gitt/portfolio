# Mariam Ali Akbar — Portfolio

A Next.js 16 + TypeScript + Tailwind CSS portfolio using a warm editorial palette: mustard, blush, plum, and warm sand.

## Run locally

```bash
npm install
npm run dev
```

## Contact form setup

1. Create a free account at https://resend.com and copy an API key.
2. Copy `.env.example` to `.env.local` and fill in `RESEND_API_KEY` and `CONTACT_TO_EMAIL`. Restart `npm run dev` after editing it.
3. **On Vercel**, add the same variables under Project → Settings → Environment Variables, then redeploy. `.env.local` is not uploaded.
4. While you use the default sender (`onboarding@resend.dev`), Resend only delivers to the email address you signed up to Resend with, so `CONTACT_TO_EMAIL` must be that address. To email any address, verify your own domain in Resend and set `CONTACT_FROM_EMAIL`.

The form posts to `src/app/api/contact/route.ts`. Real errors are logged to the server console (your terminal or Vercel logs); visitors only see a friendly message with a mailto fallback.

## Project screenshots

Drop your screenshots into `public/projects/` using the file names listed in `public/projects/README.txt` (for example `movie-explorer.png`). Until a file exists, the card shows a "Screenshot coming soon" placeholder. Features and the WordKnit "Speaking Coach" box are edited in `src/data/content.ts`.

## Skill icons

Skill logos come from `react-icons` (Simple Icons for brands, Lucide for concepts like RAG/OCR). To add a skill, add its name to `src/data/content.ts` and map it in the `icons` object at the top of `src/components/Skills.tsx`.

## Resume

The supplied resume has been converted to `public/Mariam_Akbar_ATS_Resume(1).pdf` so the portfolio can preview and download it directly.

## Main files

- `src/data/content.ts` — portfolio content.
- `src/app/globals.css` — palette, typography, animations, and global styling.
- `src/components/Hero.tsx` — hero, resume action, and the "Open to work" profile card.
- `src/components/Typewriter.tsx` — typing effect with blinking cursor.
- `src/components/Experience.tsx` — alternating animated timeline.
- `src/components/Skills.tsx` — skill icon convergence/floating animation.
- `src/components/Projects.tsx` — no-scroll paged carousel.
- `src/components/Contact.tsx` — contact form UI.
- `src/app/api/contact/route.ts` — email delivery endpoint.
