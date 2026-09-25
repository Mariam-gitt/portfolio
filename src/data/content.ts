// Define the shape of one portfolio project.
export type Project = {
  // Store the project title.
  name: string;
  // Store the short project description.
  description: string;
  // Store the technologies used by the project.
  tags: string[];
  // Store the repository URL.
  github: string;
  // Store an optional live URL.
  live?: string;
  // Store the path of a screenshot inside /public (for example "/projects/movie-explorer.png").
  image?: string;
  // Store the key features shown as a checklist on the project card.
  features: string[];
  // Store an optional spotlight box for one standout feature.
  highlight?: { title: string; text: string };
  // Store a short badge label shown on the card (for example "Internship Project").
  kind: string;
};

// Store the user's core profile information in one editable object.
export const profile = {
  // Store the full professional name from the supplied résumé.
  name: "Mariam Ali Akbar",
  // Store the main professional title from the supplied résumé.
  role: "Software Engineer",
  // Store the secondary role wording from the supplied résumé.
  secondaryRole: "Full-Stack Developer",
  // Store the user's location from the supplied résumé.
  location: "Renala Khurd, Punjab, Pakistan",
  // Store the user's public email from the supplied résumé.
  email: "mariamakbar77@gmail.com",
  // Store the public GitHub profile from the supplied résumé/repository.
  github: "https://github.com/Mariam-gitt",
  // Store the public LinkedIn profile already present in the existing repository.
  linkedin: "https://www.linkedin.com/in/mariam-zaineb-43a693305/",
  // Store a concise hero statement derived directly from the résumé summary.
  tagline: "Building practical web, full-stack, and AI-powered applications.",
  // Store the résumé summary without inventing new experience.
  summary: "Computer Science graduate with hands-on experience in web development, full-stack applications, AI/RAG systems, API development, HubSpot automation, and CRM data workflows.",
};

// Store professional experience in timeline order.
export const experience = [
  {
    year: "2026",
    role: "Software Engineering Intern",
    company: "[Current Company]",
    bullets: [
      "Built and reviewed web development projects including a Movie Explorer application using Next.js and TypeScript and a forms project using React Hook Form, Zod, Prisma, and PostgreSQL.",
      "Developed an API to create HubSpot workflows through Claude Code when the available HubSpot MCP functionality did not support workflow creation.",
      "Worked with HubSpot workflows, data enrichment, CRM integrations, orphan company/contact identification, and Metadata.io forms and metadata.",
      "Worked with Google Tag Manager (GTM) and Google Analytics and reviewed Metadata.io tags as part of digital marketing and analytics tasks.",
    ],
  },
  {
    year: "2026",
    role: "Hybrid Intern",
    company: "Punjab Information Technology Board (PITB), Lahore",
    bullets: [
      "Developed backend APIs using Express.js for CRUD operations, routing, file uploads, and JWT-based authentication.",
      "Tested REST APIs using Postman and integrated relational data using MySQL.",
    ],
  },
  {
    year: "2024",
    role: "Frontend Intern",
    company: "Bytewise Limited",
    bullets: [
      "Developed responsive web interfaces using HTML, Tailwind CSS, and JavaScript.",
      "Built interactive React.js projects including Movie Explorer, Expense Tracker, Shopping Cart, and To-Do applications.",
      "Practiced component-based architecture, Git version control, and Vercel deployment.",
    ],
  },
] as const;

// Store the technologies grouped exactly around the résumé's skill categories.
export const skills = {
  Languages: ["JavaScript", "TypeScript", "Python", "C++", "SQL"],
  Frontend: ["React.js", "Next.js", "HTML", "CSS", "Tailwind CSS", "shadcn/ui"],
  Backend: ["Node.js", "Express.js", "REST APIs", "JWT Authentication"],
  Databases: ["PostgreSQL", "MongoDB", "MySQL", "Prisma"],
  AI: ["RAG", "LLM Integration", "TF-IDF"],
  Tools: ["Git", "GitHub", "Docker", "Vercel", "Postman", "HubSpot", "GTM", "Google Analytics"],
};

// Store the selected portfolio projects using only information present in the résumé.
export const projects: Project[] = [
  {
    name: "Movie Explorer",
    description: "A movie discovery application with trending, popular, top-rated, upcoming, and now-playing sections, dynamic movie pages, search, favorites, and recently viewed movies.",
    tags: ["Next.js", "TypeScript", "TMDB API", "Tailwind CSS", "shadcn/ui"],
    kind: "Internship Project",
    // The file in /public/projects includes the .png extension twice.
    image: "/projects/movie-explorer.png.png",
    github: "https://github.com/Mariam-gitt/movieExplorer",
    features: [
      "Infinite scrolling through movie lists",
      "Trending, popular, top-rated, upcoming & now-playing sections",
      "Dynamic movie detail pages",
      "Search for any movie",
      "Favorites list",
      "Recently viewed movies",
    ],
  },
  {
    name: "WordKnit",
    description: "A full-stack vocabulary and reading companion with AI-powered contextual word explanations, speaking and vocabulary coaching, RAG retrieval, and document/PDF processing.",
    tags: ["React", "Node.js", "Express.js", "MongoDB", "Python", "RAG", "LLM APIs"],
    kind: "Final Year Project",
    // The file in /public/projects is named wordknit.jpg.png.
    image: "/projects/wordknit.jpg.png",
    github: "https://github.com/Mariam-gitt/WordKnit",
    features: [
      "AI-powered contextual word explanations",
      "Vocabulary coaching",
      "RAG retrieval over your own reading material",
      "Document & PDF processing",
    ],
    highlight: {
      title: "Speaking Coach",
      text: "An AI speaking coach that helps you practice speaking and build your vocabulary, alongside the reading companion.",
    },
  },
  {
    name: "RAG-Based Document Chatbot",
    description: "A chatbot that answers questions about your uploaded documents and shows the sources each answer came from.",
    tags: ["Next.js", "Node.js", "PostgreSQL", "Vector Search", "LLM", "RAG"],
    kind: "Project",
    github: "https://github.com/Mariam-gitt/portfolio",
    features: [
      "Upload documents and ask questions about them",
      "Finds the most relevant parts of your documents",
      "Shows the sources behind every answer",
    ],
  },
  {
    name: "E-Commerce Application",
    description: "A React.js and JavaScript e-commerce application built to strengthen understanding of React components, state management, and React hooks.",
    tags: ["React.js", "JavaScript"],
    kind: "Personal Project",
    github: "https://github.com/Mariam-gitt/ecom",
    features: [
      "Component-based React UI",
      "State management",
      "React hooks",
    ],
  },
];

// Store the education information from the supplied résumé.
export const education = {
  degree: "BS Computer Science",
  institution: "University of Okara, Renala Khurd",
  period: "2022–2026",
  cgpa: "3.7/4.0",
};
