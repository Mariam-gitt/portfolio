// Import the icons used by the resume actions.
import { Download, FileText } from "lucide-react";

// Export the résumé actions: open the PDF in a new tab, or download it directly.
// (Component name is unchanged so existing imports keep working.)
export default function ResumeModal() {
  return (
    // Group the two actions together.
    <div className="flex items-center gap-2">
      {/* Open the résumé in a new browser tab, never inside this page. */}
      <a
        href="/Mariam_Akbar_Resume.pdf"
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-2 rounded-full border-2 border-ink bg-mustard px-5 py-3 font-mono-display text-xs font-bold uppercase tracking-[0.12em] shadow-[5px_5px_0_var(--color-ink)] transition hover:-translate-y-1 hover:shadow-[7px_7px_0_var(--color-ink)]"
      >
        {/* Show a document icon. */}
        <FileText size={16} aria-hidden="true" />
        {/* Label the résumé action. */}
        Resume
      </a>
      {/* Offer a direct download as a secondary, icon-only action. */}
      {/* <a
        href="/Mariam_Akbar_Resume.pdf"
        download
        aria-label="Download résumé"
        className="inline-flex items-center justify-center rounded-full border-2 border-ink bg-paper p-3 shadow-[5px_5px_0_var(--color-ink)] transition hover:-translate-y-1 hover:shadow-[7px_7px_0_var(--color-ink)]"
      >
        {/* Show the download icon. */}
        <Download size={16} aria-hidden="true" />
      </a> */}
    </div>
  );
}
