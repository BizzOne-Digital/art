import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { FallingRocks } from "@/components/FallingRocks";
import { getPage } from "@/lib/data";

export const metadata = { title: "About Us" };

export default async function AboutPage() {
  const page = await getPage("about");
  const hero = page?.sections.find((s) => s.key === "hero");
  const mission = page?.sections.find((s) => s.key === "mission");
  const approach = page?.sections.find((s) => s.key === "approach");

  return (
    <>
      <PageHero
        eyebrow={hero?.subtitle}
        title={hero?.title || "Science. Discipline. Results."}
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
                  alt={mission.title}
                  fill
                  className="object-cover"
                  sizes="(max-width:768px) 100vw, 50vw"
                />
              )}
            </div>
          </Reveal>
          <Reveal direction="right">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--neon)] sm:text-xs sm:tracking-[0.28em]">
              Mission
            </p>
            <h2 className="heading-lg mt-3">{mission?.title}</h2>
            <p className="mt-4 text-sm leading-relaxed text-[var(--muted)] sm:mt-5 sm:text-base">
              {mission?.body}
            </p>
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
                  alt={approach.title}
                  fill
                  className="object-cover"
                  sizes="(max-width:768px) 100vw, 50vw"
                />
              )}
            </div>
          </Reveal>
          <Reveal direction="right" className="md:order-1">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--neon)] sm:text-xs sm:tracking-[0.28em]">
              Method
            </p>
            <h2 className="heading-lg mt-3">{approach?.title}</h2>
            <p className="mt-4 text-sm leading-relaxed text-[var(--muted)] sm:mt-5 sm:text-base">
              {approach?.body}
            </p>
            <Link href="/booking" className="glow-btn mt-7 w-full sm:mt-8 sm:w-auto">
              Train With Us
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
