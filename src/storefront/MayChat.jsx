"use client";

import React, { useEffect, useRef, useState } from "react";
import "./may-chat.css";

const GREETING =
  "Hello — I'm May, your Devert Store help desk. Ask about maisons, stock, bag & checkout, or appointments. I'm here.";

export default function MayChat() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [mode, setMode] = useState("");
  const [messages, setMessages] = useState([
    { role: "assistant", content: GREETING },
  ]);
  const endRef = useRef(null);

  useEffect(() => {
    fetch("/api/may")
      .then((r) => r.json())
      .then((d) => setMode(d.mode === "ai" ? "ai" : "fallback"))
      .catch(() => setMode("fallback"));
  }, []);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  const send = async (text) => {
    const message = (text ?? input).trim();
    if (!message || busy) return;
    setInput("");
    const nextHistory = [...messages, { role: "user", content: message }];
    setMessages(nextHistory);
    setBusy(true);
    try {
      const res = await fetch("/api/may", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message,
          history: nextHistory.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "May is unavailable");
      setMode(data.mode === "ai" ? "ai" : "fallback");
      setMessages((m) => [
        ...m,
        { role: "assistant", content: data.reply || "I'm listening — try another question." },
      ]);
    } catch {
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          content:
            "I couldn't reach the desk just now. Refresh the page, or use CONTACT in the navbar.",
        },
      ]);
    } finally {
      setBusy(false);
    }
  };

  const chips = [
    "Do you sell Chanel?",
    "How does the bag work?",
    "Store hours?",
    "Who is May?",
  ];

  return (
    <div className="may-root" aria-live="polite">
      {open && (
        <div className="may-panel" role="dialog" aria-label="May help desk">
          <header className="may-head">
            <div className="may-avatar" aria-hidden>
              M
            </div>
            <div>
              <p className="may-name">May</p>
              <p className="may-status">
                Help desk · {mode === "ai" ? "AI online" : "FAQ mode"}
              </p>
            </div>
            <button
              type="button"
              className="may-close"
              onClick={() => setOpen(false)}
              aria-label="Close May"
            >
              ×
            </button>
          </header>

          <div className="may-thread">
            {messages.map((m, i) => (
              <div
                key={`${m.role}-${i}`}
                className={`may-bubble may-bubble--${m.role}`}
              >
                {m.content}
              </div>
            ))}
            {busy && <div className="may-bubble may-bubble--assistant may-typing">May is typing…</div>}
            <div ref={endRef} />
          </div>

          <div className="may-chips">
            {chips.map((c) => (
              <button key={c} type="button" onClick={() => send(c)} disabled={busy}>
                {c}
              </button>
            ))}
          </div>

          <form
            className="may-compose"
            onSubmit={(e) => {
              e.preventDefault();
              send();
            }}
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask May anything…"
              disabled={busy}
              maxLength={2000}
            />
            <button type="submit" disabled={busy || !input.trim()}>
              Send
            </button>
          </form>
        </div>
      )}

      <button
        type="button"
        className={`may-fab${open ? " is-open" : ""}`}
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close May help desk" : "Open May help desk"}
      >
        {open ? (
          <span aria-hidden>×</span>
        ) : (
          <>
            <span className="may-fab-icon" aria-hidden>
              ✦
            </span>
            <span className="may-fab-label">May</span>
          </>
        )}
      </button>
    </div>
  );
}
