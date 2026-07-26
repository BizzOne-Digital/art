import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Target,
  Flame,
  ShieldCheck,
  Timer,
} from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Reveal, Stagger, StaggerItem } from "@/components/Reveal";
import { FallingRocks } from "@/components/FallingRocks";
import {
  getPage,
  getProducts,
  getServices,
  getGallery,
} from "@/lib/data";

const pillars = [
  {
    icon: Target,
    title: "Goal-Mapped Plans",
    body: "Every program starts with your goal, schedule, and recovery capacity — then builds with precision.",
  },
  {
    icon: Flame,
    title: "High-Intensity Focus",
    body: "Sessions stay sharp and intentional so you train hard without wasting time or burning out.",
  },
  {
    icon: ShieldCheck,
    title: "Form-First Coaching",
    body: "Clean technique first. Strength and aesthetics follow when movement quality is locked in.",
  },
  {
    icon: Timer,
    title: "Schedule-Friendly",
    body: "Science-based training that fits real life — mornings, evenings, hybrid, or fully remote.",
  },
];

const steps = [
  {
    step: "01",
    title: "Consult",
    body: "Share your goals, history, and availability so we can map the right training path.",
  },
  {
    step: "02",
    title: "Program",
    body: "Get a personalized, progressive plan built around strength, conditioning, and recovery.",
  },
  {
    step: "03",
    title: "Train",
    body: "Coach-guided sessions with form checks, intensity control, and weekly accountability.",
  },
  {
    step: "04",
    title: "Transform",
    body: "Track measurable progress and keep leveling into the strongest version of you.",
  },
];

const homeQuotes = [
  {
    name: "Marcus R.",
    role: "Athlete",
    quote:
      "Elite programming with zero fluff. I got stronger, moved better, and stayed consistent.",
  },
  {
    name: "Sofia L.",
    role: "Entrepreneur",
    quote:
      "They built a plan around my schedule. Results showed up fast — and stuck.",
  },
  {
    name: "Jordan K.",
    role: "Client",
    quote:
      "From nervous beginner to confident lifter. The coaching detail is next level.",
  },
];

const marqueeItems = [
  "Science-Based Training",
  "Personalized Coaching",
  "Strength & Conditioning",
  "Mobility & Recovery",
  "Nutrition Guidance",
  "Hybrid & Online Plans",
  "Elite Results",
];

