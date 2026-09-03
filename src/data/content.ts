// This file holds every piece of text/data shown on the site.
// To update your name, bio, projects, skills, or links later, edit ONLY this file —
// you never need to touch the component (.tsx) files to change wording or add a project.

// A TypeScript "type" is just a shape/contract: it tells TypeScript (and your editor)
// exactly which fields an object must have, so a typo like "titel" instead of "title"
// gets caught immediately instead of silently breaking the page.
export type Project = {
  name: string; // Project name shown as the heading
  description: string; // 2-3 sentence summary of what it does and why it's interesting
  tags: string[]; // Short tech-stack labels, e.g. ["Next.js", "TypeScript"]
  github: string; // Link to the GitHub repo
  live?: string; // Optional: link to a live/deployed demo (the "?" means this field can be left out)
};

// "as const" tells TypeScript to treat this data as fixed/read-only values,
// which gives more precise autocomplete and type-checking than a normal array would.
export const experience = [
  {
    role: "Software Engineering Intern",
    org: "Fantech Labs",
    period: "Current",
    description:
      "Working on full-stack MERN development — building and shipping features across the stack.",
  },
  // {
  //   role: "Software Engineering Intern",
  //   org: "Softech",
  //   period: "Previous",
  //   description:
  //     "HubSpot developer work — moved from certification into hands-on API integration.",
  // },
  {
    role: "Hybrid Intern",
    org: "PITB Lahore",
    period: "2024",
    description: "Built Express.js APIs, including JWT-based authentication.",
  },
  {
    role: "Frontend Intern",
    org: "Bytewise Limited",
    period: "2023",
    description: "Frontend development, early hands-on experience with React.",
  },
] as const;

// Skills grouped into a few clusters so the page can show them as labelled groups
// instead of one giant unsorted list.
export const skills = {
  Languages: ["JavaScript", "TypeScript", "C++"],
  Frontend: ["React", "Next.js", "Tailwind CSS"],
  Backend: ["Node.js", "Express", "MongoDB", "JWT Auth"],
  Tools: ["Git", "GitHub", "Vite"],
};

// The "Project[]" after the colon tells TypeScript every item in this array
// must match the Project shape defined above — add a new project by copying
// one of these objects and filling in your own values.
export const projects: Project[] = [
  {
    name: "WordKnit",
    description:
      "A MERN + Python microservices reading and vocabulary app. Flags genuinely hard words in an uploaded PDF, then explains them with AI-generated profiles and a RAG-based Q&A feature that answers questions grounded in the document itself.",
    tags: ["React", "Node.js", "MongoDB", "Python", "RAG"],
    github: "https://github.com/Mariam-gitt/WordKnit",
  },
  {
    name: "movieExplorer",
    description:
      "A movie discovery app built with Next.js and TypeScript, styled after a dark streaming-service UI. Pulls live data from the TMDB API with genre browsing, favorites, and unit tests.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS"],
    github: "https://github.com/Mariam-gitt/movieExplorer",
  },
  {
    name: "ecom",
    description:
      "A full-stack ecommerce app — React frontend with a functional cart, backed by a Node/Express API. Includes voice search (LLM-parsed queries) and a simulated payment flow.",
    tags: ["React", "Node.js", "Express", "MongoDB"],
    github: "https://github.com/Mariam-gitt/ecom",
  },
];

// The single source of truth for name, role, bio, and contact links.
// "name" is deliberately just the first name — add a last name here later
// once you've settled on which one to use professionally.
export const profile = {
  name: "Mariam",
  role: "Software Engineer",
  tagline: "Full-stack developer building with the MERN stack and Next.js.",
  bio: "Recent Computer Science graduate, currently a Software Engineering Intern at Fantech Labs, working mainly in full-stack MERN development. I like building real, working things end to end — from database to UI — and picking up new tools along the way.",
  email: "mariamakbar77@gmail.com",
  github: "https://github.com/Mariam-gitt",
  linkedin: "https://www.linkedin.com/in/mariam-zaineb-43a693305/",
};
