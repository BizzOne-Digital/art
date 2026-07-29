import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { Stagger, StaggerItem } from "@/components/Reveal";
import { getPage, getProducts } from "@/lib/data";

export const metadata: Metadata = {
  title: "Shop Elite Body Fitness Pros Gear",
  description:
    "Shop Elite Body Fitness Pros apparel, accessories, and gear curated for performance.",
};

function ProductCta({
  product,
}: {
  product: {
    id: string;
    name: string;
    externalUrl?: string;
    ctaLabel?: string;
  };
}) {
  const label = product.ctaLabel || "Inquire for Price";
  const isComingSoon =
    !product.externalUrl && /coming soon/i.test(label);

  if (product.externalUrl) {
    return (
      <a
        href={product.externalUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="glow-btn w-full text-center text-xs"
      >
        {label}
      </a>
    );
  }

  if (isComingSoon) {
    return (
      <span className="inline-flex w-full cursor-default items-center justify-center border border-[var(--line)] px-4 py-3 text-center text-xs font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">
        {label}
      </span>
    );
  }

  return (
    <Link
      href={`/contact?product=${encodeURIComponent(product.name)}&productId=${product.id}`}
      className="glow-btn w-full text-center text-xs"
    >
      {label}
    </Link>
  );
}

export default async function ShopPage() {
  const page = await getPage("shop");
  const hero = page?.sections.find((s) => s.key === "hero");
  const products = await getProducts();

  return (
    <>
      <PageHero
        eyebrow={hero?.subtitle}
        title={hero?.title || "Shop Elite Body Fitness Pros Gear"}
        body={hero?.body}
        image={hero?.image}
      />

      <section className="section-pad">
        <div className="container-site">
          <Stagger className="grid items-stretch gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            {products.map((product, i) => (
              <StaggerItem
                key={product.id}
                className="h-full"
                direction={
                  (["up", "down", "left", "right", "rock", "scale"] as const)[
                    i % 6
                  ]
                }
              >
                <article className="flex h-full flex-col border border-[var(--line)] bg-[var(--bg-elevated)]">
                  <div className="relative aspect-square shrink-0 overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover"
                      sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-4 sm:p-5">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-[var(--neon)]">
                      {product.category}
                    </p>
                    <h2 className="heading-md mt-2 line-clamp-2 min-h-[2.6em]">
                      {product.name}
                    </h2>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-[var(--muted)]">
                      {product.description}
                    </p>
                    <div className="mt-auto pt-4">
                      <ProductCta product={product} />
                    </div>
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
