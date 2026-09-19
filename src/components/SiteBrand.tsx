import Image from "next/image";
import Link from "next/link";

const ELITE_BODY_LOGO = "/elite-body-logo.png";
const ISSA_SEAL = "/issa-certified-seal.png";

const sizeStyles = {
  header: {
    company: "h-12 w-12 sm:h-14 sm:w-14",
    seal: "h-12 w-12 sm:h-14 sm:w-14",
    companySizes: "56px",
    sealSizes: "56px",
    companyScale: "scale-[2.1]",
    priority: true,
  },
  footer: {
    company: "h-16 w-16 sm:h-20 sm:w-20",
    seal: "h-16 w-16 sm:h-20 sm:w-20",
    companySizes: "80px",
    sealSizes: "80px",
    companyScale: "scale-[2.1]",
    priority: false,
  },
  page: {
    company: "h-20 w-20 sm:h-28 sm:w-28",
    seal: "h-20 w-20 sm:h-28 sm:w-28",
    companySizes: "112px",
    sealSizes: "112px",
    companyScale: "scale-[2.15]",
    priority: false,
  },
  intro: {
    company: "h-20 w-20 sm:h-24 sm:w-24",
    seal: "h-20 w-20 sm:h-24 sm:w-24",
    companySizes: "96px",
    sealSizes: "96px",
    companyScale: "scale-[2.15]",
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
        className={`relative shrink-0 overflow-hidden rounded-full ${styles.company}`}
        title="Elite Body Fitness Pros"
      >
        <Image
          src={ELITE_BODY_LOGO}
          alt="Elite Body Fitness Pros"
          fill
          priority={styles.priority}
          sizes={styles.companySizes}
          className={`object-contain object-center ${styles.companyScale}`}
        />
      </div>
      <div
        className={`relative shrink-0 overflow-hidden rounded-full bg-transparent ${styles.seal}`}
        title="ISSA Nationally Certified Trainer"
      >
        <Image
          src={ISSA_SEAL}
          alt="ISSA Nationally Certified Trainer"
          fill
          priority={styles.priority}
          sizes={styles.sealSizes}
          className="object-contain object-center scale-[1.85]"
        />
      </div>
    </>
  );

  const layoutClass = `flex shrink-0 items-center gap-3 sm:gap-4 ${className}`;

  if (!linked) {
    return <div className={layoutClass}>{content}</div>;
  }

  return (
    <Link href="/" aria-label="Elite Body Fitness Pros home" className={layoutClass}>
      {content}
    </Link>
  );
}
