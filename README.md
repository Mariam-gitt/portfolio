# Portfolio

A personal portfolio site built with Next.js, TypeScript, and Tailwind CSS.

## Running it locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000. The first `npm run dev` needs internet access
to download the Google Fonts (Fraunces, IBM Plex Sans, IBM Plex Mono) — normal
and one-time, they get cached after that.

## Editing your info

You should almost never need to touch the component files. Everything you'd
want to change — your name, bio, email, links, work experience, skills, and
projects — lives in one place:

```
src/data/content.ts
```

Open it, edit the text, save, and the site updates. To add a new project,
copy one of the existing objects in the `projects` array and fill in your own
`name`, `description`, `tags`, and `github` link.

### Adding your last name

Right now `profile.name` in `content.ts` is just `"Mariam"`. Once you decide
which surname to use professionally, just change that one line — it updates
the hero heading, the browser tab title, and the footer automatically.

## Project structure

```
src/
├── app/
│   ├── layout.tsx      # Loads fonts, sets the browser tab title
│   ├── page.tsx         # Assembles the sections into the homepage
│   └── globals.css      # Color palette and font tokens
├── components/
│   ├── Navbar.tsx        # Top nav, including a working mobile menu
│   ├── Hero.tsx
│   ├── About.tsx
│   ├── Experience.tsx
│   ├── Projects.tsx
│   ├── Contact.tsx
│   └── Footer.tsx
└── data/
    └── content.ts        # <- edit this file for all text/data changes
```

## Deploying (so LinkedIn/GitHub visitors can actually see it)

Next.js sites need a host that can run a small server (unlike the old plain
HTML site, this can't be dropped onto GitHub Pages as-is). The easiest free
option, made by the Next.js team:

1. Push this project to a GitHub repo.
2. Go to https://vercel.com, sign in with your GitHub account.
3. Click **Add New → Project**, pick this repo, and click **Deploy**.
4. Vercel gives you a live URL (e.g. `your-portfolio.vercel.app`) — that's
   what you'd link from LinkedIn/GitHub. Every future push to `main`
   auto-deploys.

## Tech stack

- **Next.js 16** (App Router) — React framework, handles routing and builds
- **TypeScript** — catches typos/mistakes in your data before they become bugs
- **Tailwind CSS v4** — utility-based styling, configured via `@theme` in `globals.css`
