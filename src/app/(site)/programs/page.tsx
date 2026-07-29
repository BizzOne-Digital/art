import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { Reveal, Stagger, StaggerItem } from "@/components/Reveal";
import { getPage, getPrograms } from "@/lib/data";

export const metadata: Metadata = {
  title: "Training Programs At Elite Body Fitness Pros",
  description:
    "At Elite Body Fitness Pros, our training programs build strength, improve performance, and create lasting habits.",
};

export default async function ProgramsPage() {
  const page = await getPage("programs");
  const hero = page?.sections.find((s) => s.key === "hero");
  const programs = await getPrograms();

  return (
    <>
      <PageHero
        eyebrow={hero?.subtitle || "Programs At Elite Body Fitness Pros"}
        title={hero?.title || "Training Programs At Elite Body Fitness Pros"}
        body={hero?.body}
        image={hero?.image}
        ctaText="Contact Elite Body Fitness Pros"
        ctaLink="/contact"
      />

      <section className="section-pad">
        <div className="container-site">
          <Reveal direction="up" className="mb-8 sm:mb-10">
            <p className="max-w-3xl text-sm text-[var(--muted)] sm:text-base">
              What you get with Elite Body Fitness Pros training programs is
              structure, coaching, and progress tracking from day one.
            </p>
          </Reveal>
          <Stagger className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
            {programs.map((program, i) => (
              <StaggerItem
                key={program.id}
                direction={(["up", "left", "right"] as const)[i % 3]}
              >
                <article className="gradient-panel h-full overflow-hidden">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={program.image}
                      alt={`${program.title} — Elite Body Fitness Pros`}
                      fill
                      className="object-cover"
                      sizes="(max-width:768px) 100vw, 33vw"
                    />
                  </div>
                  <div className="p-5 sm:p-6">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-[var(--neon)]">
                      {program.level}
                    </p>
                    <h2 className="heading-md mt-2">{program.title}</h2>
                    <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
                      {program.description}
                    </p>
                  </div>
                </article>
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal direction="up" className="mt-10 text-center sm:mt-14">
            <Link href="/contact" className="glow-btn w-full sm:w-auto">
              Ask Elite Body Fitness Pros About Programs
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
