#!/usr/bin/env node
/**
 * Generates Kuşadası-specific content data files from structured definitions.
 * Run: node scripts/generate-kusadasi-data.mjs
 */
import { writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const DATA = join(import.meta.dirname, "..", "src/data");
mkdirSync(join(DATA, "imported-schedules"), { recursive: true });

function w(name, content) {
  writeFileSync(join(DATA, name), content, "utf8");
  console.log("wrote", name);
}

function esc(s) {
  return String(s).replace(/\\/g, "\\\\").replace(/"/g, '\\"');
}

const PORT_BASE =
  "Cruise ships dock at Kuşadası Cruise Port, a modern terminal 2–3 km north of the town centre. Ephesus lies near Selçuk, roughly 20 km east — typically 25–35 minutes by coach. Allow 5–10 minutes taxi to the bazaar or 15–20 minutes walk along the waterfront. Confirm your all-aboard time and keep a 60–90 minute buffer before departure.";

const GT = `[
      { method: "Walk from cruise port", detail: "Waterfront promenade to town centre bazaar and marina — flat route.", time: "15–20 min", cost: "Free" },
      { method: "Taxi from port", detail: "Metered taxis at terminal rank — fastest to town or Ephesus coach meeting points.", time: "5–10 min to town", cost: "₺100–200" },
      { method: "Shore excursion coach", detail: "Licensed operator with guide — Ephesus, Virgin Mary or village routes timed to all-aboard.", time: "Door-to-door", cost: "Tour price" },
    ]`;

const PORT_LOGISTICS =
  "Cruise ships dock at Kuşadası Cruise Port, a modern terminal 2–3 km north of the town centre. Ephesus lies near Selçuk, roughly 20 km east — typically 25–35 minutes by coach. Allow 5–10 minutes taxi to the bazaar or 15–20 minutes walk along the waterfront. Confirm your all-aboard time and keep a 60–90 minute buffer before departure.";

function faq(q, a) {
  return `{ question: "${esc(q)}", answer: "${esc(a)}" }`;
}

function rec(cat, title, desc, href) {
  return `{ category: "${cat}", title: "${esc(title)}", description: "${esc(desc)}", href: "${href}" }`;
}

function attraction(cfg) {
  return `  {
    slug: "${cfg.slug}",
    title: "${esc(cfg.title)}",
    seoTitle: "${esc(cfg.seoTitle)}",
    metaDescription: "${esc(cfg.meta)}",
    attractionName: "${esc(cfg.name)}",
    tagline: "${esc(cfg.tagline)}",
    overview: "${esc(cfg.overview)}",
    body: [
      "${esc(PORT_BASE)}",
      "${esc(cfg.body2)}",
      "${esc(cfg.body3)}",
    ],
    distanceFromPort: "${esc(cfg.distance)}",
    travelTime: "${esc(cfg.travel)}",
    timeNeeded: "${esc(cfg.timeNeeded)}",
    gettingThere: ${GT},
    highlights: [${cfg.highlights.map((h) => `"${esc(h)}"`).join(", ")}],
    tips: [${cfg.tips.map((t) => `"${esc(t)}"`).join(", ")}],
    faqs: [${cfg.faqs.map(([q, a]) => faq(q, a)).join(", ")}],
    relatedAttractionSlugs: [${cfg.related.map((r) => `"${r}"`).join(", ")}],
    relatedExcursionSlug: "${cfg.excursion}",
  }`;
}

function guide(cfg) {
  const recs = cfg.recommendations?.length
    ? `,\n    recommendations: [\n      ${cfg.recommendations.map((r) => rec(r.cat, r.title, r.desc, r.href)).join(",\n      ")}\n    ]`
    : "";
  return `  {
    slug: "${cfg.slug}",
    title: "${esc(cfg.title)}",
    seoTitle: "${esc(cfg.seoTitle)}",
    metaDescription: "${esc(cfg.meta)}",
    tagline: "${esc(cfg.tagline)}",
    overview: "${esc(cfg.overview)}",
    body: [
      "${esc(cfg.body1)}",
      "${esc(cfg.body2)}",
      "${esc(cfg.body3)}",
    ],
    highlights: [${cfg.highlights.map((h) => `"${esc(h)}"`).join(", ")}],
    tips: [${cfg.tips.map((t) => `"${esc(t)}"`).join(", ")}],
    faqs: [${cfg.faqs.map(([q, a]) => faq(q, a)).join(", ")}]${recs},
    relatedSlugs: [${cfg.related.map((r) => `"${r}"`).join(", ")}],
    imageKey: "${cfg.imageKey}",
    hubPath: "/guides",
  }`;
}

function excursion(cfg) {
  const featured = cfg.featured ? ",\n    featured: true" : "";
  return `  {
    slug: "${cfg.slug}",
    title: "${esc(cfg.title)}",
    seoTitle: "${esc(cfg.seoTitle)}",
    metaDescription: "${esc(cfg.meta)}",
    category: "${esc(cfg.category)}",
    tagline: "${esc(cfg.tagline)}",
    duration: "${esc(cfg.duration)}",
    pace: "${cfg.pace}",
    bestFor: "${esc(cfg.bestFor)}",
    overview: "${esc(cfg.overview)}",
    body: [
      "${esc(cfg.body1)}",
      "${esc(cfg.body2)}",
      "${esc(cfg.body3)}",
    ],
    highlights: [${cfg.highlights.map((h) => `"${esc(h)}"`).join(", ")}],
    included: [${cfg.included.map((i) => `"${esc(i)}"`).join(", ")}],
    portLogistics: PORT_LOGISTICS,
    tips: [${cfg.tips.map((t) => `"${esc(t)}"`).join(", ")}],
    faqs: [${cfg.faqs.map(([q, a]) => faq(q, a)).join(", ")}],
    relatedExcursionSlugs: [${cfg.related.map((r) => `"${r}"`).join(", ")}]${featured},
  }`;
}

function versus(cfg) {
  const seo =
    cfg.seoTitle ??
    `${cfg.optionA} vs ${cfg.optionB} — Kuşadası Cruise Passengers`;
  return `  {
    slug: "${cfg.slug}",
    title: "${esc(cfg.optionA)} vs ${esc(cfg.optionB)}",
    seoTitle: "${esc(seo)}",
    metaDescription: "${esc(cfg.summary)}",
    kind: "versus",
    optionA: "${esc(cfg.optionA)}",
    optionB: "${esc(cfg.optionB)}",
    summary: "${esc(cfg.summary)}",
    verdict: "${esc(cfg.verdict)}",
    overview: [${cfg.overview.map((o) => `"${esc(o)}"`).join(", ")}],
    comparisonTable: [${cfg.table.map((r) => `{ category: "${esc(r.category)}", optionA: "${esc(r.optionA)}", optionB: "${esc(r.optionB)}" }`).join(", ")}],
    faqs: [${cfg.faqs.map(([q, a]) => faq(q, a)).join(", ")}],
    relatedSlugs: [${cfg.related.map((r) => `"${r}"`).join(", ")}],
    imageKey: "${cfg.imageKey}",
  }`;
}

function comparisonGuide(cfg) {
  return `  {
    slug: "${cfg.slug}",
    title: "${esc(cfg.title)}",
    seoTitle: "${esc(cfg.seoTitle)}",
    metaDescription: "${esc(cfg.meta)}",
    kind: "guide",
    summary: "${esc(cfg.summary)}",
    verdict: "${esc(cfg.verdict)}",
    overview: [${cfg.overview.map((o) => `"${esc(o)}"`).join(", ")}],
    guideItems: [${cfg.guideItems.map((g) => `{
        name: "${esc(g.name)}",
        slug: "${g.slug}",
        href: "${g.href}",
        reason: "${esc(g.reason)}",
        topExcursion: "${esc(g.topExcursion)}",
        returnConfidence: "${esc(g.returnConfidence)}",
        walkingDifficulty: "${esc(g.walkingDifficulty)}",
      }`).join(", ")}],
    faqs: [${cfg.faqs.map(([q, a]) => faq(q, a)).join(", ")}],
    relatedSlugs: [${cfg.related.map((r) => `"${r}"`).join(", ")}],
    imageKey: "${cfg.imageKey}",
  }`;
}

function planningPage(cfg) {
  const recs = cfg.recs?.length
    ? `,\n    recommendations: [\n      ${cfg.recs.map((r) => rec(r.c, r.t, r.d, r.h)).join(",\n      ")}\n    ]`
    : "";
  return `  {
    slug: "${cfg.s}",
    title: "${esc(cfg.title)}",
    seoTitle: "${esc(cfg.seo)}",
    metaDescription: "${esc(cfg.meta)}",
    tagline: "${esc(cfg.tag)}",
    overview: "${esc(cfg.ov)}",
    body: ["${esc(cfg.b1)}", "${esc(cfg.b2)}", "${esc(cfg.b3)}"],
    highlights: [${cfg.hi.map((x) => `"${esc(x)}"`).join(", ")}],
    tips: [${cfg.ti.map((x) => `"${esc(x)}"`).join(", ")}],
    faqs: [${faq(cfg.q1 ?? "Is this relevant on a Kuşadası port day?", cfg.a1 ?? "Yes — Kuşadası sits on most Eastern Mediterranean and Greek Isles itineraries from April through October.")}, ${faq(cfg.q2 ?? "Where can I plan other ports?", cfg.a2 ?? "See our Mediterranean cruise planning hub for Athens, Rhodes, Santorini and multi-port itineraries.")}]${recs},
    relatedSlugs: [${cfg.rel.map((s) => `"${s}"`).join(", ")}],
    imageKey: "${cfg.img}",
    hubPath: "/plan-your-cruise-holiday",
  }`;
}

// ─── HIGHLIGHTS (12+ AttractionPage guides) ─────────────────────────────────

const attractions = [
  {
    slug: "ephesus-guide",
    name: "Ancient Ephesus",
    title: "Ephesus Guide from Kuşadası Cruise Port",
    seoTitle: "Ephesus Guide from Kuşadası — Library, Theatre & Marble Streets",
    meta: "Visit Ancient Ephesus from Kuşadası cruise port — Library of Celsus, Great Theatre, marble Curetes Street and realistic timings for cruise passengers.",
    tagline: "One of the Mediterranean's greatest Roman cities — marble streets where St Paul once walked.",
    overview:
      "Ancient Ephesus is the reason cruise ships call at Kuşadası. This vast Greco-Roman city near Selçuk ranks among the world's best-preserved classical sites — Library of Celsus, Great Theatre and colonnaded streets that feel almost intact. From the cruise port it is roughly 20 km (25–35 minutes by coach).",
    body2:
      "Most shore excursions enter via the upper Magnesia Gate and walk downhill through the site — the sensible direction. Allow 2–3 hours minimum for the core: Library of Celsus, Curetes Street, Temple of Hadrian, public latrines and Great Theatre. The Terrace Houses add another 45–60 minutes and a separate ticket.",
    body3:
      "Summer heat is brutal on exposed marble — arrive early, wear a hat and carry water. Cruise crowds peak 10:00–14:00 when multiple ships are in port. Kuşadası's short transfer makes Ephesus viable even on half-day calls; Izmir callers face an 80 km journey for the same sight.",
    distance: "20 km / 25–35 min coach from Kuşadası Cruise Port",
    travel: "25–35 minutes by excursion coach or taxi to Selçuk",
    timeNeeded: "Allow 2.5–4 hours on site",
    highlights: ["Library of Celsus facade", "Great Theatre — 25,000 seats", "Marble Curetes Street", "Temple of Hadrian", "Public latrines and agora"],
    tips: ["Book excursions before sailing in July and August", "Walk downhill through the site — not uphill", "Terrace Houses ticket is separate — decide before you arrive"],
    faqs: [
      ["Is Ephesus worth it from Kuşadası?", "Absolutely — it is the unmissable sight and only 20 km from the port. The port town alone does not justify the call."],
      ["How long do I need at Ephesus?", "2.5 hours minimum for highlights; 3.5–4 hours with Terrace Houses and a slower pace."],
    ],
    related: ["library-of-celsus-guide", "great-theatre-ephesus-guide", "terrace-houses-ephesus-guide"],
    excursion: "ephesus-shore-excursion",
  },
  {
    slug: "library-of-celsus-guide",
    name: "Library of Celsus",
    title: "Library of Celsus Guide — Ephesus from Cruise Port",
    seoTitle: "Library of Celsus Ephesus — Cruise Port Guide & Photo Tips",
    meta: "The Library of Celsus at Ephesus — history, best photo angles and how to reach it from Kuşadası cruise port on a shore excursion or independent visit.",
    tagline: "Ephesus's iconic two-storey facade — the postcard shot every cruise passenger wants.",
    overview:
      "The Library of Celsus is Ephesus's most photographed monument — a reconstructed Roman facade that once held 12,000 scrolls. It sits on Curetes Street near the lower entrance and draws the heaviest crowds between 10:00 and 14:00.",
    body2:
      "Built around AD 125 in honour of Tiberius Julius Celsus Polemaeanus, the library faced east so morning light illuminates the columns — best for photography before 11:00. The niches once held statues representing wisdom, knowledge, intelligence and virtue.",
    body3:
      "You cannot enter the library interior — viewing is from the street level. Combine with the Great Theatre five minutes further downhill. On tight schedules, see the library first while energy and light are good, then continue to the theatre.",
    distance: "20 km from Kuşadası port — mid-site on Curetes Street",
    travel: "25–35 min coach, then 15–20 min walk from upper gate",
    timeNeeded: "Allow 20–30 minutes including photos",
    highlights: ["Two-storey Corinthian facade", "Morning light on east-facing columns", "Curetes Street context", "Statue niches and inscriptions"],
    tips: ["Arrive before 10:00 for fewer people in frame", "Stand on the lower terrace for classic symmetrical shots", "Do not block the path — guides move groups quickly"],
    faqs: [
      ["Can I see the Library without a full Ephesus ticket?", "No — it is inside the paid archaeological site."],
      ["Best time for photos?", "First hour after site opening or late afternoon — harsh midday sun flattens the facade."],
    ],
    related: ["ephesus-guide", "photography-ephesus-guide", "great-theatre-ephesus-guide"],
    excursion: "ancient-ephesus-highlights-tour",
  },
  {
    slug: "great-theatre-ephesus-guide",
    name: "Great Theatre of Ephesus",
    title: "Great Theatre Ephesus Guide from Kuşadası",
    seoTitle: "Great Theatre Ephesus — Cruise Passenger Guide & Timings",
    meta: "The Great Theatre at Ephesus — 25,000-seat Roman amphitheatre, St Paul history and how to include it on a Kuşadası port day.",
    tagline: "Twenty-five thousand seats carved into the hillside — where Ephesus gathered and St Paul was shouted down.",
    overview:
      "The Great Theatre of Ephesus could hold 25,000 spectators — one of the largest ancient theatres in the world. It sits at the western end of the site and is where St Paul addressed the Ephesian crowd, according to Acts 19.",
    body2:
      "The theatre was expanded under Roman emperors and used for gladiatorial contests as well as drama. Climbing the upper tiers rewards you with views over the orchestra, stage foundations and the harbour plain beyond — Ephesus was once a major port before the Cayster River silted up.",
    body3:
      "The climb to the top rows is steep and exposed in summer sun. Moderate fitness is enough; allow 20–30 minutes if you want upper-tier panoramas. Guides often give a talk at orchestra level — stay for context before climbing.",
    distance: "20 km from port — lower-west end of Ephesus site",
    travel: "25–35 min coach plus downhill walk through site",
    timeNeeded: "Allow 20–40 minutes depending on climb",
    highlights: ["25,000-seat capacity", "St Paul biblical connection", "Upper-tier panorama over site", "Roman gladiatorial history"],
    tips: ["Wear grippy shoes on marble steps", "Hold the handrail on upper tiers — no barriers everywhere", "Afternoon sun hits the climb hard — do it before midday if possible"],
    faqs: [
      ["Is the climb safe?", "Generally yes — but marble is slippery when wet and steep near the top. Take your time."],
      ["Theatre or Library if time is tight?", "Library is quicker and more iconic for photos; theatre is essential for scale and biblical history."],
    ],
    related: ["ephesus-guide", "library-of-celsus-guide", "biblical-sites-kusadasi-guide"],
    excursion: "ephesus-shore-excursion",
  },
  {
    slug: "terrace-houses-ephesus-guide",
    name: "Terrace Houses (Ephesus)",
    title: "Terrace Houses Ephesus Guide — Worth the Extra Ticket?",
    seoTitle: "Ephesus Terrace Houses — Cruise Port Guide & Ticket Tips",
    meta: "The Terrace Houses at Ephesus — Roman frescoes, mosaics and covered walkways. Is the extra ticket worth it on a Kuşadası cruise port day?",
    tagline: "Wealthy Roman apartments with intact mosaics — Ephesus's premium add-on.",
    overview:
      "The Terrace Houses (Yamaç Evleri) are a separate ticketed section on the slope above Curetes Street — multi-storey Roman residences with frescoes, mosaics and heating systems that reveal how Ephesus's elite lived.",
    body2:
      "A covered walkway and glass floors protect the fragile interiors. Guides explain heating ducts, dining rooms and the social hierarchy visible in floor mosaics. The visit is one-way and takes 45–60 minutes at a moderate pace.",
    body3:
      "Worth it if you have already seen Ephesus once or have a standard 8+ hour port call with time beyond the core highlights. On short calls or first visits with limited time, prioritise Library and Theatre first — see our terrace-houses-worth-it comparison.",
    distance: "20 km from port — upper slope within Ephesus site",
    travel: "Same coach as main Ephesus visit",
    timeNeeded: "Allow 45–60 minutes inside",
    highlights: ["Roman frescoes and wall paintings", "Intact floor mosaics", "Covered conservation walkway", "Elite domestic architecture"],
    tips: ["Buy the combined ticket at the gate if offered", "No flash photography inside — respect conservation rules", "One-way route — no re-entry"],
    faqs: [
      ["Is the extra ticket worth it?", "Yes for archaeology enthusiasts and repeat visitors; optional on first tight visits."],
      ["Can I skip it and still enjoy Ephesus?", "Absolutely — the main site is extraordinary without Terrace Houses."],
    ],
    related: ["ephesus-guide", "terrace-houses-worth-it", "terrace-houses-ephesus-tour"],
    excursion: "terrace-houses-ephesus-tour",
  },
  {
    slug: "house-of-virgin-mary-guide",
    name: "House of the Virgin Mary",
    title: "House of the Virgin Mary Guide from Kuşadası",
    seoTitle: "House of the Virgin Mary — Kuşadası Cruise Port Guide",
    meta: "Visit the House of the Virgin Mary near Ephesus from Kuşadası cruise port — biblical history, modest dress, timings and combination tours.",
    tagline: "A peaceful mountain shrine above Ephesus — pilgrimage site and quiet contrast to the ruins below.",
    overview:
      "The House of the Virgin Mary (Meryem Ana Evi) sits on Bulbul Mountain above Ephesus — a small stone chapel where tradition holds that Mary spent her final years. Pope Paul VI visited in 1967; it remains an active pilgrimage site for Christians and Muslims alike.",
    body2:
      "The drive from Ephesus takes 10–15 minutes up a winding road. The chapel interior is small — a few minutes inside — but the atmosphere and mountain views reward the detour. A wall of petition notes and a wishing well sit outside; modest dress is required (shoulders and knees covered).",
    body3:
      "Most cruise passengers combine Virgin Mary with Ephesus on one excursion — our Editor's Choice tour sequences both with return timing to the ship. Independent visits need taxi coordination from Selçuk; not practical to walk from Ephesus.",
    distance: "22 km from port — 8 km above Ephesus near Selçuk",
    travel: "25–35 min to Ephesus area, then 10–15 min up mountain road",
    timeNeeded: "Allow 45–60 minutes including drive from Ephesus",
    highlights: ["Stone chapel shrine", "Mountain forest setting", "Pilgrimage and petition wall", "Biblical and Marian tradition"],
    tips: ["Cover shoulders and knees — scarves available at entrance", "Combine with Ephesus on same excursion for best logistics", "Quiet voices inside the chapel"],
    faqs: [
      ["House of Virgin Mary or Ephesus only?", "Ephesus is the priority on short calls; add Virgin Mary on standard 8+ hour calls if biblical sites matter to you."],
      ["Is it authentic?", "Archaeological evidence is debated; it remains a significant faith site regardless of scholarly opinion."],
    ],
    related: ["biblical-sites-kusadasi-guide", "ephesus-guide", "house-of-virgin-mary-or-ephesus"],
    excursion: "ephesus-and-house-of-virgin-mary-tour",
  },
  {
    slug: "sirince-village-guide",
    name: "Şirince Village",
    title: "Şirince Village Guide from Kuşadası Cruise Port",
    seoTitle: "Şirince Village Shore Excursion — Wine, Crafts & Ottoman Lanes",
    meta: "Şirince village near Ephesus — Ottoman stone houses, fruit wine, olive oil and realistic timings from Kuşadası cruise port.",
    tagline: "Hillside Ottoman village — wine tasting and craft shops ten minutes from Ephesus.",
    overview:
      "Şirince is a restored hillside village 8 km east of Selçuk — stone houses, narrow lanes, fruit-wine shops and olive-oil tastings. It offers a gentler Turkish cultural contrast after the intensity of Ephesus ruins.",
    body2:
      "Excursions typically allow 60–90 minutes free time for lunch, wine tasting and browsing — the village is compact. Weekends and multi-ship days bring tour groups; weekday port calls feel calmer. Authentic enough to enjoy; touristy enough to expect souvenir prices.",
    body3:
      "Do not attempt Şirince plus full Ephesus plus Virgin Mary on calls under 8 usable hours — something will be rushed. Şirince pairs best with a half-day Ephesus highlights tour or as the cultural anchor when someone in your party has already seen the ruins.",
    distance: "28 km from Kuşadası port — 8 km from Selçuk",
    travel: "30–40 min coach from port; 10 min from Ephesus",
    timeNeeded: "Allow 1–1.5 hours in the village",
    highlights: ["Ottoman stone architecture", "Fruit wine and olive oil tastings", "Hillside lane photography", "Local crafts and textiles"],
    tips: ["Try small wine samples before buying bottles", "Wear comfortable shoes on cobbled slopes", "Lunch reservations help on busy Sundays"],
    faqs: [
      ["Şirince or Ephesus on a short call?", "Ephesus always — Şirince is a secondary cultural add-on."],
      ["Is Şirince worth the detour?", "Yes if you want village atmosphere and tastings after ruins — skip if archaeology is your only priority."],
    ],
    related: ["ephesus-guide", "turkish-food-kusadasi-guide", "sirince-village-tour"],
    excursion: "sirince-village-tour",
  },
  {
    slug: "temple-of-hadrian-ephesus-guide",
    name: "Temple of Hadrian",
    title: "Temple of Hadrian Ephesus Guide",
    seoTitle: "Temple of Hadrian Ephesus — Cruise Port Visitor Guide",
    meta: "The Temple of Hadrian on Curetes Street at Ephesus — Roman architecture, reliefs and where it fits on a Kuşadası shore excursion.",
    tagline: "Ornate Roman temple on the marble street — Medusa reliefs and imperial dedication.",
    overview:
      "The Temple of Hadrian stands on Curetes Street between the Baths of Scholastica and the Terrace Houses slope — a beautifully restored Roman temple with intricate reliefs including Medusa and mythological scenes.",
    body2:
      "Most visitors pass it en route between the upper gate and Library of Celsus — easy to photograph from the street without a long stop. Guides typically pause here for five to ten minutes to explain the friezes and the cult of Emperor Hadrian.",
    body3:
      "It is part of the main Ephesus ticket — no separate entry. Combine naturally with Library of Celsus five minutes downhill. Morning light catches the facade before crowds cluster.",
    distance: "20 km from port — mid-site on Curetes Street",
    travel: "Included in standard Ephesus coach excursion",
    timeNeeded: "Allow 5–15 minutes",
    highlights: ["Restored Corinthian facade", "Medusa and mythological reliefs", "Curetes Street setting", "Imperial cult architecture"],
    tips: ["Pause here on the way down — easy to rush past", "Read the frieze panels with your guide", "Wide-angle lens fits the narrow street context"],
    faqs: [
      ["Separate ticket needed?", "No — included in main Ephesus archaeological site admission."],
      ["Skip if short on time?", "You will likely pass it anyway — a brief stop costs little time."],
    ],
    related: ["ephesus-guide", "library-of-celsus-guide", "photography-ephesus-guide"],
    excursion: "ancient-ephesus-highlights-tour",
  },
  {
    slug: "turkish-food-kusadasi-guide",
    name: "Turkish Food in Kuşadası",
    title: "Turkish Food Guide — Kuşadası Cruise Port",
    seoTitle: "Turkish Food Kuşadası — What to Eat on a Cruise Port Day",
    meta: "What to eat in Kuşadası on a cruise port day — meze, kebabs, gözleme, Turkish tea and where to find honest food near the port and bazaar.",
    tagline: "Meze, grilled fish and sweet Turkish tea — authentic flavours between Ephesus and the waterfront.",
    overview:
      "Kuşadası's waterfront bazaar and marina offer reliable Turkish food without needing a long detour. Shore excursions often include lunch near Ephesus or Şirince; independent passengers can eat well in town before or after ruins.",
    body2:
      "Try meze platters (hummus, ezme, dolma), grilled sea bass or köfte, and gözleme from market stalls. Turkish breakfast is excellent if your ship arrives early — menemen (eggs with tomato and pepper) and simit bread. Sweet baklava and Turkish delight make portable souvenirs.",
    body3:
      "Restaurants on the main waterfront promenade charge tourist premiums — one street back from the marina often delivers better value. Excursion lunches at carpet-show venues are common — food is usually decent but sales pitches follow; independent diners avoid that pattern.",
    distance: "Town centre 2–3 km from cruise terminal",
    travel: "15–20 min walk or 5–10 min taxi from port",
    timeNeeded: "Allow 60–90 minutes for sit-down lunch",
    highlights: ["Meze and grilled seafood", "Gözleme and simit street food", "Turkish tea and coffee culture", "Şirince fruit wine on excursion routes"],
    tips: ["Carry cash for small vendors — cards not universal", "Say no firmly to aggressive restaurant touts", "Excursion lunch often included — check your booking"],
    faqs: [
      ["Is food safe for cruise passengers?", "Generally yes at busy waterfront restaurants — choose places with turnover."],
      ["Vegetarian options?", "Meze platters, gözleme, salads and lentil soup (mercimek çorbası) are widely available."],
    ],
    related: ["sirince-village-guide", "turkish-currency-guide", "kusadasi-town-and-beach-tour"],
    excursion: "kusadasi-town-and-beach-tour",
  },
  {
    slug: "turkish-currency-guide",
    name: "Turkish Lira & Payments",
    title: "Turkish Currency Guide for Cruise Passengers",
    seoTitle: "Turkish Lira Kuşadası — Cash, Cards & Tipping for Cruise Visitors",
    meta: "Turkish lira, ATMs, card payments and tipping etiquette for Kuşadası cruise passengers — practical money advice for Ephesus port days.",
    tagline: "Lira, cards and cash — what works at the port, Ephesus and village shops.",
    overview:
      "Turkey uses the Turkish lira (TRY, symbol ₺). Kuşadası is tourist-ready — cards work at many restaurants and larger shops — but cash still matters for taxis, small vendors, Ephesus toilets and market haggling.",
    body2:
      "ATMs sit at the cruise terminal and in the town bazaar. Withdraw on the ship or early ashore on multi-ship days when machines run low. Excursions priced in euros or dollars on booking sites often settle in lira locally — confirm when you pay.",
    body3:
      "Tipping: round up taxis slightly; 10% at sit-down restaurants if service is good; modest tips for guides are appreciated on private tours. Carpet and leather showrooms build commission into prices — compare before large purchases.",
    distance: "ATMs at terminal and town centre bazaar",
    travel: "N/A — plan before leaving ship",
    timeNeeded: "N/A — financial planning",
    highlights: ["Turkish lira (TRY) is local currency", "Cards at larger establishments", "Cash for taxis and small vendors", "Euros sometimes accepted at premium"],
    tips: ["Notify your bank before travel", "Carry ₺500–1000 for a DIY day", "Avoid street changers — use ATMs"],
    faqs: [
      ["Should I bring euros or dollars?", "Lira from ATMs is best — some shops quote euros at poor rates."],
      ["Cards at Ephesus?", "Main ticket booths take cards; toilets and small stalls often cash only."],
    ],
    related: ["independent-kusadasi-guide", "turkish-food-kusadasi-guide", "what-to-wear-turkey-guide"],
    excursion: "kusadasi-town-and-beach-tour",
  },
  {
    slug: "what-to-wear-turkey-guide",
    name: "What to Wear in Turkey",
    title: "What to Wear on a Kuşadası Cruise Port Day",
    seoTitle: "What to Wear Turkey Cruise Port — Ephesus Heat, Modesty & Shoes",
    meta: "What to wear in Kuşadası and Ephesus on a cruise port day — sun protection, modest dress for shrines and footwear for marble ruins.",
    tagline: "Sun hat, grippy shoes and a shoulder scarf — the practical Turkey packing trio.",
    overview:
      "Kuşadası and Ephesus demand sun protection and sensible footwear. Marble ruins reflect heat; the House of the Virgin Mary requires modest dress. The port town is relaxed resort wear — churches and shrines are not.",
    body2:
      "Ephesus: trainers or hiking sandals with grip — not flip-flops on marble slopes. Hat, sunscreen, light breathable layers. Virgin Mary shrine: shoulders and knees covered; carry a scarf. Şirince: comfortable walking shoes on cobbles.",
    body3:
      "Summer (June–September) regularly exceeds 35°C in open ruins — start early, hydrate constantly. Spring and autumn are kinder for all-day touring. Rain is rare in peak season but marble becomes dangerously slippery when wet.",
    distance: "N/A — packing advice",
    travel: "N/A",
    timeNeeded: "N/A",
    highlights: ["Grippy closed-toe shoes for Ephesus", "Hat and sunscreen essential", "Scarf for Virgin Mary shrine", "Light layers for coach AC"],
    tips: ["Pack water bottle — refill where possible", "Avoid white soles on wet marble", "Dress modestly if entering mosques in town"],
    faqs: [
      ["Can I wear shorts at Ephesus?", "Yes at the ruins — cover up for Virgin Mary shrine."],
      ["Sandals OK?", "Only sturdy ones with grip — marble slopes are unforgiving."],
    ],
    related: ["best-time-visit-ephesus-guide", "ephesus-guide", "house-of-virgin-mary-guide"],
    excursion: "ephesus-shore-excursion",
  },
  {
    slug: "best-time-visit-ephesus-guide",
    name: "Best Time to Visit Ephesus",
    title: "Best Time to Visit Ephesus from Kuşadası",
    seoTitle: "Best Time to Visit Ephesus — Crowds, Heat & Cruise Timing",
    meta: "When to visit Ephesus from Kuşadası — crowd patterns, summer heat, opening times and how to beat the cruise-ship rush.",
    tagline: "Early morning beats the heat and the coach convoys — timing matters at Ephesus.",
    overview:
      "Ephesus opens around 08:00 (times vary seasonally). The best window for cruise passengers is the first 90 minutes after opening — cooler temperatures and fewer coach groups. By 11:00 the marble streets fill and shade disappears.",
    body2:
      "Peak cruise season runs April through October, with heaviest ship traffic June to September. Multiple ships in Kuşadası on the same day mean Ephesus gridlock 10:00–14:00. Book excursions with early departure slots — not all operators start first.",
    body3:
      "Spring (April–May) and autumn (September–October) offer the best balance of weather and crowds. Winter calls are rare but pleasantly quiet — shorter opening hours. Check site closing time against your all-aboard — gates enforce exit.",
    distance: "20 km from port",
    travel: "First coach departures 08:00–08:30 from port",
    timeNeeded: "Plan site time around opening-hour strategy",
    highlights: ["08:00–10:00 sweet spot", "June–August extreme heat", "Multi-ship days crowd 10:00–14:00", "Spring and autumn ideal"],
    tips: ["Book earliest excursion slot available", "Check ship schedule for shared port days", "Carry 2 litres water in summer"],
    faqs: [
      ["What are Ephesus opening hours?", "Typically 08:00–18:00 summer; shorter in winter — verify on official site before sailing."],
      ["Afternoon visit OK?", "Possible but hotter and busier — morning strongly preferred."],
    ],
    related: ["ephesus-guide", "photography-ephesus-guide", "ephesus-cruise-guide"],
    excursion: "half-day-ephesus-tour",
  },
  {
    slug: "photography-ephesus-guide",
    name: "Photography at Ephesus",
    title: "Ephesus Photography Guide for Cruise Visitors",
    seoTitle: "Ephesus Photography Tips — Best Angles & Light from Kuşadası",
    meta: "Photography tips for Ephesus from Kuşadası cruise port — Library of Celsus angles, crowd avoidance, gear advice and drone rules.",
    tagline: "Marble, columns and golden light — how to shoot Ephesus without the crowd in frame.",
    overview:
      "Ephesus is one of the Mediterranean's most photogenic archaeological sites — if you manage light and crowds. The Library of Celsus faces east; morning sun is best. The Great Theatre offers dramatic scale from upper tiers.",
    body2:
      "Wide-angle lenses suit narrow Curetes Street and the library facade. Telephoto compresses columns and isolates details on the Temple of Hadrian. Tripods are generally restricted in busy sections — check on entry. Drones are not permitted at the site.",
    body3:
      "Shoot the library first on arrival before groups assemble. Use portrait orientation for columns and facade symmetry. Terrace Houses require no flash — high ISO or steady hands inside the covered walkway.",
    distance: "20 km from port",
    travel: "Early excursion departure for best light",
    timeNeeded: "Allow extra 15–20 min at key spots",
    highlights: ["Library east-facing morning light", "Great Theatre upper-tier panoramas", "Curetes Street leading lines", "Temple of Hadrian relief details"],
    tips: ["No drones at archaeological site", "Patience beats pushing through tour groups", "Polarising filter helps harsh midday marble glare"],
    faqs: [
      ["Drones allowed?", "No — prohibited at Ephesus and most Turkish archaeological sites."],
      ["Best spot for the classic library shot?", "Lower terrace centre-line — arrive early or accept people in frame."],
    ],
    related: ["library-of-celsus-guide", "ephesus-guide", "great-theatre-ephesus-guide"],
    excursion: "private-ephesus-tour",
  },
];

w(
  "highlights.ts",
  `import type { AttractionPage } from "./types";

export const highlights: AttractionPage[] = [
${attractions.map(attraction).join(",\n")}
];

export function getHighlightBySlug(slug: string): AttractionPage | undefined {
  return highlights.find((p) => p.slug === slug);
}

export function getAllHighlightSlugs(): string[] {
  return highlights.map((p) => p.slug);
}
`,
);

// ─── EXPERIENCES (audience GuidePage guides) ─────────────────────────────────

const experiences = [
  {
    slug: "kusadasi-for-first-time-visitors",
    title: "Kuşadası for First-Time Visitors",
    seoTitle: "Kuşadası for First-Time Cruise Visitors — Ephesus & Port Day Guide",
    meta: "First time in Kuşadası on a cruise? Ephesus is the anchor — port town, Virgin Mary and Şirince with realistic timing from the cruise terminal.",
    tagline: "Ephesus first, port town second — how to use your first Kuşadası call well.",
    overview:
      "First-time Kuşadası callers almost always come for Ephesus — one of the world's greatest Roman cities, just 20 km from the gangway. The port town is pleasant for shopping and lunch but not why ships stop here.",
    body1:
      "Standard 8–10 hour calls suit our Editor's Choice Ephesus and House of the Virgin Mary tour, or a full Ephesus highlights excursion with Terrace Houses if archaeology is your passion. Short calls under 6 usable hours: half-day Ephesus only — skip Şirince and town browsing.",
    body2:
      "Book Ephesus excursions before sailing in July and August. Multi-ship days fill coaches and site entrances by mid-morning — early departure slots matter more than at walkable European ports.",
    body3:
      "Do not try Ephesus, Virgin Mary, Şirince and a beach afternoon on one standard call — pick Ephesus plus one add-on. Keep a 60–90 minute return buffer; Selçuk road traffic can surprise afternoon planners.",
    highlights: ["Ephesus Editor's Choice on standard calls", "Half-day Ephesus on short calls", "Port town walk if you skip ruins"],
    tips: ["Book early in peak season", "Wear grippy shoes and sun protection", "Read is-ephesus-worth-visiting if unsure"],
    faqs: [
      ["Ephesus or port town for first-timers?", "Ephesus without question — the port bazaar is a bonus, not the main event."],
      ["Virgin Mary on a first visit?", "Worth adding on 8+ hour calls if biblical sites interest you."],
    ],
    recommendations: [
      { cat: "editors-choice", title: "Ephesus & House of the Virgin Mary", desc: "Ancient ruins and mountain shrine sequenced with expert timing.", href: "/shore-excursions/ephesus-and-house-of-virgin-mary-tour" },
      { cat: "best-short-port", title: "Half-Day Ephesus Tour", desc: "Core highlights when hours are tight.", href: "/shore-excursions/half-day-ephesus-tour" },
      { cat: "best-value", title: "Best excursions ranked", desc: "Our first-timer comparison guide.", href: "/compare/best-excursion-first-time-visitors" },
    ],
    related: ["independent-kusadasi-guide", "ephesus-cruise-guide", "one-day-in-kusadasi"],
    imageKey: "history",
  },
  {
    slug: "independent-kusadasi-guide",
    title: "Independent Kuşadası Guide — DIY from the Cruise Port",
    seoTitle: "Independent Kuşadası Guide — Walking, Taxis, Ephesus & Timings",
    meta: "Explore Kuşadası independently from the cruise port — walking route, port facilities, taxi costs, Ephesus access, tickets, heat, shoes, cafés, shopping, currency, safety and return planning.",
    tagline: "Port promenade to bazaar — and when Ephesus needs a coach, not a taxi gamble.",
    overview:
      "Kuşadası splits into two experiences: the port town (walkable, pleasant, secondary) and Ephesus (essential, 20 km away, needs planning). This guide covers both — walking from the ship, taxi fares, Ephesus tickets, opening times, heat, footwear, food, currency, safety and getting back before all-aboard.",
    body1:
      "Walking from ship: exit terminal, follow waterfront promenade south 15–20 minutes to the bazaar and marina. Flat, signed, safe. Taxis at terminal rank: ₺100–200 to town centre (5–10 min). Port facilities include toilets, ATMs, tourist information and excursion meeting points — no shuttle needed for town.",
    body2:
      "Ephesus independently: taxi to Selçuk ₺400–600 each way (agree price or insist on meter); minibus (dolmuş) cheaper but slower. Site tickets at gate — allow queue time. Opening roughly 08:00–18:00 summer. Walk downhill from upper gate. Heat exceeds 35°C June–August — hat, 2L water, grippy trainers. Terrace Houses need separate ticket. Return: allow 35 min drive plus 60–90 min buffer.",
    body3:
      "Cafés on waterfront charge premiums — one street inland is cheaper. Shopping: leather, carpets, spices — compare prices, haggle politely. Currency: Turkish lira from ATMs; cash for taxis and small vendors. Safety: generally safe; watch bags in bazaar crowds. Independent Ephesus works for confident travellers; organised tours remove ticket, timing and meeting-point stress — see can-you-visit-ephesus-independently.",
    highlights: ["15–20 min walk to bazaar", "Ephesus 25–35 min by road", "Tickets at gate — queue at peak", "₺100–200 taxi port to town", "60–90 min return buffer essential"],
    tips: ["Withdraw lira early on multi-ship days", "Download offline maps", "Pre-book return taxi if going to Ephesus DIY"],
    faqs: [
      ["Can I visit without any excursion?", "Yes for port town walks; Ephesus DIY is possible but needs taxi discipline and time awareness."],
      ["How much cash for a DIY day?", "₺1,500–2,500 plus lunch covers taxis, Ephesus tickets and snacks."],
    ],
    recommendations: [
      { cat: "best-independent", title: "Can you visit Ephesus independently?", desc: "Honest comparison of DIY vs guided.", href: "/compare/can-you-visit-ephesus-independently" },
      { cat: "editors-choice", title: "Ephesus Shore Excursion", desc: "When you want logistics handled.", href: "/shore-excursions/ephesus-shore-excursion" },
      { cat: "best-value", title: "Private vs group tour", desc: "Trade-offs for your party size.", href: "/compare/private-tour-vs-group-tour" },
    ],
    related: ["can-you-visit-ephesus-independently", "turkish-currency-guide", "what-to-wear-turkey-guide"],
    imageKey: "city",
  },
  {
    slug: "one-day-in-kusadasi",
    title: "One Day in Kuşadası — Sample Cruise Itinerary",
    seoTitle: "One Day in Kuşadası — Hour-by-Hour Cruise Port Itinerary",
    meta: "One day in Kuşadası on a cruise — sample hour-by-hour itinerary for Ephesus, Virgin Mary, port town and return-to-ship timing.",
    tagline: "Gangway to all-aboard — a realistic Kuşadası port day hour by hour.",
    overview:
      "A standard Kuşadası port day centres on Ephesus. This sample itinerary assumes an 08:00 arrival and 17:00 departure with a booked morning excursion — adjust for your ship's actual times.",
    body1:
      "08:00–08:30: Disembark, meet excursion at terminal exit. 08:30–09:15: Coach to Ephesus via Selçuk. 09:15–12:00: Ephesus downhill walk — Library, Curetes Street, Theatre. 12:00–12:45: House of Virgin Mary (if on combination tour) or coach depart for lunch.",
    body2:
      "12:45–13:45: Lunch near Selçuk or Şirince (excursion-dependent). 14:00–15:00: Return coach to Kuşadası. 15:00–16:00: Optional bazaar stroll, marina coffee or beach dip if energy remains. 16:00: Head to terminal — do not cut this close.",
    body3:
      "Short-call variant (6 usable hours): half-day Ephesus only, straight return — no town time. Independent variant: walk bazaar morning if skipping ruins (not recommended first visit). Always confirm all-aboard — usually 30–60 minutes before departure.",
    highlights: ["Morning Ephesus when cool", "Virgin Mary on combination tours", "Afternoon bazaar only if time allows"],
    tips: ["Never schedule Şirince plus full Ephesus plus town on 8-hour calls", "Be at terminal 60–90 min before all-aboard", "Use our cruise planner for custom timing"],
    faqs: [
      ["Town and Ephesus same day?", "On long calls only — standard days prioritise ruins."],
      ["Beach time realistic?", "Only on 10+ hour calls or if you skip Ephesus — unusual choice."],
    ],
    recommendations: [
      { cat: "editors-choice", title: "Ephesus & Virgin Mary Tour", desc: "Matches this itinerary on standard calls.", href: "/shore-excursions/ephesus-and-house-of-virgin-mary-tour" },
      { cat: "best-short-port", title: "Half-Day Ephesus", desc: "Compressed schedule for short calls.", href: "/shore-excursions/half-day-ephesus-tour" },
      { cat: "best-independent", title: "Cruise planner", desc: "Custom plan for your ship times.", href: "/cruise-planner" },
    ],
    related: ["kusadasi-for-first-time-visitors", "ephesus-cruise-guide", "best-time-visit-ephesus-guide"],
    imageKey: "highlights",
  },
  {
    slug: "ephesus-cruise-guide",
    title: "Ephesus Cruise Guide — Planning Your Port Day",
    seoTitle: "Ephesus from a Cruise Ship — Complete Kuşadası Port Guide",
    meta: "Planning Ephesus from your cruise ship at Kuşadası — transfers, tickets, crowds, Terrace Houses, guides and return timing explained honestly.",
    tagline: "Everything cruise passengers need to know before booking Ephesus.",
    overview:
      "Ephesus from Kuşadası is one of the Mediterranean's best shore excursions — a world-class site 25–35 minutes away. Izmir passengers travel 80 km for the same ruins. Your advantage is proximity; your challenge is crowds and heat.",
    body1:
      "Transfers: licensed coaches meet at terminal — 25–35 min to upper Ephesus gate. Taxis possible but cost more and lack guide context. Tickets: main site plus optional Terrace Houses premium. Buy through excursion or queue at gate — summer queues are real.",
    body2:
      "On-site: walk downhill. Core route 2.5–3 hours. Guides add St Paul context, theatre history and crowd navigation. Heat management defines summer visits — first tours of the day are materially better than afternoon.",
    body3:
      "Combining sights: Virgin Mary adds 45–60 min on mountain road. Şirince adds 60–90 min. Do not stack all three on calls under 9 usable hours. Compare ephesus-vs-pompeii if you have seen other Roman cities — Ephesus's completeness stands out.",
    highlights: ["20 km from Kuşadası — not 80 km like Izmir", "Downhill walking route", "Terrace Houses optional premium", "Morning timing beats afternoon heat"],
    tips: ["Book before sailing in peak months", "Read terrace-houses-worth-it before buying add-on", "Carry passport copy — some ticket systems ask"],
    faqs: [
      ["Ephesus or Pompeii if I have seen both ports?", "Different experiences — see our comparison. Ephesus marble streets are uniquely complete."],
      ["Guide necessary?", "Helpful for context and pacing; independent viable for repeat visitors."],
    ],
    recommendations: [
      { cat: "editors-choice", title: "Ephesus Shore Excursion", desc: "Full highlights with guide and return timing.", href: "/shore-excursions/ephesus-shore-excursion" },
      { cat: "best-historic", title: "Terrace Houses Tour", desc: "Mosaics and frescoes add-on.", href: "/shore-excursions/terrace-houses-ephesus-tour" },
      { cat: "best-value", title: "Is Ephesus worth visiting?", desc: "Honest assessment for undecided passengers.", href: "/compare/is-ephesus-worth-visiting" },
    ],
    related: ["ephesus-guide", "best-time-visit-ephesus-guide", "is-ephesus-worth-visiting"],
    imageKey: "history",
  },
  {
    slug: "biblical-sites-kusadasi-guide",
    title: "Biblical Sites Near Kuşadası",
    seoTitle: "Biblical Sites Kuşadası — Ephesus, Virgin Mary & St Paul",
    meta: "Biblical sites near Kuşadası cruise port — Ephesus where St Paul preached, the House of the Virgin Mary and Acts 19 history for faith-focused passengers.",
    tagline: "Walk where St Paul walked — Ephesus and the Virgin Mary shrine above the ruins.",
    overview:
      "Kuşadası is a meaningful port for Christian travellers. Ephesus appears in Acts 19 — St Paul preached in the Great Theatre. The House of the Virgin Mary on Bulbul Mountain is a major pilgrimage site. St John's Basilica in Selçuk (near Ephesus) marks a traditional burial site.",
    body1:
      "Ephesus biblical highlights: Great Theatre (Acts 19 riot), commercial agora, and the spiritual weight of walking a city Paul knew. Guides on faith-focused tours emphasise New Testament context over generic Roman history.",
    body2:
      "House of the Virgin Mary: 10–15 min drive above Ephesus. Modest dress required. Quiet chapel atmosphere — allow 45–60 min including drive. Combine naturally with Ephesus on the same excursion.",
    body3:
      "St John's Basilica in Selçuk is less visited on standard cruise tours — ask private operators if this matters to you. Basilica of St John and Ephesus Museum in Selçuk suit passengers with second-day returns or very long calls.",
    highlights: ["Great Theatre — Acts 19", "House of the Virgin Mary shrine", "St John's Basilica in Selçuk", "Faith-focused guided tours available"],
    tips: ["Scarf for Virgin Mary visit", "Book combination Ephesus–Virgin Mary tour", "Respect active worship at shrine"],
    faqs: [
      ["Virgin Mary house authentic?", "Tradition and pilgrimage sustain the site; archaeology is inconclusive — visit for faith and atmosphere."],
      ["Faith tour or standard tour?", "Standard tours cover theatre context; faith tours go deeper into scripture."],
    ],
    recommendations: [
      { cat: "editors-choice", title: "Ephesus & Virgin Mary Tour", desc: "Ruins and shrine on one timed excursion.", href: "/shore-excursions/ephesus-and-house-of-virgin-mary-tour" },
      { cat: "best-historic", title: "House of Virgin Mary Guide", desc: "Shrine practicalities and dress code.", href: "/guides/house-of-virgin-mary-guide" },
      { cat: "best-value", title: "Virgin Mary or Ephesus?", desc: "If time forces a choice.", href: "/compare/house-of-virgin-mary-or-ephesus" },
    ],
    related: ["house-of-virgin-mary-guide", "great-theatre-ephesus-guide", "ephesus-guide"],
    imageKey: "history",
  },
  {
    slug: "kusadasi-for-families",
    title: "Kuşadası for Families on a Cruise",
    seoTitle: "Family-Friendly Kuşadası Shore Excursions from Cruise Port",
    meta: "Kuşadası with kids from a cruise ship — family Ephesus tours, beach time, paced routes and realistic heat warnings for Turkish Aegean port days.",
    tagline: "Ephesus with children — heat, steps and when the beach beats ruins.",
    overview:
      "Families can enjoy Ephesus with preparation — stroller-unfriendly marble, summer heat and long walking distances challenge younger children. Family tours pace shorter routes, build in shade breaks and skip aggressive shopping stops.",
    body1:
      "Ephesus with kids: ages 8+ cope best with heat and distance. Carrier or strong stroller for toddlers on smooth sections only — steps and marble slopes are hard. Family Ephesus tours choose downhill routes with toilet stops and earlier departures.",
    body2:
      "Virgin Mary shrine suits families seeking calm — short visit, mountain air, modest dress. Şirince offers fruit juice and gentle lanes. Beach afternoon at Ladies Beach works on long calls if ruins are done by midday.",
    body3:
      "Skip Terrace Houses with under-fives — enclosed, one-way, no quick exit. Private family tours offer car seats, flexible timing and nap-friendly returns. Share children's ages when booking.",
    highlights: ["Family Ephesus tours with shade breaks", "Virgin Mary calm mountain visit", "Ladies Beach afternoon option", "Şirince juice and crafts"],
    tips: ["Pack snacks, hats and twice the water you think", "Morning Ephesus only in summer", "Private tour for mixed ages"],
    faqs: [
      ["Ephesus with toddlers?", "Challenging — heat and marble. Consider town beach morning and half-day tour for one parent."],
      ["Stroller at Ephesus?", "Poor fit — baby carrier better on uneven marble."],
    ],
    recommendations: [
      { cat: "best-families", title: "Family Ephesus Tour", desc: "Paced routing with heat awareness.", href: "/shore-excursions/family-ephesus-tour" },
      { cat: "best-coastal", title: "Town and Beach Tour", desc: "Lighter day when ruins feel too much.", href: "/shore-excursions/kusadasi-town-and-beach-tour" },
      { cat: "best-luxury", title: "Private Ephesus Tour", desc: "Custom stops and vehicle flexibility.", href: "/shore-excursions/private-ephesus-tour" },
    ],
    related: ["kusadasi-for-first-time-visitors", "what-to-wear-turkey-guide", "family-ephesus-tour"],
    imageKey: "family",
  },
];

w(
  "experiences.ts",
  `import type { GuidePage } from "./types";

export const experiencePages: GuidePage[] = [
${experiences.map(guide).join(",\n")}
];

export function getExperienceBySlug(slug: string): GuidePage | undefined {
  return experiencePages.find((p) => p.slug === slug);
}

/** @deprecated Use getExperienceBySlug */
export const getExperiencePageBySlug = getExperienceBySlug;

export function getAllExperienceSlugs(): string[] {
  return experiencePages.map((p) => p.slug);
}
`,
);

// ─── EXCURSIONS (10 ExcursionPage entries) ───────────────────────────────────

const excursions = [
  {
    slug: "ephesus-and-house-of-virgin-mary-tour",
    title: "Ephesus & House of the Virgin Mary Tour",
    seoTitle: "Ephesus & House of the Virgin Mary Shore Excursion — Editor's Choice",
    meta: "Editor's Choice — Ancient Ephesus and the House of the Virgin Mary on one cruise-timed shore excursion from Kuşadası port.",
    category: "Biblical & ancient",
    tagline: "Editor's Choice — Roman Ephesus and the mountain shrine on one relaxed port day.",
    duration: "6–7 hours",
    pace: "Relaxed",
    bestFor: "First-time visitors wanting ruins and biblical heritage without rushing",
    overview:
      "Our Editor's Choice combines Ancient Ephesus — Library of Celsus, Curetes Street, Great Theatre — with the peaceful House of the Virgin Mary above the ruins. The essential Kuşadası day for passengers who want both archaeological grandeur and spiritual atmosphere.",
    body1:
      "Morning coach to Ephesus upper gate, downhill walk through core highlights with licensed guide. St Paul and Acts 19 context at the Great Theatre. Midday drive to Bulbul Mountain for Virgin Mary shrine visit — modest dress required.",
    body2:
      "Operators sequence timing so afternoon Selçuk road traffic does not consume your return buffer. Optional short lunch stop near Selçuk when ship schedules allow — confirm meals when booking.",
    body3:
      "On calls under 7 usable hours choose half-day-ephesus-tour instead. Şirince is not included — add sirince-village-tour only on 10+ hour calls as a custom private upgrade.",
    highlights: ["Ephesus Library and Great Theatre", "House of Virgin Mary shrine", "Licensed guide throughout", "Return timed to all-aboard"],
    included: ["Licensed guide", "Coach transport from port", "Ephesus site entrance", "Virgin Mary shrine visit", "Return timed to ship"],
    tips: ["Book before sailing in peak season", "Scarf for shrine modesty", "Wear grippy shoes for marble"],
    faqs: [
      ["Editor's Choice vs standard Ephesus?", "This adds Virgin Mary — best balanced first-timer day when hours allow."],
      ["Includes Terrace Houses?", "No — add terrace-houses-ephesus-tour or buy ticket on site if time allows."],
    ],
    related: ["ephesus-shore-excursion", "biblical-sites-kusadasi-guide", "private-ephesus-tour"],
    featured: true,
  },
  {
    slug: "ephesus-shore-excursion",
    title: "Ephesus Shore Excursion",
    seoTitle: "Ephesus Shore Excursion from Kuşadası Cruise Port",
    meta: "Classic Ephesus shore excursion from Kuşadası — Library of Celsus, Great Theatre, guide and cruise-timed return from the port.",
    category: "Ancient history",
    tagline: "The essential Ephesus day — marble streets and Roman grandeur 20 km from your ship.",
    duration: "5–6 hours",
    pace: "Moderate",
    bestFor: "Passengers prioritising Ephesus highlights on standard port calls",
    overview:
      "The classic Ephesus shore excursion covers the site's headline monuments — Library of Celsus, Curetes Street, Temple of Hadrian, public latrines and Great Theatre — with licensed guide and door-to-door coach from Kuşadası Cruise Port.",
    body1:
      "Early departure beats heat and coach convoys. Downhill route from upper gate with guide narration on Roman daily life, St Paul and Ephesus's harbour history. Photo stops at Library and Theatre.",
    body2:
      "Does not include Virgin Mary or Şirince — keeps focus on the archaeological core. Return coach timed to your ship with 60–90 minute terminal buffer built in.",
    body3:
      "Upgrade to ephesus-and-house-of-virgin-mary-tour if biblical sites matter. Add Terrace Houses ticket on site if your guide confirms time.",
    highlights: ["Library of Celsus", "Great Theatre", "Curetes Street marble", "Door-to-door coach"],
    included: ["Licensed guide", "Coach from cruise port", "Ephesus entrance fee", "Return timed to ship"],
    tips: ["Morning slot strongly preferred summer", "2 litres water per person", "Sun hat non-negotiable June–August"],
    faqs: [
      ["Enough time for Terrace Houses?", "Tight on standard schedule — book terrace-houses-ephesus-tour for dedicated visit."],
      ["How far from ship?", "25–35 minutes each way — short enough for half-day calls."],
    ],
    related: ["ancient-ephesus-highlights-tour", "half-day-ephesus-tour", "ephesus-and-house-of-virgin-mary-tour"],
    featured: true,
  },
  {
    slug: "ancient-ephesus-highlights-tour",
    title: "Ancient Ephesus Highlights Tour",
    seoTitle: "Ancient Ephesus Highlights Tour — Kuşadası Cruise Port",
    meta: "Ancient Ephesus highlights tour from Kuşadası — paced walking route, historian guide and realistic timings for cruise passengers.",
    category: "Ancient history",
    tagline: "Historian-led highlights — the monuments that define Ephesus.",
    duration: "5–6 hours",
    pace: "Moderate",
    bestFor: "History enthusiasts wanting depth at the main site",
    overview:
      "The Ancient Ephesus Highlights tour emphasises historical context — commercial agora, political history, Temple of Hadrian reliefs and theatre acoustics — with slightly more guide time at each stop than standard photo-paced tours.",
    body1:
      "Same core route as ephesus-shore-excursion but with extended commentary and optional brief stops at less-visited corners when group pace allows. Ideal for passengers who have seen Pompeii or Athens and want scholarly depth.",
    body2:
      "Does not rush shopping stops or carpet presentations — sightseeing focus. Confirm itinerary excludes retail detours when booking.",
    body3:
      "Pair with photography-ephesus-guide tips for serious shooters — private-ephesus-tour offers even more flexibility.",
    highlights: ["Extended guide commentary", "Temple of Hadrian detail", "Theatre acoustics demonstration", "Commercial agora context"],
    included: ["Historian or specialist guide", "Coach transport", "Ephesus entrance", "Return timed to ship"],
    tips: ["Ask guide about St Paul routes", "Notebook users welcome", "Still start early in summer"],
    faqs: [
      ["Difference from standard Ephesus tour?", "More history, less retail — similar route."],
      ["Suitable for repeat visitors?", "Yes — depth over checklist ticking."],
    ],
    related: ["ephesus-shore-excursion", "terrace-houses-ephesus-tour", "private-ephesus-tour"],
  },
  {
    slug: "terrace-houses-ephesus-tour",
    title: "Terrace Houses Ephesus Tour",
    seoTitle: "Ephesus Terrace Houses Tour — Kuşadası Shore Excursion",
    meta: "Ephesus Terrace Houses tour from Kuşadası — Roman mosaics, frescoes and premium archaeology with cruise-timed return.",
    category: "Ancient history",
    tagline: "Ephesus plus Terrace Houses — mosaics and frescoes for archaeology lovers.",
    duration: "6–7 hours",
    pace: "Moderate",
    bestFor: "Archaeology enthusiasts and repeat Ephesus visitors",
    overview:
      "This tour includes the main Ephesus highlights plus the premium Terrace Houses section — Roman elite apartments with intact mosaics, frescoes and covered walkways. For passengers who want the complete archaeological picture.",
    body1:
      "Standard Ephesus downhill route followed by Terrace Houses one-way walkway. Separate ticket included. Allow 45–60 minutes inside the houses with guide explaining heating systems and domestic life.",
    body2:
      "Not ideal for short port calls or first-time visitors on tight schedules — see terrace-houses-worth-it comparison. Best on 8+ usable hour calls.",
    body3:
      "Does not include Virgin Mary — combine on private-ephesus-tour if you want all three.",
    highlights: ["Terrace Houses mosaics", "Covered conservation walkway", "Main Ephesus highlights", "Specialist guide"],
    included: ["Licensed guide", "Coach transport", "Ephesus and Terrace Houses tickets", "Return timed to ship"],
    tips: ["No flash inside houses", "Wear layers — walkway can feel cool", "Read terrace-houses-worth-it first"],
    faqs: [
      ["Worth it on first visit?", "Only if you have 8+ hours and love archaeology — otherwise standard tour first."],
      ["Can I add on site?", "Sometimes — but excursion guarantees timing and skip-the-queue coordination."],
    ],
    related: ["ephesus-shore-excursion", "terrace-houses-ephesus-guide", "terrace-houses-worth-it"],
  },
  {
    slug: "sirince-village-tour",
    title: "Şirince Village Tour",
    seoTitle: "Şirince Village Shore Excursion from Kuşadası",
    meta: "Şirince village tour from Kuşadası cruise port — Ottoman lanes, fruit wine, olive oil and Ephesus combination options.",
    category: "Villages & culture",
    tagline: "Hillside village wine and crafts — Turkish culture after Ephesus.",
    duration: "6–7 hours",
    pace: "Relaxed",
    bestFor: "Passengers wanting village atmosphere with Ephesus highlights",
    overview:
      "Şirince Village tour combines abbreviated Ephesus highlights with 60–90 minutes in the Ottoman hillside village — fruit-wine tasting, olive oil, crafts and optional lunch. Cultural contrast to marble ruins.",
    body1:
      "Morning Ephesus core (Library, Theatre, key street) then coach to Şirince for free time. Wine and olive oil tastings at cooperative shops — no obligation to buy.",
    body2:
      "Rushed compared to dedicated ephesus-shore-excursion — choose this when village culture matters equally to ruins. Not for passengers wanting deep archaeological immersion.",
    body3:
      "Skip if first visit and only one Kuşadası call — prioritise full Ephesus or Editor's Choice instead.",
    highlights: ["Abbreviated Ephesus visit", "Şirince stone lanes", "Fruit wine tasting", "Ottoman architecture"],
    included: ["Licensed guide", "Coach transport", "Ephesus entrance", "Şirince free time", "Return timed to ship"],
    tips: ["Try before buying wine bottles", "Cobblestone slopes — sturdy shoes", "Sunday lunch crowds"],
    faqs: [
      ["Şirince without Ephesus?", "Possible on private tours — rare on group schedules."],
      ["How much Ephesus time?", "Shorter than dedicated tour — confirm itinerary hours when booking."],
    ],
    related: ["sirince-village-guide", "ephesus-shore-excursion", "kusadasi-town-and-beach-tour"],
  },
  {
    slug: "private-ephesus-tour",
    title: "Private Ephesus Tour",
    seoTitle: "Private Ephesus Tour from Kuşadası Cruise Port",
    meta: "Private Ephesus tour from Kuşadası — custom routing, your pace, Virgin Mary or Şirince add-ons and reliable return timing.",
    category: "Private touring",
    tagline: "Your vehicle, your pace — Ephesus tailored to your ship schedule.",
    duration: "5–8 hours flexible",
    pace: "Moderate",
    bestFor: "Families, photographers and mixed-interest groups wanting flexibility",
    overview:
      "Private Ephesus tours offer dedicated vehicle and guide — customise stops (Virgin Mary, Şirince, St John's Basilica), photography time at the Library, and pace for mobility needs. Strong return-to-ship confidence.",
    body1:
      "Meet at terminal with private minivan. Route designed around your priorities — full Ephesus, Terrace Houses add-on, faith sites or village detour. No retail stops unless you request them.",
    body2:
      "Cost-effective for parties of four or more versus premium group tours. Solo and couple travellers pay more per head but gain full control.",
    body3:
      "luxury-private-ephesus-tour upgrades vehicle class and guide seniority — same routing flexibility.",
    highlights: ["Custom itinerary", "Private vehicle at each stop", "Photography time built in", "Flexible pacing"],
    included: ["Private guide", "Dedicated vehicle", "Ephesus tickets (confirm inclusions)", "Return timed to ship"],
    tips: ["Share priorities when booking", "Request early start in summer", "Specify child seats if needed"],
    faqs: [
      ["Private vs group cost?", "Often similar per person for 4+ — see private-tour-vs-group-tour."],
      ["Can we skip Ephesus for Virgin Mary only?", "Yes on private — unusual but possible."],
    ],
    related: ["luxury-private-ephesus-tour", "family-ephesus-tour", "private-tour-vs-group-tour"],
  },
  {
    slug: "family-ephesus-tour",
    title: "Family Ephesus Tour",
    seoTitle: "Family Ephesus Shore Excursion from Kuşadası",
    meta: "Family Ephesus tour from Kuşadası cruise port — paced routes, shade breaks, heat awareness and child-friendly guiding.",
    category: "Family",
    tagline: "Ephesus paced for children — shorter routes, shade and sanity.",
    duration: "5–6 hours",
    pace: "Relaxed",
    bestFor: "Families with school-age children on standard port calls",
    overview:
      "Family Ephesus tours shorten the walking route, build shade and toilet breaks into timing, skip aggressive shopping stops and depart early to beat summer heat. Guides engage children with stories, not lectures.",
    body1:
      "Core highlights only — Library, key street sections, Theatre from lower tiers if climb is too much. Optional Virgin Mary add-on for calmer mountain visit after ruins.",
    body2:
      "Not suitable for expecting fortress-level activity — marble and heat remain challenges. Under-fives may prefer kusadasi-town-and-beach-tour with one parent while other does abbreviated Ephesus on private split.",
    body3:
      "Private-ephesus-tour with family briefing often works better for mixed ages — specify children's ages when booking.",
    highlights: ["Early departure for cooler temps", "Shade and toilet stops planned", "Child-friendly storytelling", "Shorter walking distance"],
    included: ["Family-experienced guide", "Coach transport", "Ephesus entrance", "Return timed to ship"],
    tips: ["Pack twice the water", "Sun hats for everyone", "Snacks between stops"],
    faqs: [
      ["Stroller-friendly?", "Limited — baby carrier recommended on marble."],
      ["Terrace Houses with kids?", "Skip with under-eights — enclosed one-way route."],
    ],
    related: ["kusadasi-for-families", "private-ephesus-tour", "kusadasi-town-and-beach-tour"],
  },
  {
    slug: "luxury-private-ephesus-tour",
    title: "Luxury Private Ephesus Tour",
    seoTitle: "Luxury Private Ephesus Tour — Kuşadası Cruise Port",
    meta: "Luxury private Ephesus tour from Kuşadası — premium vehicle, senior guide, VIP pacing and exclusive routing for discerning cruise passengers.",
    category: "Luxury",
    tagline: "Premium vehicle and senior guide — Ephesus at the highest standard.",
    duration: "6–8 hours flexible",
    pace: "Relaxed",
    bestFor: "Luxury travellers, honeymoons and special occasions",
    overview:
      "Luxury private Ephesus upgrades vehicle comfort, guide expertise and itinerary refinement — meet-and-greet at gangway, chilled water, restaurant lunch reservations and maximum flexibility at the Library and Terrace Houses.",
    body1:
      "Senior archaeologist or historian guides available. Routing can include Virgin Mary, Şirince lunch at a reserved table, and St John's Basilica for passengers with scholarly interests.",
    body2:
      "No carpet warehouses unless requested. Photography pauses unlimited within time budget. Ideal when you want Ephesus without group-tour compromises.",
    body3:
      "Book early — premium guides are limited on multi-ship days.",
    highlights: ["Premium vehicle and meet-and-greet", "Senior specialist guide", "Reserved lunch options", "Full itinerary control"],
    included: ["Senior private guide", "Luxury vehicle", "Tickets as agreed", "Return timed to ship"],
    tips: ["Request guide credentials when booking", "Confirm lunch inclusion", "Early access coordination where possible"],
    faqs: [
      ["Worth over standard private?", "Yes for special occasions or deep archaeological interest."],
      ["Lunch included?", "Varies — confirm when booking; Şirince restaurants popular."],
    ],
    related: ["private-ephesus-tour", "terrace-houses-ephesus-tour", "ephesus-and-house-of-virgin-mary-tour"],
  },
  {
    slug: "half-day-ephesus-tour",
    title: "Half-Day Ephesus Tour",
    seoTitle: "Half-Day Ephesus Tour from Kuşadası — Short Port Calls",
    meta: "Half-day Ephesus tour from Kuşadası cruise port — compressed highlights for short port calls with reliable return timing.",
    category: "Short port",
    tagline: "Library, street and theatre — Ephesus when hours are tight.",
    duration: "4–5 hours",
    pace: "Moderate",
    bestFor: "Short port calls under 7 usable hours",
    overview:
      "Half-day Ephesus strips the itinerary to essentials — Library of Celsus, Curetes Street and Great Theatre — with fast-paced guide and direct coach returns. For passengers who refuse to miss Ephesus on a tight schedule.",
    body1:
      "Earliest possible departure. No Virgin Mary, Şirince or Terrace Houses. 2–2.5 hours on site, then straight return to Kuşadası with buffer before all-aboard.",
    body2:
      "Honest trade-off: you see the icons, not the depth. Still beats staying on ship or browsing the bazaar alone on a first visit.",
    body3:
      "If your call lengthens, upgrade before sailing to ephesus-shore-excursion if operator allows.",
    highlights: ["Compressed core route", "Earliest departures", "Direct return to port", "Essential photo stops"],
    included: ["Licensed guide", "Coach transport", "Ephesus entrance", "Return timed to ship"],
    tips: ["Confirm ship times when booking", "No shopping stops", "Eat on ship before disembarking"],
    faqs: [
      ["Enough for first-timers?", "You see the headline monuments — return for depth on a future cruise."],
      ["Minimum call length?", "5 usable hours absolute minimum — 6+ safer."],
    ],
    related: ["ephesus-shore-excursion", "kusadasi-town-and-beach-tour", "kusadasi-for-first-time-visitors"],
  },
  {
    slug: "kusadasi-town-and-beach-tour",
    title: "Kuşadası Town & Beach Tour",
    seoTitle: "Kuşadası Town & Beach Shore Excursion — Light Port Day",
    meta: "Kuşadası town and beach tour from cruise port — bazaar, marina, Ladies Beach and relaxed Aegean afternoon without Ephesus.",
    category: "Beach & town",
    tagline: "Bazaar, marina and beach — when you skip Ephesus or have already seen it.",
    duration: "4–5 hours",
    pace: "Relaxed",
    bestFor: "Repeat visitors, beach lovers and passengers who skip ruins",
    overview:
      "Honest offering: Kuşadası town is pleasant, not world-class. This tour suits repeat cruisers, beach-focused passengers or those who cannot manage Ephesus walking. Bazaar stroll, marina coffee, optional Ladies Beach swim.",
    body1:
      "Coach or walk from port to town centre. Guided orientation of bazaar — leather, spices, textiles — with time for independent browsing. No forced carpet shows on reputable tours.",
    body2:
      "Ladies Beach (Kadınlar Denizi) option in summer — crowded but convenient. Sunbed rental extra. Return well before all-aboard.",
    body3:
      "First-time visitors should choose Ephesus instead — we say this plainly. This tour is for deliberate light days.",
    highlights: ["Waterfront bazaar", "Marina promenade", "Ladies Beach option", "Relaxed pacing"],
    included: ["Local guide", "Transport port to town", "Beach time if selected", "Return timed to ship"],
    tips: ["Haggle politely in bazaar", "Bring swimwear for beach option", "Sunscreen on open beach"],
    faqs: [
      ["Skip Ephesus for this?", "Only if you have seen Ephesus before or cannot walk ruins — not for first-timers."],
      ["Beach clean?", "Busy resort beach — adequate for a dip, not pristine wilderness."],
    ],
    related: ["turkish-food-kusadasi-guide", "independent-kusadasi-guide", "half-day-ephesus-tour"],
  },
];

w(
  "excursions.ts",
  `import type { ExcursionPage } from "./types";

const PORT_LOGISTICS =
  "${esc(PORT_LOGISTICS)}";

export const excursions: ExcursionPage[] = [
${excursions.map(excursion).join(",\n")}
];

export function getExcursionBySlug(slug: string): ExcursionPage | undefined {
  return excursions.find((p) => p.slug === slug);
}

export function getAllExcursionSlugs(): string[] {
  return excursions.map((p) => p.slug);
}

export function getFeaturedExcursions(): ExcursionPage[] {
  return excursions.filter((p) => p.featured);
}

`,
);

// ─── COMPARISONS (8 entries) ─────────────────────────────────────────────────

const comparisons = [
  comparisonGuide({
    slug: "is-ephesus-worth-visiting",
    title: "Is Ephesus Worth Visiting from Kuşadası?",
    seoTitle: "Is Ephesus Worth It? — Honest Kuşadası Cruise Port Guide",
    meta: "Is Ephesus worth visiting from Kuşadası? Honest assessment for cruise passengers — crowds, heat, port town vs ruins and when to book a tour.",
    summary:
      "Yes — Ephesus is the reason ships call at Kuşadası and one of the Mediterranean's finest archaeological sites. The port town alone does not justify the stop; the 20 km transfer to Ephesus absolutely does.",
    verdict:
      "Visit Ephesus on every first Kuşadası call unless mobility makes the marble slopes impossible. Skip only if you have seen Ephesus thoroughly before and deliberately want a beach or bazaar day.",
    overview: [
      "Ephesus: world-class Roman city, Library of Celsus, Great Theatre, 2.5–4 hours on site.",
      "Kuşadası town: pleasant bazaar and marina — fine for shopping, not a headline sight.",
      "Proximity advantage: 20 km from Kuşadası vs 80 km from Izmir for the same ruins.",
    ],
    guideItems: [
      { name: "Ephesus Shore Excursion", slug: "ephesus-shore-excursion", href: "/shore-excursions/ephesus-shore-excursion", reason: "The standard way to see the ruins with guide and return timing.", topExcursion: "Ephesus Shore Excursion", returnConfidence: "High on 7+ hour calls", walkingDifficulty: "Moderate — marble slopes" },
      { name: "Ephesus & Virgin Mary", slug: "ephesus-and-house-of-virgin-mary-tour", href: "/shore-excursions/ephesus-and-house-of-virgin-mary-tour", reason: "Editor's Choice when you want ruins plus biblical shrine.", topExcursion: "Ephesus & House of the Virgin Mary", returnConfidence: "High on 8+ hour calls", walkingDifficulty: "Moderate" },
      { name: "Half-Day Ephesus", slug: "half-day-ephesus-tour", href: "/shore-excursions/half-day-ephesus-tour", reason: "Compressed icons when port hours are tight.", topExcursion: "Half-Day Ephesus Tour", returnConfidence: "High on 5–6 hour calls", walkingDifficulty: "Moderate — faster pace" },
      { name: "Town & Beach Tour", slug: "kusadasi-town-and-beach-tour", href: "/shore-excursions/kusadasi-town-and-beach-tour", reason: "Only if you have seen Ephesus before — honest light day.", topExcursion: "Kuşadası Town & Beach Tour", returnConfidence: "Very high", walkingDifficulty: "Easy" },
    ],
    faqs: [
      ["Worth it in extreme heat?", "Yes but miserable without early start — morning tours essential June–August."],
      ["Port town enough without Ephesus?", "No for first-timers — you miss why the ship stopped here."],
    ],
    related: ["ephesus-guide", "ephesus-cruise-guide", "kusadasi-for-first-time-visitors"],
    imageKey: "history",
  }),
  versus({
    slug: "ephesus-vs-pompeii",
    optionA: "Ephesus",
    optionB: "Pompeii",
    seoTitle: "Ephesus vs Pompeii — Which Roman City for Cruise Passengers?",
    summary:
      "Ephesus and Pompeii are the Mediterranean's twin Roman superstars. Ephesus offers monumental marble streets and standing facades; Pompeii offers intimate daily life frozen by Vesuvius. From Kuşadası, Ephesus is 20 km — Pompeii requires a Naples or Rome port.",
    verdict:
      "If you are in Kuşadası, Ephesus is unmissable — completeness of public monuments rivals Pompeii with less volcanic gloom. Pompeii wins on domestic intimacy and plaster-cast human stories. Serious history lovers should see both over a cruising lifetime; choose Ephesus on this port day without hesitation.",
    overview: [
      "Ephesus: marble Curetes Street, Library of Celsus, theatre, terrace houses — eastern Roman grandeur.",
      "Pompeii: houses, bakeries, brothels, forum — volcanic preservation of daily life.",
      "Ephesus from Kuşadası: 25–35 min coach. Pompeii: not reachable from Turkey.",
    ],
    table: [
      { category: "Preservation style", optionA: "Monumental public architecture", optionB: "Whole city plan and domestic life" },
      { category: "Emotional tone", optionA: "Grand imperial scale", optionB: "Volcanic tragedy and intimacy" },
      { category: "Walking surface", optionA: "Marble slopes — slippery", optionB: "Cobblestone streets — uneven" },
      { category: "Crowds", optionA: "Heavy on cruise days", optionB: "Heavy year-round" },
      { category: "From Kuşadası", optionA: "20 km — easy shore day", optionB: "Not accessible this port" },
    ],
    faqs: [
      ["Which is more complete?", "Different completeness — Ephesus public monuments; Pompeii urban fabric. Both world-class."],
      ["Seen Pompeii — skip Ephesus?", "No — Ephesus still astonishes repeat Roman-site visitors."],
    ],
    related: ["ephesus-guide", "ancient-ephesus-highlights-tour", "is-ephesus-worth-visiting"],
    imageKey: "history",
  }),
  versus({
    slug: "house-of-virgin-mary-or-ephesus",
    optionA: "House of the Virgin Mary",
    optionB: "Ephesus Only",
    summary:
      "On a tight Kuşadası port day you may face a choice: add the Virgin Mary shrine or spend more time in Ephesus ruins. Both are meaningful — for different reasons.",
    verdict:
      "Choose Ephesus only on short calls or if archaeology is your sole interest. Add Virgin Mary on standard 8+ hour calls when faith or Marian pilgrimage matters — the combination tour sequences both without rushing either. Never skip Ephesus entirely for Virgin Mary alone on a first visit.",
    overview: [
      "Ephesus only: more time on marble streets, theatre and library — 2.5–3.5 hours.",
      "With Virgin Mary: 45–60 min mountain shrine plus slightly shorter Ephesus visit.",
      "Combination: Editor's Choice tour on 8+ hour calls.",
    ],
    table: [
      { category: "Priority on first visit", optionA: "Secondary to Ephesus", optionB: "Primary anchor" },
      { category: "Time needed", optionA: "45–60 min with drive", optionB: "2.5–4 hours" },
      { category: "Best for", optionA: "Pilgrims, faith travellers", optionB: "All first-time visitors" },
      { category: "Dress code", optionA: "Modest — shoulders/knees", optionB: "Sun protection focus" },
      { category: "Short port call", optionA: "Skip", optionB: "Prioritise" },
    ],
    faqs: [
      ["Virgin Mary without Ephesus?", "Possible on private tours — misses the main reason ships stop here."],
      ["Combination tour rushed?", "On 8+ hours it works — tight on 6-hour calls."],
    ],
    related: ["house-of-virgin-mary-guide", "ephesus-and-house-of-virgin-mary-tour", "biblical-sites-kusadasi-guide"],
    imageKey: "history",
  }),
  comparisonGuide({
    slug: "best-excursion-first-time-visitors",
    title: "Best Kuşadası Excursions for First-Time Visitors",
    seoTitle: "Best Kuşadası Shore Excursions for First-Timers — Cruise Port",
    meta: "Ranked Kuşadası shore excursions for first-time cruise passengers — Ephesus, Virgin Mary, private tours and realistic port timing.",
    summary:
      "First-timers need Ephesus with reliable coach timing, early departure slots and an operator who tracks all-aboard — these excursions deliver consistently from Kuşadası Cruise Port.",
    verdict: "Book before sailing in peak season. Morning Ephesus departures protect afternoon return margins when Selçuk road traffic builds.",
    overview: [
      "Ephesus & House of the Virgin Mary is our Editor's Choice for balanced ruins and biblical heritage.",
      "Ephesus Shore Excursion suits passengers wanting archaeological focus without the shrine.",
      "Half-Day Ephesus fits short calls when hours are tight.",
      "Private tours suit families wanting flexible pacing.",
    ],
    guideItems: [
      { name: "Ephesus & House of the Virgin Mary", slug: "ephesus-and-house-of-virgin-mary-tour", href: "/shore-excursions/ephesus-and-house-of-virgin-mary-tour", reason: "Editor's pick — ruins and shrine sequenced with expert timing.", topExcursion: "Ephesus & House of the Virgin Mary", returnConfidence: "High on 8+ hour calls", walkingDifficulty: "Moderate — marble slopes" },
      { name: "Ephesus Shore Excursion", slug: "ephesus-shore-excursion", href: "/shore-excursions/ephesus-shore-excursion", reason: "Pure archaeological focus when Virgin Mary is not a priority.", topExcursion: "Ephesus Shore Excursion", returnConfidence: "High on 7+ hour calls", walkingDifficulty: "Moderate" },
      { name: "Half-Day Ephesus Tour", slug: "half-day-ephesus-tour", href: "/shore-excursions/half-day-ephesus-tour", reason: "Essential icons when your call is under 7 usable hours.", topExcursion: "Half-Day Ephesus Tour", returnConfidence: "High on 5–6 hour calls", walkingDifficulty: "Moderate — faster pace" },
      { name: "Family Ephesus Tour", slug: "family-ephesus-tour", href: "/shore-excursions/family-ephesus-tour", reason: "Paced routing with shade breaks for school-age children.", topExcursion: "Family Ephesus Tour", returnConfidence: "High", walkingDifficulty: "Moderate — shortened route" },
      { name: "Private Ephesus Tour", slug: "private-ephesus-tour", href: "/shore-excursions/private-ephesus-tour", reason: "Custom routing for mixed groups and photography stops.", topExcursion: "Private Ephesus Tour", returnConfidence: "Very high", walkingDifficulty: "Flexible" },
    ],
    faqs: [
      ["One excursion for first-timers?", "Ephesus & Virgin Mary on 8+ hour calls — Ephesus Shore Excursion on 7-hour calls."],
      ["Town tour for first-timers?", "No — Ephesus first. Town is optional extra time."],
    ],
    related: ["kusadasi-for-first-time-visitors", "is-ephesus-worth-visiting", "ephesus-and-house-of-virgin-mary-tour"],
    imageKey: "highlights",
  }),
  comparisonGuide({
    slug: "can-you-visit-ephesus-independently",
    title: "Can You Visit Ephesus Independently from Kuşadası?",
    seoTitle: "Visit Ephesus Independently — DIY Kuşadası Cruise Port Guide",
    meta: "Can you visit Ephesus without a shore excursion from Kuşadası? Taxis, tickets, timing and when organised tours make more sense.",
    summary:
      "Independent Ephesus visits are possible from Kuşadası but need taxi coordination, ticket queues and strict time discipline. The 20 km distance is manageable; the logistics are less forgiving than a walkable European Old Town.",
    verdict:
      "Confident travellers on a budget can taxi to Selçuk, buy tickets and walk Ephesus independently — allow 60–90 minute return buffer and agree taxi wait times. Book a tour if you want guide context, skip queues or prefer zero stress on multi-ship days.",
    overview: [
      "Taxi port to Ephesus upper gate: ₺400–600 each way — agree price first.",
      "Tickets at gate — summer queues 15–30 minutes possible.",
      "Walk downhill from upper gate — 2.5–3 hours minimum.",
      "Dolmuş (minibus) cheaper but slower and harder for tight schedules.",
    ],
    guideItems: [
      { name: "Independent Kuşadası Guide", slug: "independent-kusadasi-guide", href: "/guides/independent-kusadasi-guide", reason: "Full DIY logistics — taxis, cash, timings from the port.", topExcursion: "N/A — independent", returnConfidence: "Moderate DIY — high with planned taxi", walkingDifficulty: "Moderate marble slopes" },
      { name: "Ephesus Shore Excursion", slug: "ephesus-shore-excursion", href: "/shore-excursions/ephesus-shore-excursion", reason: "When you want tickets, guide and return handled.", topExcursion: "Ephesus Shore Excursion", returnConfidence: "High", walkingDifficulty: "Moderate" },
      { name: "Port Town Walk", slug: "independent-kusadasi-guide", href: "/guides/independent-kusadasi-guide", reason: "Bazaar and marina — genuinely walkable without tour.", topExcursion: "Town & Beach Tour (optional)", returnConfidence: "Very high", walkingDifficulty: "Easy waterfront" },
      { name: "Private Ephesus Tour", slug: "private-ephesus-tour", href: "/shore-excursions/private-ephesus-tour", reason: "Middle ground — private vehicle without group pacing.", topExcursion: "Private Ephesus Tour", returnConfidence: "Very high", walkingDifficulty: "Flexible" },
    ],
    faqs: [
      ["Will ship wait if I go independent?", "No — only ship excursions carry delay guarantee. Keep 60–90 minute buffer."],
      ["Taxi wait at Ephesus?", "Agree wait time and cost — drivers may leave if not pre-arranged."],
    ],
    related: ["independent-kusadasi-guide", "private-tour-vs-group-tour", "ephesus-cruise-guide"],
    imageKey: "city",
  }),
  versus({
    slug: "private-tour-vs-group-tour",
    optionA: "Private Tour",
    optionB: "Group Shore Excursion",
    summary:
      "Private Ephesus tours offer custom routing, vehicle at each stop and flexible pacing. Group excursions cost less per person and suit solo travellers — but follow fixed coach schedules.",
    verdict:
      "Choose private for families of four plus, mixed mobility, photography priorities or Virgin Mary plus Ephesus plus Şirince on long calls. Choose group for value, solo travel and standard Ephesus routes where the fixed itinerary fits.",
    overview: [
      "Private: dedicated minivan, custom stops, $/€300–500+ per group typical, best 4–8 guests.",
      "Group: 20–40 passengers, fixed route, lower per-person cost, social for solos.",
      "Both reputable operators track all-aboard — private offers more margin control.",
    ],
    table: [
      { category: "Cost for couple", optionA: "Higher total, flexible value", optionB: "Lower per-person typical" },
      { category: "Itinerary", optionA: "Fully custom", optionB: "Fixed route" },
      { category: "Pacing", optionA: "Your speed", optionB: "Group consensus" },
      { category: "Retail stops", optionA: "Skip unless requested", optionB: "Sometimes included" },
      { category: "Best for", optionA: "Families, photographers, luxury", optionB: "Solos, budget, standard routes" },
    ],
    faqs: [
      ["Private worth it for two?", "Sometimes — compare with small-group premium tours."],
      ["Group tour quality?", "Good operators run excellent groups — read reviews for ship tracking."],
    ],
    related: ["private-ephesus-tour", "ephesus-shore-excursion", "kusadasi-for-families"],
    imageKey: "private",
  }),
  versus({
    slug: "terrace-houses-worth-it",
    optionA: "Terrace Houses Add-On",
    optionB: "Main Site Only",
    summary:
      "The Terrace Houses at Ephesus require a separate ticket and 45–60 minutes. On a standard Kuşadası port day, is the premium section worth the time and cost?",
    verdict:
      "Worth it for archaeology enthusiasts, repeat Ephesus visitors and passengers on 8+ hour calls with Terrace Houses included in their tour. Skip on first visits with under 8 hours — prioritise Library, street and Theatre first. Main site alone is already extraordinary.",
    overview: [
      "Terrace Houses: Roman mosaics, frescoes, covered walkway — intimate elite housing.",
      "Main site only: Library, Theatre, Curetes Street — the essential experience.",
      "Extra ticket and time: 45–60 min plus possible queue.",
    ],
    table: [
      { category: "First-time visitor", optionA: "Optional — main site first", optionB: "Priority" },
      { category: "Time required", optionA: "+45–60 minutes", optionB: "2.5–3 hours baseline" },
      { category: "Extra ticket", optionA: "Yes — premium price", optionB: "Standard admission" },
      { category: "Best for", optionA: "Archaeology lovers, repeat visitors", optionB: "Everyone on first visit" },
      { category: "With children", optionA: "Skip under-eights", optionB: "Focus here" },
    ],
    faqs: [
      ["Can I decide on the day?", "Sometimes — but excursion pre-inclusion guarantees timing."],
      ["Dedicated tour?", "terrace-houses-ephesus-tour includes both properly."],
    ],
    related: ["terrace-houses-ephesus-guide", "terrace-houses-ephesus-tour", "ephesus-guide"],
    imageKey: "history",
  }),
  comparisonGuide({
    slug: "one-day-in-kusadasi",
    title: "How to Spend One Day in Kuşadası — Comparison Guide",
    seoTitle: "One Day in Kuşadası — Best Itinerary Options Compared",
    meta: "How to spend one day in Kuşadası on a cruise — compare Ephesus, Virgin Mary, Şirince, beach and port town options hour by hour.",
    summary:
      "One Kuşadası port day forces choices. This guide compares realistic itineraries — full Ephesus, combination tours, village add-ons and light town days — so you pick one anchor and execute it well.",
    verdict:
      "Standard 8–10 hour calls: Editor's Choice Ephesus and Virgin Mary OR full Ephesus with Terrace Houses. Long calls: add Şirince. Short calls: half-day Ephesus only. Repeat visitors: town and beach is finally acceptable.",
    overview: [
      "Plan A: Ephesus + Virgin Mary — best first-timer balance.",
      "Plan B: Ephesus + Terrace Houses — archaeology depth.",
      "Plan C: Ephesus + Şirince — ruins and village culture.",
      "Plan D: Town and beach — repeat visitors only.",
    ],
    guideItems: [
      { name: "Ephesus & Virgin Mary", slug: "ephesus-and-house-of-virgin-mary-tour", href: "/shore-excursions/ephesus-and-house-of-virgin-mary-tour", reason: "Plan A — balanced first-timer day.", topExcursion: "Editor's Choice combination", returnConfidence: "High 8+ hours", walkingDifficulty: "Moderate" },
      { name: "Terrace Houses Tour", slug: "terrace-houses-ephesus-tour", href: "/shore-excursions/terrace-houses-ephesus-tour", reason: "Plan B — archaeology enthusiasts.", topExcursion: "Terrace Houses Ephesus Tour", returnConfidence: "High 8+ hours", walkingDifficulty: "Moderate" },
      { name: "Şirince Village Tour", slug: "sirince-village-tour", href: "/shore-excursions/sirince-village-tour", reason: "Plan C — culture plus abbreviated ruins.", topExcursion: "Şirince Village Tour", returnConfidence: "Moderate", walkingDifficulty: "Moderate cobbles" },
      { name: "One Day Guide", slug: "one-day-in-kusadasi", href: "/guides/one-day-in-kusadasi", reason: "Hour-by-hour sample timeline for any plan.", topExcursion: "Varies by call length", returnConfidence: "Depends on plan", walkingDifficulty: "Varies" },
    ],
    faqs: [
      ["All three: Ephesus, Virgin Mary, Şirince?", "Not on standard calls — choose two maximum."],
      ["Beach afternoon after Ephesus?", "Only on 10+ hour calls with early Ephesus start."],
    ],
    related: ["one-day-in-kusadasi", "kusadasi-for-first-time-visitors", "best-excursion-first-time-visitors"],
    imageKey: "highlights",
  }),
];

w(
  "comparisons.ts",
  `import type { Comparison, ComparisonGuideItem, FAQ } from "./types";

export const comparisons: Comparison[] = [
${comparisons.join(",\n")}
];

export function getComparisonBySlug(slug: string): Comparison | undefined {
  return comparisons.find((c) => c.slug === slug);
}

export function getAllComparisonSlugs(): string[] {
  return comparisons.map((c) => c.slug);
}

export function getComparisonDisplayTitle(comp: Comparison): string {
  if (comp.kind === "versus" && comp.optionA && comp.optionB) {
    return \`\${comp.optionA} vs \${comp.optionB}\`;
  }
  return comp.title;
}
`,
);

// ─── PLANNER ─────────────────────────────────────────────────────────────────

w(
  "planner.ts",
  `import { excursions } from "./excursions";

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
  return { label: e.title, href: \`/shore-excursions/\${slug}\`, why };
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
    text: \`Disembark at Kuşadası Cruise Port (\${arriveLabel}). Meet your excursion at the terminal exit, or walk the waterfront promenade to the bazaar (15–20 min) for an independent start.\`,
  });

  if (themeKey === "biblical") {
    dayPlan.push({ time: "Morning", text: \`Coach to Ephesus — \${topExc}. Downhill walk through Library and Theatre.\` });
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
      text: \`Ephesus anchor first: \${topExc}. Early starts beat heat and coach convoys.\`,
    });
    dayPlan.push({ time: "Midday", text: "Complete downhill route — Theatre and Curetes Street." });
    dayPlan.push({ time: "Afternoon", text: "Return coach — quick bazaar stop only if departure is 18:00 or later." });
  }

  dayPlan.push({
    time: "Return buffer",
    text: \`Be back at Kuşadası Cruise Port 60–90 minutes before all-aboard (\${departLabel} sailing). Selçuk road traffic can add 20–30 minutes in peak season.\`,
  });

  const interestLabels = activeInterests
    .map((i) => INTEREST_OPTIONS.find((o) => o.id === i)?.label ?? i)
    .join(", ")
    .toLowerCase();

  return {
    headline: theme.headline,
    summary: \`\${theme.summary} A \${timeframe} Kuşadası port day (~\${hours.toFixed(1)} usable hours) for \${party} guest\${party === 1 ? "" : "s"} interested in \${interestLabels}.\`,
    excursions: excursionLinks,
    transfers,
    stay: [],
    logistics,
    dayPlan,
  };
}

/** @deprecated Use generateKusadasiPlan */
export const generateKotorPlan = generateKusadasiPlan;
`,
);

// ─── EDITORIAL ───────────────────────────────────────────────────────────────

w(
  "editorial.ts",
  `import type { EditorialCategory } from "./types";

export interface EditorialCategoryDef {
  id: EditorialCategory;
  label: string;
  shortLabel: string;
  description: string;
}

export const EDITORIAL_CATEGORIES: EditorialCategoryDef[] = [
  { id: "editors-choice", label: "Editor's Choice", shortLabel: "Editor's Choice", description: "Our top pick after comparing options for Kuşadası cruise passengers." },
  { id: "best-historic", label: "Best Historic Experience", shortLabel: "Historic", description: "Ancient Ephesus, Roman streets and Terrace Houses without rushing." },
  { id: "best-independent", label: "Best Independent Experience", shortLabel: "Independent", description: "The smartest DIY approach when you prefer to explore from the cruise port." },
  { id: "best-coastal", label: "Best Coastal Experience", shortLabel: "Coastal", description: "Aegean beaches, marina promenade and Ladies Beach timed to your ship." },
  { id: "best-view", label: "Best Viewpoints", shortLabel: "Viewpoints", description: "Great Theatre panoramas, Virgin Mary mountain outlooks and Library facades." },
  { id: "best-families", label: "Best for Families", shortLabel: "Families", description: "Paced for children and mixed-age groups with reliable return timing." },
  { id: "best-photography", label: "Best for Photography", shortLabel: "Photography", description: "Library of Celsus angles, marble streets and theatre tier shots." },
  { id: "best-food", label: "Best Food & Wine Experience", shortLabel: "Food & Wine", description: "Turkish meze, Şirince fruit wine and waterfront dining that fit a cruise schedule." },
  { id: "best-luxury", label: "Best Luxury Experience", shortLabel: "Luxury", description: "Private vehicles, senior guides and VIP Ephesus access from the port." },
  { id: "hidden-gem", label: "Hidden Gem", shortLabel: "Hidden Gem", description: "A rewarding alternative away from the busiest Ephesus coach queues." },
  { id: "best-value", label: "Best Value", shortLabel: "Best Value", description: "Strong sightseeing per euro when budget matters as much as timing." },
  { id: "best-short-port", label: "Best for Short Port Calls", shortLabel: "Short Port", description: "Realistic when your ship is in Kuşadası for under seven usable hours." },
];

export function getEditorialLabel(id: EditorialCategory): string {
  return EDITORIAL_CATEGORIES.find((c) => c.id === id)?.label ?? id;
}
`,
);

// ─── HOMEPAGE ────────────────────────────────────────────────────────────────

w(
  "homepage.ts",
  `import type { FAQ, VisitorType, ExperienceCard } from "./types";

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
    imageKey: "history",
  },
  {
    slug: "turkish-villages",
    title: "Turkish Villages",
    description: "Şirince hillside lanes, fruit wine and Ottoman stone houses near Selçuk.",
    href: "/guides/sirince-village-guide",
    cta: "Explore villages",
    imageKey: "food",
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
    imageKey: "food",
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
`,
);

// ─── SCHEDULES ───────────────────────────────────────────────────────────────

w(
  "schedules.ts",
  `import type { ScheduleEntry, ShipSchedulePort } from "./types";
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
    seoTitle: "Kuşadası Cruise Ship Schedule 2026",
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
`,
);

// ─── PORT GUIDE ──────────────────────────────────────────────────────────────

w(
  "port-guide.ts",
  `import type { FAQ } from "./types";

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
`,
);

// ─── FAQS ────────────────────────────────────────────────────────────────────

w(
  "faqs.ts",
  `import type { FAQ } from "./types";
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
`,
);

// ─── CRUISE PLANNING (Mediterranean internal linking) ────────────────────────

const MED_BASE =
  "Kuşadası sits on Eastern Mediterranean and Greek Isles itineraries — often paired with Rhodes, Santorini, Athens and Bodrum. Plan each port day using dedicated authority guides rather than generic cruise forums.";

const cruisePlanning = [
  {
    s: "mediterranean-cruise-planner",
    title: "Mediterranean Cruise Planner",
    seo: "Mediterranean Cruise Planner — Port-by-Port Shore Excursion Guides",
    meta: "Plan your Mediterranean cruise holistically — Kuşadası, Athens, Rhodes, Santorini, Bodrum and Turkish Aegean authority guides linked for multi-port itineraries.",
    tag: "One itinerary, many ports — link to the right guide at every stop.",
    ov: "Mediterranean cruises string together markedly different ports — Ephesus from Kuşadası, Acropolis from Piraeus, caldera from Santorini. Our network links authoritative port guides so you plan each day correctly.",
    b1: MED_BASE,
    b2: "Use Kuşadası for Ephesus and Virgin Mary planning; Athens for Acropolis and Delphi; Rhodes for Old Town and Lindos. Match excursion booking to each port's geography — Izmir callers face 80 km to Ephesus versus Kuşadası's 20 km.",
    b3: "Book independent excursions per port where timing favours it — Ephesus needs organised transport from any port; Greek island Old Towns vary in walkability.",
    hi: ["Port-specific authority guides", "Linked Eastern Med neighbours", "Realistic per-port timing"],
    ti: ["Plan each port separately", "Book early for peak July slots", "Keep 60–90 min buffers everywhere"],
    q1: "Is this site only for Kuşadası?", a1: "Kuşadası is our focus — we link to Athens, Rhodes, Santorini, Bodrum, Izmir and broader Med planning resources.",
    q2: "Where is the main Med planner?", a2: "https://mediterraneancruiseplanner.com — hub for multi-port itinerary tools.",
    rel: ["athens-shore-excursions", "rhodes-shore-excursions", "izmir-shore-excursions"],
    img: "city",
  },
  {
    s: "athens-shore-excursions",
    title: "Athens Cruise Excursions — Greek Mainland",
    seo: "Athens Cruise Excursions — Cruise Port Guide (External)",
    meta: "Planning Athens on the same cruise as Kuşadası? Authority guide for Piraeus port, Acropolis, Delphi and Cape Sounion at athenscruiseexcursions.com.",
    tag: "Ephesus one day, Acropolis the next — plan both correctly.",
    ov: "Athens and Kuşadası often appear on Eastern Mediterranean itineraries — but they demand different planning. Piraeus is 10 km from the Acropolis; Kuşadası is 20 km from Ephesus.",
    b1: MED_BASE,
    b2: "Athens highlights: Acropolis and Parthenon, Acropolis Museum, Plaka district and Delphi day trips. Allow 30–45 minutes transfer from Piraeus to central Athens.",
    b3: "Full authority site: https://athenscruiseexcursions.com — shore excursions, comparisons, ship schedules and cruise planner for Piraeus port days.",
    hi: ["Piraeus port transfers", "Acropolis and museum", "Delphi and Cape Sounion options"],
    ti: ["Do not assume Kuşadası timing fits Athens", "Pre-book Acropolis tickets in peak season", "Allow longer mainland transfers"],
    recs: [
      { c: "editors-choice", t: "Athens Cruise Excursions", d: "Full Athens cruise planning authority.", h: "https://athenscruiseexcursions.com" },
      { c: "best-historic", t: "Acropolis Guide", d: "Parthenon from Piraeus.", h: "https://athenscruiseexcursions.com" },
    ],
    rel: ["rhodes-shore-excursions", "santorini-shore-excursions", "mediterranean-cruise-planner"],
    img: "history",
  },
  {
    s: "bodrum-shore-excursions",
    title: "Bodrum Shore Excursions — Turkish Aegean",
    seo: "Bodrum Shore Excursions — Cruise Port Guide (External)",
    meta: "Calling at Bodrum on your Mediterranean cruise? Authority guide for the Castle of St Peter, Greek ruins and Turkish Riviera at bodrumshoreexcursion.com.",
    tag: "Two Turkish Aegean ports — Bodrum and Kuşadası need different plans.",
    ov: "Bodrum and Kuşadası both sit on Turkish Aegean itineraries but offer different experiences — Bodrum's castle and marina versus Kuşadası's Ephesus gateway.",
    b1: MED_BASE,
    b2: "Bodrum highlights: Castle of St Peter, Mausoleum ruins, marina promenade and gulet boat trips. Kuşadası highlights: Ephesus, Virgin Mary and Şirince. Do not duplicate Ephesus planning at Bodrum — it is not a day trip from there.",
    b3: "Full authority site: https://bodrumshoreexcursion.com — excursions, comparisons and port guides for Bodrum cruise days.",
    hi: ["Bodrum Castle", "Turkish Riviera marina", "Different focus from Kuşadası"],
    ti: ["Plan Ephesus at Kuşadası only", "Bodrum for castle and coast", "Book coaches before peak season"],
    recs: [
      { c: "editors-choice", t: "Bodrum Shore Excursions", d: "Full Bodrum cruise planning authority.", h: "https://bodrumshoreexcursion.com" },
      { c: "best-coastal", t: "Bodrum Marina Guide", d: "Aegean coast from cruise port.", h: "https://bodrumshoreexcursion.com" },
    ],
    rel: ["izmir-shore-excursions", "mediterranean-cruise-planner", "athens-shore-excursions"],
    img: "coast",
  },
  {
    s: "santorini-shore-excursions",
    title: "Santorini Shore Excursions — Cyclades",
    seo: "Santorini Shore Excursions — Cruise Port Guide (External)",
    meta: "Calling at Santorini on your Mediterranean cruise? Authority guide for Oia, Fira, caldera views and tender operations at santorinishoreexcursion.com.",
    tag: "Caldera sunsets and tender logistics — Santorini needs its own plan.",
    ov: "Santorini pairs dramatic caldera views with tender operations and cliff-side villages — utterly different geography from Kuşadası's Ephesus coach days.",
    b1: MED_BASE,
    b2: "Santorini ships anchor or tender — add 20–30 minutes each way. Highlights: Oia sunsets, Fira caldera views, Akrotiri ruins and wine tastings. Kuşadası the next day needs Ephesus energy, not sunset chasing.",
    b3: "Full authority site: https://santorinishoreexcursion.com — excursions, comparisons and port guides for Cyclades cruise days.",
    hi: ["Tender operations common", "Oia and Fira villages", "Akrotiri Minoan ruins"],
    ti: ["Allow tender time in planning", "Kuşadası next day is Ephesus-focused", "Book wine tours early"],
    recs: [
      { c: "editors-choice", t: "Santorini Shore Excursions", d: "Full Santorini cruise planning authority.", h: "https://santorinishoreexcursion.com" },
      { c: "best-view", t: "Oia Caldera Guide", d: "Sunset viewpoints from Athinios.", h: "https://santorinishoreexcursion.com" },
    ],
    rel: ["rhodes-shore-excursions", "athens-shore-excursions", "mediterranean-cruise-planner"],
    img: "coast",
  },
  {
    s: "rhodes-shore-excursions",
    title: "Rhodes Shore Excursions — Dodecanese",
    seo: "Rhodes Shore Excursions — Cruise Port Guide (External)",
    meta: "Planning Rhodes on the same cruise as Kuşadası? Authority guide for Medieval Old Town, Lindos and Acropolis at rhodesshoreexcursion.com.",
    tag: "Medieval Rhodes and ancient Ephesus — consecutive UNESCO days.",
    ov: "Rhodes and Kuşadası often share Eastern Mediterranean loops. Rhodes Old Town is walkable from the commercial port; Kuşadası needs a coach to Ephesus — different transfer realities.",
    b1: MED_BASE,
    b2: "Rhodes highlights: Medieval Old Town, Palace of the Grand Master, Lindos Acropolis and butterfly valley. Kuşadası: Ephesus and Virgin Mary. Pace yourself across consecutive heavy walking days.",
    b3: "Full authority site: https://rhodesshoreexcursion.com — excursions, comparisons and port guides for Rhodes cruise days.",
    hi: ["Walkable Medieval Old Town", "Lindos Acropolis day trips", "Different walkability from Kuşadası"],
    ti: ["Rhodes port walkable — Kuşadası is not for Ephesus", "Vary active days across the week", "Book Lindos coaches early"],
    recs: [
      { c: "editors-choice", t: "Rhodes Shore Excursions", d: "Full Rhodes cruise planning authority.", h: "https://rhodesshoreexcursion.com" },
      { c: "best-historic", t: "Rhodes Old Town Guide", d: "Medieval streets from cruise port.", h: "https://rhodesshoreexcursion.com" },
    ],
    rel: ["santorini-shore-excursions", "athens-shore-excursions", "mediterranean-cruise-planner"],
    img: "medieval",
  },
  {
    s: "izmir-shore-excursions",
    title: "Izmir Shore Excursions — Sister Turkish Port",
    seo: "Izmir Shore Excursions — Ephesus from 80 km vs Kuşadası 20 km",
    meta: "Izmir and Kuşadası both access Ephesus — but Izmir port is 80 km from the ruins versus Kuşadası's 20 km. Plan at izmirshoreexcursions.com.",
    tag: "Same ruins, different port — Kuşadası is far closer to Ephesus.",
    ov: "Some itineraries call at Izmir (Alsancak) instead of or as well as Kuşadası. Both ports sell Ephesus excursions — but transfer time from Izmir is roughly four times longer.",
    b1: MED_BASE,
    b2: "From Kuşadası: 25–35 minutes to Ephesus — half-day tours viable. From Izmir: 60–90 minutes each way — full-day commitment. If your cruise calls both, do Ephesus at Kuşadası and use Izmir for city bazaar or Pergamon.",
    b3: "Full authority site: https://izmirshoreexcursions.com — shore excursions, comparisons and port guides for Izmir cruise days.",
    hi: ["Kuşadası 20 km to Ephesus", "Izmir 80 km to Ephesus", "Plan Ephesus at closest port"],
    ti: ["Never duplicate Ephesus at both ports", "Izmir for Konak bazaar if Ephesus done", "Check which Turkish port your sailing uses"],
    recs: [
      { c: "editors-choice", t: "Izmir Shore Excursions", d: "Full Izmir cruise planning authority.", h: "https://izmirshoreexcursions.com" },
      { c: "best-historic", t: "Ephesus from Izmir", d: "Longer transfer honest guide.", h: "https://izmirshoreexcursions.com" },
    ],
    rel: ["mediterranean-cruise-planner", "bodrum-shore-excursions", "ephesus-cruise-guide"],
    img: "city",
  },
];

w(
  "cruise-planning.ts",
  `import type { GuidePage } from "./types";

export const cruisePlanningPages: GuidePage[] = [
${cruisePlanning.map(planningPage).join(",\n")}
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
`,
);

w("imported-schedules/kusadasi.json", "[]\n");

console.log("Kusadasi data generation complete.");
