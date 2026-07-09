import Link from "next/link";

export function HonestAdvice() {
  return (
    <section className="section-padding bg-white">
      <div className="container-wide max-w-4xl">
        <p className="section-eyebrow">Honest advice</p>
        <h2 className="section-title mt-2">Do you need a shore excursion in Kuşadası?</h2>
        <p className="section-subtitle">Advice from an experienced cruiser — not a salesperson.</p>

        <div className="mt-10 space-y-8">
          <div className="card-feature">
            <h3 className="font-display text-xl font-bold text-gray-900">If you&apos;re only interested in the port town, Kuşadası itself is pleasant</h3>
            <p className="mt-3 text-gray-700 leading-relaxed">
              Kuşadası is a lively resort town with a waterfront bazaar, cafés, marina and harbour views. Many passengers enjoy a relaxed morning ashore without leaving town:
            </p>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2 text-sm text-gray-700">
              <li className="flex items-center gap-2"><span className="text-coastal-600">✓</span> Shopping and leather goods</li>
              <li className="flex items-center gap-2"><span className="text-coastal-600">✓</span> Waterfront cafés and marina</li>
              <li className="flex items-center gap-2"><span className="text-coastal-600">✓</span> Harbour promenade walks</li>
              <li className="flex items-center gap-2"><span className="text-coastal-600">✓</span> Beach clubs near town</li>
            </ul>
            <p className="mt-4 text-sm text-gray-600">
              On a repeat visit when you have already seen Ephesus, a town day can be genuinely enjoyable — and inexpensive.
            </p>
          </div>

          <div className="card-accent">
            <h3 className="font-display text-xl font-bold text-gray-900">However — almost every first-time visitor should seriously consider Ephesus</h3>
            <p className="mt-3 text-gray-700 leading-relaxed">
              Ephesus is one of the world&apos;s best-preserved ancient cities and the main reason cruise ships call here. From Kuşadası it is just 20 km — far closer than from Izmir:
            </p>
            <ul className="mt-4 space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2"><span className="text-maple-600 mt-0.5">→</span> <span><strong>Library of Celsus</strong> — the iconic Roman façade that defines Mediterranean archaeology</span></li>
              <li className="flex items-start gap-2"><span className="text-maple-600 mt-0.5">→</span> <span><strong>Great Theatre</strong> — 25,000 seats carved into a hillside above marble streets</span></li>
              <li className="flex items-start gap-2"><span className="text-maple-600 mt-0.5">→</span> <span><strong>House of the Virgin Mary</strong> — a sacred pilgrimage site in the pine forests above Selçuk</span></li>
              <li className="flex items-start gap-2"><span className="text-maple-600 mt-0.5">→</span> <span><strong>Şirince village</strong> — Ottoman stone houses, wine cellars and authentic Turkish village life</span></li>
              <li className="flex items-start gap-2"><span className="text-maple-600 mt-0.5">→</span> <span><strong>Licensed guides</strong> — context that transforms ruins from impressive to unforgettable</span></li>
            </ul>
            <p className="mt-4 text-sm text-gray-600">
              Independent travel to Ephesus is possible but adds taxi coordination, ticket queues and timing stress. Organised excursions handle all of that — and from Kuşadası, the transfer is short enough to make even half-day tours viable.
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/compare/can-you-visit-ephesus-independently" className="btn-secondary text-sm">Can I visit Ephesus independently?</Link>
          <Link href="/guides/independent-kusadasi-guide" className="btn-secondary text-sm">Full independent guide</Link>
          <Link href="/compare/is-ephesus-worth-visiting" className="btn-secondary text-sm">Is Ephesus worth it?</Link>
        </div>
      </div>
    </section>
  );
}
