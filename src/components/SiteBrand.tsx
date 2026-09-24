import Image from "next/image";
import Link from "next/link";

export const ELITE_BODY_BRAND_LOGO = "/elite-body-brand.jpg";
export const ISSA_CERTIFIED_BADGE = "/issa-certified-badge.jpg";

const sizeStyles = {
  header: {
    company: "h-[4.5rem] w-[7rem] sm:h-24 sm:w-36",
    seal: "h-16 w-16 sm:h-20 sm:w-20",
    companySizes: "144px",
    sealSizes: "80px",
    priority: true,
  },
  footer: {
    company: "h-28 w-44 sm:h-36 sm:w-56",
    seal: "h-24 w-24 sm:h-32 sm:w-32",
    companySizes: "224px",
    sealSizes: "128px",
    priority: false,
  },
  page: {
    company: "h-32 w-52 sm:h-40 sm:w-64",
    seal: "h-28 w-28 sm:h-36 sm:w-36",
    companySizes: "256px",
    sealSizes: "144px",
    priority: false,
  },
  intro: {
    company: "h-28 w-48 sm:h-32 sm:w-56",
    seal: "h-24 w-24 sm:h-28 sm:w-28",
    companySizes: "224px",
    sealSizes: "112px",
    priority: true,
  },
} as const;

export function SiteBrand({
  size = "header",
  linked = true,
  className = "",
  layout = "row",
}: {
  size?: keyof typeof sizeStyles;
  linked?: boolean;
  className?: string;
  layout?: "row" | "column";
}) {
  const styles = sizeStyles[size];
  const content = (
    <>
      <div
        className={`relative shrink-0 ${styles.company}`}
        title="Elite Body Fitness Pros"
      >
        <Image
          src={ELITE_BODY_BRAND_LOGO}
          alt="Elite Body Fitness Pros"
          fill
          priority={styles.priority}
          sizes={styles.companySizes}
          className="object-contain object-left"
        />
      </div>
      <div
        className={`relative shrink-0 ${styles.seal}`}
        title="ISSA Nationally Certified Trainer"
      >
        <Image
          src={ISSA_CERTIFIED_BADGE}
          alt="ISSA Nationally Certified Trainer"
          fill
          priority={styles.priority}
          sizes={styles.sealSizes}
          className="object-contain object-center"
        />
      </div>
    </>
  );

  const layoutClass =
    layout === "column"
      ? `flex flex-col items-center gap-4 ${className}`
      : `flex shrink-0 items-center gap-3 sm:gap-5 ${className}`;

  if (!linked) {
    return <div className={layoutClass}>{content}</div>;
  }

  return (
    <Link href="/" aria-label="Elite Body Fitness Pros home" className={layoutClass}>
      {content}
    </Link>
  );
}
