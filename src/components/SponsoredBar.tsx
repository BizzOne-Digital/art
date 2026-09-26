const SPONSORED_URL = "https://www.powerfulteees.etsy.com";
const ETSY_DISPLAY = "www.powerfulteees.etsy.com";

export function SponsoredBar() {
  return (
    <div className="relative z-[59] border-b border-[rgba(139,90,43,0.35)] bg-[linear-gradient(90deg,rgba(139,90,43,0.18),rgba(101,67,33,0.12),rgba(139,90,43,0.18))] px-3 py-2 text-center sm:px-4 sm:py-2.5">
      <p className="mx-auto max-w-6xl text-balance text-[11px] leading-snug sm:text-[13px] sm:leading-relaxed md:text-sm">
        <span className="mr-2 text-[10px] font-bold uppercase tracking-[0.14em] text-[#8b5a2b] sm:text-[11px]">
          Sponsored
        </span>
        <a
          href={SPONSORED_URL}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="font-semibold text-[#a0522d] underline decoration-[#8b5a2b]/60 underline-offset-2 transition hover:text-[#cd853f] hover:decoration-[#cd853f]"
        >
          {ETSY_DISPLAY}
        </a>
        <span className="mx-2 text-[var(--muted)]">·</span>
        <a
          href={SPONSORED_URL}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="font-medium text-[#8b5a2b] transition hover:text-[#a0522d]"
        >
          * Display your motivation with a fitness t shirt!
        </a>
      </p>
    </div>
  );
}
