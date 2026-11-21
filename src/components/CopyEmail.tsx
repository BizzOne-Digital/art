"use client";

import { useState } from "react";

/** Shows an email address as selectable text with a copy button. */
export function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard blocked: the address is still selectable text.
    }
  }

  return (
    <span className="mt-3 flex flex-wrap items-center gap-3">
      <span className="select-all break-all rounded border border-[var(--line)] px-3 py-2 text-white">
        {email}
      </span>
      <button
        type="button"
        onClick={copy}
        className="rounded border border-[var(--neon)] px-3 py-2 text-sm text-[var(--neon)] hover:bg-[var(--neon)] hover:text-black"
      >
        {copied ? "Copied" : "Copy address"}
      </button>
    </span>
  );
}
