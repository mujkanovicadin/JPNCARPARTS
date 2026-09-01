import type { Product } from "./types";

const PLACEHOLDER_IMAGE = "/part-placeholder.svg";

export const products: Product[] = [
  {
    id: "hks-super-sqv4",
    slug: "hks-super-sqv4-blow-off-valve",
    name: "HKS Super SQV4 Blow Off Valve",
    manufacturer: "HKS",
    brand: "HKS",
    partNumber: "71008-AK012",
    categorySlug: "engine",
    priceMinorUnits: 32900,
    currency: "USD",
    description:
      "A recirculating blow-off valve engineered for turbocharged engines, designed to reduce turbo lag and protect the turbocharger from compressor surge.",
    specifications: [
      "Recirculating design",
      "Aluminum body construction",
      "Adjustable spring tension",
    ],
    compatibleVehicles: ["Toyota GR Supra A90/A91", "Toyota GR86 (turbo swap)"],
    image: PLACEHOLDER_IMAGE,
    availability: "in_stock",
    countryOfOrigin: "Japan",
    featured: true,
  },
  {
    id: "hks-air-intake-gr86",
    slug: "hks-cold-air-intake-gr86",
    name: "HKS Cold Air Intake",
    manufacturer: "HKS",
    brand: "HKS",
    partNumber: "70020-AF101",
    categorySlug: "engine",
    priceMinorUnits: 45900,
    currency: "USD",
    description:
      "Direct-fit cold air intake system for improved throttle response and induction sound.",
    specifications: [
      "Reusable cotton gauze filter",
      "Powder-coated aluminum piping",
      "Heat shield included",
    ],
    compatibleVehicles: ["Toyota GR86", "Subaru BRZ (2022+)"],
    image: PLACEHOLDER_IMAGE,
    availability: "in_stock",
    countryOfOrigin: "Japan",
    featured: true,
  },
  {
    id: "tomei-exhaust-86",
    slug: "tomei-expreme-ti-cat-back-exhaust",
    name: "Tomei Expreme Ti Cat-Back Exhaust",
    manufacturer: "Tomei",
    brand: "Tomei",
    partNumber: "TB6090-SB03A",
    categorySlug: "engine",
    priceMinorUnits: 129900,
    currency: "USD",
    description:
      "Titanium cat-back exhaust system built for weight reduction and a distinct exhaust note without excessive drone.",
    specifications: [
      "Full titanium construction",
      "Dual outlet design",
      "Approx. 40% lighter than stock",
    ],
    compatibleVehicles: ["Toyota GR86", "Subaru BRZ (2022+)"],
    image: PLACEHOLDER_IMAGE,
    availability: "made_to_order",
    countryOfOrigin: "Japan",
  },
  {
    id: "tein-flex-z-supra",
    slug: "tein-flex-z-coilovers-supra",
    name: "TEIN Flex Z Coilovers",
    manufacturer: "TEIN",
    brand: "TEIN",
    partNumber: "VSB44-C1SS3",
    categorySlug: "suspension",
    priceMinorUnits: 119900,
    currency: "USD",
    description:
      "16-way adjustable damping coilovers tuned for street driving with a firmer, more controlled ride than stock.",
    specifications: [
      "16-way adjustable damping",
      "Full length adjustable ride height",
      "Rebuildable damper housings",
    ],
    compatibleVehicles: ["Toyota GR Supra A90/A91"],
    image: PLACEHOLDER_IMAGE,
    availability: "in_stock",
    countryOfOrigin: "Japan",
    featured: true,
  },
  {
    id: "cusco-lsd-gr86",
    slug: "cusco-front-strut-tower-bar",
    name: "Cusco Front Strut Tower Bar",
    manufacturer: "Cusco",
    brand: "Cusco",
    partNumber: "675-540-A",
    categorySlug: "suspension",
    priceMinorUnits: 26900,
    currency: "USD",
    description:
      "Bolt-on strut tower bar that increases front chassis rigidity for sharper turn-in.",
    specifications: ["Aluminum construction", "Adjustable mounting points"],
    compatibleVehicles: ["Toyota GR86", "Subaru BRZ (2022+)"],
    image: PLACEHOLDER_IMAGE,
    availability: "in_stock",
    countryOfOrigin: "Japan",
  },
  {
    id: "project-mu-pads-86",
    slug: "project-mu-type-ps-brake-pads",
    name: "Project Mu Type PS Brake Pads (Front)",
    manufacturer: "Project Mu",
    brand: "Project Mu",
    partNumber: "F103-PS",
    categorySlug: "brakes",
    priceMinorUnits: 24900,
    currency: "USD",
    description:
      "Street performance brake pad compound with strong initial bite and low dust, designed for spirited street driving.",
    specifications: [
      "Low dust formulation",
      "Stable performance across temperature range",
    ],
    compatibleVehicles: ["Toyota GR86", "Subaru BRZ (2022+)"],
    image: PLACEHOLDER_IMAGE,
    availability: "in_stock",
    countryOfOrigin: "Japan",
  },
  {
    id: "endless-rotors-supra",
    slug: "endless-slit-rotors-front",
    name: "Endless Slit Rotors (Front Pair)",
    manufacturer: "Endless",
    brand: "Endless",
    partNumber: "ER536SL",
    categorySlug: "brakes",
    priceMinorUnits: 54900,
    currency: "USD",
    description:
      "Slit-type rotors designed to maintain consistent pad bite and reduce brake fade under repeated hard braking.",
    specifications: ["Slit rotor design", "Sold as a front pair"],
    compatibleVehicles: ["Toyota GR Supra A90/A91"],
    image: PLACEHOLDER_IMAGE,
    availability: "made_to_order",
    countryOfOrigin: "Japan",
  },
  {
    id: "rays-te37-18",
    slug: "rays-volk-te37-18x9-5",
    name: "RAYS Volk Racing TE37 18x9.5",
    manufacturer: "RAYS",
    brand: "RAYS",
    partNumber: "TE37-18995-38",
    categorySlug: "wheels",
    priceMinorUnits: 189900,
    currency: "USD",
    description:
      "Forged one-piece wheel, a long-standing benchmark for lightweight performance wheels. Sold individually.",
    specifications: ["Forged aluminum", "18x9.5, +38 offset", "Sold individually"],
    compatibleVehicles: ["Toyota GR86", "Toyota GR Supra A90/A91", "Subaru BRZ (2022+)"],
    image: PLACEHOLDER_IMAGE,
    availability: "made_to_order",
    countryOfOrigin: "Japan",
    featured: true,
  },
  {
    id: "enkei-rpf1-17",
    slug: "enkei-rpf1-17x9",
    name: "Enkei RPF1 17x9",
    manufacturer: "Enkei",
    brand: "Enkei",
    partNumber: "3797909038SP",
    categorySlug: "wheels",
    priceMinorUnits: 32900,
    currency: "USD",
    description:
      "Lightweight cast wheel popular for street and track use, offering a strong strength-to-weight ratio at an accessible price. Sold individually.",
    specifications: ["Cast aluminum", "17x9, +38 offset", "Sold individually"],
    compatibleVehicles: ["Toyota GR86", "Subaru BRZ (2022+)"],
    image: PLACEHOLDER_IMAGE,
    availability: "in_stock",
    countryOfOrigin: "Japan",
  },
  {
    id: "oem-supra-oil-filter",
    slug: "toyota-oem-oil-filter-supra",
    name: "Toyota OEM Oil Filter",
    manufacturer: "Toyota",
    brand: "Toyota",
    partNumber: "04152-YZZA1",
    categorySlug: "oem",
    priceMinorUnits: 1495,
    currency: "USD",
    description: "Genuine Toyota oil filter for scheduled maintenance.",
    specifications: ["Genuine OEM part"],
    compatibleVehicles: ["Toyota GR Supra A90/A91", "Toyota GR86"],
    image: PLACEHOLDER_IMAGE,
    availability: "in_stock",
    countryOfOrigin: "Japan",
  },
  {
    id: "oem-86-brake-fluid",
    slug: "toyota-oem-brake-fluid-dot4",
    name: "Toyota OEM Brake Fluid DOT 4",
    manufacturer: "Toyota",
    brand: "Toyota",
    partNumber: "08823-80089",
    categorySlug: "oem",
    priceMinorUnits: 1895,
    currency: "USD",
    description: "Genuine Toyota DOT 4 brake fluid, 500ml.",
    specifications: ["DOT 4 rated", "500ml bottle"],
    compatibleVehicles: ["Toyota GR86", "Toyota GR Supra A90/A91"],
    image: PLACEHOLDER_IMAGE,
    availability: "in_stock",
    countryOfOrigin: "Japan",
  },
  {
    id: "greddy-radiator-cap",
    slug: "greddy-racing-radiator-cap",
    name: "GReddy Racing Radiator Cap",
    manufacturer: "GReddy",
    brand: "GReddy",
    partNumber: "15901202",
    categorySlug: "engine",
    priceMinorUnits: 3900,
    currency: "USD",
    description:
      "High-pressure radiator cap rated to 1.3 kg/cm² for improved cooling system headroom under track use.",
    specifications: ["1.3 kg/cm² rated pressure", "Aluminum construction"],
    compatibleVehicles: ["Toyota GR86", "Subaru BRZ (2022+)", "Toyota GR Supra A90/A91"],
    image: PLACEHOLDER_IMAGE,
    availability: "in_stock",
    countryOfOrigin: "Japan",
  },
  {
    id: "blitz-nur-spec-vsr-86",
    slug: "blitz-nur-spec-vsr-exhaust",
    name: "Blitz Nur-Spec VSR Exhaust",
    manufacturer: "Blitz",
    brand: "Blitz",
    partNumber: "63147V",
    categorySlug: "engine",
    priceMinorUnits: 99900,
    currency: "USD",
    description:
      "Stainless steel cat-back exhaust with a variable sound reduction system for a street-friendly note.",
    specifications: ["Stainless steel construction", "Variable sound reduction valve"],
    compatibleVehicles: ["Toyota GR86", "Subaru BRZ (2022+)"],
    image: PLACEHOLDER_IMAGE,
    availability: "backordered",
    countryOfOrigin: "Japan",
  },
  {
    id: "cusco-lsd-1way",
    slug: "cusco-lsd-1-5-way-rear",
    name: "Cusco LSD 1.5-Way (Rear)",
    manufacturer: "Cusco",
    brand: "Cusco",
    partNumber: "LSD 154 CT",
    categorySlug: "suspension",
    priceMinorUnits: 149900,
    currency: "USD",
    description:
      "Mechanical limited-slip differential for improved traction under acceleration and corner exit.",
    specifications: ["1.5-way configuration", "Rebuildable clutch-type LSD"],
    compatibleVehicles: ["Toyota GR86", "Subaru BRZ (2022+)"],
    image: PLACEHOLDER_IMAGE,
    availability: "made_to_order",
    countryOfOrigin: "Japan",
  },
  {
    id: "bride-zeta-iii",
    slug: "bride-zeta-iii-bucket-seat",
    name: "Bride Zeta III Bucket Seat",
    manufacturer: "Bride",
    brand: "Bride",
    partNumber: "K44ASO",
    categorySlug: "oem",
    priceMinorUnits: 89900,
    currency: "USD",
    description:
      "FIA-approved reclinable bucket seat balancing everyday comfort with lateral support.",
    specifications: ["FIA 8855-1999 approved", "Reclining mechanism", "Low back design"],
    compatibleVehicles: ["Toyota GR86", "Toyota GR Supra A90/A91"],
    image: PLACEHOLDER_IMAGE,
    availability: "made_to_order",
    countryOfOrigin: "Japan",
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}

export function getProductById(id: string): Product | undefined {
  return products.find((product) => product.id === id);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((product) => product.featured);
}

export function searchProducts(params: {
  category?: string;
  query?: string;
}): Product[] {
  const query = params.query?.trim().toLowerCase();

  return products.filter((product) => {
    if (params.category && product.categorySlug !== params.category) {
      return false;
    }

    if (!query) {
      return true;
    }

    const haystack = [
      product.name,
      product.brand,
      product.manufacturer,
      product.partNumber,
      ...product.compatibleVehicles,
    ]
      .join(" ")
      .toLowerCase();

    return haystack.includes(query);
  });
}
