"use client";

import React, { useEffect, useState } from "react";
import { addToCart } from "./cartStore";
import {
  fetchCatalog,
  formatLivePrice,
  matchProduct,
} from "./api";

export default function ProductGrid({
  items = [],
  prices = [],
  image,
  brand,
  collection,
  itemClass = "",
  priceClass = "",
  itemStyle,
  priceStyle,
}) {
  const [addedId, setAddedId] = useState(null);
  const [catalog, setCatalog] = useState([]);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let alive = true;
    fetchCatalog()
      .then((products) => {
        if (!alive) return;
        setCatalog(products);
        setReady(true);
      })
      .catch(() => {
        if (!alive) return;
        setError("Inventory offline — check Supabase DATABASE_URL / restart the app");
        setReady(true);
      });
    return () => {
      alive = false;
    };
  }, []);

  const lines = items
    .map((name, i) => {
      const live = matchProduct(catalog, brand, name);
      return {
        name,
        fallbackPrice: prices[i] || "",
        live,
      };
    })
    .filter((line) => line.name && !String(line.name).startsWith("⎯"));

  if (!lines.length) {
    return (
      <div className="product-grid">
        <div className="items-col" />
        <div className="prices-col" />
        <div className="cart-col" />
      </div>
    );
  }

  const handleAdd = (line) => {
    if (!line.live || !line.live.inStock) return;
    try {
      addToCart({
        productId: line.live.id,
        name: line.live.name,
        price: line.live.price,
        image,
        brand: line.live.brand,
        collection,
        stock: line.live.stock,
      });
      setAddedId(line.live.id);
      window.dispatchEvent(new CustomEvent("atelier:added"));
      window.setTimeout(() => {
        setAddedId((current) => (current === line.live.id ? null : current));
      }, 1400);
      fetchCatalog(true).then(setCatalog).catch(() => {});
    } catch (err) {
      window.alert(err.message || "Could not add to bag");
    }
  };

  return (
    <div className="product-grid">
      {error ? (
        <p style={{ gridColumn: "1 / -1", color: "#c6a572", fontSize: 12 }}>{error}</p>
      ) : null}
      <div className="items-col">
        {lines.map((line, idx) => (
          <p key={`${line.name}-n-${idx}`} className={itemClass} style={itemStyle}>
            {line.name}
            {ready && line.live ? (
              <span style={{ display: "block", fontSize: 11, color: "#888", marginTop: 2 }}>
                {line.live.stock > 0 ? `${line.live.stock} in stock` : "Out of stock"}
              </span>
            ) : null}
          </p>
        ))}
      </div>
      <div className="prices-col">
        {lines.map((line, idx) => (
          <p key={`${line.name}-p-${idx}`} className={priceClass} style={priceStyle}>
            <span className="price-tag">
              {line.live
                ? formatLivePrice(line.live.price)
                : ready
                  ? "—"
                  : "…"}
            </span>
          </p>
        ))}
      </div>
      <div className="cart-col">
        {lines.map((line, idx) => {
          const canBuy = !!line.live?.inStock;
          const added = addedId === line.live?.id;
          return (
            <p key={`${line.name}-c-${idx}`}>
              <button
                type="button"
                className={`add-bag-btn${added ? " is-added" : ""}`}
                disabled={!canBuy}
                onClick={() => handleAdd(line)}
                title={
                  !line.live
                    ? "Not in live inventory — add SKU in admin"
                    : !line.live.inStock
                      ? "Out of stock"
                      : "Add to bag"
                }
              >
                {!ready
                  ? "…"
                  : added
                    ? "Added"
                    : !line.live
                      ? "Sync admin"
                      : !line.live.inStock
                        ? "Sold out"
                        : "Add to Bag"}
              </button>
            </p>
          );
        })}
      </div>
    </div>
  );
}
