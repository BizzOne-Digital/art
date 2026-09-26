import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/PageHero";
import { Stagger, StaggerItem } from "@/components/Reveal";
import { getPage } from "@/lib/data";
import { testimonials } from "@/lib/testimonials";

export const metadata: Metadata = {
  title: "Elite Body Fitness Pros App Results",
  description:
    "Real results from people using Elite Body Fitness Pros designed fitness apps — smarter tracking, personalized plans, and consistency that sticks.",
};

export default async function TestimonialsPage() {
  const page = await getPage("testimonials");
  const hero = page?.sections.find((s) => s.key === "hero");

  return (
    <>
      <PageHero
        eyebrow={hero?.subtitle || "App Results"}
        title={hero?.title || "Designed App Results"}
        body={
          hero?.body ||
          "Real stories from people using Elite Body Fitness Pros designed fitness apps — smarter tracking, personalized plans, and results that stick."
        }
        image={hero?.image}
      />

      <section className="section-pad">
        <div className="container-site">
          <Stagger className="grid gap-6 md:grid-cols-2">
            {testimonials.map((t, i) => (
              <StaggerItem
                key={t.name}
                direction={(["left", "right", "up", "rock"] as const)[i % 4]}
              >
                <article className="flex h-full flex-col gap-4 border border-[var(--line)] bg-[var(--bg-elevated)] p-4 sm:flex-row sm:gap-5 sm:p-6">
                  <div className="relative mx-auto h-20 w-20 shrink-0 overflow-hidden sm:mx-0">
                    <Image
                      src={t.image}
                      alt={`${t.name} — Elite Body Fitness Pros app results`}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>
                  <div className="min-w-0 text-center sm:text-left">
                    <p className="text-sm leading-relaxed text-[var(--muted)]">
                      &ldquo;{t.quote}&rdquo;
                    </p>
                    <p className="heading-md mt-4">{t.name}</p>
                    <p className="text-xs uppercase tracking-[0.18em] text-[var(--neon)]">
                      {t.role}
                    </p>
                  </div>
                </article>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>
    </>
  );
}
