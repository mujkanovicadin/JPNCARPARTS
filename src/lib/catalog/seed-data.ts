/**
 * Real product data researched from official brand/manufacturer sites (and,
 * where noted, authorized distributor listings) — not invented. Consumed
 * only by scripts/seed-catalog.ts to populate the database; the app reads
 * from the database via src/lib/catalog/queries.ts, not from this file.
 *
 * Every product's `sourceUrl` and each compatibility entry's `source` point
 * at where the claim was found. `verificationStatus` is SUPPLIER_CONFIRMED
 * only when the fitment claim came directly from the brand's own page;
 * everything else is INFERRED (found via a retailer/distributor listing).
 * `priceMinorUnits` is left `null` when no real price could be found
 * anywhere — per CLAUDE.md section 37, prices are never fabricated.
 */

import type { Availability, PartNumberType, VerificationStatus } from "./types";

export const seedCategories = [
  { slug: "engine", name: "Engine", description: "Intakes, exhausts, and engine performance parts." },
  { slug: "suspension", name: "Suspension", description: "Coilovers, braces, and drivetrain components." },
  { slug: "brakes", name: "Brakes", description: "Brake pads, rotors, and big-brake kits." },
  { slug: "wheels", name: "Wheels", description: "Forged and cast performance wheels." },
  { slug: "oem", name: "OEM & Interior", description: "Genuine maintenance parts and interior upgrades." },
] as const;

export const seedBrands = [
  { slug: "hks", name: "HKS", website: "https://www.hks-power.co.jp" },
  { slug: "tomei", name: "Tomei", website: "https://www.tomeiusa.com" },
  { slug: "tein", name: "TEIN", website: "https://www.tein.com" },
  { slug: "cusco", name: "Cusco", website: "https://www.cusco.co.jp" },
  { slug: "project-mu", name: "Project Mu", website: "https://www.project-mu.co.jp" },
  { slug: "endless", name: "Endless", website: "https://endless-advance.com" },
  { slug: "rays", name: "RAYS", website: "https://www.rayswheels.co.jp" },
  { slug: "enkei", name: "Enkei", website: "https://www.enkei.com" },
  { slug: "toyota", name: "Toyota", website: "https://www.toyota.com" },
  { slug: "greddy", name: "GReddy", website: "https://www.greddy.com" },
  { slug: "blitz", name: "Blitz", website: "https://www.blitz.co.jp" },
  { slug: "bride", name: "Bride", website: "https://www.bride.co.jp" },
] as const;

export const seedVehicles = [
  {
    key: "gr86",
    make: "Toyota",
    model: "GR86",
    generation: "ZN8",
    trim: null,
    yearStart: 2022,
    yearEnd: null,
    engine: "2.4L NA Flat-4",
    engineCode: "FA24",
    transmission: "6MT / 6AT",
    drivetrain: "RWD",
    market: "Global",
    chassisCode: "ZN8",
  },
  {
    key: "brz",
    make: "Subaru",
    model: "BRZ",
    generation: "ZD8",
    trim: null,
    yearStart: 2022,
    yearEnd: null,
    engine: "2.4L NA Flat-4",
    engineCode: "FA24",
    transmission: "6MT / 6AT",
    drivetrain: "RWD",
    market: "Global",
    chassisCode: "ZD8",
  },
  {
    key: "gr-supra",
    make: "Toyota",
    model: "GR Supra",
    generation: "A90/A91",
    trim: "3.0",
    yearStart: 2019,
    yearEnd: null,
    engine: "3.0L Turbo I6",
    engineCode: "B58",
    transmission: "6MT / 8AT",
    drivetrain: "RWD",
    market: "Global",
    chassisCode: "DB",
  },
] as const;

interface SeedPartNumber {
  number: string;
  numberType: PartNumberType;
  notes?: string;
}

interface SeedCompatibility {
  vehicleKey: (typeof seedVehicles)[number]["key"];
  compatibilityType: string;
  source: string;
  confidence: number;
  notes: string;
  verificationStatus: VerificationStatus;
}

interface SeedProduct {
  slug: string;
  canonicalName: string;
  brandSlug: (typeof seedBrands)[number]["slug"];
  manufacturer: string;
  categorySlug: (typeof seedCategories)[number]["slug"];
  description: string;
  specifications: string[];
  priceMinorUnits: number | null;
  currency: string;
  availability: Availability;
  sourceUrl: string;
  countryOfOrigin: string | null;
  partNumbers: SeedPartNumber[];
  compatibility: SeedCompatibility[];
}

