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

/** Compact header logo for phone screens. */
export const headerBrandLogoBoxMobile =
  "max-sm:h-[3.65rem] max-sm:w-[5.65rem]";

type SiteBrandSize = keyof typeof sizeStyles;

const spreadMobileLogoClass: Record<
  SiteBrandSize,
  { company: string; seal: string }
> = {
  intro: {
    company: "max-sm:h-[4.35rem] max-sm:w-[7rem]",
    seal: "max-sm:h-[3.65rem] max-sm:w-[3.65rem]",
  },
  footer: {
    company: "max-sm:h-[3.25rem] max-sm:w-[5.25rem]",
    seal: "max-sm:h-[3rem] max-sm:w-[3rem]",
  },
  header: { company: "", seal: "" },
  page: { company: "", seal: "" },
};

const centerCopyClassBySize: Record<
  SiteBrandSize,
  { title: string; services: string }
> = {
  intro: {
    title:
      "max-w-[17rem] text-balance font-display text-[0.58rem] font-bold uppercase leading-snug tracking-[0.06em] text-white sm:max-w-none sm:text-sm sm:leading-tight sm:tracking-[0.08em] md:text-base lg:text-xl",
    services:
      "mt-1.5 max-w-[17rem] text-[6px] font-semibold uppercase leading-snug tracking-[0.1em] text-[var(--neon)] sm:mt-1 sm:max-w-xl sm:text-[8px] sm:tracking-[0.12em] md:text-[10px]",
  },
  footer: {
    title:
      "mx-auto w-full max-w-[18rem] text-balance font-display text-[0.56rem] font-bold leading-snug tracking-[0.05em] text-white sm:max-w-none sm:whitespace-nowrap sm:text-base sm:leading-tight sm:tracking-[0.06em] md:text-lg lg:text-xl",
    services:
      "mt-2 w-full max-w-[18rem] px-1 text-[6px] font-semibold uppercase leading-[1.45] tracking-[0.08em] text-[var(--neon)] sm:mt-1 sm:max-w-xl sm:px-0 sm:text-[8px] sm:leading-snug sm:tracking-[0.12em] md:text-[9px] lg:text-[10px]",
  },
  header: {
    title:
      "mx-auto max-w-[17rem] text-balance font-display text-[0.58rem] font-bold uppercase leading-snug tracking-[0.06em] text-white sm:max-w-none sm:text-base sm:leading-tight md:text-lg lg:text-xl",
    services:
      "mt-1.5 max-w-[17rem] text-[6px] font-semibold uppercase leading-snug tracking-[0.1em] text-[var(--neon)] sm:mt-1 sm:max-w-xl sm:text-[9px] sm:tracking-[0.12em] md:text-[10px]",
  },
  page: {
    title:
      "font-display text-sm font-bold uppercase leading-tight tracking-[0.06em] text-white sm:text-base",
    services:
      "mt-1 text-[9px] font-semibold uppercase tracking-[0.12em] text-[var(--neon)] sm:text-[10px]",
  },
};

export function SiteBrandCenterCopy({
  size,
  headline,
  sideLines = "sm",
}: {
  size: SiteBrandSize;
  headline: string;
  /** Side rules show from `sm` up unless set to `always`. */
  sideLines?: "always" | "sm";
}) {
  const copy = centerCopyClassBySize[size];
  const lineClass =
    sideLines === "always"
      ? "h-px min-w-3 flex-1 bg-white/35"
      : "hidden h-px min-w-4 flex-1 bg-white/35 sm:block";

  return (
    <div className="flex w-full flex-col items-center px-0.5 text-center sm:px-2">
      <div className="flex w-full max-w-2xl items-center justify-center gap-1.5 sm:gap-4">
        <span className={lineClass} aria-hidden />
        <p className={`text-center ${copy.title}`}>{headline}</p>
        <span className={lineClass} aria-hidden />
      </div>
      <p className={`mx-auto w-full text-center ${copy.services}`}>
        {SITE_BRAND_SERVICES}
      </p>
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
    const spreadClass = `grid w-full grid-cols-2 items-center gap-x-2 gap-y-2.5 sm:grid-cols-[minmax(0,1fr)_minmax(0,auto)_minmax(0,1fr)] sm:gap-4 ${className}`;
    const headline =
      centerHeadline ?? (size === "footer" ? SITE_BRAND_NAME : tagline);
    const taglineEl = (
      <SiteBrandCenterCopy size={size} headline={headline} sideLines="sm" />
    );
    const mobileLogos = spreadMobileLogoClass[size];

    const companySpread = (
      <div
        className={`relative shrink-0 ${styles.company} ${mobileLogos.company}`}
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

    const sealSpread = (
      <div
        className={`relative shrink-0 ${styles.seal} ${mobileLogos.seal}`}
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

    const centerCellClass =
      "col-span-2 row-start-2 w-full min-w-0 justify-self-center px-0.5 sm:col-span-1 sm:col-start-2 sm:row-start-1 sm:px-2";

    const footerMobileSpread = (
      <div className={`flex w-full flex-col gap-3 sm:hidden ${className}`}>
        <div className="flex w-full items-center justify-between gap-3 px-0.5">
          {companySpread}
          {sealSpread}
        </div>
        <div className="border-t border-white/10 pt-3">{taglineEl}</div>
      </div>
    );

    const footerDesktopSpread = linked ? (
      <div
        className={`hidden w-full grid-cols-[minmax(0,1fr)_minmax(0,auto)_minmax(0,1fr)] items-center gap-4 sm:grid ${className}`}
      >
        <div className="flex min-w-0 justify-start">
          <Link href="/" aria-label="Elite Body Fitness Pros home" className="shrink-0">
            {companySpread}
          </Link>
        </div>
        <div className="min-w-0 justify-self-center px-2">{taglineEl}</div>
        <div className="flex min-w-0 justify-end">
          <Link href="/" aria-label="ISSA certification" className="shrink-0">
            {sealSpread}
          </Link>
        </div>
      </div>
    ) : (
      <div
        className={`hidden w-full grid-cols-[minmax(0,1fr)_minmax(0,auto)_minmax(0,1fr)] items-center gap-4 sm:grid ${className}`}
      >
        <div className="flex min-w-0 justify-start">{companySpread}</div>
        <div className="min-w-0 justify-self-center px-2">{taglineEl}</div>
        <div className="flex min-w-0 justify-end">{sealSpread}</div>
      </div>
    );

    if (size === "footer") {
      return (
        <>
          {footerMobileSpread}
          {footerDesktopSpread}
        </>
      );
    }

    if (!linked) {
      return (
        <div className={spreadClass}>
          <div className="col-start-1 row-start-1 flex min-w-0 justify-start">
            {companySpread}
          </div>
          <div className="col-start-2 row-start-1 flex min-w-0 justify-end sm:col-start-3">
            {sealSpread}
          </div>
          <div className={centerCellClass}>{taglineEl}</div>
        </div>
      );
    }

    return (
      <div className={spreadClass}>
        <div className="col-start-1 row-start-1 flex min-w-0 justify-start">
          <Link href="/" aria-label="Elite Body Fitness Pros home" className="shrink-0">
            {companySpread}
          </Link>
        </div>
        <div className="col-start-2 row-start-1 flex min-w-0 justify-end sm:col-start-3">
          <Link href="/" aria-label="ISSA certification" className="shrink-0">
            {sealSpread}
          </Link>
        </div>
        <div className={centerCellClass}>{taglineEl}</div>
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
