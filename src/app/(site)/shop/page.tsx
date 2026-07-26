import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { Stagger, StaggerItem } from "@/components/Reveal";
import { getPage, getProducts } from "@/lib/data";

export const metadata = { title: "Shop" };

export default async function ShopPage() {
  const page = await getPage("shop");
  const hero = page?.sections.find((s) => s.key === "hero");
  const products = await getProducts();

  return (
    <>
      <PageHero
        eyebrow={hero?.subtitle}
        title={hero?.title || "Elite Gear & Essentials"}
        body={hero?.body}
        image={hero?.image}
      />

      <section className="section-pad">
        <div className="container-site">
          <Stagger className="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            {products.map((product, i) => (
              <StaggerItem
                key={product.id}
                direction={(["up", "down", "left", "right", "rock", "scale"] as const)[i % 6]}
              >
                <article className="flex h-full flex-col border border-[var(--line)] bg-[var(--bg-elevated)]">
                  <div className="relative aspect-square overflow-hidden">
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
                    <h2 className="heading-md mt-2">{product.name}</h2>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-[var(--muted)]">
                      {product.description}
                    </p>
                    <p className="mt-4 text-sm font-semibold uppercase tracking-[0.12em] text-white">
                      Inquire for Price
                    </p>
                    <Link
                      href={`/contact?product=${encodeURIComponent(product.name)}&productId=${product.id}`}
                      className="glow-btn mt-4 w-full text-center text-xs"
                    >
                      Inquire for Price
                    </Link>
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
