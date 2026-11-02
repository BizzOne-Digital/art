import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/PageHero";
import { CheckoutForm } from "@/components/CheckoutForm";
import { getPricing } from "@/lib/data";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Complete your Elite Body Fitness Pros package purchase securely.",
};

type CheckoutPageProps = {
  searchParams: Promise<{ plan?: string; code?: string }>;
};

export default async function CheckoutPage({ searchParams }: CheckoutPageProps) {
  const { plan: planId, code } = await searchParams;
  const plans = await getPricing();
  const plan = plans.find((item) => item.id === planId);

  if (!plan) {
    notFound();
  }

  return (
    <>
      <PageHero
        eyebrow="Secure checkout"
        title="Complete Your Purchase"
        body="Review your package, enter your details, and pay securely through Stripe. Sales tax (8.75%) is included in your total below."
      />
      <section className="section-pad">
        <div className="container-site">
          <CheckoutForm plan={plan} initialDiscountCode={code} />
          <p className="mt-8 text-center text-sm text-[var(--muted)]">
            Questions before you buy?{" "}
            <Link href="/contact" className="text-[var(--neon)] underline">
              Contact our team
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
