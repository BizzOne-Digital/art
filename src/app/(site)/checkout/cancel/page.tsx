import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Checkout Cancelled",
  description: "Your checkout was cancelled. You can try again anytime.",
};

export default function CheckoutCancelPage() {
  return (
    <>
      <PageHero
        eyebrow="Checkout cancelled"
        title="No Charge Made"
        body="You left checkout before paying. Your package is still available whenever you are ready."
      />
      <section className="section-pad">
        <div className="container-site text-center">
          <Link href="/pricing" className="glow-btn">
            Return to pricing
          </Link>
          <Link href="/contact" className="ghost-btn ml-0 mt-4 sm:ml-4 sm:mt-0">
            Contact us
          </Link>
        </div>
      </section>
    </>
  );
}
