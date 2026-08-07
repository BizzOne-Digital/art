import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/PageHero";
import { Reveal, Stagger, StaggerItem } from "@/components/Reveal";
import { getGallery, getPage } from "@/lib/data";

export const metadata: Metadata = {
  title: "Gallery | Elite Body Fitness Pros",
  description:
    "Explore the energy, focus, and transformation happening at Elite Body Fitness Pros.",
};

export default async function GalleryPage() {
  const page = await getPage("gallery");
  const hero = page?.sections.find((s) => s.key === "hero");
  const gallery = await getGallery();

  return (
    <>
      <PageHero
        eyebrow={hero?.subtitle}
        title={hero?.title || "Inside Elite Body Fitness Pros"}
        body={hero?.body}
        image={hero?.image}
      />

      <section className="section-pad">
        <div className="container-site">
          <Stagger className="columns-1 gap-4 sm:columns-2 lg:columns-3">
            {gallery.map((item, i) => (
              <StaggerItem
                key={item.id}
                className="mb-4 break-inside-avoid"
                direction={(["up", "down", "left", "right", "rock"] as const)[i % 5]}
              >
                <figure className="group relative overflow-hidden border border-[var(--line)]">
                  <div className="relative aspect-[3/4]">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover transition duration-700 group-hover:scale-105"
                      sizes="(max-width:768px) 100vw, 33vw"
                    />
                  </div>
                  <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-[var(--neon)]">
                      {item.category}
                    </p>
                    <p className="font-display text-2xl tracking-[0.05em]">
                      {item.title}
                    </p>
                  </figcaption>
                </figure>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>
    </>
  );
}
