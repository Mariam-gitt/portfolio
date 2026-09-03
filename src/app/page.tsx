// Each of these is one section of the page, built as its own file in
// src/components/ — importing them here and listing them below is what
// actually assembles the full page, in this exact top-to-bottom order.
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

// This is the actual homepage — Next.js automatically renders whatever
// this file exports as the content of "/" (the site's root URL).
export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
