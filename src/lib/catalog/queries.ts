import "server-only";
import { createClient } from "@/lib/supabase/server";
import type {
  Availability,
  Category,
  CompatibilityEntry,
  PartNumber,
  Product,
  ProductSummary,
  Vehicle,
} from "./types";

const PRODUCT_SUMMARY_SELECT = `
  id, slug, canonical_name, price_minor_units, currency, availability, images,
  brand:brands ( name ),
  category:categories ( slug ),
  part_numbers ( number )
`;

const PRODUCT_DETAIL_SELECT = `
  id, slug, canonical_name, manufacturer, description, specifications, images,
  price_minor_units, currency, availability, source_url, country_of_origin,
  brand:brands ( id, name, slug, website ),
  category:categories ( slug, name ),
  part_numbers ( id, number, number_type, previous_number, replacement_number, notes ),
  compatibility (
    id, compatibility_type, source, confidence, notes, verification_status,
    vehicle:vehicles ( id, make, model, generation, trim, year_start, year_end, engine, engine_code, transmission, drivetrain, market, chassis_code )
  )
`;

interface RawBrand {
  id: string;
  name: string;
  slug: string;
  website: string | null;
}

interface RawCategory {
  slug: string;
  name: string;
}

interface RawPartNumber {
  id: string;
  number: string;
  number_type: PartNumber["numberType"];
  previous_number: string | null;
  replacement_number: string | null;
  notes: string | null;
}

interface RawVehicle {
  id: string;
  make: string;
  model: string;
  generation: string | null;
  trim: string | null;
  year_start: number;
  year_end: number | null;
  engine: string | null;
  engine_code: string | null;
  transmission: string | null;
  drivetrain: string | null;
  market: string | null;
  chassis_code: string | null;
}

interface RawCompatibility {
  id: string;
  compatibility_type: string;
  source: string | null;
  confidence: number | null;
  notes: string | null;
  verification_status: CompatibilityEntry["verificationStatus"];
  vehicle: RawVehicle;
}

interface RawProductSummary {
  id: string;
  slug: string;
  canonical_name: string;
  price_minor_units: number | null;
  currency: string;
  availability: Availability;
  images: string[];
  brand: { name: string } | null;
  category: { slug: string } | null;
  part_numbers: { number: string }[];
}

interface RawProductDetail {
  id: string;
  slug: string;
  canonical_name: string;
  manufacturer: string;
  description: string;
  specifications: string[];
  images: string[];
  price_minor_units: number | null;
  currency: string;
  availability: Availability;
  source_url: string | null;
  country_of_origin: string | null;
  brand: RawBrand | null;
  category: RawCategory | null;
  part_numbers: RawPartNumber[];
  compatibility: RawCompatibility[];
}

function toVehicle(raw: RawVehicle): Vehicle {
  return {
    id: raw.id,
    make: raw.make,
    model: raw.model,
    generation: raw.generation,
    trim: raw.trim,
    yearStart: raw.year_start,
    yearEnd: raw.year_end,
    engine: raw.engine,
    engineCode: raw.engine_code,
    transmission: raw.transmission,
    drivetrain: raw.drivetrain,
    market: raw.market,
    chassisCode: raw.chassis_code,
  };
}

function toProductSummary(raw: RawProductSummary): ProductSummary {
  return {
    id: raw.id,
    slug: raw.slug,
    canonicalName: raw.canonical_name,
    brandName: raw.brand?.name ?? "",
    categorySlug: raw.category?.slug ?? "",
    images: raw.images,
    priceMinorUnits: raw.price_minor_units,
    currency: raw.currency,
    availability: raw.availability,
    primaryPartNumber: raw.part_numbers[0]?.number ?? null,
  };
}

function toProductDetail(raw: RawProductDetail): Product {
  return {
    id: raw.id,
    slug: raw.slug,
    canonicalName: raw.canonical_name,
    brand: raw.brand
      ? { id: raw.brand.id, name: raw.brand.name, slug: raw.brand.slug, website: raw.brand.website }
      : { id: "", name: raw.manufacturer, slug: "", website: null },
    manufacturer: raw.manufacturer,
    categorySlug: raw.category?.slug ?? "",
    categoryName: raw.category?.name ?? "",
    description: raw.description,
    specifications: raw.specifications,
    images: raw.images,
    priceMinorUnits: raw.price_minor_units,
    currency: raw.currency,
    availability: raw.availability,
    sourceUrl: raw.source_url,
    countryOfOrigin: raw.country_of_origin,
    partNumbers: raw.part_numbers.map((pn) => ({
      id: pn.id,
      number: pn.number,
      numberType: pn.number_type,
      previousNumber: pn.previous_number,
      replacementNumber: pn.replacement_number,
      notes: pn.notes,
    })),
    compatibility: raw.compatibility.map((c) => ({
      id: c.id,
      vehicle: toVehicle(c.vehicle),
      compatibilityType: c.compatibility_type,
      source: c.source,
      confidence: c.confidence,
      notes: c.notes,
      verificationStatus: c.verification_status,
    })),
  };
}

export async function getCategories(): Promise<Category[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("categories")
    .select("id, slug, name, description")
    .order("name");
  return data ?? [];
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("categories")
    .select("id, slug, name, description")
    .eq("slug", slug)
    .maybeSingle();
  return data ?? null;
}

export async function getFeaturedProducts(limit = 4): Promise<ProductSummary[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("products")
    .select(PRODUCT_SUMMARY_SELECT)
    .order("created_at", { ascending: false })
    .limit(limit)
    .returns<RawProductSummary[]>();
  return (data ?? []).map(toProductSummary);
}

export async function searchProducts(params: {
  category?: string;
  query?: string;
}): Promise<ProductSummary[]> {
  const supabase = await createClient();
  let request = supabase.from("products").select(PRODUCT_SUMMARY_SELECT);

  if (params.category) {
    const category = await getCategoryBySlug(params.category);
    if (!category) return [];
    request = request.eq("category_id", category.id);
  }

  if (params.query?.trim()) {
    const term = params.query.trim().replace(/[%,]/g, "");
    request = request.or(`canonical_name.ilike.%${term}%,manufacturer.ilike.%${term}%`);
  }

  const { data } = await request
    .order("canonical_name")
    .returns<RawProductSummary[]>();
  return (data ?? []).map(toProductSummary);
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("products")
    .select(PRODUCT_DETAIL_SELECT)
    .eq("slug", slug)
    .maybeSingle<RawProductDetail>();
  return data ? toProductDetail(data) : null;
}

/**
 * Authoritative server-side price lookup used by checkout. Never trust a
 * client-submitted price — this is the only source of truth for what a
 * product actually costs.
 */
export async function getProductForPricing(id: string): Promise<{
  id: string;
  slug: string;
  name: string;
  priceMinorUnits: number | null;
  currency: string;
} | null> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("products")
    .select("id, slug, canonical_name, price_minor_units, currency")
    .eq("id", id)
    .maybeSingle();
  if (!data) return null;
  return {
    id: data.id,
    slug: data.slug,
    name: data.canonical_name,
    priceMinorUnits: data.price_minor_units,
    currency: data.currency,
  };
}
