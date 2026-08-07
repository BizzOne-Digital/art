"use client";

import Image from "next/image";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { FallingRocks } from "./FallingRocks";
import { Reveal } from "./Reveal";

export function PageHero({
  eyebrow,
  title,
  body,
  image,
  video,
  ctaText,
  ctaLink,
  externalText,
  externalLink,
  tall = false,
}: {
  eyebrow?: string;
  title: string;
  body?: string;
  image?: string;
  video?: string;
  ctaText?: string;
  ctaLink?: string;
  externalText?: string;
  externalLink?: string;
  tall?: boolean;
}) {
  const isExternal = !!ctaLink && /^https?:\/\//i.test(ctaLink);

  return (
    <section
      className={`relative overflow-hidden grain ${
        tall ? "min-h-[100svh]" : "min-h-[62svh] sm:min-h-[70svh]"
      } flex items-end`}
    >
      {video ? (
        <video
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster={image}
        >
          <source src={video} type="video/mp4" />
        </video>
      ) : (
        image && (
          <Image
            src={image}
            alt=""
            fill
            priority
            className="object-cover object-center scale-105"
            sizes="100vw"
          />
        )
      )}
      <div className="absolute inset-0 bg-gradient-to-br from-[rgba(5,6,5,0.55)] via-[rgba(8,20,14,0.45)] to-[rgba(5,6,5,0.2)]" />
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)] via-[rgba(5,6,5,0.7)] to-transparent" />
      <div className="pointer-events-none absolute -left-24 top-1/4 hidden h-72 w-72 rounded-full bg-[rgba(0,180,255,0.2)] blur-3xl sm:block" />
      <div className="pointer-events-none absolute -right-16 bottom-1/4 hidden h-80 w-80 rounded-full bg-[rgba(255,106,0,0.14)] blur-3xl sm:block" />
      <div className="hide-mobile-fx">
        <FallingRocks count={10} />
      </div>

      <div className="container-site relative z-10 w-full px-4 pb-[max(3rem,env(safe-area-inset-bottom))] pt-16 sm:px-5 sm:pb-16 sm:pt-24 md:px-6 md:pb-24">
        {eyebrow && (
          <Reveal direction="left">
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--neon)] sm:text-xs sm:tracking-[0.28em]">
              {eyebrow}
            </p>
          </Reveal>
        )}
        <Reveal direction="rock" delay={0.1}>
          <h1 className="heading-xl max-w-4xl text-white">{title}</h1>
        </Reveal>
        {body && (
          <Reveal direction="up" delay={0.2}>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[var(--muted)] sm:mt-5 sm:text-base md:text-lg">
              {body}
            </p>
          </Reveal>
        )}
        {(ctaText && ctaLink) || (externalText && externalLink) ? (
          <Reveal direction="up" delay={0.3}>
            <div className="btn-row mt-7 sm:mt-8">
              {ctaText && ctaLink && (
                isExternal ? (
                  <a
                    href={ctaLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glow-btn"
                  >
                    {ctaText} <ExternalLink size={14} />
                  </a>
                ) : (
                  <Link href={ctaLink} className="glow-btn">
                    {ctaText}
                  </Link>
                )
              )}
              {externalText && externalLink && (
                <a
                  href={externalLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ghost-btn"
                >
                  {externalText} <ExternalLink size={14} />
                </a>
              )}
              <Link href="/contact" className="ghost-btn">
                Contact
              </Link>
            </div>
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}
