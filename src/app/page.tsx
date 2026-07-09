import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { ExperienceSelector } from "@/components/ExperienceSelector";
import { VisitorTypeSelector } from "@/components/VisitorTypeSelector";
import { FAQSection } from "@/components/FAQSection";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema, faqSchema, travelGuideSchema } from "@/lib/schema";
import { coreSections, getHomepageFaqs } from "@/data/homepage";
import { getFeaturedExcursions } from "@/data/excursions";
import { siteImages, getExcursionImage } from "@/lib/images";
import { ResponsiveImage } from "@/components/ResponsiveImage";
import { PreloadImage } from "@/components/PreloadImage";
import { SpiritOfKusadasi } from "@/components/SpiritOfKusadasi";
import { HonestAdvice } from "@/components/HonestAdvice";
import { EditorsChoice } from "@/components/EditorsChoice";
import { CruisePassengerRatings } from "@/components/CruisePassengerRatings";
import { ArrivalTimeline } from "@/components/ArrivalTimeline";
import { ExcursionCategories } from "@/components/ExcursionCategories";
import { MediterraneanLinks } from "@/components/MediterraneanLinks";

export const metadata = buildMetadata({
  title: "Kuşadası Shore Excursions & Ephesus Cruise Planning Guide",
  description:
    "Your gateway to ancient Ephesus — carefully selected Kuşadası shore excursions, honest port advice, cruise ship schedules and planning guides for Turkish Aegean port days.",
  path: "/",
  keywords: [
    "Kuşadası shore excursions",
    "Ephesus cruise excursion",
    "Kuşadası cruise port",
    "Ephesus from cruise ship",
    "best Kuşadası shore excursions",
    "House of Virgin Mary tour",
    "Kuşadası cruise ship schedule",
  ],
});

const SITE_DESCRIPTION =
  "Your gateway to ancient Ephesus — carefully selected Kuşadası shore excursions, honest port advice and planning guides for Turkish Aegean cruise passengers.";