export default async function HomePage() {
  const page = await getPage("home");
  const hero = page?.sections.find((s) => s.key === "hero");
  const about = page?.sections.find((s) => s.key === "about-preview");
  const servicesPreview = page?.sections.find(
    (s) => s.key === "services-preview"
  );
  const method = page?.sections.find((s) => s.key === "method");
  const why = page?.sections.find((s) => s.key === "why-us");
  const cta = page?.sections.find((s) => s.key === "cta");
  const services = (await getServices()).slice(0, 3);
  const products = (await getProducts()).filter((p) => p.featured).slice(0, 3);
  const gallery = (await getGallery()).slice(0, 6);

  return (
    <>
      <PageHero
        tall
        eyebrow={hero?.subtitle}
        title={hero?.title || "Unleash The Strongest Version of You"}
        body={hero?.body}
        image={hero?.image}
        ctaText={hero?.ctaText || "Start Training"}
        ctaLink={hero?.ctaLink || "/booking"}
      />

      <div className="gradient-band overflow-hidden py-3 sm:py-4">
        <div className="marquee-track">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span
              key={`${item}-${i}`}
              className="font-display text-sm tracking-[0.1em] uppercase sm:text-xl sm:tracking-[0.12em]"
            >
              {item}
              <span className="ml-6 opacity-50 sm:ml-12">◆</span>
            </span>
          ))}
        </div>
      </div>

      <section className="section-pad relative overflow-hidden gradient-section">
        <div className="hide-mobile-fx">
          <FallingRocks count={5} />
        </div>
        <div className="container-site relative">
          <Reveal direction="up">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--neon)] sm:text-xs sm:tracking-[0.28em]">
              {why?.subtitle || "Why Elite Body"}
            </p>
            <h2 className="heading-lg mt-3 max-w-3xl">
              {why?.title || (
                <>
                  Strength With{" "}
                  <span className="text-gradient">Purpose</span>
                </>
              )}
            </h2>
            <p className="mt-4 max-w-2xl text-sm text-[var(--muted)] sm:text-base">
              {why?.body ||
                "Dark, focused, and results-driven coaching designed to transform how you train, recover, and perform."}
            </p>
          </Reveal>

          <Stagger className="mt-8 grid gap-4 sm:mt-12 sm:gap-5 md:grid-cols-2 xl:grid-cols-4">
            {pillars.map((item, i) => {
              const Icon = item.icon;
              return (
                <StaggerItem
                  key={item.title}
                  direction={(["up", "down", "left", "right"] as const)[i % 4]}
                >
                  <article className="gradient-panel h-full p-5 transition duration-300 hover:-translate-y-1 hover:shadow-[0_0_40px_rgba(184,255,46,0.12)] sm:p-6">
                    <div className="feature-orb mb-4 inline-flex h-10 w-10 items-center justify-center text-black sm:mb-5 sm:h-11 sm:w-11">
                      <Icon size={18} />
                    </div>
                    <h3 className="heading-md">{item.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
                      {item.body}
                    </p>
                  </article>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </section>

      <section className="section-pad relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_left,rgba(184,255,46,0.08),transparent_50%)]" />
        <div className="hide-mobile-fx">
          <FallingRocks count={6} />
        </div>
        <div className="container-site relative grid items-center gap-8 md:grid-cols-2 md:gap-12">
          <Reveal direction="left">
            <div className="relative aspect-[4/5] overflow-hidden">
              {about?.image && (
                <Image
                  src={about.image}
                  alt={about.title}
                  fill
                  className="object-cover"
                  sizes="(max-width:768px) 100vw, 50vw"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-[rgba(5,6,5,0.85)] via-transparent to-[rgba(61,255,181,0.12)]" />
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                <p className="heading-md text-gradient">
                  Science. Discipline. Results.
                </p>
              </div>
            </div>
          </Reveal>
          <Reveal direction="right" delay={0.15}>
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--neon)] sm:text-xs sm:tracking-[0.28em]">
              {about?.subtitle || "Who We Are"}
            </p>
            <h2 className="heading-lg mt-3 text-white">{about?.title}</h2>
            <p className="mt-4 text-sm leading-relaxed text-[var(--muted)] sm:mt-5 sm:text-base">
              {about?.body}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-[var(--muted)] sm:mt-4 sm:text-base">
              From foundational strength to elite performance, we coach with
              clarity — progressive overload, recovery science, and habits that
              stick beyond the gym floor.
            </p>
            <div className="btn-row mt-7 sm:mt-8">
              <Link href="/about" className="glow-btn">
                About Us <ArrowRight size={16} />
              </Link>
              <Link href="/services" className="ghost-btn">
                Explore Services
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-pad gradient-section-alt border-y border-[var(--line)]">
        <div className="container-site">
          <Reveal direction="up">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--neon)] sm:text-xs sm:tracking-[0.28em]">
              {method?.subtitle || "The Process"}
            </p>
            <h2 className="heading-lg mt-3 max-w-3xl">
              {method?.title || (
                <>
                  From First Session To{" "}
                  <span className="text-gradient">Full Transformation</span>
                </>
              )}
            </h2>
            <p className="mt-4 max-w-2xl text-sm text-[var(--muted)] sm:text-base">
              {method?.body ||
                "A clear path designed for momentum — consult, program, train, and transform with elite coaching at every step."}
            </p>
          </Reveal>

          <Stagger className="mt-8 grid gap-4 sm:mt-12 sm:gap-5 md:grid-cols-2 xl:grid-cols-4">
            {steps.map((item, i) => (
              <StaggerItem
                key={item.step}
                direction={i % 2 === 0 ? "up" : "rock"}
              >
                <article className="gradient-panel relative h-full overflow-hidden p-5 sm:p-6">
                  <span className="font-display text-5xl leading-none text-gradient opacity-40 sm:text-6xl">
                    {item.step}
                  </span>
                  <h3 className="heading-md mt-3 sm:mt-4">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
                    {item.body}
                  </p>
                </article>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="section-pad border-b border-[var(--line)] bg-[var(--bg-elevated)]">
        <div className="container-site">
          <Reveal direction="up">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--neon)] sm:text-xs sm:tracking-[0.28em]">
              {servicesPreview?.subtitle || "Our Services"}
            </p>
            <h2 className="heading-lg mt-3 max-w-3xl">
              {servicesPreview?.title}
            </h2>
            <p className="mt-4 max-w-2xl text-sm text-[var(--muted)] sm:text-base">
              {servicesPreview?.body}
            </p>
          </Reveal>

          <Stagger className="mt-8 grid gap-4 sm:mt-12 sm:gap-6 md:grid-cols-3">
            {services.map((svc, i) => (
              <StaggerItem
                key={svc.id}
                direction={i % 2 === 0 ? "up" : "down"}
              >
                <article className="group relative overflow-hidden border border-[var(--line)] bg-[var(--bg)]">
                  <div className="relative aspect-[16/11] overflow-hidden">
                    <Image
                      src={svc.image}
                      alt={svc.title}
                      fill
                      className="object-cover transition duration-700 group-hover:scale-105"
                      sizes="(max-width:768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[rgba(5,6,5,0.85)] via-transparent to-[rgba(184,255,46,0.08)]" />
                  </div>
                  <div className="p-5 sm:p-6">
                    <h3 className="heading-md">{svc.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
                      {svc.description}
                    </p>
                  </div>
                </article>
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal direction="up" delay={0.2}>
            <div className="mt-8 sm:mt-10">
              <Link href="/services" className="ghost-btn w-full sm:w-auto">
                View All Services
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-pad gradient-section border-y border-[var(--line)]">
        <div className="container-site">
          <Reveal direction="left">
            <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-end sm:justify-between">
              <div className="min-w-0">
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--neon)] sm:text-xs sm:tracking-[0.28em]">
                  Featured Products
                </p>
                <h2 className="heading-lg mt-3">
                  Train With <span className="text-gradient">Elite Gear</span>
                </h2>
                <p className="mt-3 max-w-xl text-sm text-[var(--muted)] sm:text-base">
                  Curated performance essentials. Every product is inquire-for-price —
                  ask us and we&apos;ll respond fast.
                </p>
              </div>
              <Link href="/shop" className="ghost-btn w-full sm:w-auto">
                View Shop
              </Link>
            </div>
          </Reveal>

          <Stagger className="mt-8 grid gap-4 sm:mt-12 sm:gap-6 md:grid-cols-3">
            {products.map((product, i) => (
              <StaggerItem key={product.id} direction={i === 1 ? "rock" : "up"}>
                <article className="gradient-panel overflow-hidden">
                  <div className="relative aspect-square overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover"
                      sizes="(max-width:768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[rgba(5,6,5,0.75)] to-transparent" />
                  </div>
                  <div className="p-4 sm:p-5">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-[var(--neon)]">
                      {product.category}
                    </p>
                    <h3 className="heading-md mt-2">{product.name}</h3>
                    <p className="mt-2 text-sm text-[var(--muted)]">
                      Inquire for Price
                    </p>
                    <Link
                      href={`/contact?product=${encodeURIComponent(product.name)}&productId=${product.id}`}
                      className="glow-btn mt-4 w-full !px-4 !py-2 text-xs sm:mt-5"
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

      <section className="section-pad">
        <div className="container-site">
          <Reveal direction="up">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--neon)] sm:text-xs sm:tracking-[0.28em]">
              Client Proof
            </p>
            <h2 className="heading-lg mt-3">
              Voices From The <span className="text-gradient">Floor</span>
            </h2>
          </Reveal>

          <Stagger className="mt-8 grid gap-4 sm:mt-12 sm:gap-5 md:grid-cols-3">
            {homeQuotes.map((t, i) => (
              <StaggerItem
                key={t.name}
                direction={(["left", "up", "right"] as const)[i]}
              >
                <blockquote className="gradient-panel flex h-full flex-col p-5 sm:p-6">
                  <p className="flex-1 text-sm leading-relaxed text-[var(--muted)]">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <footer className="mt-5 border-t border-[var(--line)] pt-4 sm:mt-6">
                    <p className="heading-md">{t.name}</p>
                    <p className="text-xs uppercase tracking-[0.18em] text-[var(--neon)]">
                      {t.role}
                    </p>
                  </footer>
                </blockquote>
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal direction="up" className="mt-8 sm:mt-10">
            <Link href="/testimonials" className="ghost-btn w-full sm:w-auto">
              More Testimonials
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="section-pad border-t border-[var(--line)] gradient-section-alt">
        <div className="container-site">
          <Reveal direction="right">
            <div className="mb-8 flex flex-col gap-4 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
              <div className="min-w-0">
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--neon)] sm:text-xs sm:tracking-[0.28em]">
                  Gallery
                </p>
                <h2 className="heading-lg mt-3">
                  Inside The <span className="text-gradient">Grind</span>
                </h2>
              </div>
              <Link href="/gallery" className="ghost-btn w-full sm:w-auto">
                Full Gallery
              </Link>
            </div>
          </Reveal>
          <Stagger className="grid grid-cols-2 gap-2 sm:gap-3 md:grid-cols-3 md:gap-4">
            {gallery.map((item, i) => (
              <StaggerItem
                key={item.id}
                direction={
                  (["up", "down", "left", "right", "rock", "scale"] as const)[
                    i % 6
                  ]
                }
              >
                <div className="group relative aspect-[3/4] overflow-hidden border border-[var(--line)]">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition duration-700 group-hover:scale-105"
                    sizes="(max-width:768px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-[rgba(61,255,181,0.08)] opacity-80 transition group-hover:opacity-100" />
                  <div className="absolute inset-x-0 bottom-0 p-2.5 sm:p-4">
                    <p className="text-[9px] uppercase tracking-[0.16em] text-[var(--neon)] sm:text-[10px] sm:tracking-[0.18em]">
                      {item.category}
                    </p>
                    <p className="font-display text-base tracking-[0.05em] sm:text-xl">
                      {item.title}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="relative overflow-hidden">
        {cta?.image && (
          <Image
            src={cta.image}
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-br from-[rgba(5,6,5,0.88)] via-[rgba(8,22,16,0.82)] to-[rgba(5,6,5,0.9)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(184,255,46,0.16),transparent_55%)]" />
        <div className="hide-mobile-fx">
          <FallingRocks count={8} />
        </div>
        <div className="container-site relative section-pad text-center">
          <Reveal direction="rock">
            <h2 className="heading-xl">
              {cta?.title || (
                <>
                  Ready To{" "}
                  <span className="text-gradient">Level Up?</span>
                </>
              )}
            </h2>
          </Reveal>
          <Reveal direction="up" delay={0.15}>
            <p className="mx-auto mt-4 max-w-xl px-1 text-sm text-[var(--muted)] sm:text-base">
              {cta?.body}
            </p>
            <div className="btn-row mx-auto mt-7 max-w-md justify-center sm:mt-8">
              <Link href={cta?.ctaLink || "/booking"} className="glow-btn">
                {cta?.ctaText || "Book Now"}
              </Link>
              <Link href="/contact" className="ghost-btn">
                Ask a Question
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
