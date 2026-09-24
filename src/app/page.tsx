// Import the main sections that make up the single-page portfolio.
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";

// Export the homepage rendered at the root URL.
export default function Home() {
  // Compose the page from top to bottom in semantic section order.
  return (
    // Wrap the page so all sections share one document tree.
    <>
      {/* Render the sticky navigation. */}
      <Navbar />
      {/* Render the main content area. */}
      <main>
        {/* Render the hero section. */}
        <Hero />
        {/* Render the about section. */}
        <About />
        {/* Render the animated experience timeline. */}
        <Experience />
        {/* Render the converging and floating skill cloud. */}
        <Skills />
        {/* Render the paged project carousel. */}
        <Projects />
        {/* Render the working contact form and social links. */}
        <Contact />
      </main>
      {/* Render a minimal footer. */}
      <footer className="border-t border-line/70 px-6 py-8">
        {/* Center the footer content. */}
        <div className="mx-auto flex max-w-6xl flex-col justify-between gap-3 md:flex-row md:items-center">
          {/* Show the copyright line. */}
          <p className="font-mono-display text-[10px] uppercase tracking-[0.16em] text-muted">© 2026 Mariam Ali Akbar</p>
          {/* Provide a quick back-to-top link. */}
          <a href="#top" className="font-mono-display text-[10px] uppercase tracking-[0.16em] text-plum hover:underline">back to top ↑</a>
        </div>
      </footer>
    </>
  );
}
