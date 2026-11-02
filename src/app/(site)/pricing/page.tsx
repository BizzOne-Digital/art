import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { Reveal, Stagger, StaggerItem } from "@/components/Reveal";
import { DiscountCallout } from "@/components/DiscountCallout";
import { getPage, getPricing } from "@/lib/data";
import { DISCOUNT_CODE, resolveCheckoutDiscountCode } from "@/lib/promotions";

export const metadata: Metadata = {
  title: "Pricing At Elite Body Fitness Pros",
  description:
    "See what you get with Elite Body Fitness Pros pricing options built for lasting strength and transformation.",
};

export default async function PricingPage({
  searchParams,
}: {
  searchParams: Promise<{ code?: string }>;
}) {
  const page = await getPage("pricing");
  const hero = page?.sections.find((s) => s.key === "hero");
  const plans = await getPricing();
  const { code } = await searchParams;
  const checkoutCode = resolveCheckoutDiscountCode(code);
  const codeQuery = `&code=${encodeURIComponent(checkoutCode)}`;

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
              intensity and support so you can invest with clarity. Purchase
              online with secure Stripe checkout — sales tax (8.75%) is calculated
              at checkout. Code{" "}
              <span className="font-bold text-[var(--gold)]">{DISCOUNT_CODE}</span>{" "}
              (10% off) is applied automatically on the checkout page.
            </p>
          </Reveal>
          <Stagger className="grid gap-6 lg:grid-cols-3">
            {plans.map((plan, i) => (
              <StaggerItem
                key={plan.id}
                direction={i === 1 ? "rock" : i === 0 ? "left" : "right"}
              >
                <article
                  id={/platinum/i.test(plan.name) ? "platinum" : undefined}
                  className={`relative flex h-full flex-col border p-5 scroll-mt-28 sm:p-7 ${
                    plan.highlighted
                      ? "border-[var(--neon)] bg-[rgba(0,180,255,0.08)] shadow-[0_0_40px_rgba(0,180,255,0.15)]"
                      : "border-[var(--line)] bg-[var(--bg-elevated)]"
                  }`}
                >
                  {plan.highlighted && (
                    <span
                      className="absolute -top-3 left-4 bg-[var(--grad-neon)] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[#041018] sm:left-6"
                      style={{
                        background:
                          "linear-gradient(135deg,#00b4ff,#ff6a00,#ffd200)",
                      }}
                    >
                      Most Popular
                    </span>
                  )}
                  <p className="text-xs uppercase tracking-[0.22em] text-[var(--neon)]">
                    {plan.name}
                  </p>
                  <div className="mt-4 flex flex-wrap items-end gap-x-2 gap-y-1">
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
                    {plan.features.map((f, j) => (
                      <li key={`${plan.id}-${j}`} className="flex gap-2">
                        <span className="text-[var(--neon)]">▸</span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={`/checkout?plan=${encodeURIComponent(plan.id)}${codeQuery}`}
                    className={`mt-8 w-full justify-center whitespace-nowrap text-center ${
                      plan.highlighted ? "glow-btn" : "ghost-btn"
                    }`}
                  >
                    Purchase This Package
                  </Link>
                </article>
              </StaggerItem>
            ))}
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
