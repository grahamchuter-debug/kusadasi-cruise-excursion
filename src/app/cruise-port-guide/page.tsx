import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { PhotoHeroBand } from "@/components/PhotoHeroBand";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FAQSection } from "@/components/FAQSection";
import { PlanningLinks } from "@/components/PlanningLinks";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema, faqSchema, articleSchema } from "@/lib/schema";
import { siteImages } from "@/lib/images";
import { terminals, portGuideSections, portGuideFaqs } from "@/data/port-guide";

const path = "/cruise-port-guide";
const image = siteImages.port;
const description =
  "The complete Kuşadası cruise port guide — Kuşadası Cruise Port terminal, walking to town, Ephesus coach transfers, facilities and return-to-ship timing for cruise passengers.";

export const metadata = buildMetadata({
  title: "Kuşadası Cruise Port Guide",
  description,
  path,
  image: image.src,
  imageAlt: image.alt,
  keywords: ["Kuşadası cruise port", "Kuşadası cruise port guide", "Kuşadası cruise terminal", "Ephesus from Kuşadası cruise port"],
});

const breadcrumbs = [
  { name: "Home", path: "/" },
  { name: "Cruise Port Guide", path },
];

export default function CruisePortGuidePage() {
  return (
    <>
      <JsonLd data={[breadcrumbSchema(breadcrumbs), faqSchema(portGuideFaqs), articleSchema({ title: "Kuşadası Cruise Port Guide", description, path, image: image.src })]} />
      <PhotoHeroBand image={image} eyebrow="Terminal guidance" title="Kuşadası Cruise Port Guide" subtitle="Where ships dock, how to reach town and Ephesus, coach transfers and return-to-ship timing — everything for arrival day at Kuşadası Cruise Port." compact />
      <section className="section-padding">
        <div className="container-wide max-w-4xl">
          <Breadcrumbs items={breadcrumbs} />

          <h2 className="section-title text-2xl mb-4">Kuşadası cruise berths at a glance</h2>
          <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
            <table className="min-w-full divide-y divide-gray-200 text-sm">
              <thead className="bg-coastal-800 text-white">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold">Terminal</th>
                  <th className="px-4 py-3 text-left font-semibold">Quay</th>
                  <th className="px-4 py-3 text-left font-semibold">Used by</th>
                  <th className="px-4 py-3 text-left font-semibold">Town &amp; Ephesus access</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 bg-white">
                {terminals.map((t) => (
                  <tr key={t.name}>
                    <td className="px-4 py-3 font-medium text-gray-900">{t.name}</td>
                    <td className="px-4 py-3 text-gray-600">{t.quay}</td>
                    <td className="px-4 py-3 text-gray-600">{t.usedBy}</td>
                    <td className="px-4 py-3 text-gray-600">{t.cityAccess}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-2 text-xs text-gray-500">Check your cruise app the night before — summer traffic on the road to Ephesus can add 15–20 minutes to returns.</p>

          <div className="prose-body mt-4">
            {portGuideSections.map((s) => (
              <div key={s.heading}>
                <h2>{s.heading}</h2>
                {s.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
              </div>
            ))}
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            <Link href="/guides/ephesus-guide" className="nav-card"><h3 className="font-display text-base font-bold text-gray-900">Ephesus guide</h3><p className="mt-1 text-sm text-gray-600">Ancient marble streets 25–35 min from the terminal.</p></Link>
            <Link href="/guides/one-day-in-kusadasi" className="nav-card"><h3 className="font-display text-base font-bold text-gray-900">One day in Kuşadası</h3><p className="mt-1 text-sm text-gray-600">Sample itineraries for your port window.</p></Link>
            <Link href="/ship-schedules/kusadasi" className="nav-card"><h3 className="font-display text-base font-bold text-gray-900">Ship schedules</h3><p className="mt-1 text-sm text-gray-600">See who&apos;s in port before you book.</p></Link>
          </div>

          <div className="mt-12"><FAQSection faqs={portGuideFaqs} title="Kuşadası Cruise Port — FAQs" /></div>
          <div className="mt-12"><PlanningLinks /></div>
        </div>
      </section>
    </>
  );
}
