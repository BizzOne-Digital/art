import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { Reveal, Stagger, StaggerItem } from "@/components/Reveal";
import { DiscountCallout } from "@/components/DiscountCallout";
import { getPage, getPricing } from "@/lib/data";
import {
  applyPackageDiscount,
  DISCOUNT_CODE,
} from "@/lib/promotions";

export const metadata: Metadata = {
  title: "Pricing At Elite Body Fitness Pros",
  description:
    "See what you get with Elite Body Fitness Pros pricing options built for lasting strength and transformation.",
};

export default async function PricingPage() {
  const page = await getPage("pricing");
  const hero = page?.sections.find((s) => s.key === "hero");
  const plans = await getPricing();

  return (
    <>
      <PageHero
        eyebrow={hero?.subtitle}
        title={hero?.title || "Pricing At Elite Body Fitness Pros"}
        body={hero?.body}
        image={hero?.image}
      />

      <section className="section-pad">
        <div className="container-site">
          <Reveal direction="up" className="mb-8 sm:mb-10">
            <DiscountCallout />
          </Reveal>
          <Reveal direction="up" className="mb-8 sm:mb-10">
            <p className="max-w-3xl text-sm text-[var(--muted)] sm:text-base">
              At Elite Body Fitness Pros, pricing is built around coaching
              intensity and support so you can invest with clarity.
            </p>
          </Reveal>
          <Stagger className="grid gap-6 lg:grid-cols-3">
            {plans.map((plan, i) => {
              const discountedPrice = applyPackageDiscount(plan.price);

              return (
              <StaggerItem
                key={plan.id}
                direction={i === 1 ? "rock" : i === 0 ? "left" : "right"}
              >
                <article
                  id={
                    /platinum/i.test(plan.name) ? "platinum" : undefined
                  }
                  className={`relative flex h-full flex-col border p-5 scroll-mt-28 sm:p-7 ${
                    plan.highlighted
                      ? "border-[var(--neon)] bg-[rgba(0,180,255,0.08)] shadow-[0_0_40px_rgba(0,180,255,0.15)]"
                      : "border-[var(--line)] bg-[var(--bg-elevated)]"
                  }`}
                >
                  {plan.highlighted && (
                    <span className="absolute -top-3 left-4 bg-[var(--grad-neon)] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[#041018] sm:left-6"
                      style={{ background: "linear-gradient(135deg,#00b4ff,#ff6a00,#ffd200)" }}
                    >
                      Most Popular
                    </span>
                  )}
                  <p className="text-xs uppercase tracking-[0.22em] text-[var(--neon)]">
                    {plan.name}
                  </p>
                  <div className="mt-4 flex flex-wrap items-end gap-x-2 gap-y-1">
                    {discountedPrice ? (
                      <>
                        <span className="font-display text-5xl tracking-[0.04em] text-[var(--neon)] sm:text-6xl">
                          {discountedPrice}
                        </span>
                        <span className="pb-2 text-lg text-[var(--muted)] line-through sm:text-xl">
                          {plan.price}
                        </span>
                      </>
                    ) : (
                      <span className="font-display text-5xl tracking-[0.04em] sm:text-6xl">
                        {plan.price}
                      </span>
                    )}
                    <span className="pb-2 text-sm text-[var(--muted)]">
                      {plan.period}
                    </span>
                  </div>
                  {discountedPrice && (
                    <p className="mt-2 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--gold)]">
                      10% off with {DISCOUNT_CODE}
                    </p>
                  )}
                  <p className="mt-4 text-sm text-[var(--muted)]">
                    {plan.description}
                  </p>
                  <ul className="mt-6 flex-1 space-y-3 text-sm">
                    {plan.features.map((f, i) => (
                      <li key={`${plan.id}-${i}`} className="flex gap-2">
                        <span className="text-[var(--neon)]">▸</span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={`/contact?code=${DISCOUNT_CODE}&package=${encodeURIComponent(plan.name)}`}
                    className={`mt-8 w-full text-center ${
                      plan.highlighted ? "glow-btn" : "ghost-btn"
                    }`}
                  >
                    Inquire About {plan.name}
                  </Link>
                </article>
              </StaggerItem>
            );
            })}
          </Stagger>

          <Reveal
            direction="up"
            className="mt-12 text-center text-sm text-[var(--muted)]"
          >
            Need a custom Elite Body Fitness Pros package?{" "}
            <Link href="/contact" className="text-[var(--neon)] underline">
              Contact us
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
