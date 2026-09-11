import faq from "@/lib/may-faq.json";

export type MayFaq = { q: string; a: string };

function normalize(s: string) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function tokens(s: string) {
  return normalize(s)
    .split(" ")
    .filter((t) => t.length > 2);
}

/** Score FAQ entries against a customer question; return best answer. */
export function matchFaq(question: string): { answer: string; score: number; matched?: string } {
  const qNorm = normalize(question);
  const qTokens = new Set(tokens(question));
  let best: MayFaq | null = null;
  let bestScore = 0;

  for (const entry of faq as MayFaq[]) {
    const eNorm = normalize(entry.q);
    if (!eNorm) continue;

    let score = 0;
    if (eNorm === qNorm) score = 100;
    else if (eNorm.includes(qNorm) || qNorm.includes(eNorm)) score = 70;
    else {
      const eTokens = tokens(entry.q);
      let overlap = 0;
      for (const t of eTokens) {
        if (qTokens.has(t)) overlap += 1;
      }
      if (eTokens.length) score = (overlap / eTokens.length) * 60 + Math.min(overlap, 5);
    }

    if (score > bestScore) {
      bestScore = score;
      best = entry;
    }
  }

  if (best && bestScore >= 8) {
    return { answer: best.a, score: bestScore, matched: best.q };
  }

  return {
    answer:
      "I'm May, Devert Store's help desk. I can help with brands, stock, bag/checkout, appointments, and returns. Try asking about a maison (Chanel, Gucci, Cartier…) or say “how does the bag work?”",
    score: 0,
  };
}

export function faqCount() {
  return (faq as MayFaq[]).length;
}
