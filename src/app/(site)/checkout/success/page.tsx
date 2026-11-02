import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Payment Successful",
  description: "Thank you for your Elite Body Fitness Pros purchase.",
};

export default function CheckoutSuccessPage() {
  return (
    <>
      <PageHero
        eyebrow="Payment received"
        title="Thank You!"
        body="Your payment was submitted through Stripe. Our coaching team will reach out shortly with next steps for your program."
      />
      <section className="section-pad">
        <div className="container-site text-center">
          <Link href="/" className="glow-btn">
            Back to home
          </Link>
          <Link href="/pricing" className="ghost-btn ml-0 mt-4 sm:ml-4 sm:mt-0">
            View packages
          </Link>
        </div>
      </section>
    </>
  );
}
