import { Suspense } from "react";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { ContactForm } from "@/components/ContactForm";
import { getPage, getSiteData } from "@/lib/data";
import { Mail, Phone } from "lucide-react";

export const metadata = { title: "Contact" };

export default async function ContactPage() {
  const page = await getPage("contact");
  const hero = page?.sections.find((s) => s.key === "hero");
  const { settings } = await getSiteData();

  return (
    <>
      <PageHero
        eyebrow={hero?.subtitle}
        title={hero?.title || "Let's Build Your Strongest Self"}
        body={hero?.body}
        image={hero?.image}
      />

      <section className="section-pad">
        <div className="container-site grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12">
          <Reveal direction="left">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--neon)] sm:text-xs sm:tracking-[0.28em]">
              Reach Us
            </p>
            <h2 className="heading-lg mt-3">We Reply Fast</h2>
            <p className="mt-4 text-sm text-[var(--muted)] sm:text-base">
              Product inquiries, booking questions, or coaching details — send
              a message and we&apos;ll follow up.
            </p>

            <div className="mt-8 space-y-4">
              <a
                href={`mailto:${settings.email}`}
                className="flex items-center gap-3 break-all border border-[var(--line)] bg-[var(--bg-elevated)] px-4 py-4 text-sm hover:border-[var(--neon)]"
              >
                <Mail className="shrink-0 text-[var(--neon)]" size={18} />
                {settings.email}
              </a>
              <a
                href={`tel:+${settings.phone}`}
                className="flex items-center gap-3 border border-[var(--line)] bg-[var(--bg-elevated)] px-4 py-4 text-sm hover:border-[var(--neon)]"
              >
                <Phone className="shrink-0 text-[var(--neon)]" size={18} />
                +1 (916) 223-3228
              </a>
            </div>
          </Reveal>

          <Reveal direction="right">
            <div className="border border-[var(--line)] bg-[var(--bg-elevated)] p-4 sm:p-6 md:p-8">
              <Suspense fallback={<div className="text-[var(--muted)]">Loading form...</div>}>
                <ContactForm />
              </Suspense>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
