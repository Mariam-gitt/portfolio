// Mark this component as client-side because opening and closing the modal uses state.
"use client";

// Import the icons used by the resume actions and modal controls.
import { Download, ExternalLink, FileText, X } from "lucide-react";
// Import React state for the modal visibility.
import { useState } from "react";

// Export the résumé preview and download control.
export default function ResumeModal() {
  // Track whether the résumé modal is currently open.
  const [open, setOpen] = useState(false);

  // Render the trigger button and optional modal.
  return (
    // Wrap both controls in a fragment so no extra DOM wrapper is required.
    <>
      {/* Open the résumé preview when the user clicks this button. */}
      <button type="button" onClick={() => setOpen(true)} className="inline-flex items-center gap-2 rounded-full border-2 border-ink bg-mustard px-5 py-3 font-mono-display text-xs font-bold uppercase tracking-[0.12em] shadow-[5px_5px_0_var(--color-ink)] transition hover:-translate-y-1 hover:shadow-[7px_7px_0_var(--color-ink)]">
        {/* Show a document icon. */}
        <FileText size={16} />
        {/* Label the résumé action. */}
        Resume
      </button>
      {/* Render the modal only after the user opens it. */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/70 p-4" role="dialog" aria-modal="true" aria-label="Résumé preview">
          {/* Provide a large paper-like modal container. */}
          <div className="flex h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-3xl border-2 border-ink bg-paper shadow-[10px_10px_0_var(--color-plum)]">
            {/* Render the modal toolbar. */}
            <div className="flex items-center justify-between border-b border-line px-5 py-4">
              {/* Identify the preview. */}
              <p className="font-mono-display text-xs uppercase tracking-[0.18em]">Resume</p>
              {/* Group the download, open, and close controls. */}
              <div className="flex items-center gap-2">
                {/* Provide a direct PDF download. */}
                <a href="/Mariam_Akbar_Resume.pdf" download className="inline-flex items-center gap-2 rounded-full border border-line px-3 py-2 text-xs font-semibold hover:border-plum hover:text-plum">
                  {/* Show the download icon. */}
                  <Download size={15} />
                  {/* Label the download action. */}
                  Download
                </a>
                {/* Provide a full-page PDF viewing option. */}
                <a href="/Mariam_Akbar_Resume.pdf" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-line px-3 py-2 text-xs font-semibold hover:border-plum hover:text-plum">
                  {/* Show the external-link icon. */}
                  <ExternalLink size={15} />
                  {/* Label the external preview action. */}
                  Open
                </a>
                {/* Close the modal. */}
                <button type="button" onClick={() => setOpen(false)} className="rounded-full border border-line p-2 hover:border-plum hover:text-plum" aria-label="Close résumé preview">
                  {/* Show the close icon. */}
                  <X size={17} />
                </button>
              </div>
            </div>
            {/* Embed the generated PDF so the user can preview it without leaving the page. */}
            <iframe src="/Mariam_Akbar_Resume.pdf" title="Mariam Ali Akbar résumé" className="min-h-0 flex-1 w-full" />
          </div>
        </div>
      )}
    </>
  );
}
