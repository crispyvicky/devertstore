import { NextRequest, NextResponse } from "next/server";
import { faqCount, matchFaq } from "@/lib/may";

export async function GET() {
  return NextResponse.json({
    name: "May",
    mode: process.env.OPENAI_API_KEY ? "ai" : "fallback",
    faqCount: faqCount(),
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const message = String(body.message || "").trim();
    const history = Array.isArray(body.history) ? body.history.slice(-8) : [];

    if (!message) {
      return NextResponse.json({ error: "Message required" }, { status: 400 });
    }

    const apiKey = process.env.OPENAI_API_KEY?.trim();

    if (apiKey) {
      try {
        const ai = await askOpenAI(apiKey, message, history);
        return NextResponse.json({
          reply: ai,
          mode: "ai",
          assistant: "May",
        });
      } catch (err) {
        const fallback = matchFaq(message);
        return NextResponse.json({
          reply: fallback.answer,
          mode: "fallback",
          assistant: "May",
          note: "AI unavailable — used FAQ fallback",
        });
      }
    }

    const fallback = matchFaq(message);
    return NextResponse.json({
      reply: fallback.answer,
      mode: "fallback",
      assistant: "May",
      faqCount: faqCount(),
    });
  } catch {
    return NextResponse.json({ error: "Could not reach May" }, { status: 500 });
  }
}

async function askOpenAI(
  apiKey: string,
  message: string,
  history: { role?: string; content?: string }[]
) {
  const model = process.env.OPENAI_MODEL || "gpt-4o-mini";
  const system = `You are May, the warm, concise help-desk assistant for Devert Store — a privately curated luxury maison salon in Hyderabad (Chanel, Gucci, Dior, Prada, Louis Vuitton, Burberry, Bottega Veneta, Fendi, Cartier, Coach, Kate Spade).

Rules:
- Be helpful and short (2–5 sentences).
- Prices and stock are live from inventory; never invent exact stock counts.
- Checkout: shoppers add in-stock items to Bag, then place an order with name/email (order codes like DRV-…).
- Admin is at /login for staff only.
- Contact: navbar CONTACT or +91 94971 94971; address Devert Store, Hyderabad.
- If unsure, invite them to CONTACT or browse the maison page.`;

  const messages = [
    { role: "system", content: system },
    ...history
      .filter((h) => h?.content && (h.role === "user" || h.role === "assistant"))
      .map((h) => ({
        role: h.role as "user" | "assistant",
        content: String(h.content).slice(0, 2000),
      })),
    { role: "user", content: message.slice(0, 2000) },
  ];

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      temperature: 0.4,
      max_tokens: 350,
      messages,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(err || "OpenAI error");
  }

  const data = await res.json();
  const reply = data?.choices?.[0]?.message?.content?.trim();
  if (!reply) throw new Error("Empty AI reply");
  return reply;
}
