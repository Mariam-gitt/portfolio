// Import Next.js's JSON response helper for the API route.
import { NextResponse } from "next/server";
// Import Resend's email client for sending contact messages.
import { Resend } from "resend";

// Run on the Node.js runtime because the Resend SDK needs it.
export const runtime = "nodejs";

// Keep field lengths sane so nobody can send a giant payload.
const LIMITS = { name: 100, email: 200, message: 5000 };
// A simple, forgiving email shape check (the email provider does the strict validation).
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Helper that returns a JSON error with a status code.
const fail = (error: string, status: number) => NextResponse.json({ ok: false, error }, { status });

// Define the POST endpoint used by the portfolio contact form.
export async function POST(request: Request) {
  // Parse the JSON body; a malformed body should be a 400, not a crash.
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return fail("That request could not be read. Please try again.", 400);
  }

  // Bots often fill hidden fields. Pretend it worked, but do nothing.
  if (typeof body.website === "string" && body.website.trim() !== "") return NextResponse.json({ ok: true });

  // Read and trim the three expected fields.
  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const message = String(body.message ?? "").trim();

  // Reject incomplete submissions before contacting the email provider.
  if (!name || !email || !message) return fail("Please fill in every field.", 400);
  if (!EMAIL_PATTERN.test(email)) return fail("Please enter a valid email address.", 400);
  if (name.length > LIMITS.name || email.length > LIMITS.email || message.length > LIMITS.message) {
    return fail("One of the fields is too long.", 400);
  }

  // Read the secret Resend key and destination email from the server environment.
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;

  // If email isn't configured, log the exact fix for the site owner and show visitors a friendly message.
  if (!apiKey || !to) {
    console.error("[contact] Missing RESEND_API_KEY or CONTACT_TO_EMAIL. Add them to .env.local (local) or your hosting dashboard (production).");
    return fail("The contact form isn't available right now. Please email me directly instead.", 503);
  }

  try {
    // Create the Resend client using the private API key.
    const resend = new Resend(apiKey);
    // Ask Resend to send the message.
    const { error } = await resend.emails.send({
      // Use the verified sender configured in the environment.
      from: process.env.CONTACT_FROM_EMAIL ?? "Portfolio <onboarding@resend.dev>",
      // Deliver the visitor's message to the portfolio owner.
      to,
      // Give the email a useful subject line.
      subject: `Portfolio message from ${name}`,
      // Set the visitor's address as the reply-to address so "Reply" goes to them.
      replyTo: email,
      // Include a readable plain-text body.
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    });

    // Resend returns errors instead of throwing them; log the real reason for the site owner.
    if (error) {
      console.error("[contact] Resend rejected the message:", error);
      return fail("Sorry, your message couldn't be sent. Please try again or email me directly.", 502);
    }

    // Tell the browser the message was accepted.
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] Unexpected error while sending:", err);
    return fail("Something went wrong on my end. Please try again or email me directly.", 500);
  }
}
