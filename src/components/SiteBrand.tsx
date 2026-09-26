import Image from "next/image";
import Link from "next/link";

export const ELITE_BODY_BRAND_LOGO = "/elite-body-brand.jpg";
export const ISSA_CERTIFIED_BADGE = "/issa-certified-badge.jpg";

export const SITE_BRAND_NAME = "ELITE BODY FITNESS PROS";

export const SITE_BRAND_TAGLINE = "Unleash the strongest version of you";

export const SITE_BRAND_SERVICES =
  "Personal Training • Nutrition Coaching • ISSA Certified";

const sizeStyles = {
  header: {
    company: "h-[4.635rem] w-[7.21rem] sm:h-[6.18rem] sm:w-[9.27rem]",
    seal: "h-[4.12rem] w-[4.12rem] sm:h-[5.15rem] sm:w-[5.15rem]",
    companySizes: "148px",
    sealSizes: "82px",
    priority: true,
  },
  footer: {
    company: "h-[7.14rem] w-[11.22rem] sm:h-[9.18rem] sm:w-[14.28rem]",
    seal: "h-[6.12rem] w-[6.12rem] sm:h-[9.18rem] sm:w-[9.18rem]",
    companySizes: "228px",
    sealSizes: "131px",
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
    company:
      "h-[7.644rem] w-[13.104rem] sm:h-[9.152rem] sm:w-[16.016rem]",
    seal: "h-[6.552rem] w-[6.552rem] sm:h-[8.008rem] sm:w-[8.008rem]",
    companySizes: "245px",
    sealSizes: "122px",
    priority: true,
  },
} as const;

/** Navbar header logos (+3% vs original 4.5rem / 4rem baselines). */
export const headerBrandLogoBox = sizeStyles.header.company;
export const headerIssaLogoBox = sizeStyles.header.seal;
export const headerBrandLogoSizes = sizeStyles.header.companySizes;
export const headerIssaLogoSizes = sizeStyles.header.sealSizes;

type SiteBrandSize = keyof typeof sizeStyles;

const centerCopyClassBySize: Record<
  SiteBrandSize,
  { title: string; services: string }
> = {
  intro: {
    title:
      "max-w-[11rem] text-balance font-display text-[0.62rem] font-bold uppercase leading-tight tracking-[0.08em] text-white sm:max-w-none sm:text-sm md:text-base lg:text-xl",
    services:
      "mt-1 max-w-xl text-[7px] font-semibold uppercase leading-snug tracking-[0.12em] text-[var(--neon)] sm:text-[8px] md:text-[10px]",
  },
  footer: {
    title:
      "whitespace-nowrap font-display text-[0.7rem] font-bold leading-tight tracking-[0.06em] text-white sm:text-base md:text-lg lg:text-xl",
    services:
      "mt-1 max-w-xl text-[8px] font-semibold uppercase leading-snug tracking-[0.12em] text-[var(--neon)] sm:text-[9px] md:text-[10px]",
  },
  header: {
    title:
      "font-display text-[0.7rem] font-bold uppercase leading-tight tracking-[0.06em] text-white sm:text-base md:text-lg lg:text-xl",
    services:
      "mt-1 max-w-xl text-[8px] font-semibold uppercase leading-snug tracking-[0.12em] text-[var(--neon)] sm:text-[9px] md:text-[10px]",
  },
  page: {
    title:
      "font-display text-sm font-bold uppercase leading-tight tracking-[0.06em] text-white sm:text-base",
    services:
      "mt-1 text-[9px] font-semibold uppercase tracking-[0.12em] text-[var(--neon)] sm:text-[10px]",
  },
};

function SiteBrandCenterCopy({
  size,
  headline,
  sideLines = size === "footer" ? "always" : "sm",
}: {
  size: SiteBrandSize;
  headline: string;
  sideLines?: "always" | "sm";
}) {
  const copy = centerCopyClassBySize[size];
  const lineClass =
    sideLines === "always"
      ? "h-px min-w-3 flex-1 bg-white/35"
      : "hidden h-px min-w-4 flex-1 bg-white/35 sm:block";

  return (
    <div className="flex min-w-0 flex-1 flex-col items-center px-1 text-center sm:px-2">
      <div className="flex w-full max-w-2xl items-center gap-2 sm:gap-4">
        <span className={lineClass} aria-hidden />
        <p className={copy.title}>{headline}</p>
        <span className={lineClass} aria-hidden />
      </div>
      <p className={copy.services}>{SITE_BRAND_SERVICES}</p>
    </div>
  );
}

export function SiteBrand({
  size = "header",
  linked = true,
  className = "",
  layout = "row",
  tagline = SITE_BRAND_TAGLINE,
  centerHeadline,
}: {
  size?: keyof typeof sizeStyles;
  linked?: boolean;
  className?: string;
  layout?: "row" | "column" | "spread-tagline";
  tagline?: string;
  /** Main center title for spread layout (footer uses brand name like header). */
  centerHeadline?: string;
}) {
  const styles = sizeStyles[size];

  const companyLogo = (
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
  );

  const sealLogo = (
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
  );

  if (layout === "spread-tagline") {
    const spreadClass = `flex w-full items-center justify-between gap-3 sm:gap-6 ${className}`;
    const headline =
      centerHeadline ?? (size === "footer" ? SITE_BRAND_NAME : tagline);
    const taglineEl = (
      <SiteBrandCenterCopy size={size} headline={headline} />
    );

    if (!linked) {
      return (
        <div className={spreadClass}>
          {companyLogo}
          {taglineEl}
          {sealLogo}
        </div>
      );
    }

    return (
      <div className={spreadClass}>
        <Link href="/" aria-label="Elite Body Fitness Pros home" className="shrink-0">
          {companyLogo}
        </Link>
        {taglineEl}
        <Link href="/" aria-label="ISSA certification" className="shrink-0">
          {sealLogo}
        </Link>
      </div>
    );
  }

  const content = (
    <>
      {companyLogo}
      {sealLogo}
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
