import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/PageHero";
import { FAQSection } from "@/components/FAQSection";
import { PlanningLinks } from "@/components/PlanningLinks";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema, faqSchema, webPageSchema } from "@/lib/schema";
import { getAllFaqs } from "@/data/faqs";

const path = "/faq";

export const metadata = buildMetadata({
  title: "Kuşadası Cruise FAQ",
  description: "Frequently asked questions about Kuşadası cruise planning — Kuşadası Cruise Port, Ephesus shore excursions, Virgin Mary tours, port walks and getting back to your ship.",
  path,
});

const breadcrumbs = [
  { name: "Home", path: "/" },
  { name: "FAQ", path },
];

export default function FAQPage() {
  const faqs = getAllFaqs();
  return (
    <>
      <JsonLd data={[breadcrumbSchema(breadcrumbs), faqSchema(faqs), webPageSchema({ title: "Kuşadası Cruise FAQ", description: "Frequently asked questions about Kuşadası cruise planning.", path })]} />
      <PageHero title="Kuşadası Cruise Planning FAQ" subtitle="Answers to the most common questions from Kuşadası cruise passengers." compact />
      <section className="section-padding">
        <div className="container-wide max-w-4xl">
          <FAQSection faqs={faqs} />
          <div className="mt-12">
            <PlanningLinks />
          </div>
        </div>
      </section>
    </>
  );
}
