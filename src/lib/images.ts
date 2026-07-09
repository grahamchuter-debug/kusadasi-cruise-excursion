export interface SiteImage {
  src: string;
  alt: string;
}

const B = "/images";

export const siteImages = {
  hero: {
    src: `${B}/hero-home.jpg`,
    alt: "Library of Celsus at ancient Ephesus in warm golden light",
  },
  ogDefault: {
    src: `${B}/og-default.jpg`,
    alt: "Marble Street of Curetes at ancient Ephesus",
  },
  logo: {
    src: `${B}/logo-mark.svg`,
    alt: "Kuşadası Cruise Excursions",
  },
  port: {
    src: `${B}/cruise-port.jpg`,
    alt: "Cruise ships at the Port of Kuşadası",
  },
} as const;

export const subjectImages: Record<string, SiteImage> = {
  ephesus: { src: `${B}/ephesus.jpg`, alt: "Library of Celsus at ancient Ephesus" },
  "ancient-history": { src: `${B}/marble-streets.jpg`, alt: "Marble Street of Curetes at Ephesus" },
  biblical: { src: `${B}/virgin-mary.jpg`, alt: "House of the Virgin Mary chapel above Selçuk" },
  village: { src: `${B}/sirince.jpg`, alt: "Şirince village stone houses and wine cellars" },
  nature: { src: `${B}/mountains.jpg`, alt: "Hills and olive groves above the Selçuk valley near Ephesus" },
  private: { src: `${B}/private.jpg`, alt: "Walking Curetes Street on a private Ephesus tour" },
  culture: { src: `${B}/bazaar.jpg`, alt: "Kuşadası shopping bazaar and waterfront" },
  theatre: { src: `${B}/theatre.jpg`, alt: "Great Theatre at ancient Ephesus" },
  terrace: { src: `${B}/terrace-houses.jpg`, alt: "Terrace Houses mosaics at Ephesus" },
  food: { src: `${B}/food.jpg`, alt: "Traditional Turkish meze and Aegean cuisine" },
  history: { src: `${B}/hadrian.jpg`, alt: "Temple of Hadrian at ancient Ephesus" },
  family: { src: `${B}/family.jpg`, alt: "Great Theatre at Ephesus — family-friendly ancient site" },
  luxury: { src: `${B}/luxury.jpg`, alt: "Terrace Houses frescoes at Ephesus" },
  compare: { src: `${B}/compare.jpg`, alt: "Roman columns and ruins at Ephesus" },
  port: { src: `${B}/cruise-port.jpg`, alt: "Cruise ships docked at Kuşadası Cruise Port" },
  highlights: { src: `${B}/highlights.jpg`, alt: "Marble Street at Ephesus from Kuşadası cruise port" },
  photography: { src: `${B}/photography.jpg`, alt: "Library of Celsus photographed in golden morning light" },
  coast: { src: `${B}/coast.jpg`, alt: "Kuşadası harbour on the Aegean coast" },
  beach: { src: `${B}/beach.jpg`, alt: "Ladies Beach (Kadınlar Denizi) near Kuşadası" },
  bazaar: { src: `${B}/bazaar.jpg`, alt: "Kuşadası town bazaar and shopping streets" },
  city: { src: `${B}/coast.jpg`, alt: "Kuşadası waterfront and harbour promenade" },
  mountains: { src: `${B}/mountains.jpg`, alt: "Aegean hills and landscape near Ephesus" },
  medieval: { src: `${B}/history.jpg`, alt: "Temple of Hadrian — Roman architecture at Ephesus" },
  "marble-streets": { src: `${B}/marble-streets.jpg`, alt: "Curetes Street marble avenue at Ephesus" },
  hadrian: { src: `${B}/hadrian.jpg`, alt: "Temple of Hadrian reliefs at Ephesus" },
};

function pick(key: string): SiteImage {
  return subjectImages[key] ?? siteImages.ogDefault;
}

const excursionImageKeys: Record<string, string> = {
  "ephesus-and-house-of-virgin-mary-tour": "ephesus",
  "ephesus-shore-excursion": "ephesus",
  "ancient-ephesus-highlights-tour": "highlights",
  "terrace-houses-ephesus-tour": "terrace",
  "sirince-village-tour": "village",
  "private-ephesus-tour": "private",
  "family-ephesus-tour": "family",
  "luxury-private-ephesus-tour": "luxury",
  "half-day-ephesus-tour": "marble-streets",
  "kusadasi-town-and-beach-tour": "beach",
};

export function getExcursionImage(slug: string): SiteImage {
  return pick(excursionImageKeys[slug] ?? "ephesus");
}

export const excursionsHubImage = pick("ephesus");

const highlightImageKeys: Record<string, string> = {
  "ephesus-guide": "ephesus",
  "library-of-celsus-guide": "photography",
  "great-theatre-ephesus-guide": "theatre",
  "terrace-houses-ephesus-guide": "terrace",
  "house-of-virgin-mary-guide": "biblical",
  "sirince-village-guide": "village",
  "temple-of-hadrian-ephesus-guide": "hadrian",
  "turkish-food-kusadasi-guide": "food",
  "turkish-currency-guide": "bazaar",
  "what-to-wear-turkey-guide": "marble-streets",
  "best-time-visit-ephesus-guide": "photography",
  "photography-ephesus-guide": "photography",
};

export function getHighlightImage(slug: string): SiteImage {
  return pick(highlightImageKeys[slug] ?? "ephesus");
}

const experienceImageKeys: Record<string, string> = {
  "kusadasi-for-first-time-visitors": "highlights",
  "independent-kusadasi-guide": "port",
  "one-day-in-kusadasi": "marble-streets",
  "ephesus-cruise-guide": "ephesus",
  "biblical-sites-kusadasi-guide": "biblical",
  "kusadasi-for-families": "family",
};

export function getExperienceImage(slug: string): SiteImage {
  return pick(experienceImageKeys[slug] ?? "ephesus");
}

const comparisonImageKeys: Record<string, string> = {
  "is-ephesus-worth-visiting": "ephesus",
  "ephesus-vs-pompeii": "compare",
  "house-of-virgin-mary-or-ephesus": "biblical",
  "best-excursion-first-time-visitors": "highlights",
  "can-you-visit-ephesus-independently": "port",
  "private-tour-vs-group-tour": "private",
  "terrace-houses-worth-it": "luxury",
  "one-day-in-kusadasi": "marble-streets",
};

export function getComparisonImage(slug: string): SiteImage {
  return pick(comparisonImageKeys[slug] ?? "compare");
}

export function getGuideImage(imageKey: string): SiteImage {
  return pick(imageKey);
}

export function getHotelImage(_slug: string): SiteImage {
  return pick("ephesus");
}

export function getTransferImage(_slug: string): SiteImage {
  return pick("port");
}
