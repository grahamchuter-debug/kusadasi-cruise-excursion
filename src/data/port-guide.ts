import type { FAQ } from "./types";

export interface Terminal {
  name: string;
  quay: string;
  usedBy: string;
  cityAccess: string;
}

export interface PortGuideSection {
  heading: string;
  paragraphs: string[];
}

export const portGuideContent = {
  title: "Kuşadası Cruise Port Guide",
  subtitle: "Kuşadası Cruise Port terminal, walking to town, Ephesus transfers and return-to-ship timing for cruise passengers.",
  terminals: [
    {
      name: "Kuşadası Cruise Port Main Terminal",
      quay: "Modern purpose-built cruise terminal north of town centre",
      usedBy: "Most large ships — MSC, Royal Caribbean, Celebrity, Norwegian and others on Eastern Mediterranean itineraries",
      cityAccess: "15–20 min walk to bazaar along waterfront; taxis at terminal rank; excursion coaches at gangway",
    },
    {
      name: "Town centre bazaar & marina",
      quay: "Not a cruise berth — downtown Kuşadası",
      usedBy: "Independent passengers walking from the terminal",
      cityAccess: "Flat waterfront promenade south from terminal — shops, cafés, marina views",
    },
    {
      name: "Ephesus coach meeting points",
      quay: "Terminal car park and designated excursion zones",
      usedBy: "Licensed shore excursion operators to Selçuk and Ephesus",
      cityAccess: "25–35 min coach ride to Ephesus upper gate — book timed return to ship",
    },
  ] as Terminal[],
  sections: [
    {
      heading: "Where cruise ships dock in Kuşadası",
      paragraphs: [
        "Cruise ships dock at Kuşadası Cruise Port, a modern terminal 2–3 km north of the town centre. Unlike walkable European walled cities, the headline sight — Ancient Ephesus — lies 20 km east near Selçuk. Ships call here because of Ephesus, not the port town itself.",
        "Kuşadası appears on Eastern Mediterranean, Greek Isles and Turkish Aegean itineraries from April through October, with heaviest traffic June to September. Multiple ships on the same day mean Ephesus crowds spike 10:00–14:00.",
        "The port town is a lively resort with a waterfront bazaar, marina and harbour views — pleasant for shopping and lunch, but secondary to Ephesus on a first visit.",
      ],
    },
    {
      heading: "Getting from the port to town and Ephesus",
      paragraphs: [
        "Town centre: follow the waterfront promenade south 15–20 minutes to the bazaar and marina — flat, scenic, free. Taxis cost ₺100–200 to town (5–10 minutes) from the terminal rank.",
        "Ephesus: requires coach or taxi — 25–35 minutes to the archaeological site. Shore excursions meet at the terminal exit with licensed guides and return timing to your ship. Independent taxis ₺400–600 each way — agree price before departing.",
        "Do not confuse Kuşadası (20 km to Ephesus) with Izmir (80 km) — some cruise literature references both Turkish ports; Kuşadası is far closer.",
      ],
    },
    {
      heading: "Facilities and practicalities",
      paragraphs: [
        "The terminal offers toilets, ATMs, seating and tourist information. Currency is the Turkish lira (TRY). Cards work at many establishments; cash for taxis, market stalls and Ephesus toilets.",
        "Turkish is the official language; English is widely spoken in tourist areas. Download offline maps — terminal Wi-Fi is unreliable. Summer heat is extreme — hat, sunscreen and water essential.",
        "Kuşadası is generally safe. Watch belongings in bazaar crowds and agree taxi fares before travel. Modest dress required at House of Virgin Mary shrine on combination tours.",
      ],
    },
    {
      heading: "Return-to-ship timing",
      paragraphs: [
        "Confirm all-aboard time — usually 30–60 minutes before departure. Keep a 60–90 minute buffer beyond expected travel time from Ephesus or Selçuk.",
        "Selçuk road traffic builds afternoon on multi-ship days. Independent passengers should be at the terminal 90 minutes before all-aboard. Ship excursions carry delay guarantees; reputable independents track departure but will not wait if you miss the meeting point.",
        "Half-day Ephesus tours return with tighter margins — choose full buffer on independent taxi plans.",
      ],
    },
  ] as PortGuideSection[],
  faqs: [
    {
      question: "How far is Kuşadası town from the cruise port?",
      answer: "About 2–3 km — 15–20 minutes on foot along the waterfront promenade or 5–10 minutes by taxi (₺100–200).",
    },
    {
      question: "Can I walk to Ephesus from the cruise ship?",
      answer: "No — Ephesus is 20 km away near Selçuk. You need a coach, shore excursion or taxi.",
    },
    {
      question: "How far is Ephesus from Kuşadası port?",
      answer: "Roughly 20 km — typically 25–35 minutes by coach or taxi to the upper gate entrance.",
    },
    {
      question: "How much time to return from Ephesus before all-aboard?",
      answer: "Allow 25–35 minutes drive from Ephesus to the port plus a 60–90 minute buffer before all-aboard. Afternoon traffic can add time.",
    },
  ] as FAQ[],
};

export const terminals = portGuideContent.terminals;
export const portGuideSections = portGuideContent.sections;
export const portGuideFaqs = portGuideContent.faqs;
