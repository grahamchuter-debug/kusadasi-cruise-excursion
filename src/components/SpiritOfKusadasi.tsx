import Link from "next/link";
import { ResponsiveImage } from "@/components/ResponsiveImage";
import { siteImages } from "@/lib/images";

export function SpiritOfKusadasi() {
  return (
    <section className="section-padding bg-coastal-900 text-white">
      <div className="container-wide">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="section-eyebrow text-coastal-200">The spirit of Kuşadası</p>
            <h2 className="mt-2 font-display text-3xl font-semibold leading-tight sm:text-4xl">
              Few cruise ports offer the chance to walk through a city that shaped the ancient world
            </h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-white/85">
              <p>
                From the magnificent streets of Ephesus to peaceful mountain shrines and traditional Turkish villages, Kuşadası offers one of the Mediterranean&apos;s richest cultural experiences — a day that feels thousands of years old.
              </p>
              <p>
                Whether you join a carefully timed shore excursion or plan your own route to Selçuk, this port exists to connect cruise passengers with one of the greatest archaeological sites on Earth.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/guides/ephesus-guide" className="btn-accent">Ephesus Guide</Link>
              <Link href="/guides/independent-kusadasi-guide" className="btn-secondary border-white/30 bg-white/10 text-white hover:bg-white/20">
                Independent Guide
              </Link>
            </div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-2xl">
            <ResponsiveImage
              image={siteImages.hero}
              role="card"
              imgClassName="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-coastal-900/40 to-transparent" aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>
  );
}
