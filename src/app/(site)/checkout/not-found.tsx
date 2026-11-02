import Link from "next/link";

export default function CheckoutNotFound() {
  return (
    <section className="section-pad">
      <div className="container-site text-center">
        <h1 className="font-display text-5xl tracking-[0.05em]">
          Package not found
        </h1>
        <p className="mt-4 text-sm text-[var(--muted)]">
          Choose a package from pricing to start checkout.
        </p>
        <Link href="/pricing" className="glow-btn mt-8 inline-flex">
          View pricing
        </Link>
      </div>
    </section>
  );
}
