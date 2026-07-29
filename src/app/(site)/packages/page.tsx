import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { Reveal, Stagger, StaggerItem } from "@/components/Reveal";
import { getPage, getServices } from "@/lib/data";

export const metadata: Metadata = {
  title: "Packages At Elite Body Fitness Pros",
  description:
    "What you get with Elite Body Fitness Pros is flexible coaching packages built for your goals, schedule, and performance level.",
};

export default async function PackagesPage() {
  const page = (await getPage("packages")) || (await getPage("services"));
  const hero = page?.sections.find((s) => s.key === "hero");
  const packages = await getServices();

  return (
    <>
      <PageHero
        eyebrow={hero?.subtitle || "What You Get With Elite Body Fitness Pros"}
        title={hero?.title || "Packages At Elite Body Fitness Pros"}
        body={hero?.body}
        image={hero?.image}
        ctaText="Contact Elite Body Fitness Pros"
        ctaLink="/contact"
      />

      <section className="section-pad">
        <div className="container-site">
          <Reveal direction="up" className="mb-8 sm:mb-10">
            <p className="max-w-3xl text-sm text-[var(--muted)] sm:text-base">
              At Elite Body Fitness Pros, every package is designed to meet you
              where you are and push you toward lasting strength and
              performance.
            </p>
          </Reveal>
          <Stagger className="grid items-stretch gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {packages.map((pkg, i) => (
              <StaggerItem
                key={pkg.id}
                className="h-full"
                direction={
                  (["up", "left", "right", "down", "rock", "scale"] as const)[
                    i % 6
                  ]
                }
              >
                <article className="flex h-full flex-col border border-[var(--line)] bg-[var(--bg-elevated)]">
                  <div className="relative aspect-[16/10] shrink-0 overflow-hidden">
                    <Image
                      src={pkg.image}
                      alt={`${pkg.title} at Elite Body Fitness Pros`}
                      fill
                      className="object-cover"
                      sizes="(max-width:768px) 100vw, 33vw"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-4 sm:p-6">
                    <h2 className="heading-md line-clamp-2 min-h-[2.6em]">
                      {pkg.title}
                    </h2>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-[var(--muted)]">
                      {pkg.description}
                    </p>
                  </div>
                </article>
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal direction="up" className="mt-10 text-center sm:mt-14">
            <Link href="/contact" className="glow-btn w-full sm:w-auto">
              Ask Elite Body Fitness Pros About Packages
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
