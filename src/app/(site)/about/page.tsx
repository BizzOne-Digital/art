import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { FallingRocks } from "@/components/FallingRocks";
import { getPage } from "@/lib/data";

export const metadata: Metadata = {
  title: "About Elite Body Fitness Pros",
  description:
    "At Elite Body Fitness Pros, we help clients unleash their strongest selves through personalized, science-based training.",
};

export default async function AboutPage() {
  const page = await getPage("about");
  const hero = page?.sections.find((s) => s.key === "hero");
  const mission = page?.sections.find((s) => s.key === "mission");
  const approach = page?.sections.find((s) => s.key === "approach");

  return (
    <>
      <PageHero
        eyebrow={hero?.subtitle}
        title={hero?.title || "About Elite Body Fitness Pros"}
        body={hero?.body}
        image={hero?.image}
      />

      <section className="section-pad relative overflow-hidden">
        <div className="hide-mobile-fx">
          <FallingRocks count={7} />
        </div>
        <div className="container-site relative grid items-center gap-8 md:grid-cols-2 md:gap-12">
          <Reveal direction="left">
            <div className="relative aspect-[4/5] overflow-hidden">
              {mission?.image && (
                <Image
                  src={mission.image}
                  alt={`${mission.title} — Elite Body Fitness Pros`}
                  fill
                  className="object-cover"
                  sizes="(max-width:768px) 100vw, 50vw"
                />
              )}
            </div>
          </Reveal>
          <Reveal direction="right">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--neon)] sm:text-xs sm:tracking-[0.28em]">
              {mission?.subtitle || "Mission Statement"}
            </p>
            <h2 className="heading-lg mt-3">
              {mission?.title || "Our Mission"}
            </h2>
            {(
              mission?.body ||
              "We believe fitness should fit your life — not the other way around. That's why we built Elite Body Fitness Pros, a choice of fitness apps designed to meet you wherever you are, whether that's a packed gym, a quiet living room, or the middle of a busy travel schedule.\n\nWe're not here to sell you a one-size-fits-all program. We're here to give you tools that adapt — smart tracking, personalized plans, and real support — so consistency feels achievable, not exhausting. So you can “Unleash the strongest version of you”."
            )
              .split(/\n\n+/)
              .map((paragraph) => (
                <p
                  key={paragraph.slice(0, 40)}
                  className="mt-4 text-sm leading-relaxed text-[var(--muted)] sm:mt-5 sm:text-base"
                >
                  {paragraph}
                </p>
              ))}
          </Reveal>
        </div>
      </section>

      <section className="section-pad border-t border-[var(--line)] bg-[var(--bg-elevated)]">
        <div className="container-site grid items-center gap-8 md:grid-cols-2 md:gap-12">
          <Reveal direction="left" className="md:order-2">
            <div className="relative aspect-[4/5] overflow-hidden">
              {approach?.image && (
                <Image
                  src={approach.image}
                  alt={`${approach.title} — Elite Body Fitness Pros`}
                  fill
                  className="object-cover"
                  sizes="(max-width:768px) 100vw, 50vw"
                />
              )}
            </div>
          </Reveal>
          <Reveal direction="right" className="md:order-1">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--neon)] sm:text-xs sm:tracking-[0.28em]">
              What We Stand For
            </p>
            <h2 className="heading-lg mt-3">
              {approach?.title || "What We Stand For"}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-[var(--muted)] sm:mt-5 sm:text-base">
              {approach?.body ||
                "We believe real transformation happens with our expert training instructional apps. That's why we combine proven training methods with a culture of self belief, ensuring no one on their fitness journey ever feels like they're doing it alone. Elite Body Fitness Pros is a movement toward becoming your strongest and most self confident."}
            </p>
            <Link
              href="/contact"
              className="glow-btn mt-7 w-full sm:mt-8 sm:w-auto"
            >
              Contact Elite Body Fitness Pros
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
