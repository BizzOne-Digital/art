import Image from "next/image";
import { PageHero } from "@/components/PageHero";
import { Reveal, Stagger, StaggerItem } from "@/components/Reveal";
import { getPage } from "@/lib/data";

export const metadata = { title: "Testimonials" };

const testimonials = [
  {
    name: "Marcus R.",
    role: "Athlete",
    quote:
      "The programming is elite. I gained strength without burning out — and the coaching detail is unmatched.",
    image:
      "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=600&q=80",
  },
  {
    name: "Sofia L.",
    role: "Entrepreneur",
    quote:
      "Sessions fit my chaotic schedule and still delivered visible results in weeks. Dark, focused, professional energy.",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&q=80",
  },
  {
    name: "Jordan K.",
    role: "Former Beginner",
    quote:
      "I walked in nervous. Now I train with confidence. Science-based plans, real accountability, zero fluff.",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&q=80",
  },
  {
    name: "Ava M.",
    role: "Hybrid Athlete",
    quote:
      "Premium coaching that actually transforms. The strongest version of me finally showed up.",
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
        eyebrow={hero?.subtitle}
        title={hero?.title || "Real Clients. Real Strength."}
        body={hero?.body}
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
                      alt={t.name}
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
