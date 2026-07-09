import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/PageHero";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema, webPageSchema } from "@/lib/schema";
import { comparisons, getComparisonDisplayTitle } from "@/data/comparisons";
import { getComparisonImage } from "@/lib/images";

const path = "/compare";
const description =
  "Honest comparisons for Kuşadası cruise passengers — is Ephesus worth visiting, Ephesus vs Pompeii, Virgin Mary or Ephesus first, DIY vs guided tours, private vs group tours, and the best excursions for first-time visitors.";

export const metadata = buildMetadata({
  title: "Compare Kuşadası Cruise Options",
  description,
  path,
});

const breadcrumbs = [
  { name: "Home", path: "/" },
  { name: "Compare", path },
];

export default function CompareHubPage() {
  const image = getComparisonImage("is-ephesus-worth-visiting");
  return (
    <>
      <JsonLd data={[breadcrumbSchema(breadcrumbs), webPageSchema({ title: "Compare Kuşadası Cruise Options", description, path })]} />
      <PageHero title="Compare Kuşadası Cruise Options" subtitle="Editorial comparisons to help you choose — Ephesus, Virgin Mary, Şirince village, tour style and the best excursions for your traveller type." imageSrc={image.src} imageAlt={image.alt} compact />
      <section className="section-padding">
        <div className="container-wide">
          <Breadcrumbs items={breadcrumbs} />
          <div className="grid gap-4 sm:grid-cols-2">
            {comparisons.map((c) => (
              <Link key={c.slug} href={`/compare/${c.slug}`} className="nav-card group">
                <h2 className="font-display text-lg font-bold text-gray-900 group-hover:text-coastal-800">{getComparisonDisplayTitle(c)}</h2>
                <p className="mt-2 text-sm text-gray-600">{c.summary}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
