import type { ScheduleEntry, ShipSchedulePort } from "./types";
import {
  filterEntriesByMonth,
  filterEntriesByYear,
  getMonthsWithEntries,
  type ScheduleYear,
} from "@/lib/schedule-utils";
import kusadasiSchedule from "./imported-schedules/kusadasi.json";

const SCHEDULE_FAQS = [
  {
    question: "How accurate are Kuşadası cruise ship schedules?",
    answer:
      "Schedules are compiled from published timetables and updated periodically. Times and berths can change — confirm with your cruise line before booking excursions.",
  },
  {
    question: "How do I plan Ephesus around my ship's arrival time?",
    answer:
      "Book the earliest Ephesus excursion slot on multi-ship days. Crowds peak 10:00–14:00 — morning arrivals should head straight to Selçuk rather than browsing the bazaar first.",
  },
  {
    question: "Can I visit Ephesus on a short port call?",
    answer:
      "Calls under 6 usable hours are tight — choose half-day Ephesus only. Standard 8–11 hour calls suit full Ephesus or combination tours with Virgin Mary.",
  },
];

const SCHEDULE_TIPS = [
  "Check how many ships share your port day before booking Ephesus excursions",
  "Start Ephesus tours before 09:30 on multi-ship days",
  "Allow 60–90 minute return buffer from Selçuk to the port",
  "Morning Ephesus beats afternoon heat and coach convoys June–August",
];

export const schedulePorts: ShipSchedulePort[] = [
  {
    slug: "kusadasi",
    name: "Kuşadası",
    country: "Turkey",
    seoTitle: "Kuşadası Cruise Ship Schedule Overview",
    metaDescription:
      "Kuşadası cruise ship schedule — see which ships call at Kuşadası Cruise Port and plan Ephesus excursions around published arrival and departure times.",
    intro:
      "Kuşadası is the gateway to Ephesus on Eastern Mediterranean and Greek Isles itineraries. Check scheduled arrivals and departures before booking shore excursions — Ephesus crowd patterns depend on how many ships share your day.",
    description: "Turkish Aegean cruise gateway — Ancient Ephesus 20 km from the port.",
    scheduleOverview:
      "Peak cruise traffic April through October, with heaviest calls June to September on Eastern Mediterranean itineraries.",
    planningTips: SCHEDULE_TIPS,
    faqs: SCHEDULE_FAQS,
  },
];

const scheduleData: Record<string, ScheduleEntry[]> = {
  kusadasi: kusadasiSchedule as ScheduleEntry[],
};

export function getSchedulePortBySlug(slug: string): ShipSchedulePort | undefined {
  return schedulePorts.find((p) => p.slug === slug);
}

export function getAllSchedulePortSlugs(): string[] {
  return schedulePorts.map((p) => p.slug);
}

export function getScheduleEntries(slug: string): ScheduleEntry[] {
  return scheduleData[slug] ?? [];
}

export function getScheduleEntryCount(slug: string): number {
  return getScheduleEntries(slug).length;
}

export function getScheduleEntriesForYear(slug: string, year: ScheduleYear): ScheduleEntry[] {
  return filterEntriesByYear(getScheduleEntries(slug), year);
}

export function getScheduleEntriesForMonth(slug: string, monthKey: string): ScheduleEntry[] {
  return filterEntriesByMonth(getScheduleEntries(slug), monthKey);
}

export function getVerifiedMonthKeys(slug: string): string[] {
  return getMonthsWithEntries(getScheduleEntries(slug));
}

export function searchSchedulesByShip(query: string): { portSlug: string; entries: ScheduleEntry[] }[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];
  const results: { portSlug: string; entries: ScheduleEntry[] }[] = [];
  for (const port of schedulePorts) {
    const matches = getScheduleEntries(port.slug).filter(
      (e) => e.ship.toLowerCase().includes(q) || e.cruiseLine.toLowerCase().includes(q),
    );
    if (matches.length) results.push({ portSlug: port.slug, entries: matches });
  }
  return results;
}

export function getTodayTomorrowEntries(slug: string): { today: ScheduleEntry[]; tomorrow: ScheduleEntry[] } {
  const entries = getScheduleEntries(slug);
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const fmt = (d: Date) => d.toISOString().slice(0, 10);
  return {
    today: entries.filter((e) => e.date === fmt(today)),
    tomorrow: entries.filter((e) => e.date === fmt(tomorrow)),
  };
}
