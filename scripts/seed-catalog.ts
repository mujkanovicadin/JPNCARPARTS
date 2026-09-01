/**
 * One-off script to upsert the researched catalog data (src/lib/catalog/seed-data.ts)
 * into Supabase. Run with `npm run db:seed`. Uses the service-role client, so this
 * only needs the tables to already exist (migration 0002_catalog.sql run first) —
 * it never runs DDL itself.
 *
 * Idempotent: re-running upserts on natural keys (slug) rather than inserting
 * duplicates, so it's safe to run again after editing seed-data.ts.
 */
import { createClient } from "@supabase/supabase-js";
import {
  seedBrands,
  seedCategories,
  seedProducts,
  seedVehicles,
} from "../src/lib/catalog/seed-data";

function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceRoleKey) {
    throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
  }
  return createClient(url, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

async function main() {
  const supabase = createAdminClient();

  console.log(`Seeding ${seedCategories.length} categories...`);
  const { data: categories, error: categoryError } = await supabase
    .from("categories")
    .upsert(seedCategories, { onConflict: "slug" })
    .select("id, slug");
  if (categoryError) throw categoryError;
  const categoryIdBySlug = new Map(categories.map((c) => [c.slug, c.id as string]));

  console.log(`Seeding ${seedBrands.length} brands...`);
  const { data: brands, error: brandError } = await supabase
    .from("brands")
    .upsert(
      seedBrands.map(({ slug, name, website }) => ({ slug, name, website })),
      { onConflict: "slug" }
    )
    .select("id, slug");
  if (brandError) throw brandError;
  const brandIdBySlug = new Map(brands.map((b) => [b.slug, b.id as string]));

  console.log(`Seeding ${seedVehicles.length} vehicles...`);
  const vehicleIdByKey = new Map<string, string>();
  for (const vehicle of seedVehicles) {
    const { data: existing } = await supabase
      .from("vehicles")
      .select("id")
      .eq("make", vehicle.make)
      .eq("model", vehicle.model)
      .eq("generation", vehicle.generation)
      .maybeSingle();

    if (existing) {
      vehicleIdByKey.set(vehicle.key, existing.id);
      continue;
    }

    const { data: inserted, error } = await supabase
      .from("vehicles")
      .insert({
        make: vehicle.make,
        model: vehicle.model,
        generation: vehicle.generation,
        trim: vehicle.trim,
        year_start: vehicle.yearStart,
        year_end: vehicle.yearEnd,
        engine: vehicle.engine,
        engine_code: vehicle.engineCode,
        transmission: vehicle.transmission,
        drivetrain: vehicle.drivetrain,
        market: vehicle.market,
        chassis_code: vehicle.chassisCode,
      })
      .select("id")
      .single();
    if (error) throw error;
    vehicleIdByKey.set(vehicle.key, inserted.id);
  }

  console.log(`Seeding ${seedProducts.length} products (with part numbers + compatibility)...`);
  for (const product of seedProducts) {
    const brandId = brandIdBySlug.get(product.brandSlug);
    const categoryId = categoryIdBySlug.get(product.categorySlug);
    if (!brandId || !categoryId) {
      throw new Error(`Missing brand/category for product ${product.slug}`);
    }

    const { data: upsertedProduct, error: productError } = await supabase
      .from("products")
      .upsert(
        {
          slug: product.slug,
          canonical_name: product.canonicalName,
          brand_id: brandId,
          manufacturer: product.manufacturer,
          category_id: categoryId,
          description: product.description,
          specifications: product.specifications,
          images: ["/part-placeholder.svg"],
          price_minor_units: product.priceMinorUnits,
          currency: product.currency,
          availability: product.availability,
          source_url: product.sourceUrl,
          country_of_origin: product.countryOfOrigin,
        },
        { onConflict: "slug" }
      )
      .select("id")
      .single();
    if (productError) throw productError;
    const productId = upsertedProduct.id as string;

    // Replace part numbers and compatibility rows for this product so
    // re-running the script after editing seed-data.ts doesn't accumulate
    // duplicates or leave stale rows behind.
    await supabase.from("part_numbers").delete().eq("product_id", productId);
    if (product.partNumbers.length > 0) {
      const { error } = await supabase.from("part_numbers").insert(
        product.partNumbers.map((pn) => ({
          product_id: productId,
          number: pn.number,
          number_type: pn.numberType,
          notes: pn.notes ?? null,
        }))
      );
      if (error) throw error;
    }

    await supabase.from("compatibility").delete().eq("product_id", productId);
    if (product.compatibility.length > 0) {
      const { error } = await supabase.from("compatibility").insert(
        product.compatibility.map((c) => ({
          product_id: productId,
          vehicle_id: vehicleIdByKey.get(c.vehicleKey),
          compatibility_type: c.compatibilityType,
          source: c.source,
          confidence: c.confidence,
          notes: c.notes,
          verification_status: c.verificationStatus,
        }))
      );
      if (error) throw error;
    }
  }

  console.log("Done.");
  console.log(
    `  categories: ${categories.length}  brands: ${brands.length}  vehicles: ${vehicleIdByKey.size}  products: ${seedProducts.length}`
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
