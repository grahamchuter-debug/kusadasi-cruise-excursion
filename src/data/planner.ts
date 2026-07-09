import { excursions } from "./excursions";

export interface PlannerInput {
  timeframe: "short" | "standard" | "long";
  arrivalTime?: string;
  departureTime?: string;
  adults: number;
  children: number;
  interests: string[];
  mobility: "full" | "some" | "limited";
  budget: "budget" | "mid" | "premium";
  style: "guided" | "mix" | "diy";
}

export interface PlannerLink {
  label: string;
  href: string;
  why: string;
}

export interface PlannerResult {
  headline: string;
  summary: string;
  excursions: PlannerLink[];
  transfers: PlannerLink[];
  stay: PlannerLink[];
  logistics: PlannerLink[];
  dayPlan: { time: string; text: string }[];
}

export const INTEREST_OPTIONS = [
  { id: "ancient-history", label: "Ancient history & Ephesus" },
  { id: "biblical", label: "Biblical sites & Virgin Mary" },
  { id: "villages", label: "Turkish villages & Şirince" },
  { id: "nature", label: "Nature & mountain scenery" },
  { id: "photography", label: "Photography" },
  { id: "food", label: "Food & Turkish cuisine" },
  { id: "shopping", label: "Shopping & bazaar" },
  { id: "beach", label: "Beach & relaxation" },
];

const INTEREST_TO_EXCURSION: Record<string, string[]> = {
  "ancient-history": ["ephesus-shore-excursion", "ancient-ephesus-highlights-tour", "terrace-houses-ephesus-tour"],
  biblical: ["ephesus-and-house-of-virgin-mary-tour", "ephesus-shore-excursion", "private-ephesus-tour"],
  villages: ["sirince-village-tour", "ephesus-and-house-of-virgin-mary-tour", "private-ephesus-tour"],
  nature: ["house-of-virgin-mary-guide", "sirince-village-tour", "ephesus-and-house-of-virgin-mary-tour"],
  photography: ["private-ephesus-tour", "ancient-ephesus-highlights-tour", "ephesus-shore-excursion"],
  food: ["sirince-village-tour", "kusadasi-town-and-beach-tour", "private-ephesus-tour"],
  shopping: ["kusadasi-town-and-beach-tour", "half-day-ephesus-tour", "private-ephesus-tour"],
  beach: ["kusadasi-town-and-beach-tour", "half-day-ephesus-tour", "private-ephesus-tour"],
};

const ITINERARY_THEMES: Record<
  string,
  { headline: string; slugs: string[]; summary: string }
> = {
  "editors-choice": {
    headline: "Editor's Choice — Ephesus • Virgin Mary • Ancient Wonders",
    slugs: ["ephesus-and-house-of-virgin-mary-tour", "ephesus-shore-excursion", "ancient-ephesus-highlights-tour"],
    summary: "The essential Kuşadası trio — Roman Ephesus, mountain shrine and expert timing from the port.",
  },
  "best-historic": {
    headline: "Ancient Ephesus",
    slugs: ["ephesus-shore-excursion", "terrace-houses-ephesus-tour", "ancient-ephesus-highlights-tour"],
    summary: "Library of Celsus, Great Theatre and Terrace Houses without rushing.",
  },
  biblical: {
    headline: "Biblical Heritage",
    slugs: ["ephesus-and-house-of-virgin-mary-tour", "ephesus-shore-excursion", "private-ephesus-tour"],
    summary: "Ephesus where St Paul preached and the House of the Virgin Mary shrine.",
  },
  villages: {
    headline: "Turkish Villages",
    slugs: ["sirince-village-tour", "ephesus-shore-excursion", "private-ephesus-tour"],
    summary: "Şirince wine village and abbreviated Ephesus highlights.",
  },
  "best-food": {
    headline: "Food & Turkish Culture",
    slugs: ["sirince-village-tour", "kusadasi-town-and-beach-tour", "private-ephesus-tour"],
    summary: "Meze, village tastings and bazaar flavours fitted to your port hours.",
  },
  "best-beach": {
    headline: "Beach & Town Day",
    slugs: ["kusadasi-town-and-beach-tour", "half-day-ephesus-tour", "private-ephesus-tour"],
    summary: "Ladies Beach and waterfront bazaar — when ruins are done or deliberately skipped.",
  },
  "best-families": {
    headline: "Family Day",
    slugs: ["family-ephesus-tour", "kusadasi-town-and-beach-tour", "private-ephesus-tour"],
    summary: "Paced Ephesus routes and beach time for children.",
  },
  "best-photography": {
    headline: "Photography Focus",
    slugs: ["private-ephesus-tour", "ancient-ephesus-highlights-tour", "ephesus-shore-excursion"],
    summary: "Library of Celsus light and theatre panoramas at your pace.",
  },
};

