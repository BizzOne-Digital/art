import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { Reveal, Stagger, StaggerItem } from "@/components/Reveal";
import { getPage, getServices } from "@/lib/data";

export const metadata = { title: "Services" };

export default async function ServicesPage() {
  const page = await getPage("services");
  const hero = page?.sections.find((s) => s.key === "hero");
  const services = await getServices();

  return (
    <>
      <PageHero
        eyebrow={hero?.subtitle}
        title={hero?.title || "Elite Training Services"}
        body={hero?.body}
        image={hero?.image}
        ctaText="Book a Session"
        ctaLink="/booking"
      />

      <section className="section-pad">
        <div className="container-site">
          <Stagger className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {services.map((svc, i) => (
              <StaggerItem
                key={svc.id}
                direction={(["up", "left", "right", "down", "rock", "scale"] as const)[i % 6]}
              >
                <article className="h-full border border-[var(--line)] bg-[var(--bg-elevated)]">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={svc.image}
                      alt={svc.title}
                      fill
                      className="object-cover"
                      sizes="(max-width:768px) 100vw, 33vw"
                    />
                  </div>
                  <div className="p-4 sm:p-6">
                    <h2 className="heading-md">{svc.title}</h2>
                    <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
                      {svc.description}
                    </p>
                  </div>
                </article>
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal direction="up" className="mt-10 text-center sm:mt-14">
            <Link href="/booking" className="glow-btn w-full sm:w-auto">
              Book Your Training
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
