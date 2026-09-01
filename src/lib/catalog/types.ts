export interface Category {
  slug: string;
  name: string;
  description: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  manufacturer: string;
  brand: string;
  partNumber: string;
  categorySlug: string;
  /** Price in integer minor units (cents). Never use floating point for money. */
  priceMinorUnits: number;
  currency: string;
  description: string;
  specifications: string[];
  /**
   * Compatibility is INFERRED from mock catalog data, not verified against a
   * manufacturer source. Never present this as VERIFIED compatibility.
   */
  compatibleVehicles: string[];
  image: string;
  availability: "in_stock" | "made_to_order" | "backordered";
  countryOfOrigin: string;
  featured?: boolean;
}
