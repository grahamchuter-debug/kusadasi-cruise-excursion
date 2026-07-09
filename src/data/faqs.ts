import type { FAQ } from "./types";
import { getHomepageFaqs } from "./homepage";

export const extraFaqs: FAQ[] = [
  {
    question: "Where do cruise ships dock in Kuşadası?",
    answer:
      "At Kuşadası Cruise Port, a modern terminal 2–3 km north of the town centre. Ephesus is 20 km east — not walkable from the gangway.",
  },
  {
    question: "How long does an Ephesus shore excursion take?",
    answer:
      "Typically 5–6 hours door-to-door including 25–35 minutes each way and 2.5–3 hours on site. Half-day tours compress to 4–5 hours.",
  },
  {
    question: "Can I visit Ephesus without a shore excursion?",
    answer:
      "Yes by taxi from the port — agree wait times and price. Organised tours handle tickets, guides and return buffers more reliably on busy days.",
  },
  {
    question: "What is the best Kuşadası excursion for first-time visitors?",
    answer:
      "Ephesus and House of the Virgin Mary on 8+ hour calls — or Ephesus Shore Excursion on 7-hour calls.",
  },
  {
    question: "Should I book excursions through my cruise line?",
    answer:
      "Ship tours guarantee the vessel waits if their excursion is late. Reputable independent operators track all-aboard with buffers — often smaller groups and lower prices.",
  },
  {
    question: "Is a Kuşadası port day long enough for Ephesus and Şirince?",
    answer:
      "Possible on 9+ hour calls via sirince-village-tour. Standard 8-hour calls suit Ephesus plus Virgin Mary — not all three sights at depth.",
  },
  {
    question: "How early should I return to the port from Ephesus?",
    answer:
      "Allow 25–35 minutes drive plus 60–90 minutes before all-aboard. Book excursions with ship-tracking for safest timing.",
  },
  {
    question: "What currency is used in Kuşadası?",
    answer:
      "The Turkish lira (TRY). Cards work in many shops and restaurants; carry cash for taxis, bazaar vendors and Ephesus facilities.",
  },
  {
    question: "Are Kuşadası shore excursions suitable for limited mobility?",
    answer:
      "Ephesus marble slopes challenge wheelchairs and walkers. Private tours with vehicle drops and shorter routes work better than full downhill walks.",
  },
  {
    question: "When is peak cruise season in Kuşadası?",
    answer:
      "April through October, with heaviest ship traffic June to September. Book Ephesus excursions before sailing in July and August.",
  },
];

export function getAllFaqs(): FAQ[] {
  return [...getHomepageFaqs(), ...extraFaqs];
}
