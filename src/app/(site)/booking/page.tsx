import { Suspense } from "react";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { ContactForm } from "@/components/ContactForm";
import { getPage } from "@/lib/data";

export const metadata = { title: "Booking" };

export default async function BookingPage() {
  const page = await getPage("booking");
  const hero = page?.sections.find((s) => s.key === "hero");

  return (
    <>
      <PageHero
        eyebrow={hero?.subtitle}
        title={hero?.title || "Book Your Session"}
        body={hero?.body}
        image={hero?.image}
      />

      <section className="section-pad">
        <div className="container-site mx-auto max-w-3xl">
          <Reveal direction="up">
            <div className="border border-[var(--line)] bg-[var(--bg-elevated)] p-4 sm:p-6 md:p-10">
              <h2 className="heading-lg">Reserve Your Spot</h2>
              <p className="mt-3 text-sm text-[var(--muted)]">
                Tell us what you want to train for and your preferred date. We
                will confirm availability quickly.
              </p>
              <div className="mt-6 sm:mt-8">
                <Suspense fallback={<div>Loading...</div>}>
                  <ContactForm
                    defaultType="booking"
                    showService
                    showDate
                    submitLabel="Request Booking"
                  />
                </Suspense>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
