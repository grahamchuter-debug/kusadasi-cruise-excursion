import type { EditorialCategory } from "./types";

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
