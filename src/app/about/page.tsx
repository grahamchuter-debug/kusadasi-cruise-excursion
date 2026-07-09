import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/PageHero";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PlanningLinks } from "@/components/PlanningLinks";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema, webPageSchema } from "@/lib/schema";
import { SITE } from "@/lib/site";

const path = "/about";

export const metadata = buildMetadata({
  title: "About Kuşadası Cruise Excursions",
  description: "About Kuşadası Cruise Excursions — an independent Kuşadası cruise planning authority for port-day passengers visiting Kuşadası Cruise Port and ancient Ephesus.",
  path,
});

const breadcrumbs = [
  { name: "Home", path: "/" },
  { name: "About", path },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd data={[breadcrumbSchema(breadcrumbs), webPageSchema({ title: "About Kuşadası Cruise Excursions", description: "About Kuşadası Cruise Excursions.", path })]} />
      <PageHero title="About Kuşadası Cruise Excursions" subtitle="An independent planning authority built for cruise passengers calling at Kuşadası — one of the Mediterranean's most rewarding Ephesus gateway port days." compact />
      <section className="section-padding">
        <div className="container-wide max-w-3xl">
          <Breadcrumbs items={breadcrumbs} />
          <div className="prose-body">
            <p>
              {SITE.name} is an independent planning resource for cruise passengers calling at Kuşadası. Whether you have one day ashore at Kuşadası Cruise Port or want to understand Ephesus, the House of the Virgin Mary and Şirince village before you sail, our goal is to make your port day simple and confident.
            </p>
            <p>
              We focus on the practical decisions that shape a good Kuşadası cruise day: how far Ephesus is from the terminal, whether the Terrace Houses fit your hours, when a guided excursion beats travelling independently, and how to build a realistic return-to-ship buffer on busy summer roads.
            </p>
            <p>
              Our guides are written for real cruise timings, not generic Turkey tourism. We highlight Hellenistic and Roman Ephesus, biblical pilgrimage sites, Aegean village culture, Turkish food traditions and honest editorial comparisons when you must choose one anchor sight. Ship schedules and transfer times are indicative — always confirm all-aboard times with your cruise line.
            </p>
            <p>
              Have a question we haven&apos;t answered? <a href="/enquire">Get in touch</a> and we&apos;ll help you plan.
            </p>
          </div>
          <div className="mt-12">
            <PlanningLinks />
          </div>
        </div>
      </section>
    </>
  );
}
