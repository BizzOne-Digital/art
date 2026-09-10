export function Logo({
  className = "",
  showWordmark = true,
  compact = false,
  variant = "light",
}: {
  className?: string;
  showWordmark?: boolean;
  compact?: boolean;
  variant?: "light" | "dark";
}) {
  const word = variant === "dark" ? "text-[#0a0f0a]" : "text-white";
  const sub =
    variant === "dark" ? "text-[#0086c9]" : "text-[var(--neon)]";

  if (!showWordmark) return null;

  return (
    <div className={`min-w-0 leading-none ${className}`}>
      <div
        className={`font-display truncate tracking-[0.08em] ${word} ${
          compact
            ? "text-[1.65rem] sm:text-4xl md:text-[2.75rem]"
            : "text-4xl sm:text-5xl md:text-6xl"
        }`}
      >
        ELITE BODY
      </div>
      <div
        className={`truncate font-semibold uppercase tracking-[0.22em] sm:tracking-[0.28em] ${sub} ${
          compact ? "mt-0.5 text-[10px] sm:mt-1 sm:text-sm" : "mt-1.5 text-sm sm:text-base"
        }`}
      >
        Fitness Pros
      </div>
    </div>
  );
}
