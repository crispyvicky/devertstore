"use client";

const STORAGE_KEY = "devert-store-bag";
const listeners = new Set();

function readCart() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

let items = readCart();

function persist() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  listeners.forEach((fn) => fn(items));
}

export function getCart() {
  return items;
}

export function subscribeCart(fn) {
  listeners.add(fn);
  fn(items);
  return () => listeners.delete(fn);
}

export function parsePrice(value) {
  if (typeof value === "number") return value;
  if (!value) return 0;
  const n = Number(String(value).replace(/[^0-9.]/g, ""));
  return Number.isFinite(n) ? n : 0;
}

export function formatPrice(n) {
  return `$${Number(n).toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })}`;
}

export function addToCart(product) {
  if (!product?.productId) {
    throw new Error("Only live inventory products can be added to the bag.");
  }

  const id = product.productId;
  const existing = items.find((item) => item.id === id);
  const maxStock = Number(product.stock ?? existing?.stock ?? 99);
  const nextQty = existing ? existing.qty + 1 : 1;

  if (nextQty > maxStock) {
    throw new Error(`Only ${maxStock} in stock for ${product.name}.`);
  }

  if (existing) {
    items = items.map((item) =>
      item.id === id
        ? {
            ...item,
            qty: nextQty,
            price: product.price ?? item.price,
            stock: maxStock,
          }
        : item
    );
  } else {
    items = [
      ...items,
      {
        id,
        productId: id,
        name: product.name,
        price: product.price,
        image: product.image,
        brand: product.brand,
        collection: product.collection,
        stock: maxStock,
        qty: 1,
      },
    ];
  }
  persist();
  return items;
}

export function setQty(id, qty) {
  const current = items.find((item) => item.id === id);
  const maxStock = Number(current?.stock ?? 99);
  const next = Math.max(0, Math.min(qty, maxStock));
  items =
    next === 0
      ? items.filter((item) => item.id !== id)
      : items.map((item) => (item.id === id ? { ...item, qty: next } : item));
  persist();
}

export function removeFromCart(id) {
  items = items.filter((item) => item.id !== id);
  persist();
}

export function clearCart() {
  items = [];
  persist();
}

export function cartCount(list = items) {
  return list.reduce((sum, item) => sum + item.qty, 0);
}

export function cartTotal(list = items) {
  return list.reduce((sum, item) => sum + parsePrice(item.price) * item.qty, 0);
}
