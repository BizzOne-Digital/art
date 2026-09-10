import Image from "next/image";
import Link from "next/link";

const ISSA_BADGE = "/issa-logo-badge.jpg";
const ISSA_SEAL = "/issa-certified-seal.jpg";

export function SiteBrand({
  size = "header",
  className = "",
}: {
  size?: "header" | "footer";
  className?: string;
}) {
  const badgeSize =
    size === "footer" ? "h-14 w-14 sm:h-16 sm:w-16" : "h-11 w-11 sm:h-12 sm:w-12";
  const sealSize =
    size === "footer" ? "h-14 w-28 sm:h-16 sm:w-32" : "h-11 w-24 sm:h-12 sm:w-28";

  return (
    <Link
      href="/"
      aria-label="Elite Body Fitness Pros home"
      className={`flex shrink-0 items-center gap-2 sm:gap-2.5 ${className}`}
    >
      <div
        className={`relative shrink-0 overflow-hidden ${badgeSize}`}
        title="ISSA Certified"
      >
        <Image
          src={ISSA_BADGE}
          alt="ISSA Certified — International Sports Sciences Association"
          fill
          priority={size === "header"}
          sizes={size === "footer" ? "64px" : "48px"}
          className="object-contain object-center"
        />
      </div>
      <div
        className={`relative shrink-0 ${sealSize}`}
        title="ISSA Nationally Certified Trainer"
      >
        <Image
          src={ISSA_SEAL}
          alt="ISSA Nationally Certified Trainer"
          fill
          priority={size === "header"}
          sizes={size === "footer" ? "128px" : "112px"}
          className="object-contain object-left"
        />
      </div>
    </Link>
  );
}
