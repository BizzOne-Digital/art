const SPONSORED_URL = "https://www.powerfulteees.etsy.com";

export function SponsoredBar() {
  return (
    <div className="relative z-[59] border-b border-[rgba(255,106,0,0.25)] bg-[linear-gradient(90deg,rgba(255,106,0,0.12),rgba(255,210,0,0.08),rgba(255,106,0,0.12))] px-3 py-2 text-center sm:px-4">
      <p className="mx-auto max-w-6xl text-balance text-[11px] leading-snug text-[var(--white)] sm:text-[13px] sm:leading-relaxed md:text-sm">
        <span className="mr-1 text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--orange)] sm:text-[11px]">
          Sponsored
        </span>
        <a
          href={SPONSORED_URL}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="font-semibold text-[var(--orange-bright)] underline decoration-[var(--orange)]/50 underline-offset-2 transition hover:text-[var(--gold)] hover:decoration-[var(--gold)]"
        >
          * Display your motivation with a fitness t shirt!
        </a>
      </p>
    </div>
  );
}