function excursionLink(slug: string, why: string): PlannerLink | null {
  const e = excursions.find((x) => x.slug === slug);
  if (!e) return null;
  return { label: e.title, href: `/shore-excursions/${slug}`, why };
}

function usableHours(input: PlannerInput): number {
  if (input.arrivalTime && input.departureTime) {
    const [aH, aM] = input.arrivalTime.split(":").map(Number);
    const [dH, dM] = input.departureTime.split(":").map(Number);
    const arrivalMins = aH * 60 + aM;
    const departMins = dH * 60 + dM;
    const raw = (departMins - arrivalMins) / 60;
    return Math.max(0, raw - 1.5);
  }
  const map = { short: 5, standard: 7.5, long: 10 };
  return map[input.timeframe];
}

function pickTheme(input: PlannerInput): keyof typeof ITINERARY_THEMES {
  const { interests, children, style, mobility, timeframe } = input;
  const active = interests.length ? interests : ["ancient-history"];

  if (children > 0) return "best-families";
  if (active.includes("beach") && !active.includes("ancient-history")) return "best-beach";
  if (active.includes("biblical")) return "biblical";
  if (active.includes("villages")) return "villages";
  if (active.includes("food")) return "best-food";
  if (active.includes("photography")) return "best-photography";
  if (active.includes("shopping") && style === "diy") return "best-beach";
  if (active.includes("ancient-history")) return "best-historic";
  if (timeframe === "short" || usableHours(input) < 6) return "best-historic";
  if (mobility === "limited") return "editors-choice";
  return "editors-choice";
}

