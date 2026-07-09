import Link from "next/link";
import { getExcursionImage } from "@/lib/images";

export function EditorsChoice() {
  const image = getExcursionImage("ephesus-and-house-of-virgin-mary-tour");

  return (
    <section className="section-padding section-signature-hero">
      <div className="container-wide relative z-10">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <span className="badge-editors-choice">
              <span aria-hidden="true">⭐</span> Editor&apos;s Choice
            </span>
            <h2 className="mt-4 font-display text-3xl font-semibold leading-tight sm:text-4xl">
              Ephesus &amp; House of the Virgin Mary
            </h2>
            <p className="mt-4 text-lg text-white/85 leading-relaxed">
              Not because it&apos;s the most expensive option — because it combines everything that makes a Kuşadası port day extraordinary.
            </p>
            <ul className="mt-6 space-y-3 text-white/80">
              <li className="flex items-center gap-3"><span className="text-autumn-400">✓</span> Roman history at one of the Mediterranean&apos;s greatest ancient cities</li>
              <li className="flex items-center gap-3"><span className="text-autumn-400">✓</span> Christian heritage at the sacred chapel on Bülbüldağ</li>
              <li className="flex items-center gap-3"><span className="text-autumn-400">✓</span> UNESCO significance with expert archaeological guiding</li>
              <li className="flex items-center gap-3"><span className="text-autumn-400">✓</span> Short 20 km transfer from Kuşadası — excellent value</li>
              <li className="flex items-center gap-3"><span className="text-autumn-400">✓</span> Comfortable pace with return-to-ship confidence</li>
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/shore-excursions/ephesus-and-house-of-virgin-mary-tour" className="btn-accent">
                View this excursion
              </Link>
              <Link href="/compare/best-excursion-first-time-visitors" className="btn-secondary border-white/30 bg-white/10 text-white hover:bg-white/20">
                Why it wins
              </Link>
            </div>
          </div>
          <div className="card-signature overflow-hidden p-0">
            <div className="relative aspect-[16/10]">
              <img
                src={image.src}
                alt={image.alt}
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="p-6">
              <p className="text-sm text-gray-600 leading-relaxed">
                The single best introduction to ancient Ephesus and its spiritual heritage — Roman marble streets and a mountain chapel in one carefully timed day. Ideal for first-time visitors with 7+ usable hours ashore.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
