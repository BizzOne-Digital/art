import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { Reveal, Stagger, StaggerItem } from "@/components/Reveal";
import { getPage, getPricing } from "@/lib/data";

export const metadata = { title: "Pricing" };

export default async function PricingPage() {
  const page = await getPage("pricing");
  const hero = page?.sections.find((s) => s.key === "hero");
  const plans = await getPricing();

  return (
    <>
      <PageHero
        eyebrow={hero?.subtitle}
        title={hero?.title || "Invest In Your Strength"}
        body={hero?.body}
        image={hero?.image}
      />

      <section className="section-pad">
        <div className="container-site">
          <Stagger className="grid gap-6 lg:grid-cols-3">
            {plans.map((plan, i) => (
              <StaggerItem
                key={plan.id}
                direction={i === 1 ? "rock" : i === 0 ? "left" : "right"}
              >
                <article
                  className={`relative flex h-full flex-col border p-5 sm:p-7 ${
                    plan.highlighted
                      ? "border-[var(--neon)] bg-[rgba(184,255,46,0.06)] shadow-[0_0_40px_rgba(184,255,46,0.12)]"
                      : "border-[var(--line)] bg-[var(--bg-elevated)]"
                  }`}
                >
                  {plan.highlighted && (
                    <span className="absolute -top-3 left-4 bg-[var(--neon)] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-black sm:left-6">
                      Most Popular
                    </span>
                  )}
                  <p className="text-xs uppercase tracking-[0.22em] text-[var(--neon)]">
                    {plan.name}
                  </p>
                  <div className="mt-4 flex items-end gap-1">
                    <span className="font-display text-5xl tracking-[0.04em] sm:text-6xl">
                      {plan.price}
                    </span>
                    <span className="pb-2 text-sm text-[var(--muted)]">
                      {plan.period}
                    </span>
                  </div>
                  <p className="mt-4 text-sm text-[var(--muted)]">
                    {plan.description}
                  </p>
                  <ul className="mt-6 flex-1 space-y-3 text-sm">
                    {plan.features.map((f) => (
                      <li key={f} className="flex gap-2">
                        <span className="text-[var(--neon)]">▸</span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/booking"
                    className={`mt-8 w-full text-center ${
                      plan.highlighted ? "glow-btn" : "ghost-btn"
                    }`}
                  >
                    Choose {plan.name}
                  </Link>
                </article>
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal direction="up" className="mt-12 text-center text-sm text-[var(--muted)]">
            Need a custom package?{" "}
            <Link href="/contact" className="text-[var(--neon)] underline">
              Contact us
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
