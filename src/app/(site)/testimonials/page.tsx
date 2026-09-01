import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/PageHero";
import { Stagger, StaggerItem } from "@/components/Reveal";
import { getPage } from "@/lib/data";

export const metadata: Metadata = {
  title: "Elite Body Fitness Pros App Results",
  description:
    "Real results from people using Elite Body Fitness Pros designed fitness apps — smarter tracking, personalized plans, and consistency that sticks.",
};

const testimonials = [
  {
    name: "Marcus R.",
    role: "App User · Beginner",
    quote:
      "From guessing workouts to following a designed program in the app — Elite Body Fitness Pros made progress feel simple and measurable.",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&q=80",
  },
  {
    name: "Sofia L.",
    role: "App User · Busy Professional",
    quote:
      "I use the Elite Body Fitness Pros app on the road and at home. Personalized plans adapt to my schedule and the results showed up fast.",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&q=80",
  },
  {
    name: "Jordan K.",
    role: "App User · Athlete",
    quote:
      "The Elite Body Fitness Pros app kept my training locked in — smart tracking and clear progress so I finally stayed consistent.",
    image:
      "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=600&q=80",
  },
  {
    name: "Ava M.",
    role: "App User · Hybrid Training",
    quote:
      "What you get with the Elite Body Fitness Pros app is real support built into the plan. My strongest version showed up in the results.",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&q=80",
  },
];

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
