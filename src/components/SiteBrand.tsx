import Image from "next/image";
import Link from "next/link";

const ISSA_BADGE = "/issa-logo-badge.jpg";
const ISSA_SEAL = "/issa-certified-seal.jpg";

const sizeStyles = {
  header: {
    badge: "h-11 w-11 sm:h-12 sm:w-12",
    seal: "h-11 w-24 sm:h-12 sm:w-28",
    badgeSizes: "48px",
    sealSizes: "112px",
    priority: true,
  },
  footer: {
    badge: "h-14 w-14 sm:h-16 sm:w-16",
    seal: "h-14 w-28 sm:h-16 sm:w-32",
    badgeSizes: "64px",
    sealSizes: "128px",
    priority: false,
  },
  intro: {
    badge: "h-16 w-16 sm:h-20 sm:w-20",
    seal: "h-16 w-32 sm:h-20 sm:w-40",
    badgeSizes: "80px",
    sealSizes: "160px",
    priority: true,
  },
} as const;

export function SiteBrand({
  size = "header",
  linked = true,
  className = "",
}: {
  size?: keyof typeof sizeStyles;
  linked?: boolean;
  className?: string;
}) {
  const styles = sizeStyles[size];
  const content = (
    <>
      <div
        className={`relative shrink-0 overflow-hidden ${styles.badge}`}
        title="ISSA Certified"
      >
        <Image
          src={ISSA_BADGE}
          alt="ISSA Certified — International Sports Sciences Association"
          fill
          priority={styles.priority}
          sizes={styles.badgeSizes}
          className="object-contain object-center"
        />
      </div>
      <div
        className={`relative shrink-0 ${styles.seal}`}
        title="ISSA Nationally Certified Trainer"
      >
        <Image
          src={ISSA_SEAL}
          alt="ISSA Nationally Certified Trainer"
          fill
          priority={styles.priority}
          sizes={styles.sealSizes}
          className="object-contain object-left"
        />
      </div>
    </>
  );

  const layoutClass = `flex shrink-0 items-center gap-2 sm:gap-2.5 ${className}`;

  if (!linked) {
    return <div className={layoutClass}>{content}</div>;
  }

  return (
    <Link href="/" aria-label="Elite Body Fitness Pros home" className={layoutClass}>
      {content}
    </Link>
  );
}
