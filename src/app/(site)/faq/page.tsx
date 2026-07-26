import { PageHero } from "@/components/PageHero";
import { FaqList } from "@/components/FaqList";
import { getFaqs, getPage } from "@/lib/data";

export const metadata = { title: "FAQ" };

export default async function FaqPage() {
  const page = await getPage("faq");
  const hero = page?.sections.find((s) => s.key === "hero");
  const faqs = await getFaqs();

  return (
    <>
      <PageHero
        eyebrow={hero?.subtitle}
        title={hero?.title || "Questions. Answered."}
        body={hero?.body}
        image={hero?.image}
      />

      <section className="section-pad">
        <div className="container-site mx-auto max-w-3xl">
          <FaqList faqs={faqs} />
        </div>
      </section>
    </>
  );
}