export default function HomePage() {
  const faqs = getHomepageFaqs();
  const featured = getFeaturedExcursions().slice(0, 6);

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([{ name: "Home", path: "/" }]),
          faqSchema(faqs),
          travelGuideSchema({
            title: "Kuşadası Shore Excursions & Ephesus Cruise Planning Guide",
            description: SITE_DESCRIPTION,
            path: "/",
          }),
        ]}
      />

      <section className="home-hero">
        <PreloadImage base={siteImages.hero.base} role="hero" />
        <ResponsiveImage
          image={siteImages.hero}
          role="hero"
          priority
          className="absolute inset-0 block h-full w-full"
          imgClassName="absolute inset-0 h-full w-full object-cover"
        />
        <div className="hero-overlay" aria-hidden="true" />
        <div className="container-wide relative z-10 px-4 sm:px-6 lg:px-8">
          <p className="section-eyebrow mb-2 text-coastal-100">Turkish Aegean cruise planning authority</p>
          <h1 className="home-hero-heading">
            Walk the Streets of One of the Greatest Ancient Cities Ever Built
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/90 sm:text-lg">
            Explore carefully selected shore excursions to Ephesus, the House of the Virgin Mary, traditional Turkish villages and the beautiful Aegean coastline, all designed specifically for cruise passengers.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/shore-excursions" className="btn-accent">Explore Shore Excursions</Link>
            <Link href="/cruise-planner" className="btn-secondary bg-white/10 text-white border-white/30 hover:bg-white/20">
              Plan My Perfect Port Day
            </Link>
          </div>
          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/80">
            <span className="inline-flex items-center gap-2"><span aria-hidden="true">✓</span> Return-to-ship confidence</span>
            <span className="inline-flex items-center gap-2"><span aria-hidden="true">✓</span> Carefully selected excursions</span>
            <span className="inline-flex items-center gap-2"><span aria-hidden="true">✓</span> Licensed local guides</span>
            <span className="inline-flex items-center gap-2"><span aria-hidden="true">✓</span> Honest recommendations</span>
            <span className="inline-flex items-center gap-2"><span aria-hidden="true">✓</span> Secure booking</span>
          </div>
        </div>
      </section>

      <ExperienceSelector />

      <SpiritOfKusadasi />

      <HonestAdvice />

      <EditorsChoice />

      <VisitorTypeSelector />

      <ExcursionCategories />

      <section className="section-padding bg-coastal-50">
        <div className="container-wide">
          <p className="section-eyebrow">Everything for your Kuşadası cruise</p>
          <h2 className="section-title mt-2">The definitive Kuşadası cruise planning hub</h2>
          <p className="section-subtitle">Not just an excursion catalogue — the full picture from gangway to Ephesus marble streets, village wine cellars and back to your ship.</p>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {coreSections.map((s) => (
              <Link key={s.slug} href={s.href} className="nav-card group flex h-full flex-col">
                <span className="font-display text-2xl font-bold text-coastal-200">{s.number}</span>
                <h3 className="mt-1 font-display text-lg font-bold text-gray-900 group-hover:text-coastal-800">{s.title}</h3>
                <p className="mt-2 flex-1 text-sm text-gray-600">{s.description}</p>
                <span className="mt-3 text-sm font-semibold text-maple-600">{s.cta} →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-wide">
          <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="section-title">Featured Shore Excursions</h2>
              <p className="section-subtitle">Cruise-timed tours to Ephesus and beyond — never oversold.</p>
            </div>
            <Link href="/shore-excursions" className="btn-secondary shrink-0">All Excursions</Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((e) => {
              const image = getExcursionImage(e.slug);
              const isEditorsChoice = e.slug === "ephesus-and-house-of-virgin-mary-tour";
              return (
                <Link key={e.slug} href={`/shore-excursions/${e.slug}`} className="card-editorial group overflow-hidden">
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <ResponsiveImage
                    image={image}
                    role="card"
                    imgClassName="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                    <div className="absolute inset-0 bg-gradient-to-t from-coastal-900/55 via-transparent to-transparent" aria-hidden="true" />
                    {isEditorsChoice ? (
                      <span className="absolute left-3 top-3 badge-editors-choice">⭐ Editor&apos;s Choice</span>
                    ) : (
                      <span className="absolute left-3 top-3 pill bg-white/90">{e.category}</span>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="font-display text-lg font-bold text-gray-900 group-hover:text-coastal-800">{e.title}</h3>
                    <p className="mt-2 text-sm text-gray-600">{e.tagline}</p>
                    <p className="mt-3 text-xs font-medium text-coastal-700">{e.duration} · {e.pace}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <CruisePassengerRatings />

      <ArrivalTimeline />

      <section className="section-padding bg-coastal-50">
        <div className="container-wide grid gap-6 lg:grid-cols-2">
          <div className="card-feature">
            <h3 className="font-display text-xl font-bold text-gray-900">Ephesus vs Pompeii?</h3>
            <p className="mt-3 text-gray-700">Both are extraordinary — but Ephesus often feels more complete and immersive. Our comparison helps you understand why Kuşadası passengers are walking through a city, not just ruins.</p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link href="/compare/ephesus-vs-pompeii" className="btn-secondary text-sm">Ephesus vs Pompeii</Link>
              <Link href="/compare/is-ephesus-worth-visiting" className="btn-secondary text-sm">Is Ephesus worth it?</Link>
            </div>
          </div>
          <div className="card-accent">
            <h3 className="font-display text-xl font-bold text-gray-900">Virgin Mary or Ephesus first?</h3>
            <p className="mt-3 text-gray-700">On a combined tour, sequencing matters — morning light at the Library of Celsus, afternoon reflection at the mountain chapel. Our guides help you choose the right combination.</p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link href="/compare/house-of-virgin-mary-or-ephesus" className="btn-secondary text-sm">Compare options</Link>
              <Link href="/guides/one-day-in-kusadasi" className="btn-secondary text-sm">One day in Kuşadası</Link>
              <Link href="/guides/independent-kusadasi-guide" className="btn-secondary text-sm">Independent guide</Link>
            </div>
          </div>
        </div>
      </section>

      <MediterraneanLinks />

      <section className="section-padding bg-coastal-900 text-white">
        <div className="container-wide max-w-3xl text-center">
          <h2 className="font-display text-3xl font-semibold sm:text-4xl">Build your personalised Kuşadası cruise plan</h2>
          <p className="mt-4 text-white/85">Enter your arrival and departure times, interests and travel style — get tailored excursions, guides and a realistic day plan with return-to-ship confidence.</p>
          <Link href="/cruise-planner" className="btn-accent mt-8 inline-flex">Start the Cruise Planner</Link>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-wide max-w-4xl">
          <FAQSection faqs={faqs} title="Kuşadası Cruise Planning FAQs" />
        </div>
      </section>
    </>
  );
}
