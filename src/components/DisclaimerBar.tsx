"use client";

const DEFAULT_TEXT =
  "Consult your physician before beginning this or any exercise program. This information is not intended as a substitute for medical advice. Use of information provided on this site is solely at your own risk.";

export function DisclaimerBar({ text }: { text?: string }) {
  const content = (text || DEFAULT_TEXT).replace(/^\*\s*/, "");

  return (
    <div className="relative z-[60] bg-[#0a0f0a] px-3 py-2 text-center text-[9px] leading-snug text-[#d7e0cf] sm:px-4 sm:text-[11px] sm:leading-relaxed md:text-xs">
      <p className="mx-auto max-w-6xl text-balance">{content}</p>
    </div>
  );
}
