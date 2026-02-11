/**
 * Seed the Firestore "stores" collection using Firebase Admin SDK.
 *
 * Usage:
 *   pnpm run seed:stores
 *   pnpm run seed:stores -- path/to/serviceAccountKey.json
 *
 * Default service account path: affflicated-firebase-adminsdk-fbsvc-dbd67c24ec.json (project root)
 * Store data is read from scripts/stores-data.json (edit that file to add or change stores).
 */

const path = require("path");
const fs = require("fs");

const COLLECTION = "stores";

const defaultStores = [
  {
    name: "Amazon",
    slug: "amazon",
    logo: "/placeholder.svg",
    description: "Amazon India - Shop electronics, fashion, home and more.",
    affiliateBaseUrl: "https://www.amazon.in",
    linkTemplate: "https://www.amazon.in/dp/{productId}?tag=your-tag-here",
    defaultCTA: "Buy on Amazon",
    postCount: 0,
    productCount: 0,
  },
  {
    name: "Flipkart",
    slug: "flipkart",
    logo: "/placeholder.svg",
    description: "Flipkart - India's largest e-commerce marketplace.",
    affiliateBaseUrl: "https://www.flipkart.com",
    linkTemplate: "https://www.flipkart.com/product/p/{productId}?affid=your-id",
    defaultCTA: "Buy on Flipkart",
    postCount: 0,
    productCount: 0,
  },
  {
    name: "Ajio",
    slug: "ajio",
    logo: "/placeholder.svg",
    description: "Ajio - Fashion and lifestyle from Reliance.",
    affiliateBaseUrl: "https://www.ajio.com",
    linkTemplate: "https://www.ajio.com/p/{productId}",
    defaultCTA: "Shop on Ajio",
    postCount: 0,
    productCount: 0,
  },
  {
    name: "Myntra",
    slug: "myntra",
    logo: "/placeholder.svg",
    description: "Myntra - Fashion, beauty and lifestyle.",
    affiliateBaseUrl: "https://www.myntra.com",
    linkTemplate: "https://www.myntra.com/{productId}",
    defaultCTA: "Buy on Myntra",
    postCount: 0,
    productCount: 0,
  },
  {
    name: "Croma",
    slug: "croma",
    logo: "/placeholder.svg",
    description: "Croma - Electronics and appliances.",
    affiliateBaseUrl: "https://www.croma.com",
    linkTemplate: "https://www.croma.com/{productId}",
    defaultCTA: "Buy on Croma",
    postCount: 0,
    productCount: 0,
  },
];

function getServiceAccountPath() {
  const arg = process.argv[2];
  if (arg && !arg.startsWith("-")) {
    return path.resolve(process.cwd(), arg);
  }
  return path.resolve(
    process.cwd(),
    "affflicated-firebase-adminsdk-fbsvc-dbd67c24ec.json"
  );
}

function loadStoresData() {
  const dataPath = path.resolve(process.cwd(), "scripts", "stores-data.json");
  if (fs.existsSync(dataPath)) {
    try {
      const data = JSON.parse(fs.readFileSync(dataPath, "utf8"));
      return Array.isArray(data) ? data : defaultStores;
    } catch (e) {
      console.warn("Could not parse scripts/stores-data.json, using built-in stores:", e.message);
    }
  }
  return defaultStores;
}

function normalizeStore(store) {
  return {
    name: String(store.name || "").trim(),
    slug: String(store.slug || store.name || "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "store",
    logo: String(store.logo || "/placeholder.svg").trim(),
    description: String(store.description || "").trim(),
    affiliateBaseUrl: String(store.affiliateBaseUrl || "").trim(),
    linkTemplate: String(store.linkTemplate || "").trim(),
    defaultCTA: String(store.defaultCTA || "Buy now").trim(),
    postCount: Number(store.postCount) || 0,
    productCount: Number(store.productCount) || 0,
  };
}

async function main() {
  const serviceAccountPath = getServiceAccountPath();
  if (!fs.existsSync(serviceAccountPath)) {
    console.error("Service account file not found:", serviceAccountPath);
    console.error("Usage: pnpm run seed:stores [path/to/affflicated-firebase-adminsdk-fbsvc-dbd67c24ec.json]");
    process.exit(1);
  }

  const firebaseAdmin = require("firebase-admin");
  const serviceAccount = require(serviceAccountPath);

  if (!firebaseAdmin.apps.length) {
    firebaseAdmin.initializeApp({ credential: firebaseAdmin.credential.cert(serviceAccount) });
  }

  const db = firebaseAdmin.firestore();
  const stores = loadStoresData();
  const normalized = stores.map(normalizeStore);

  console.log("Adding", normalized.length, "stores to Firestore...");
  const batch = db.batch();
  const col = db.collection(COLLECTION);

  for (const store of normalized) {
    const ref = col.doc();
    batch.set(ref, store);
    console.log("  +", store.name, "(" + store.slug + ")");
  }

  await batch.commit();
  console.log("Done. Stores added to collection:", COLLECTION);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
