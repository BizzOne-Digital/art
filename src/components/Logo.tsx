export function Logo({
  className = "",
  showWordmark = true,
  compact = false,
}: {
  className?: string;
  showWordmark?: boolean;
  compact?: boolean;
}) {
  return (
    <div className={`flex min-w-0 items-center gap-2 sm:gap-3 ${className}`}>
      <svg
        className={compact ? "h-9 w-9 shrink-0 sm:h-11 sm:w-11" : "h-11 w-11 shrink-0"}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <rect
          x="2"
          y="2"
          width="60"
          height="60"
          stroke="#B8FF2E"
          strokeWidth="2"
          opacity="0.35"
        />
        <path
          d="M18 46V18H28.5C33.8 18 37.2 21.2 37.2 26.1C37.2 29.4 35.5 31.8 32.7 32.9L39.8 46H33.1L26.8 34.2H23.4V46H18Z"
          fill="#B8FF2E"
        />
        <path
          d="M23.4 29.4H27.8C30.5 29.4 32 28 32 26.1C32 24.2 30.5 22.9 27.8 22.9H23.4V29.4Z"
          fill="#050605"
        />
        <circle cx="46" cy="18" r="3" fill="#B8FF2E" />
        <path
          d="M42 48H50M46 44V52"
          stroke="#F4F7F0"
          strokeWidth="2.2"
          strokeLinecap="square"
        />
      </svg>
      {showWordmark && (
        <div className="min-w-0 leading-none">
          <div className="font-display truncate text-lg tracking-[0.1em] text-white sm:text-xl md:text-2xl">
            ELITE BODY
          </div>
          <div className="truncate text-[9px] font-semibold uppercase tracking-[0.22em] text-[var(--neon)] sm:text-[10px] sm:tracking-[0.28em]">
            Fitness Pros
          </div>
        </div>
      )}
    </div>
  );
}
