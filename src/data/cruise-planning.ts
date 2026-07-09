import type { GuidePage } from "./types";

export const cruisePlanningPages: GuidePage[] = [
  {
    slug: "mediterranean-cruise-planner",
    title: "Mediterranean Cruise Planner",
    seoTitle: "Mediterranean Cruise Planner — Port-by-Port Shore Excursion Guides",
    metaDescription: "Plan your Mediterranean cruise holistically — Kuşadası, Athens, Rhodes, Santorini, Bodrum and Turkish Aegean authority guides linked for multi-port itineraries.",
    tagline: "One itinerary, many ports — link to the right guide at every stop.",
    overview: "Mediterranean cruises string together markedly different ports — Ephesus from Kuşadası, Acropolis from Piraeus, caldera from Santorini. Our network links authoritative port guides so you plan each day correctly.",
    body: ["Kuşadası sits on Eastern Mediterranean and Greek Isles itineraries — often paired with Rhodes, Santorini, Athens and Bodrum. Plan each port day using dedicated authority guides rather than generic cruise forums.", "Use Kuşadası for Ephesus and Virgin Mary planning; Athens for Acropolis and Delphi; Rhodes for Old Town and Lindos. Match excursion booking to each port's geography — Izmir callers face 80 km to Ephesus versus Kuşadası's 20 km.", "Book independent excursions per port where timing favours it — Ephesus needs organised transport from any port; Greek island Old Towns vary in walkability."],
    highlights: ["Port-specific authority guides", "Linked Eastern Med neighbours", "Realistic per-port timing"],
    tips: ["Plan each port separately", "Book early for peak July slots", "Keep 60–90 min buffers everywhere"],
    faqs: [{ question: "Is this site only for Kuşadası?", answer: "Kuşadası is our focus — we link to Athens, Rhodes, Santorini, Bodrum, Izmir and broader Med planning resources." }, { question: "Where is the main Med planner?", answer: "https://mediterraneancruiseplanner.com — hub for multi-port itinerary tools." }],
    relatedSlugs: ["athens-shore-excursions", "rhodes-shore-excursions", "izmir-shore-excursions"],
    imageKey: "city",
    hubPath: "/plan-your-cruise-holiday",
  },
  {
    slug: "athens-shore-excursions",
    title: "Athens Cruise Excursions — Greek Mainland",
    seoTitle: "Athens Cruise Excursions — Cruise Port Guide (External)",
    metaDescription: "Planning Athens on the same cruise as Kuşadası? Authority guide for Piraeus port, Acropolis, Delphi and Cape Sounion at athenscruiseexcursions.com.",
    tagline: "Ephesus one day, Acropolis the next — plan both correctly.",
    overview: "Athens and Kuşadası often appear on Eastern Mediterranean itineraries — but they demand different planning. Piraeus is 10 km from the Acropolis; Kuşadası is 20 km from Ephesus.",
    body: ["Kuşadası sits on Eastern Mediterranean and Greek Isles itineraries — often paired with Rhodes, Santorini, Athens and Bodrum. Plan each port day using dedicated authority guides rather than generic cruise forums.", "Athens highlights: Acropolis and Parthenon, Acropolis Museum, Plaka district and Delphi day trips. Allow 30–45 minutes transfer from Piraeus to central Athens.", "Full authority site: https://athenscruiseexcursions.com — shore excursions, comparisons, ship schedules and cruise planner for Piraeus port days."],
    highlights: ["Piraeus port transfers", "Acropolis and museum", "Delphi and Cape Sounion options"],
    tips: ["Do not assume Kuşadası timing fits Athens", "Pre-book Acropolis tickets in peak season", "Allow longer mainland transfers"],
    faqs: [{ question: "Is this relevant on a Kuşadası port day?", answer: "Yes — Kuşadası sits on most Eastern Mediterranean and Greek Isles itineraries from April through October." }, { question: "Where can I plan other ports?", answer: "See our Mediterranean cruise planning hub for Athens, Rhodes, Santorini and multi-port itineraries." }],
    recommendations: [
      { category: "editors-choice", title: "Athens Cruise Excursions", description: "Full Athens cruise planning authority.", href: "https://athenscruiseexcursions.com" },
      { category: "best-historic", title: "Acropolis Guide", description: "Parthenon from Piraeus.", href: "https://athenscruiseexcursions.com" }
    ],
    relatedSlugs: ["rhodes-shore-excursions", "santorini-shore-excursions", "mediterranean-cruise-planner"],
    imageKey: "history",
    hubPath: "/plan-your-cruise-holiday",
  },
  {
    slug: "bodrum-shore-excursions",
    title: "Bodrum Shore Excursions — Turkish Aegean",
    seoTitle: "Bodrum Shore Excursions — Cruise Port Guide (External)",
    metaDescription: "Calling at Bodrum on your Mediterranean cruise? Authority guide for the Castle of St Peter, Greek ruins and Turkish Riviera at bodrumshoreexcursion.com.",
    tagline: "Two Turkish Aegean ports — Bodrum and Kuşadası need different plans.",
    overview: "Bodrum and Kuşadası both sit on Turkish Aegean itineraries but offer different experiences — Bodrum's castle and marina versus Kuşadası's Ephesus gateway.",
    body: ["Kuşadası sits on Eastern Mediterranean and Greek Isles itineraries — often paired with Rhodes, Santorini, Athens and Bodrum. Plan each port day using dedicated authority guides rather than generic cruise forums.", "Bodrum highlights: Castle of St Peter, Mausoleum ruins, marina promenade and gulet boat trips. Kuşadası highlights: Ephesus, Virgin Mary and Şirince. Do not duplicate Ephesus planning at Bodrum — it is not a day trip from there.", "Full authority site: https://bodrumshoreexcursion.com — excursions, comparisons and port guides for Bodrum cruise days."],
    highlights: ["Bodrum Castle", "Turkish Riviera marina", "Different focus from Kuşadası"],
    tips: ["Plan Ephesus at Kuşadası only", "Bodrum for castle and coast", "Book coaches before peak season"],
    faqs: [{ question: "Is this relevant on a Kuşadası port day?", answer: "Yes — Kuşadası sits on most Eastern Mediterranean and Greek Isles itineraries from April through October." }, { question: "Where can I plan other ports?", answer: "See our Mediterranean cruise planning hub for Athens, Rhodes, Santorini and multi-port itineraries." }],
    recommendations: [
      { category: "editors-choice", title: "Bodrum Shore Excursions", description: "Full Bodrum cruise planning authority.", href: "https://bodrumshoreexcursion.com" },
      { category: "best-coastal", title: "Bodrum Marina Guide", description: "Aegean coast from cruise port.", href: "https://bodrumshoreexcursion.com" }
    ],
    relatedSlugs: ["izmir-shore-excursions", "mediterranean-cruise-planner", "athens-shore-excursions"],
    imageKey: "coast",
    hubPath: "/plan-your-cruise-holiday",
  },
  {
    slug: "santorini-shore-excursions",
    title: "Santorini Shore Excursions — Cyclades",
    seoTitle: "Santorini Shore Excursions — Cruise Port Guide (External)",
    metaDescription: "Calling at Santorini on your Mediterranean cruise? Authority guide for Oia, Fira, caldera views and tender operations at santorinishoreexcursion.com.",
    tagline: "Caldera sunsets and tender logistics — Santorini needs its own plan.",
    overview: "Santorini pairs dramatic caldera views with tender operations and cliff-side villages — utterly different geography from Kuşadası's Ephesus coach days.",
    body: ["Kuşadası sits on Eastern Mediterranean and Greek Isles itineraries — often paired with Rhodes, Santorini, Athens and Bodrum. Plan each port day using dedicated authority guides rather than generic cruise forums.", "Santorini ships anchor or tender — add 20–30 minutes each way. Highlights: Oia sunsets, Fira caldera views, Akrotiri ruins and wine tastings. Kuşadası the next day needs Ephesus energy, not sunset chasing.", "Full authority site: https://santorinishoreexcursion.com — excursions, comparisons and port guides for Cyclades cruise days."],
    highlights: ["Tender operations common", "Oia and Fira villages", "Akrotiri Minoan ruins"],
    tips: ["Allow tender time in planning", "Kuşadası next day is Ephesus-focused", "Book wine tours early"],
    faqs: [{ question: "Is this relevant on a Kuşadası port day?", answer: "Yes — Kuşadası sits on most Eastern Mediterranean and Greek Isles itineraries from April through October." }, { question: "Where can I plan other ports?", answer: "See our Mediterranean cruise planning hub for Athens, Rhodes, Santorini and multi-port itineraries." }],
    recommendations: [
      { category: "editors-choice", title: "Santorini Shore Excursions", description: "Full Santorini cruise planning authority.", href: "https://santorinishoreexcursion.com" },
      { category: "best-view", title: "Oia Caldera Guide", description: "Sunset viewpoints from Athinios.", href: "https://santorinishoreexcursion.com" }
    ],
    relatedSlugs: ["rhodes-shore-excursions", "athens-shore-excursions", "mediterranean-cruise-planner"],
    imageKey: "coast",
    hubPath: "/plan-your-cruise-holiday",
  },
  {
    slug: "rhodes-shore-excursions",
    title: "Rhodes Shore Excursions — Dodecanese",
    seoTitle: "Rhodes Shore Excursions — Cruise Port Guide (External)",
    metaDescription: "Planning Rhodes on the same cruise as Kuşadası? Authority guide for Medieval Old Town, Lindos and Acropolis at rhodesshoreexcursion.com.",
    tagline: "Medieval Rhodes and ancient Ephesus — consecutive UNESCO days.",
    overview: "Rhodes and Kuşadası often share Eastern Mediterranean loops. Rhodes Old Town is walkable from the commercial port; Kuşadası needs a coach to Ephesus — different transfer realities.",
    body: ["Kuşadası sits on Eastern Mediterranean and Greek Isles itineraries — often paired with Rhodes, Santorini, Athens and Bodrum. Plan each port day using dedicated authority guides rather than generic cruise forums.", "Rhodes highlights: Medieval Old Town, Palace of the Grand Master, Lindos Acropolis and butterfly valley. Kuşadası: Ephesus and Virgin Mary. Pace yourself across consecutive heavy walking days.", "Full authority site: https://rhodesshoreexcursion.com — excursions, comparisons and port guides for Rhodes cruise days."],
    highlights: ["Walkable Medieval Old Town", "Lindos Acropolis day trips", "Different walkability from Kuşadası"],
    tips: ["Rhodes port walkable — Kuşadası is not for Ephesus", "Vary active days across the week", "Book Lindos coaches early"],
    faqs: [{ question: "Is this relevant on a Kuşadası port day?", answer: "Yes — Kuşadası sits on most Eastern Mediterranean and Greek Isles itineraries from April through October." }, { question: "Where can I plan other ports?", answer: "See our Mediterranean cruise planning hub for Athens, Rhodes, Santorini and multi-port itineraries." }],
    recommendations: [
      { category: "editors-choice", title: "Rhodes Shore Excursions", description: "Full Rhodes cruise planning authority.", href: "https://rhodesshoreexcursion.com" },
      { category: "best-historic", title: "Rhodes Old Town Guide", description: "Medieval streets from cruise port.", href: "https://rhodesshoreexcursion.com" }
    ],
    relatedSlugs: ["santorini-shore-excursions", "athens-shore-excursions", "mediterranean-cruise-planner"],
    imageKey: "medieval",
    hubPath: "/plan-your-cruise-holiday",
  },
  {
    slug: "izmir-shore-excursions",
    title: "Izmir Shore Excursions — Sister Turkish Port",
    seoTitle: "Izmir Shore Excursions — Ephesus from 80 km vs Kuşadası 20 km",
    metaDescription: "Izmir and Kuşadası both access Ephesus — but Izmir port is 80 km from the ruins versus Kuşadası's 20 km. Plan at izmirshoreexcursions.com.",
    tagline: "Same ruins, different port — Kuşadası is far closer to Ephesus.",
    overview: "Some itineraries call at Izmir (Alsancak) instead of or as well as Kuşadası. Both ports sell Ephesus excursions — but transfer time from Izmir is roughly four times longer.",
    body: ["Kuşadası sits on Eastern Mediterranean and Greek Isles itineraries — often paired with Rhodes, Santorini, Athens and Bodrum. Plan each port day using dedicated authority guides rather than generic cruise forums.", "From Kuşadası: 25–35 minutes to Ephesus — half-day tours viable. From Izmir: 60–90 minutes each way — full-day commitment. If your cruise calls both, do Ephesus at Kuşadası and use Izmir for city bazaar or Pergamon.", "Full authority site: https://izmirshoreexcursions.com — shore excursions, comparisons and port guides for Izmir cruise days."],
    highlights: ["Kuşadası 20 km to Ephesus", "Izmir 80 km to Ephesus", "Plan Ephesus at closest port"],
    tips: ["Never duplicate Ephesus at both ports", "Izmir for Konak bazaar if Ephesus done", "Check which Turkish port your sailing uses"],
    faqs: [{ question: "Is this relevant on a Kuşadası port day?", answer: "Yes — Kuşadası sits on most Eastern Mediterranean and Greek Isles itineraries from April through October." }, { question: "Where can I plan other ports?", answer: "See our Mediterranean cruise planning hub for Athens, Rhodes, Santorini and multi-port itineraries." }],
    recommendations: [
      { category: "editors-choice", title: "Izmir Shore Excursions", description: "Full Izmir cruise planning authority.", href: "https://izmirshoreexcursions.com" },
      { category: "best-historic", title: "Ephesus from Izmir", description: "Longer transfer honest guide.", href: "https://izmirshoreexcursions.com" }
    ],
    relatedSlugs: ["mediterranean-cruise-planner", "bodrum-shore-excursions", "ephesus-cruise-guide"],
    imageKey: "city",
    hubPath: "/plan-your-cruise-holiday",
  }
];

