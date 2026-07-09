import Link from "next/link";
import { subjectImages } from "@/lib/images";

const CATEGORIES = [
  {
    slug: "history",
    title: "History",
    description: "Ephesus, Library of Celsus, Great Theatre and Roman marble streets — the ancient world's greatest port city.",
    href: "/guides/ephesus-guide",
    imageKey: "history",
    emoji: "🏛",
  },
  {
    slug: "biblical",
    title: "Biblical Sites",
    description: "House of the Virgin Mary, St Paul's Ephesus and early Christian heritage on Bülbüldağ.",
    href: "/guides/house-of-virgin-mary-guide",
    imageKey: "biblical",
    emoji: "✝",
  },
  {
    slug: "villages",
    title: "Villages",
    description: "Şirince wine village, traditional Ottoman houses and authentic Aegean countryside.",
    href: "/guides/sirince-village-guide",
    imageKey: "village",
    emoji: "🍷",
  },
  {
    slug: "nature",
    title: "Nature",
    description: "Pine forests above Selçuk, Aegean coastline and scenic drives through olive groves.",
    href: "/guides/photography-ephesus-guide",
    imageKey: "nature",
    emoji: "🌿",
  },
  {
    slug: "private-tours",
    title: "Private Tours",
    description: "Custom Ephesus itineraries with your own guide — pace and stops on your terms.",
    href: "/shore-excursions/private-ephesus-tour",
    imageKey: "private",
    emoji: "🚙",
  },
  {
    slug: "families",
    title: "Families",
    description: "Paced Ephesus tours with shade stops, shorter walks and child-friendly guiding.",
    href: "/shore-excursions/family-ephesus-tour",
    imageKey: "family",
    emoji: "👨‍👩‍👧",
  },
  {
    slug: "luxury",
    title: "Luxury",
    description: "Premium private vehicles, exclusive access and unhurried archaeological touring.",
    href: "/shore-excursions/luxury-private-ephesus-tour",
    imageKey: "luxury",
    emoji: "✨",
  },
  {
    slug: "half-day",
    title: "Half-Day Options",
    description: "Focused Ephesus highlights when your port window is limited but Ephesus is non-negotiable.",
    href: "/shore-excursions/half-day-ephesus-tour",
    imageKey: "ephesus",
    emoji: "⏱",
  },
];

export function ExcursionCategories() {
  return (
    <section className="section-padding bg-white">
      <div className="container-wide">
        <p className="section-eyebrow">Excursion categories</p>
        <h2 className="section-title mt-2">Find the right Kuşadası experience</h2>
        <p className="section-subtitle">
          Richer editorial cards to help you choose — each links to the most relevant excursions and planning guides.
        </p>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {CATEGORIES.map((cat) => {
            const image = subjectImages[cat.imageKey] ?? subjectImages["ephesus"];
            return (
              <Link
                key={cat.slug}
                href={cat.href}
                className="card-editorial group flex h-full flex-col overflow-hidden"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={image.src}
                    alt={cat.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-coastal-900/60 via-transparent to-transparent" aria-hidden="true" />
                  <span className="absolute left-3 top-3 text-xl" aria-hidden="true">{cat.emoji}</span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-display text-lg font-bold text-gray-900 group-hover:text-coastal-800">{cat.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-600">{cat.description}</p>
                  <span className="mt-4 text-sm font-semibold text-maple-600">Explore →</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
