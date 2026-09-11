import { prisma } from "@/lib/prisma";

export type Recommendation = {
  productId: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  stock: number;
  score: number;
  reasons: string[];
};

export async function getRecommendations(opts: {
  productId?: string;
  limit?: number;
}): Promise<Recommendation[]> {
  const limit = opts.limit ?? 6;
  const products = await prisma.product.findMany({
    where: { active: true },
    orderBy: { updatedAt: "desc" },
  });

  if (!products.length) return [];

  const seed = opts.productId
    ? products.find((p) => p.id === opts.productId)
    : null;

  const orderItems = await prisma.orderItem.findMany({
    include: { order: true },
  });

  const popularity = new Map<string, number>();
  for (const item of orderItems) {
    popularity.set(
      item.productId,
      (popularity.get(item.productId) || 0) + item.quantity
    );
  }

  const brandPairs = new Map<string, Set<string>>();
  const orders = await prisma.order.findMany({ include: { items: true } });
  for (const order of orders) {
    const brands = [...new Set(order.items.map((i) => i.brand))];
    for (const a of brands) {
      if (!brandPairs.has(a)) brandPairs.set(a, new Set());
      for (const b of brands) {
        if (a !== b) brandPairs.get(a)!.add(b);
      }
    }
  }

  const scored: Recommendation[] = products
    .filter((p) => (seed ? p.id !== seed.id : true))
    .map((p) => {
      let score = 0;
      const reasons: string[] = [];

      const pop = popularity.get(p.id) || 0;
      if (pop > 0) {
        score += Math.min(30, pop * 8);
        reasons.push(`Popular in recent orders (+${Math.min(30, pop * 8)})`);
      }

      if (p.stock > 0) {
        score += 15;
        reasons.push("In stock");
      } else {
        score -= 40;
        reasons.push("Out of stock");
      }

      if (p.stock > 0 && p.stock <= p.lowStockAt) {
        score += 5;
        reasons.push("Limited availability");
      }

      if (seed) {
        if (p.brand === seed.brand) {
          score += 35;
          reasons.push(`Same maison as ${seed.brand}`);
        } else if (brandPairs.get(seed.brand)?.has(p.brand)) {
          score += 20;
          reasons.push(`Often paired with ${seed.brand}`);
        }

        if (p.category === seed.category) {
          score += 18;
          reasons.push(`Same category: ${p.category}`);
        }

        const priceDiff = Math.abs(p.price - seed.price) / Math.max(seed.price, 1);
        if (priceDiff < 0.35) {
          score += 12;
          reasons.push("Similar price tier");
        }
      } else {
        score += Math.min(20, p.price / 500);
        reasons.push("Featured maison assortment");
      }

      return {
        productId: p.id,
        name: p.name,
        brand: p.brand,
        category: p.category,
        price: p.price,
        stock: p.stock,
        score: Math.round(score * 10) / 10,
        reasons: reasons.slice(0, 3),
      };
    })
    .filter((r) => r.stock > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);

  return scored;
}
