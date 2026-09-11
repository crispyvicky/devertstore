const fs = require("fs");
const path = require("path");

const dir = path.join(__dirname, "..", "src", "storefront");

const htmlMap = {
  "index.html": "/",
  "bottega.html": "/bottega",
  "bottegapurses.html": "/bottegapurses",
  "burberry.html": "/burberry",
  "cartier.html": "/cartier/index.html",
  "chanel.html": "/chanel",
  "coach.html": "/coach",
  "dior.html": "/dior",
  "diorpurses.html": "/diorpurses",
  "fendi.html": "/fendi",
  "fendipurses.html": "/fendipurses",
  "fendishoes.html": "/fendishoes",
  "gucci.html": "/gucci",
  "guccishoes.html": "/guccishoes",
  "katespade.html": "/katespade",
  "katespadeshoes.html": "/katespadeshoes",
  "louis.html": "/louis",
  "prada.html": "/prada",
};

function rewriteLinks(text) {
  let out = text;
  for (const [from, to] of Object.entries(htmlMap)) {
    out = out.split(`"${from}"`).join(`"${to}"`);
    out = out.split(`'${from}'`).join(`'${to}'`);
    out = out.split(`href="${from}"`).join(`href="${to}"`);
  }
  return out;
}

function stripCreateRoot(text) {
  // Remove ReactDOM import if present
  let out = text.replace(
    /^\s*import\s+ReactDOM\s+from\s+["']react-dom\/client["'];?\s*$/gm,
    ""
  );

  // Remove trailing createRoot / render blocks (common patterns)
  out = out.replace(
    /\n\/\/\s*Render Logic[\s\S]*$/m,
    "\n"
  );
  out = out.replace(
    /\nconst\s+rootElement\s*=\s*document\.getElementById\(["']root["']\);[\s\S]*$/m,
    "\n"
  );
  out = out.replace(
    /\nif\s*\(\s*rootElement\s*\)\s*\{[\s\S]*ReactDOM\.createRoot[\s\S]*$/m,
    "\n"
  );
  out = out.replace(
    /\nwindow\.__aureliaHomeRoot[\s\S]*$/m,
    "\n"
  );
  // Some files: if (rootElement) { ReactDOM.createRoot... without prior const on same pattern
  out = out.replace(
    /\n\s*ReactDOM\.createRoot\([\s\S]*$/m,
    "\n"
  );

  return out;
}

function ensureUseClient(text) {
  if (text.startsWith('"use client"') || text.startsWith("'use client'")) {
    return text;
  }
  return `"use client";\n\n${text}`;
}

const files = fs.readdirSync(dir).filter((f) => /\.(jsx|js)$/.test(f));

for (const file of files) {
  const full = path.join(dir, file);
  let text = fs.readFileSync(full, "utf8");
  text = rewriteLinks(text);
  text = stripCreateRoot(text);
  text = ensureUseClient(text);

  // api.js — same-origin for merged Next app
  if (file === "api.js") {
    text = `"use client";

const API_BASE =
  (typeof process !== "undefined" &&
    process.env?.NEXT_PUBLIC_APP_URL) ||
  "";

export function getApiBase() {
  return String(API_BASE).replace(/\\/$/, "");
}

export function normalizeKey(value = "") {
  return String(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

export function brandsMatch(a = "", b = "") {
  const left = normalizeKey(a);
  const right = normalizeKey(b);
  return left === right || left.includes(right) || right.includes(left);
}

export function namesMatch(a = "", b = "") {
  const left = normalizeKey(a);
  const right = normalizeKey(b);
  if (!left || !right) return false;
  if (left === right) return true;
  if (left.includes(right) || right.includes(left)) return true;
  return false;
}

export function formatLivePrice(n) {
  return \`$\${Number(n).toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })}\`;
}

let catalogCache = null;
let catalogPromise = null;

export async function fetchCatalog(force = false) {
  if (!force && catalogCache) return catalogCache;
  if (!force && catalogPromise) return catalogPromise;

  catalogPromise = fetch(\`\${getApiBase()}/api/products\`)
    .then(async (res) => {
      if (!res.ok) throw new Error("Could not load inventory");
      const data = await res.json();
      catalogCache = data.products || [];
      return catalogCache;
    })
    .catch((err) => {
      catalogPromise = null;
      throw err;
    });

  return catalogPromise;
}

export function matchProduct(catalog, brand, name) {
  if (!catalog?.length) return null;
  const brandPool = catalog.filter((p) => brandsMatch(p.brand, brand));
  const pool = brandPool.length ? brandPool : catalog;
  const want = normalizeKey(name);
  const exact = pool.find((p) => normalizeKey(p.name) === want);
  if (exact) return exact;
  const fuzzy = pool
    .filter((p) => {
      const have = normalizeKey(p.name);
      return have.includes(want) || want.includes(have);
    })
    .sort((a, b) => normalizeKey(a.name).length - normalizeKey(b.name).length);
  return fuzzy[0] || null;
}

export async function placeOrder({ customerName, customerEmail, items, notes }) {
  const res = await fetch(\`\${getApiBase()}/api/orders\`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ customerName, customerEmail, items, notes }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.error || "Checkout failed");
  }
  catalogCache = null;
  catalogPromise = null;
  return data;
}
`;
  }

  fs.writeFileSync(full, text);
  console.log("patched", file);
}

console.log("done", files.length);
