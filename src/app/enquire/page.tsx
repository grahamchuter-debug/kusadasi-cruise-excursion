import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/PageHero";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PlanningLinks } from "@/components/PlanningLinks";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema, webPageSchema } from "@/lib/schema";
import { SITE } from "@/lib/site";
import { EnquiryFormShell } from "@/components/EnquiryFormShell";

const path = "/enquire";

export const metadata = buildMetadata({
  title: "Enquire / Contact",
  description: "Get in touch about Kuşadası cruise planning — Ephesus shore excursions, House of Virgin Mary tours, port walks and port-day questions. We're happy to help you plan.",
  path,
});

const breadcrumbs = [
  { name: "Home", path: "/" },
  { name: "Enquire", path },
];

export default function EnquirePage() {
  return (
    <>
      <JsonLd data={[breadcrumbSchema(breadcrumbs), webPageSchema({ title: "Enquire / Contact", description: "Get in touch about Kuşadası cruise planning.", path })]} />
      <PageHero title="Enquire / Contact" subtitle="Questions about your Kuşadası port day, Ephesus excursions or cruise planner? Tell us a little and we'll point you in the right direction." compact />
      <section className="section-padding">
        <div className="container-wide max-w-xl">
          <Breadcrumbs items={breadcrumbs} />
          <EnquiryFormShell
            siteId="kusadasi"
            fallbackEmail={SITE.email}
            className="space-y-4"
            submitClassName="btn-primary"
            submitLabel="Send Enquiry"
            successTitle="Thank you — we've received your enquiry"
            successBody="We'll reply by email, usually within one working day."
          >
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input id="name" name="name" required maxLength={100} autoComplete="name" type="text" className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm" />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input id="email" name="email" required maxLength={254} autoComplete="email" type="email" className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm" />
            </div>
            <div>
              <label htmlFor="cruise" className="block text-sm font-medium text-gray-700 mb-1">Cruise date &amp; ship (optional)</label>
              <input id="cruise" name="cruise_date_and_ship" maxLength={200} type="text" className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm" placeholder="e.g. 15 June 2026, Celebrity Apex" />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
              <textarea id="message" name="message" required maxLength={5000} rows={5} className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm" placeholder="Tell us about your Kuşadası port day and how we can help..." />
            </div>
          </EnquiryFormShell>
          <p className="mt-6 text-sm text-gray-600">Or email us directly at {SITE.email}</p>
          <div className="mt-12">
            <PlanningLinks />
          </div>
        </div>
      </section>
    </>
  );
}
