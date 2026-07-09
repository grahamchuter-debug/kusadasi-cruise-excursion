import type { FAQ, VisitorType, ExperienceCard } from "./types";

export const visitorTypes: VisitorType[] = [
  {
    id: "port-day",
    label: "I'm visiting Kuşadası for the day on a cruise",
    shortLabel: "Port day",
    description: "You're calling at Kuşadası for the day. Find shore excursions to Ephesus, planning guides and a realistic port-day itinerary from Kuşadası Cruise Port.",
    href: "/shore-excursions",
    cta: "Plan my port day",
  },
  {
    id: "first-time",
    label: "It's my first time in Kuşadası",
    shortLabel: "First visit",
    description: "Ephesus or port town? Our first-timer guides and comparison pages help you choose confidently.",
    href: "/guides/kusadasi-for-first-time-visitors",
    cta: "First-timer guide",
  },
  {
    id: "independent",
    label: "I prefer to explore independently",
    shortLabel: "Independent",
    description: "Walk the waterfront bazaar, taxi to Ephesus, manage your own return — when DIY beats a ship tour.",
    href: "/guides/independent-kusadasi-guide",
    cta: "Independent guide",
  },
  {
    id: "planner",
    label: "I want a personalised itinerary",
    shortLabel: "Custom plan",
    description: "Tell us your hours ashore, interests and budget — get a tailored Kuşadası plan with return-to-ship timing.",
    href: "/cruise-planner",
    cta: "Use the planner",
  },
];

export interface HomeSection {
  slug: string;
  number: string;
  title: string;
  description: string;
  href: string;
  cta: string;
}

export const experienceCards: ExperienceCard[] = [
  {
    slug: "ancient-history",
    title: "Ancient History",
    description: "Ephesus marble streets, Library of Celsus and the Great Theatre — Rome's eastern glory 20 km from your ship.",
    href: "/guides/ephesus-guide",
    cta: "Explore Ephesus",
    imageKey: "history",
  },
  {
    slug: "biblical-heritage",
    title: "Biblical Heritage",
    description: "House of the Virgin Mary, St Paul at the Great Theatre and Acts 19 pilgrimage sites.",
    href: "/guides/biblical-sites-kusadasi-guide",
    cta: "Biblical sites",
    imageKey: "biblical",
  },
  {
    slug: "turkish-villages",
    title: "Turkish Villages",
    description: "Şirince hillside lanes, fruit wine and Ottoman stone houses near Selçuk.",
    href: "/guides/sirince-village-guide",
    cta: "Explore villages",
    imageKey: "village",
  },
  {
    slug: "nature",
    title: "Nature",
    description: "Bulbul Mountain forests above Ephesus and Aegean coastal scenery on the Selçuk road.",
    href: "/guides/house-of-virgin-mary-guide",
    cta: "Explore nature",
    imageKey: "mountains",
  },
  {
    slug: "private-touring",
    title: "Private Touring",
    description: "Private vehicles and custom routing — Ephesus, Virgin Mary or Şirince at your pace.",
    href: "/shore-excursions/private-ephesus-tour",
    cta: "Go private",
    imageKey: "private",
  },
  {
    slug: "local-culture",
    title: "Local Culture",
    description: "Kuşadası bazaar, Turkish cuisine, marina promenade and authentic Aegean resort life.",
    href: "/guides/turkish-food-kusadasi-guide",
    cta: "Local culture",
    imageKey: "bazaar",
  },
];

export const coreSections: HomeSection[] = [
  { slug: "shore-excursions", number: "01", title: "Shore Excursions", description: "Ephesus, Virgin Mary, Şirince and town tours — cruise-timed from Kuşadası Cruise Port.", href: "/shore-excursions", cta: "Browse excursions" },
  { slug: "guides", number: "02", title: "Kuşadası Planning Guides", description: "Authority guides for Ephesus, biblical sites, food, currency and every type of passenger.", href: "/guides", cta: "Read guides" },
  { slug: "cruise-port-guide", number: "03", title: "Kuşadası Cruise Port Guide", description: "Terminal layout, walking to bazaar, taxi costs and practical arrival advice.", href: "/cruise-port-guide", cta: "Port guide" },
  { slug: "cruise-planner", number: "04", title: "Kuşadası Cruise Planner", description: "Answer a few questions — get a tailored itinerary with return-to-ship confidence.", href: "/cruise-planner", cta: "Start planning" },
  { slug: "compare", number: "05", title: "Compare Options", description: "Ephesus vs Pompeii, Virgin Mary or ruins, private vs group — honest comparisons.", href: "/compare/ephesus-vs-pompeii", cta: "Compare options" },
  { slug: "ship-schedules", number: "06", title: "Cruise Ship Schedules", description: "See which ships call at Kuşadası and plan around published arrival and departure times.", href: "/ship-schedules/kusadasi", cta: "View schedules" },
  { slug: "one-day", number: "07", title: "One Day in Kuşadası", description: "Hour-by-hour sample itineraries from gangway to all-aboard.", href: "/guides/one-day-in-kusadasi", cta: "One-day guide" },
  { slug: "faq", number: "08", title: "FAQ", description: "Kuşadası cruise port questions answered — timing, taxis, Ephesus and return buffers.", href: "/faq", cta: "Read FAQs" },
];

export function getHomepageFaqs(): FAQ[] {
  return [
    {
      question: "How far is Ephesus from the Kuşadası cruise port?",
      answer: "Roughly 20 km — typically 25–35 minutes by coach or taxi to the archaeological site near Selçuk.",
    },
    {
      question: "Is Kuşadası town worth visiting without Ephesus?",
      answer: "The bazaar and marina are pleasant for shopping and lunch, but Ephesus is why ships stop here. First-timers should prioritise the ruins.",
    },
    {
      question: "Should I book a shore excursion or visit Ephesus independently?",
      answer: "Independent visits are possible by taxi but need strict timing. Organised tours handle tickets, guides and return buffers — see our comparison guide.",
    },
    {
      question: "What is the best Kuşadası excursion for first-timers?",
      answer: "Ephesus and House of the Virgin Mary on 8+ hour calls — or Ephesus Shore Excursion on 7-hour calls. See our first-timer guide.",
    },
    {
      question: "Where do cruise ships dock in Kuşadası?",
      answer: "At Kuşadası Cruise Port, a modern terminal 2–3 km north of the town centre. Walk or taxi to the bazaar; Ephesus needs a coach or taxi.",
    },
  ];
}
