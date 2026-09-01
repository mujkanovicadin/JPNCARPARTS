export interface Brand {
  id: string;
  name: string;
  slug: string;
  website: string | null;
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  description: string;
}

export type PartNumberType =
  | "oem"
  | "manufacturer"
  | "supplier_sku"
  | "alternate"
  | "cross_reference";

export interface PartNumber {
  id: string;
  number: string;
  numberType: PartNumberType;
  previousNumber: string | null;
  replacementNumber: string | null;
  notes: string | null;
}

export interface Vehicle {
  id: string;
  make: string;
  model: string;
  generation: string | null;
  trim: string | null;
  yearStart: number;
  yearEnd: number | null;
  engine: string | null;
  engineCode: string | null;
  transmission: string | null;
  drivetrain: string | null;
  market: string | null;
  chassisCode: string | null;
}

export type VerificationStatus =
  | "VERIFIED"
  | "SUPPLIER_CONFIRMED"
  | "INFERRED"
  | "UNKNOWN"
  | "NOT_COMPATIBLE";

export interface CompatibilityEntry {
  id: string;
  vehicle: Vehicle;
  compatibilityType: string;
  source: string | null;
  confidence: number | null;
  notes: string | null;
  verificationStatus: VerificationStatus;
}

export type Availability = "in_stock" | "made_to_order" | "backordered";

export interface Product {
  id: string;
  slug: string;
  canonicalName: string;
  brand: Brand;
  manufacturer: string;
  categorySlug: string;
  categoryName: string;
  description: string;
  specifications: string[];
  images: string[];
  /** Integer minor units (cents). Null when no verifiable price was found
   *  for this product — never fabricated, per CLAUDE.md section 37/38. */
  priceMinorUnits: number | null;
  currency: string;
  availability: Availability;
  sourceUrl: string | null;
  countryOfOrigin: string | null;
  partNumbers: PartNumber[];
  compatibility: CompatibilityEntry[];
}

/** Lightweight shape for list/grid views that don't need the full detail joins. */
export interface ProductSummary {
  id: string;
  slug: string;
  canonicalName: string;
  brandName: string;
  categorySlug: string;
  images: string[];
  priceMinorUnits: number | null;
  currency: string;
  availability: Availability;
  primaryPartNumber: string | null;
}
