// Mark the contact section as a client component because the form has interactive state.
"use client";

// Import the social and form icons.
import { Github, Linkedin, Mail, Send } from "lucide-react";
// Import React state for form values and submission status.
import { FormEvent, useState } from "react";
// Import the profile contact data.
import { profile } from "@/data/content";
// Import the reusable divider.
import SectionDivider from "./SectionDivider";

// Define the form shape so TypeScript understands each field.
type ContactForm = {
  // Store the visitor's name.
  name: string;
  // Store the visitor's email.
  email: string;
  // Store the visitor's message.
  message: string;
};

// Describe every state the form can be in.
type Status = "idle" | "sending" | "sent" | "error";

// Export the working contact section.
export default function Contact() {
  // Store the current form fields.
  const [form, setForm] = useState<ContactForm>({ name: "", email: "", message: "" });
  // Store the submission state shown to the user.
  const [status, setStatus] = useState<Status>("idle");
  // Store the human-readable error shown when something fails.
  const [errorMessage, setErrorMessage] = useState("");

  // Update one field while preserving the others.
  const updateField = (field: keyof ContactForm, value: string) => setForm((current) => ({ ...current, [field]: value }));

  // Submit the form to the Next.js API route.
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    // Stop the browser from navigating away with a normal HTML form submission.
    event.preventDefault();
    // Ignore double-clicks while a request is already running.
    if (status === "sending") return;
    // Tell the UI that the request is in progress.
    setStatus("sending");
    setErrorMessage("");

    // Read the hidden spam-trap field straight from the form element.
    const website = String(new FormData(event.currentTarget).get("website") ?? "");

    try {
      // Send the form data to the server route.
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, website }),
      });
      // Read the JSON response, but never crash if the server sent something else (e.g. an HTML error page).
      const result = await response.json().catch(() => null);

      // Show success and clear the fields.
      if (response.ok && result?.ok) {
        setStatus("sent");
        setForm({ name: "", email: "", message: "" });
        return;
      }
      // Otherwise show the server's friendly error (or a generic one).
      setErrorMessage(result?.error ?? "Something went wrong. Please try again.");
      setStatus("error");
    } catch {
      // The request never reached the server (offline, blocked, etc.).
      setErrorMessage("Couldn't reach the server. Check your connection and try again.");
      setStatus("error");
    }
  };

  // Render the contact section.
  return (
    <section id="contact" className="mx-auto max-w-6xl px-6 py-24">
      {/* Add the animated divider. */}
      <SectionDivider label="say hello" />
      {/* Create the two-column contact layout. */}
      <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
        {/* Render contact information. */}
        <div>
          {/* Show the section index. */}
          <p className="font-mono-display text-xs uppercase tracking-[0.2em] text-plum">05 / contact</p>
          {/* Show the invitation heading. */}
          <h2 className="mt-4 font-mono-display text-4xl font-bold tracking-tight md:text-6xl">Let&apos;s make something useful<span className="text-mustard">.</span></h2>
          {/* Add a short supporting line. */}
          <p className="mt-6 max-w-md text-lg leading-8 text-muted">For work, collaboration, or a good technical conversation, send me a message.</p>
          {/* Render social/contact shortcuts. */}
          <div className="mt-8 flex flex-wrap gap-3">
            {/* Link to GitHub. */}
            <a href={profile.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-line bg-paper px-4 py-3 text-sm hover:border-plum hover:text-plum"><Github size={17} /> GitHub</a>
            {/* Link to LinkedIn. */}
            <a href={profile.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-line bg-paper px-4 py-3 text-sm hover:border-plum hover:text-plum"><Linkedin size={17} /> LinkedIn</a>
            {/* Open an email client. */}
            <a href={`mailto:${profile.email}`} className="inline-flex items-center gap-2 rounded-full border border-line bg-paper px-4 py-3 text-sm hover:border-plum hover:text-plum"><Mail size={17} /> Email</a>
          </div>
        </div>
        {/* Render the actual contact form. */}
        <form onSubmit={handleSubmit} className="relative overflow-hidden rounded-[2rem] border-2 border-ink bg-paper p-6 shadow-[8px_8px_0_var(--color-blush)] md:p-8">
          {/* Render the name field. */}
          <label className="block font-mono-display text-xs uppercase tracking-wider">Name<input required name="name" autoComplete="name" maxLength={100} value={form.name} onChange={(event) => updateField("name", event.target.value)} className="mt-2 w-full rounded-2xl border-2 border-line bg-sand px-4 py-3 font-sans-body text-base outline-none focus:border-plum" placeholder="Your name" /></label>
          {/* Render the email field. */}
          <label className="mt-5 block font-mono-display text-xs uppercase tracking-wider">Email<input required name="email" type="email" autoComplete="email" maxLength={200} value={form.email} onChange={(event) => updateField("email", event.target.value)} className="mt-2 w-full rounded-2xl border-2 border-line bg-sand px-4 py-3 font-sans-body text-base outline-none focus:border-plum" placeholder="you@example.com" /></label>
          {/* Render the message field. */}
          <label className="mt-5 block font-mono-display text-xs uppercase tracking-wider">Message<textarea required name="message" maxLength={5000} rows={6} value={form.message} onChange={(event) => updateField("message", event.target.value)} className="mt-2 w-full resize-none rounded-2xl border-2 border-line bg-sand px-4 py-3 font-sans-body text-base outline-none focus:border-plum" placeholder="Tell me a little about what you are building..." /></label>
          {/* Hidden spam trap: real people never see or fill this, bots usually do. */}
          <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
            <label>Website<input name="website" type="text" tabIndex={-1} autoComplete="off" defaultValue="" /></label>
          </div>
          {/* Render the submit button. */}
          <button type="submit" disabled={status === "sending"} className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full border-2 border-ink bg-mustard px-5 py-3 font-mono-display text-xs font-bold uppercase tracking-wider transition hover:-translate-y-1 disabled:cursor-wait disabled:opacity-60">
            {/* Show the send icon. */}
            <Send size={16} />
            {/* Change the label while the request is in progress. */}
            {status === "sending" ? "Sending..." : "Send message"}
          </button>
          {/* Announce the result to everyone, including screen readers. */}
          <div aria-live="polite" className="mt-4 min-h-[1.5rem] text-sm font-semibold">
            {status === "sent" && <p className="text-emerald-700">Message sent — thank you! I&apos;ll get back to you soon.</p>}
            {status === "error" && (
              <p className="text-red-700">
                {errorMessage}{" "}
                <a href={`mailto:${profile.email}`} className="underline underline-offset-2 hover:text-plum">{profile.email}</a>
              </p>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}