const PLACEHOLDER_IMAGE = "/part-placeholder.svg";

export const seedProducts: SeedProduct[] = [
  {
    slug: "hks-super-sqv4-bov",
    canonicalName: "HKS Super SQV4 Blow-Off Valve (Silver)",
    brandSlug: "hks",
    manufacturer: "HKS",
    categorySlug: "engine",
    description:
      "Open-atmosphere blow-off valve with an aluminum charge pipe replacing the stock resin pipe for improved durability and reduced flow resistance, tuned to retain factory boost-cut compatibility on the Valvetronic B58 turbo.",
    specifications: [
      "Aluminum charge pipe (replaces stock resin)",
      "Open-atmosphere design; closed-loop recirculation kit available",
      "Retains factory boost-cut compatibility",
    ],
    priceMinorUnits: 44900,
    currency: "USD",
    availability: "made_to_order",
    sourceUrl: "https://www.hks-power.co.jp/en/product_db/blow_off/db/31630",
    countryOfOrigin: "Japan",
    partNumbers: [
      {
        number: "71008-AT021",
        numberType: "manufacturer",
        notes: "Open-atmosphere version; 71008-AT021V is the closed-loop recirculation-kit variant.",
      },
    ],
    compatibility: [
      {
        vehicleKey: "gr-supra",
        compatibilityType: "direct_fit",
        source: "https://www.hks-power.co.jp/en/product_db/blow_off/db/31630",
        confidence: 0.95,
        notes: "GR Supra A90 (chassis DB02), B58, MY19/10+, manual.",
        verificationStatus: "SUPPLIER_CONFIRMED",
      },
    ],
  },
  {
    slug: "hks-cold-air-intake-full-kit",
    canonicalName: "HKS Cold Air Intake Full Kit",
    brandSlug: "hks",
    manufacturer: "HKS",
    categorySlug: "engine",
    description:
      "Full cold air intake kit built around HKS's Super Power Flow two-layer wet filter and a carbon-fiber racing suction piece for a direct-fit induction upgrade.",
    specifications: [
      "Super Power Flow Φ150-80mm two-layer wet filter",
      "Carbon-fiber racing suction piece",
      "Direct fitment for ZN8/ZD8 chassis",
    ],
    priceMinorUnits: 79900,
    currency: "USD",
    availability: "made_to_order",
    sourceUrl: "https://www.rhdjapan.com/hks-cold-air-intake-full-kit-brz-zd8-gr86-zn8.html",
    countryOfOrigin: "Japan",
    partNumbers: [
      {
        number: "70026-AT012",
        numberType: "manufacturer",
        notes: "Full kit; airbox sold separately as 70026-AT010, carbon suction piece as 70026-AT011.",
      },
    ],
    compatibility: [
      {
        vehicleKey: "gr86",
        compatibilityType: "direct_fit",
        source: "https://www.rhdjapan.com/hks-cold-air-intake-full-kit-brz-zd8-gr86-zn8.html",
        confidence: 0.7,
        notes: "GR86 ZN8, FA24. Confirmed via authorized distributor listing, not HKS's own product page.",
        verificationStatus: "INFERRED",
      },
      {
        vehicleKey: "brz",
        compatibilityType: "direct_fit",
        source: "https://www.rhdjapan.com/hks-cold-air-intake-full-kit-brz-zd8-gr86-zn8.html",
        confidence: 0.7,
        notes: "BRZ ZD8, FA24. Confirmed via authorized distributor listing, not HKS's own product page.",
        verificationStatus: "INFERRED",
      },
    ],
  },
  {
    slug: "tomei-expreme-ti-muffler",
    canonicalName: "Tomei Expreme Ti Full Titanium Muffler, Type-80 Ver.2",
    brandSlug: "tomei",
    manufacturer: "Tomei",
    categorySlug: "engine",
    description:
      "Full titanium single-exit muffler tuned for the FA20/FA24 platform, cutting roughly 14 lb versus the stock exhaust.",
    specifications: [
      "Full titanium construction",
      "Approx. 14 lb lighter than stock",
      "Type-80 single-exit muffler tuned for FA20/FA24",
    ],
    priceMinorUnits: 129000,
    currency: "USD",
    availability: "made_to_order",
    sourceUrl:
      "https://products.tomeiusa.com/muffler/1755-full-titanium-muffler-kit-exprem-ti-86-fr-s-brz-type-80-ver2",
    countryOfOrigin: "Japan",
    partNumbers: [
      {
        number: "TB6090-SB05A",
        numberType: "manufacturer",
        notes: "Ver.2 single-exit. Ver.3 is TB6090-SB05C; Type-D dual-exit is TB6090-SB05B.",
      },
    ],
    compatibility: [
      {
        vehicleKey: "gr86",
        compatibilityType: "direct_fit",
        source:
          "https://products.tomeiusa.com/muffler/1755-full-titanium-muffler-kit-exprem-ti-86-fr-s-brz-type-80-ver2",
        confidence: 0.9,
        notes: "Listed for 86/GR86/FR-S/BRZ, FA20 and FA24, on Tomei's own US product catalog.",
        verificationStatus: "SUPPLIER_CONFIRMED",
      },
      {
        vehicleKey: "brz",
        compatibilityType: "direct_fit",
        source:
          "https://products.tomeiusa.com/muffler/1755-full-titanium-muffler-kit-exprem-ti-86-fr-s-brz-type-80-ver2",
        confidence: 0.9,
        notes: "Listed for 86/GR86/FR-S/BRZ, FA20 and FA24, on Tomei's own US product catalog.",
        verificationStatus: "SUPPLIER_CONFIRMED",
      },
    ],
  },
  {
    slug: "tein-street-advance-z-coilovers",
    canonicalName: "TEIN Street Advance Z Coilover Kit",
    brandSlug: "tein",
    manufacturer: "TEIN",
    categorySlug: "suspension",
    description:
      "16-way damping-adjustable, height-adjustable coilover kit on TEIN's street/sport Street Advance Z platform for the A90 Supra. (Note: TEIN's older Flex Z line does not cover the A90 — Street Advance Z is the current real TEIN product for this chassis.)",
    specifications: [
      "16-way damping adjustment",
      "Full length adjustable ride height",
      "Street/sport-tuned spring rates",
    ],
    priceMinorUnits: null,
    currency: "USD",
    availability: "made_to_order",
    sourceUrl:
      "https://gbpperformance.ca/en/coilovers/1853315-tein-coilover-kit-street-advance-z-gr-supra-30t-a90-2020-2025.html",
    countryOfOrigin: "Japan",
    partNumbers: [{ number: "GSTJ4-91AS3", numberType: "manufacturer" }],
    compatibility: [
      {
        vehicleKey: "gr-supra",
        compatibilityType: "direct_fit",
        source:
          "https://gbpperformance.ca/en/coilovers/1853315-tein-coilover-kit-street-advance-z-gr-supra-30t-a90-2020-2025.html",
        confidence: 0.6,
        notes: "GR Supra A90 3.0T, 2020+. Confirmed via retailer listing only.",
        verificationStatus: "INFERRED",
      },
    ],
  },
  {
    slug: "cusco-strut-tower-bar-front",
    canonicalName: "Cusco Strut Tower Bar Type OS, Front",
    brandSlug: "cusco",
    manufacturer: "Cusco",
    categorySlug: "suspension",
    description:
      "Bolt-on oval-shaft front strut tower bar with an aluminum shaft and steel end plates for added front chassis rigidity.",
    specifications: [
      "Oval-shaft (OS) aluminum construction",
      "Steel end plates",
      "Bolt-on installation, no drilling required",
    ],
    priceMinorUnits: null,
    currency: "USD",
    availability: "in_stock",
    sourceUrl:
      "https://www.rhdjapan.com/cusco-strut-tower-bar-type-os-front-brz-zc6-zd8-86-zn6-gr86-zn8.html",
    countryOfOrigin: "Japan",
    partNumbers: [{ number: "965 540 A", numberType: "manufacturer" }],
    compatibility: [
      {
        vehicleKey: "gr86",
        compatibilityType: "direct_fit",
        source:
          "https://www.rhdjapan.com/cusco-strut-tower-bar-type-os-front-brz-zc6-zd8-86-zn6-gr86-zn8.html",
        confidence: 0.65,
        notes: "GR86 ZN8. Confirmed via authorized distributor listing.",
        verificationStatus: "INFERRED",
      },
      {
        vehicleKey: "brz",
        compatibilityType: "direct_fit",
        source:
          "https://www.rhdjapan.com/cusco-strut-tower-bar-type-os-front-brz-zc6-zd8-86-zn6-gr86-zn8.html",
        confidence: 0.65,
        notes: "BRZ ZD8 (and older ZC6). Confirmed via authorized distributor listing.",
        verificationStatus: "INFERRED",
      },
    ],
  },
  {
    slug: "project-mu-b-force-brake-pads-front",
    canonicalName: "Project Mu B-Force Front Brake Pads",
    brandSlug: "project-mu",
    manufacturer: "Project Mu",
    categorySlug: "brakes",
    description:
      "Street/circuit dual-purpose front brake pad compound for the GR86/BRZ platform.",
    specifications: [
      "Dual-purpose street/circuit compound",
      "Low-dust NS-C formulation also available",
      "Direct-fit front application",
    ],
    priceMinorUnits: null,
    currency: "USD",
    availability: "in_stock",
    sourceUrl: "https://www.tf-works.com/project-mu-b-force-brake-pads-front-gr86-2022-brz/",
    countryOfOrigin: "Japan",
    partNumbers: [{ number: "PBF914", numberType: "manufacturer" }],
    compatibility: [
      {
        vehicleKey: "gr86",
        compatibilityType: "direct_fit",
        source: "https://www.tf-works.com/project-mu-b-force-brake-pads-front-gr86-2022-brz/",
        confidence: 0.6,
        notes: "2022+ GR86 (and 2013-2020 FR-S/86). Confirmed via retailer listing.",
        verificationStatus: "INFERRED",
      },
      {
        vehicleKey: "brz",
        compatibilityType: "direct_fit",
        source: "https://www.tf-works.com/project-mu-b-force-brake-pads-front-gr86-2022-brz/",
        confidence: 0.6,
        notes: "2022+ BRZ (and 2013-2020 BRZ). Confirmed via retailer listing.",
        verificationStatus: "INFERRED",
      },
    ],
  },
  {
    slug: "endless-racing6-brake-kit",
    canonicalName: "Endless Racing6 Inch-Up Brake System (Front & Rear, 2-pc Rotors)",
    brandSlug: "endless",
    manufacturer: "Endless",
    categorySlug: "brakes",
    description:
      "Big-brake kit pairing Endless's 6-pot calipers with 2-piece floating E-Slit rotors — Endless's current big-brake offering for the A90/A91 GR Supra. Sourcing note: the part number below could not be confirmed directly on Endless's own domain (the site blocked automated access during research) — treat with lower confidence than the other entries here.",
    specifications: [
      "2-piece floating rotor construction",
      "E-Slit rotor face design",
      "6-pot caliper big-brake kit",
    ],
    priceMinorUnits: null,
    currency: "USD",
    availability: "made_to_order",
    sourceUrl:
      "https://bulletproofautomotive.com/product/endless-racing-6-inch-up-front-rear-performance-brake-system-with-2pc-rotors-for-a90-and-a91-toyota-gr-supra/",
    countryOfOrigin: "Japan",
    partNumbers: [
      {
        number: "1933420-370",
        numberType: "supplier_sku",
        notes:
          "Kit-level SKU referenced by a retailer; not confirmed on Endless's own site. Re-verify before relying on this number.",
      },
    ],
    compatibility: [
      {
        vehicleKey: "gr-supra",
        compatibilityType: "direct_fit",
        source:
          "https://bulletproofautomotive.com/product/endless-racing-6-inch-up-front-rear-performance-brake-system-with-2pc-rotors-for-a90-and-a91-toyota-gr-supra/",
        confidence: 0.4,
        notes: "A90/A91 GR Supra. Low sourcing confidence — recommend re-verification.",
        verificationStatus: "INFERRED",
      },
    ],
  },
  {
    slug: "rays-volk-te37-saga-splus",
    canonicalName: "RAYS Volk Racing TE37 Saga S-plus",
    brandSlug: "rays",
    manufacturer: "RAYS",
    categorySlug: "wheels",
    description:
      "Forged one-piece wheel with a dedicated GR86/BRZ-Brembo fitment, JWL+R Spec 2 certified. Price and offset vary by size and finish; the listed price is the starting size.",
    specifications: [
      "Forged one-piece construction",
      "JWL+R Spec 2 certified",
      "Dedicated GR86/BRZ-Brembo application: 18x9.5 +38 / 18x10 +44",
    ],
    priceMinorUnits: 46000,
    currency: "USD",
    availability: "made_to_order",
    sourceUrl: "https://www.rayswheels.co.jp/en/products/brand/detail/120",
    countryOfOrigin: "Japan",
    partNumbers: [
      {
        number: "TE37SAGA-S+",
        numberType: "manufacturer",
        notes: "Model code; the exact part number varies by size, offset, and finish.",
      },
    ],
    compatibility: [
      {
        vehicleKey: "gr86",
        compatibilityType: "direct_fit",
        source: "https://www.rayswheels.co.jp/en/products/brand/detail/120",
        confidence: 0.9,
        notes: "GR86/BRZ Brembo-spec fitment listed directly in RAYS's own application table.",
        verificationStatus: "SUPPLIER_CONFIRMED",
      },
      {
        vehicleKey: "brz",
        compatibilityType: "direct_fit",
        source: "https://www.rayswheels.co.jp/en/products/brand/detail/120",
        confidence: 0.9,
        notes: "GR86/BRZ Brembo-spec fitment listed directly in RAYS's own application table.",
        verificationStatus: "SUPPLIER_CONFIRMED",
      },
    ],
  },
  {
    slug: "enkei-rpf1-17x9",
    canonicalName: "Enkei RPF1 17x9 +35",
    brandSlug: "enkei",
    manufacturer: "Enkei",
    categorySlug: "wheels",
    description:
      "Lightweight cast wheel (MAT process) widely fitted to the 86/BRZ/GR86 platform. Sold individually.",
    specifications: [
      "Cast aluminum, MAT process",
      "Approx. 17.4 lb per wheel",
      "17x9, +35 offset, 5x100 bolt pattern",
    ],
    priceMinorUnits: 24800,
    currency: "USD",
    availability: "in_stock",
    sourceUrl:
      "https://www.rallysportdirect.com/products/379-790-8045sp-enkei-rpf1-17x9-45-5x100-silver-universal",
    countryOfOrigin: "Japan",
    partNumbers: [
      {
        number: "3797908035SP",
        numberType: "manufacturer",
        notes: "Silver finish; other finishes share the base code with a different suffix.",
      },
    ],
    compatibility: [
      {
        vehicleKey: "gr86",
        compatibilityType: "direct_fit",
        source:
          "https://www.rallysportdirect.com/products/379-790-8045sp-enkei-rpf1-17x9-45-5x100-silver-universal",
        confidence: 0.6,
        notes: "2013-2024 Toyota 86/GR86/FR-S. Confirmed via retailer fitment guide.",
        verificationStatus: "INFERRED",
      },
      {
        vehicleKey: "brz",
        compatibilityType: "direct_fit",
        source:
          "https://www.rallysportdirect.com/products/379-790-8045sp-enkei-rpf1-17x9-45-5x100-silver-universal",
        confidence: 0.6,
        notes: "2013-2024 Subaru BRZ. Confirmed via retailer fitment guide.",
        verificationStatus: "INFERRED",
      },
    ],
  },
  {
    slug: "toyota-oem-oil-filter-supra",
    canonicalName: "Toyota Genuine Oil Filter Kit",
    brandSlug: "toyota",
    manufacturer: "Toyota",
    categorySlug: "oem",
    description:
      "Genuine Toyota spin-on oil filter kit with an integrated drain-plug gasket, factory spec for the B58 3.0L inline-six.",
    specifications: [
      "OEM spin-on filter element",
      "Integrated drain-plug gasket/O-ring",
      "Factory-spec micron filtration for B58",
    ],
    priceMinorUnits: 1800,
    currency: "USD",
    availability: "in_stock",
    sourceUrl: "https://parts.longotoyota.com/oem-parts/toyota-oil-filter-4152waa03",
    countryOfOrigin: "Japan",
    partNumbers: [
      {
        number: "04152-WAA03",
        numberType: "oem",
        notes: "For the 3.0L B58; the 2.0L I4 variant uses 04152-WAA01.",
      },
    ],
    compatibility: [
      {
        vehicleKey: "gr-supra",
        compatibilityType: "direct_fit",
        source: "https://parts.longotoyota.com/oem-parts/toyota-oil-filter-4152waa03",
        confidence: 0.6,
        notes: "2020-2025 GR Supra 3.0L. Confirmed via Toyota dealer parts portal, not toyota.com itself.",
        verificationStatus: "INFERRED",
      },
    ],
  },
  {
    slug: "toyota-oem-brake-fluid-dot3",
    canonicalName: "Toyota Genuine DOT 3 Brake Fluid",
    brandSlug: "toyota",
    manufacturer: "Toyota",
    categorySlug: "oem",
    description: "Genuine Toyota DOT 3 glycol-ether brake fluid, factory-fill spec, 12 oz bottle.",
    specifications: [
      "DOT 3-spec glycol-ether formulation",
      "Factory-fill spec for Toyota brake systems",
      "12 oz bottle",
    ],
    priceMinorUnits: 1000,
    currency: "USD",
    availability: "in_stock",
    sourceUrl: "https://autoparts.toyota.com/products/product/brake-fluid-004751bf03",
    countryOfOrigin: null,
    partNumbers: [{ number: "00475-1BF03", numberType: "oem" }],
    compatibility: [
      {
        vehicleKey: "gr86",
        compatibilityType: "direct_fit",
        source: "https://autoparts.toyota.com/products/product/brake-fluid-004751bf03",
        confidence: 0.8,
        notes: "Universal-fit fluid across the current Toyota lineup; listed on Toyota's own official parts storefront.",
        verificationStatus: "SUPPLIER_CONFIRMED",
      },
      {
        vehicleKey: "gr-supra",
        compatibilityType: "direct_fit",
        source: "https://autoparts.toyota.com/products/product/brake-fluid-004751bf03",
        confidence: 0.8,
        notes: "Universal-fit fluid across the current Toyota lineup; listed on Toyota's own official parts storefront.",
        verificationStatus: "SUPPLIER_CONFIRMED",
      },
    ],
  },
  {
    slug: "greddy-water-cooled-oil-cooler-kit",
    canonicalName: "GReddy Water-Cooled Oil Cooler Kit",
    brandSlug: "greddy",
    manufacturer: "GReddy",
    categorySlug: "engine",
    description:
      "Dedicated water-to-water oil cooler core mounted ahead of the radiator; street and spirited-driving oriented, not intended for continuous track use.",
    specifications: [
      "Water-to-water cooler core, 180x128x26mm",
      "Approx. 2000mm rubber hose kit included",
      "Street/spirited-driving oriented, not for continuous track use",
    ],
    priceMinorUnits: 60000,
    currency: "USD",
    availability: "in_stock",
    sourceUrl: "https://www.greddy.com/products/12015700",
    countryOfOrigin: "Japan",
    partNumbers: [{ number: "12015700", numberType: "manufacturer" }],
    compatibility: [
      {
        vehicleKey: "gr86",
        compatibilityType: "direct_fit",
        source: "https://www.greddy.com/products/12015700",
        confidence: 0.95,
        notes: "GR86 ZN8 (2021.10+), FA24. Listed directly on GReddy's own product page.",
        verificationStatus: "SUPPLIER_CONFIRMED",
      },
      {
        vehicleKey: "brz",
        compatibilityType: "direct_fit",
        source: "https://www.greddy.com/products/12015700",
        confidence: 0.95,
        notes: "BRZ ZD8 (2021.8+), FA24. Listed directly on GReddy's own product page.",
        verificationStatus: "SUPPLIER_CONFIRMED",
      },
    ],
  },
  {
    slug: "blitz-nur-spec-vsr-custom-muffler",
    canonicalName: "Blitz Nur-Spec Custom Edition VSR Muffler",
    brandSlug: "blitz",
    manufacturer: "Blitz",
    categorySlug: "engine",
    description:
      "Stainless cat-back exhaust with a variable-sound-resonator chamber design and a polished stainless tip.",
    specifications: [
      "Stainless mid-pipe and muffler",
      "Variable-sound-resonator (VSR) chamber design",
      "Polished stainless tip",
    ],
    priceMinorUnits: null,
    currency: "USD",
    availability: "made_to_order",
    sourceUrl:
      "https://www.rhdjapan.com/blitz-nur-spec-gr86-brz-cup-muffler-exhaust-system-vs-polished-stainless-tail-brz-zd8-gr86-zn8.html",
    countryOfOrigin: "Japan",
    partNumbers: [
      { number: "63202V", numberType: "manufacturer", notes: "Custom Edition VSR; CR variant is 63202C." },
    ],
    compatibility: [
      {
        vehicleKey: "gr86",
        compatibilityType: "direct_fit",
        source:
          "https://www.rhdjapan.com/blitz-nur-spec-gr86-brz-cup-muffler-exhaust-system-vs-polished-stainless-tail-brz-zd8-gr86-zn8.html",
        confidence: 0.6,
        notes: "GR86 ZN8, FA24. Confirmed via authorized distributor listing.",
        verificationStatus: "INFERRED",
      },
      {
        vehicleKey: "brz",
        compatibilityType: "direct_fit",
        source:
          "https://www.rhdjapan.com/blitz-nur-spec-gr86-brz-cup-muffler-exhaust-system-vs-polished-stainless-tail-brz-zd8-gr86-zn8.html",
        confidence: 0.6,
        notes: "BRZ ZD8, FA24. Confirmed via authorized distributor listing.",
        verificationStatus: "INFERRED",
      },
    ],
  },
  {
    slug: "cusco-lsd-type-rs-1-5-way",
    canonicalName: "Cusco LSD Type-RS, 1.5-Way",
    brandSlug: "cusco",
    manufacturer: "Cusco",
    categorySlug: "suspension",
    description:
      "Mechanical plate-type limited-slip differential in a 1.5-way lockup configuration, a direct bolt-in for the factory diff carrier.",
    specifications: [
      "Mechanical plate-type LSD",
      "1.5-way lockup (accel lock differs from decel lock)",
      "Direct OEM diff-carrier bolt-in",
    ],
    priceMinorUnits: null,
    currency: "USD",
    availability: "made_to_order",
    sourceUrl: "https://www.cusco.co.jp/en/images/20220902_GR86BRZ_LSD_4.8_5.1.PDF",
    countryOfOrigin: "Japan",
    partNumbers: [
      {
        number: "LSD 6C2 V15",
        numberType: "manufacturer",
        notes: "Type-RS 1.5-way; Type-RS Spec-F variant is LSD 6C1 VT15.",
      },
    ],
    compatibility: [
      {
        vehicleKey: "gr86",
        compatibilityType: "direct_fit",
        source: "https://www.cusco.co.jp/en/images/20220902_GR86BRZ_LSD_4.8_5.1.PDF",
        confidence: 0.75,
        notes: "GR86 ZN8, MT and AT. Listed in Cusco's own GR86/BRZ LSD application document.",
        verificationStatus: "SUPPLIER_CONFIRMED",
      },
      {
        vehicleKey: "brz",
        compatibilityType: "direct_fit",
        source: "https://www.cusco.co.jp/en/images/20220902_GR86BRZ_LSD_4.8_5.1.PDF",
        confidence: 0.75,
        notes: "BRZ ZD8, MT and AT. Listed in Cusco's own GR86/BRZ LSD application document.",
        verificationStatus: "SUPPLIER_CONFIRMED",
      },
    ],
  },
  {
    slug: "bride-zeta-iv-bucket-seat",
    canonicalName: "Bride Zeta IV Fixed Bucket Seat",
    brandSlug: "bride",
    manufacturer: "Bride",
    categorySlug: "oem",
    description:
      "Side-mount reinforced bucket seat, available in FRP or carbon shell with low-back and high-back variants. Requires the vehicle-specific Type-FO mounting rail (sold separately).",
    specifications: [
      "FRP or carbon-fiber shell options",
      "Side-mount reinforced bucket construction",
      "Low-back and high-back variants",
    ],
    priceMinorUnits: 99900,
    currency: "USD",
    availability: "made_to_order",
    sourceUrl: "https://blackhawkjapan.com/products/bride-t902-fo-1",
    countryOfOrigin: "Japan",
    partNumbers: [
      {
        number: "HA1ASF",
        numberType: "manufacturer",
        notes:
          "Shown code is the FRP/red shell. Requires the vehicle-specific Type-FO rail (T902-FO driver / T901-FO passenger), sold separately.",
      },
    ],
    compatibility: [
      {
        vehicleKey: "gr86",
        compatibilityType: "requires_rail",
        source: "https://blackhawkjapan.com/products/bride-t902-fo-1",
        confidence: 0.55,
        notes: "GR86 ZN8, via the Type-FO rail. Confirmed via retailer listing referencing the rail part number.",
        verificationStatus: "INFERRED",
      },
    ],
  },
];

export const PLACEHOLDER_PRODUCT_IMAGE = PLACEHOLDER_IMAGE;