export function generateKusadasiPlan(input: PlannerInput): PlannerResult {
  const { timeframe, arrivalTime, departureTime, adults, children, interests, mobility, budget, style } = input;
  const party = adults + children;
  const hasKids = children > 0;
  const hours = usableHours(input);

  const themeKey = pickTheme(input);
  const theme = ITINERARY_THEMES[themeKey];

  const excSlugs: string[] = [];
  const pushSlug = (s: string) => {
    if (s && !excSlugs.includes(s)) excSlugs.push(s);
  };

  for (const s of theme.slugs) pushSlug(s);

  const activeInterests = interests.length ? interests : ["ancient-history"];
  for (const interest of activeInterests) {
    for (const s of INTEREST_TO_EXCURSION[interest] ?? []) pushSlug(s);
  }
  if (hasKids) pushSlug("family-ephesus-tour");
  if (mobility === "limited") pushSlug("private-ephesus-tour");
  if (style === "diy") pushSlug("kusadasi-town-and-beach-tour");
  if (budget === "premium") pushSlug("luxury-private-ephesus-tour");
  if (timeframe === "short" || hours < 6) pushSlug("half-day-ephesus-tour");

  const reasonMap: Record<string, string> = {
    "ephesus-and-house-of-virgin-mary-tour": "Editor's Choice — Ephesus and Virgin Mary shrine on one timed day.",
    "ephesus-shore-excursion": "Classic Ephesus highlights with guide and coach from the port.",
    "ancient-ephesus-highlights-tour": "Historian depth at Library, Theatre and Curetes Street.",
    "terrace-houses-ephesus-tour": "Roman mosaics and frescoes in the Terrace Houses.",
    "sirince-village-tour": "Şirince village wine and crafts after abbreviated Ephesus.",
    "private-ephesus-tour": mobility === "limited" ? "Private vehicle — essential for easy access and pacing." : "Flexible routing for your group.",
    "family-ephesus-tour": "Shade breaks and shorter routes for children.",
    "luxury-private-ephesus-tour": "Premium vehicle and senior guide.",
    "half-day-ephesus-tour": "Essential icons when port hours are tight.",
    "kusadasi-town-and-beach-tour": "Bazaar and Ladies Beach when you skip or finish ruins early.",
  };

  const excursionLinks = excSlugs
    .slice(0, 5)
    .map((s) => excursionLink(s, reasonMap[s] ?? "A strong match for your Kuşadası port day."))
    .filter((x): x is PlannerLink => x !== null);

  const transfers: PlannerLink[] = [
    {
      label: "Kuşadası Cruise Port Guide",
      href: "/cruise-port-guide",
      why: "Terminal layout, taxi prices and walking to the bazaar.",
    },
  ];
  if (party >= 3 || hasKids || mobility === "limited" || budget === "premium") {
    transfers.push({
      label: "Private Ephesus Tour",
      href: "/shore-excursions/private-ephesus-tour",
      why: "Strongest return confidence when Selçuk road traffic builds.",
    });
  }

  const logistics: PlannerLink[] = [
    { label: "Ship Schedules", href: "/ship-schedules/kusadasi", why: "See how many ships share your port day." },
    {
      label: "First-Time Kuşadası Guide",
      href: "/guides/kusadasi-for-first-time-visitors",
      why: "Choose Ephesus vs town when hours are tight.",
    },
    {
      label: "Can You Visit Ephesus Independently?",
      href: "/compare/can-you-visit-ephesus-independently",
      why: "When DIY taxis beat organised tours.",
    },
  ];

  const topExc = excursionLinks[0]?.label ?? theme.headline;
  const dayPlan: { time: string; text: string }[] = [];

  const arriveLabel = arrivalTime ?? (timeframe === "short" ? "08:00" : timeframe === "long" ? "07:00" : "07:30");
  const departLabel = departureTime ?? (timeframe === "short" ? "14:00" : timeframe === "long" ? "18:00" : "17:00");

  dayPlan.push({
    time: "On arrival",
    text: `Disembark at Kuşadası Cruise Port (${arriveLabel}). Meet your excursion at the terminal exit, or walk the waterfront promenade to the bazaar (15–20 min) for an independent start.`,
  });

  if (themeKey === "biblical") {
    dayPlan.push({ time: "Morning", text: `Coach to Ephesus — ${topExc}. Downhill walk through Library and Theatre.` });
    dayPlan.push({ time: "Midday", text: "Drive to House of the Virgin Mary — modest dress, quiet shrine visit." });
    dayPlan.push({ time: "Afternoon", text: "Return coach to Kuşadası — optional brief bazaar stop if time allows." });
  } else if (themeKey === "villages") {
    dayPlan.push({ time: "Morning", text: "Abbreviated Ephesus highlights — Library and Theatre." });
    dayPlan.push({ time: "Midday", text: "Şirince village — wine tasting, lunch and cobbled lanes." });
    dayPlan.push({ time: "Afternoon", text: "Return to port with 60–90 minute buffer before all-aboard." });
  } else if (themeKey === "best-beach") {
    dayPlan.push({ time: "Morning", text: "Waterfront bazaar stroll or optional half-day Ephesus if booked." });
    dayPlan.push({ time: "Midday", text: "Turkish lunch near marina — meze or grilled fish." });
    dayPlan.push({ time: "Afternoon", text: "Ladies Beach swim or promenade coffee before return to terminal." });
  } else if (themeKey === "best-food") {
    dayPlan.push({ time: "Morning", text: "Ephesus or Şirince excursion with included tastings." });
    dayPlan.push({ time: "Midday", text: "Village lunch or Selçuk köfte — allow 90 minutes seated." });
    dayPlan.push({ time: "Afternoon", text: "Bazaar spices and Turkish delight before walking back to port." });
  } else if (hasKids) {
    dayPlan.push({ time: "Morning", text: "Early family Ephesus — short route with shade breaks." });
    dayPlan.push({ time: "Midday", text: "Return toward Kuşadası — lunch and marina promenade." });
    dayPlan.push({ time: "Afternoon", text: "Beach time or early ship return — avoid peak heat." });
  } else {
    dayPlan.push({
      time: "Morning",
      text: `Ephesus anchor first: ${topExc}. Early starts beat heat and coach convoys.`,
    });
    dayPlan.push({ time: "Midday", text: "Complete downhill route — Theatre and Curetes Street." });
    dayPlan.push({ time: "Afternoon", text: "Return coach — quick bazaar stop only if departure is 18:00 or later." });
  }

  dayPlan.push({
    time: "Return buffer",
    text: `Be back at Kuşadası Cruise Port 60–90 minutes before all-aboard (${departLabel} sailing). Selçuk road traffic can add 20–30 minutes in peak season.`,
  });

  const interestLabels = activeInterests
    .map((i) => INTEREST_OPTIONS.find((o) => o.id === i)?.label ?? i)
    .join(", ")
    .toLowerCase();

  return {
    headline: theme.headline,
    summary: `${theme.summary} A ${timeframe} Kuşadası port day (~${hours.toFixed(1)} usable hours) for ${party} guest${party === 1 ? "" : "s"} interested in ${interestLabels}.`,
    excursions: excursionLinks,
    transfers,
    stay: [],
    logistics,
    dayPlan,
  };
}

/** @deprecated Use generateKusadasiPlan */
export const generateKotorPlan = generateKusadasiPlan;
