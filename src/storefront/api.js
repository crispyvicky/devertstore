"use client";

const API_BASE =
  (typeof process !== "undefined" &&
    process.env?.NEXT_PUBLIC_APP_URL) ||
  "";

export function getApiBase() {
  return String(API_BASE).replace(/\/$/, "");
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
  return `$${Number(n).toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })}`;
}

let catalogCache = null;
let catalogPromise = null;

export async function fetchCatalog(force = false) {
  if (!force && catalogCache) return catalogCache;
  if (!force && catalogPromise) return catalogPromise;

  catalogPromise = fetch(`${getApiBase()}/api/products`)
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
  const res = await fetch(`${getApiBase()}/api/orders`, {
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
