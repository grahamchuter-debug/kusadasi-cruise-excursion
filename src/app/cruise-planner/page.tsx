import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/PageHero";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { KusadasiCruisePlanner } from "@/components/KusadasiCruisePlanner";
import { PlanningLinks } from "@/components/PlanningLinks";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema, webPageSchema } from "@/lib/schema";
import { siteImages } from "@/lib/images";

const path = "/cruise-planner";
const description =
  "Build a personalised Kuşadası cruise plan. Enter your arrival and departure times, party size, interests, mobility, budget and travel style — get tailored Ephesus excursions, guides and a realistic day plan.";

export const metadata = buildMetadata({
  title: "Kuşadası Cruise Planner",
  description,
  path,
  keywords: ["Kuşadası cruise planner", "Ephesus cruise day plan", "Kuşadası port day itinerary"],
});

const breadcrumbs = [
  { name: "Home", path: "/" },
  { name: "Kuşadası Cruise Planner", path },
];

export default function CruisePlannerPage() {
  return (
    <>
      <JsonLd data={[breadcrumbSchema(breadcrumbs), webPageSchema({ title: "Kuşadası Cruise Planner", description, path })]} />
      <PageHero
        title="Kuşadası Cruise Planner"
        subtitle="Tell us your ship's hours ashore, who is travelling and what you enjoy — get editorial itinerary recommendations from Editor's Choice Ephesus tours to Virgin Mary pilgrimages, Şirince village visits and independent port walks."
        imageSrc={siteImages.hero.src}
        imageAlt={siteImages.hero.alt}
        compact
      />
      <section className="section-padding">
        <div className="container-wide max-w-4xl">
          <Breadcrumbs items={breadcrumbs} />
          <KusadasiCruisePlanner />
          <div className="mt-12">
            <PlanningLinks />
          </div>
        </div>
      </section>
    </>
  );
}
