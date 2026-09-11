"use client";

import { mediaUrl } from "./media";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import {
  subscribeCart,
  setQty,
  removeFromCart,
  clearCart,
  cartCount,
  cartTotal,
  formatPrice,
  parsePrice,
} from "./cartStore";
import { placeOrder } from "./api";

export function CartRoot() {
  const [items, setItems] = useState([]);
  const [open, setOpen] = useState(false);
  const [slot, setSlot] = useState(null);
  const [toast, setToast] = useState(false);
  const [checkingOut, setCheckingOut] = useState(false);
  const [done, setDone] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");
  const [error, setError] = useState("");

  useEffect(() => subscribeCart(setItems), []);

  useEffect(() => {
    const nav = document.querySelector(".navbar");
    if (!nav) return undefined;

    document.querySelectorAll("#atelier-cart-slot").forEach((node, index) => {
      if (index > 0) node.remove();
    });

    let host = document.getElementById("atelier-cart-slot");
    if (!host) {
      host = document.createElement("li");
      host.id = "atelier-cart-slot";
      const lists = nav.querySelectorAll(":scope > ul");
      const last = lists[lists.length - 1];
      if (last) last.insertBefore(host, last.firstChild);
      else nav.appendChild(host);
    }
    host.replaceChildren();
    setSlot(host);
    return undefined;
  }, []);

  useEffect(() => {
    const onAdded = () => {
      setToast(true);
      window.setTimeout(() => setToast(false), 1600);
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("atelier:added", onAdded);
    window.addEventListener("toggleCart", onOpen);
    return () => {
      window.removeEventListener("atelier:added", onAdded);
      window.removeEventListener("toggleCart", onOpen);
    };
  }, []);

  const count = cartCount(items);
  const total = cartTotal(items);

  const checkout = async (event) => {
    event.preventDefault();
    setCheckingOut(true);
    setError("");
    const form = new FormData(event.currentTarget);

    try {
      const result = await placeOrder({
        customerName: String(form.get("name") || ""),
        customerEmail: String(form.get("email") || ""),
        notes: "Placed from Devert Store storefront",
        items: items.map((item) => ({
          productId: item.productId || item.id,
          quantity: item.qty,
        })),
      });
      clearCart();
      setOrderNumber(result.order?.orderNumber || "");
      setDone(true);
    } catch (err) {
      setError(err.message || "Checkout failed");
    } finally {
      setCheckingOut(false);
    }
  };

  return (
    <>
      {slot &&
        createPortal(
          <button
            type="button"
            className="nav-bag-btn"
            onClick={() => {
              setDone(false);
              setError("");
              setOpen(true);
            }}
            aria-label="Open shopping bag"
          >
            Bag
            <span className="nav-bag-count">{count}</span>
          </button>,
          slot
        )}

      {toast && (
        <div className="bag-toast" role="status">
          Added to bag
        </div>
      )}

      <div
        className={`bag-scrim${open ? " is-open" : ""}`}
        onClick={() => setOpen(false)}
      />

      <aside className={`bag-drawer${open ? " is-open" : ""}`} aria-hidden={!open}>
        <header className="bag-head">
          <p className="bag-kicker">Devert Store</p>
          <h2>Your Bag</h2>
          <button type="button" className="bag-close" onClick={() => setOpen(false)}>
            Close
          </button>
        </header>

        {items.length === 0 && !done && (
          <div className="bag-empty">
            <p>Your bag is empty.</p>
            <p className="bag-empty-sub">
              Add live inventory pieces — prices sync from admin.
            </p>
          </div>
        )}

        {items.length > 0 && !done && (
          <div className="bag-body">
            <ul className="bag-list">
              {items.map((item) => (
                <li key={item.id} className="bag-item">
                  {item.image && (
                    <div
                      className="bag-thumb"
                      style={{ backgroundImage: `url("${mediaUrl(item.image)}")` }}
                    />
                  )}
                  <div className="bag-meta">
                    <p className="bag-brand">{item.brand}</p>
                    <p className="bag-name">{item.name}</p>
                    <p className="bag-price">{formatPrice(parsePrice(item.price))}</p>
                    <div className="bag-qty">
                      <button type="button" onClick={() => setQty(item.id, item.qty - 1)}>
                        −
                      </button>
                      <span>{item.qty}</span>
                      <button type="button" onClick={() => setQty(item.id, item.qty + 1)}>
                        +
                      </button>
                      <button
                        type="button"
                        className="bag-remove"
                        onClick={() => removeFromCart(item.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <form className="bag-checkout" onSubmit={checkout}>
              <div className="bag-total">
                <span>Live total</span>
                <strong>{formatPrice(total)}</strong>
              </div>
              {error ? (
                <p className="bag-note" style={{ color: "#d46a6a" }}>
                  {error}
                </p>
              ) : null}
              <input name="name" placeholder="Full name" required />
              <input name="email" type="email" placeholder="Email" required />
              <button type="submit" disabled={checkingOut}>
                {checkingOut ? "Placing order…" : "Place order"}
              </button>
              <p className="bag-note">
                Order syncs to admin inventory immediately.
              </p>
            </form>
          </div>
        )}

        {done && (
          <div className="bag-empty">
            <p>Order confirmed</p>
            <p className="bag-empty-sub">
              {orderNumber
                ? `${orderNumber} is in admin · stock updated`
                : "Your order is in the admin dashboard."}
            </p>
          </div>
        )}
      </aside>
    </>
  );
}
