import Link from "next/link";
import { SITE } from "@/lib/site";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer-depth mt-auto text-white">
      <div className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="container-wide grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="font-display text-xl font-semibold">Kuşadası Cruise Excursions</div>
            <p className="mt-3 text-sm text-coastal-100/70 leading-relaxed">
              Your gateway to ancient Ephesus — carefully selected shore excursions, honest port advice, cruise ship schedules and planning guides for Turkish Aegean port days.
            </p>
          </div>
          <div>
            <h3 className="mb-3 text-sm font-medium text-white/90">Plan your port day</h3>
            <ul className="space-y-1.5 text-sm text-coastal-100/70">
              <li><Link href="/cruise-planner" className="hover:text-white">Kuşadası Cruise Planner</Link></li>
              <li><Link href="/shore-excursions" className="hover:text-white">Shore Excursions</Link></li>
              <li><Link href="/guides/one-day-in-kusadasi" className="hover:text-white">One Day in Kuşadası</Link></li>
              <li><Link href="/ship-schedules/kusadasi" className="hover:text-white">Ship Schedules</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="mb-3 text-sm font-medium text-white/90">Ephesus guides</h3>
            <ul className="space-y-1.5 text-sm text-coastal-100/70">
              <li><Link href="/guides/ephesus-guide" className="hover:text-white">Ephesus Guide</Link></li>
              <li><Link href="/guides/house-of-virgin-mary-guide" className="hover:text-white">House of Virgin Mary</Link></li>
              <li><Link href="/guides/independent-kusadasi-guide" className="hover:text-white">Independent Guide</Link></li>
              <li><Link href="/cruise-port-guide" className="hover:text-white">Cruise Port Guide</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="mb-3 text-sm font-medium text-white/90">Compare &amp; enquire</h3>
            <ul className="space-y-1.5 text-sm text-coastal-100/70">
              <li><Link href="/compare/ephesus-vs-pompeii" className="hover:text-white">Ephesus vs Pompeii</Link></li>
              <li><Link href="/compare/private-tour-vs-group-tour" className="hover:text-white">Private vs Group</Link></li>
              <li><Link href="/guides/kusadasi-for-first-time-visitors" className="hover:text-white">First-Time Visitors</Link></li>
              <li><Link href="/enquire" className="hover:text-white">Enquire</Link></li>
            </ul>
          </div>
        </div>
        <div className="container-wide mt-10 flex flex-wrap gap-x-6 gap-y-2 border-t border-white/10 pt-6 text-xs text-coastal-100/60">
          <Link href="/about" className="hover:text-white">About</Link>
          <Link href="/faq" className="hover:text-white">FAQ</Link>
          <Link href="/privacy" className="hover:text-white">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-white">Terms</Link>
          <span className="ml-auto">{SITE.email}</span>
        </div>
      </div>
      <div className="border-t border-white/10 px-4 py-4 text-center text-xs text-coastal-300/75">
        &copy; {year} {SITE.name}. Independent Kuşadası cruise planning resource — not affiliated with any cruise line or the Port of Kuşadası.
      </div>
    </footer>
  );
}