export function getCruisePlanningPageBySlug(slug: string): GuidePage | undefined {
  return cruisePlanningPages.find((p) => p.slug === slug);
}

export function getAllCruisePlanningSlugs(): string[] {
  return cruisePlanningPages.map((p) => p.slug);
}

export const mediterraneanLinks = [
  {
    title: "Mediterranean Cruise Planner",
    href: "https://mediterraneancruiseplanner.com",
    description: "Multi-port itinerary tools for Eastern Mediterranean and Greek Isles cruises.",
  },
  {
    title: "Athens Cruise Excursions",
    href: "https://athenscruiseexcursions.com",
    description: "Piraeus port — Acropolis, museum and Delphi planning from Greece's mainland gateway.",
  },
  {
    title: "Bodrum Shore Excursions",
    href: "https://bodrumshoreexcursion.com",
    description: "Turkish Aegean castle, marina and coast — complementary to Kuşadası on same itinerary.",
  },
  {
    title: "Santorini Shore Excursions",
    href: "https://santorinishoreexcursion.com",
    description: "Caldera villages, Oia sunsets and tender logistics on Cyclades cruise days.",
  },
  {
    title: "Rhodes Shore Excursions",
    href: "https://rhodesshoreexcursion.com",
    description: "Medieval Old Town and Lindos — walkable port days on Dodecanese itineraries.",
  },
  {
    title: "Izmir Shore Excursions",
    href: "https://izmirshoreexcursions.com",
    description: "Sister Turkish port — Ephesus from 80km vs Kuşadası's 20km",
  },
];
