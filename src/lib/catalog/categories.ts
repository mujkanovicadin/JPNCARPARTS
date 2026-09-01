import type { Category } from "./types";

export const categories: Category[] = [
  {
    slug: "engine",
    name: "Engine",
    description: "Intakes, exhausts, and engine performance parts.",
  },
  {
    slug: "suspension",
    name: "Suspension",
    description: "Coilovers, springs, and chassis components.",
  },
  {
    slug: "brakes",
    name: "Brakes",
    description: "Brake pads, rotors, and brake lines.",
  },
  {
    slug: "wheels",
    name: "Wheels",
    description: "Lightweight forged and cast wheels.",
  },
  {
    slug: "oem",
    name: "OEM Replacement",
    description: "Genuine manufacturer replacement parts.",
  },
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((category) => category.slug === slug);
}
