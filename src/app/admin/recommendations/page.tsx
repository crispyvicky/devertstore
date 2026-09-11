import { prisma } from "@/lib/prisma";
import { getRecommendations } from "@/lib/recommendations";
import { formatMoney } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function RecommendationsPage({
  searchParams,
}: {
  searchParams: Promise<{ productId?: string }>;
}) {
  const params = await searchParams;
  const products = await prisma.product.findMany({
    where: { active: true },
    orderBy: [{ brand: "asc" }, { name: "asc" }],
  });

  const productId = params.productId || products[0]?.id;
  const seed = products.find((p) => p.id === productId);
  const recs = productId
    ? await getRecommendations({ productId, limit: 8 })
    : [];

  return (
    <div className="space-y-8">
      <div>
        <p className="text-[11px] tracking-[0.28em] text-[#c6a572] uppercase">
          Improvisation twist
        </p>
        <h2 className="font-display mt-1 text-4xl">AI recommendations</h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#9a9488]">
          Rule-based affinity engine using brand co-purchase signals, category
          match, price tier, popularity, and live stock. Ready for the Vite
          storefront via{" "}
          <code className="text-[#c6a572]">/api/recommendations</code>.
        </p>
      </div>

      <form className="flex flex-wrap gap-3 border border-[#222] bg-[#0d0d0d] p-4">
        <select
          name="productId"
          defaultValue={productId}
          className="min-w-[280px] flex-1 border border-[#2a2a2a] bg-[#0d0d0d] px-3 py-2 text-sm"
        >
          {products.map((p) => (
            <option key={p.id} value={p.id}>
              {p.brand} — {p.name}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="bg-[#c6a572] px-4 py-2 text-[11px] tracking-[0.18em] text-black uppercase"
        >
          Generate
        </button>
      </form>

      {seed ? (
        <p className="text-sm text-[#cfc8bb]">
          Seed piece: <strong>{seed.name}</strong> ({seed.brand}) ·{" "}
          {formatMoney(seed.price)}
        </p>
      ) : null}

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {recs.map((r) => (
          <article
            key={r.productId}
            className="border border-[#222] bg-[#0d0d0d] p-4"
          >
            <p className="text-[10px] tracking-[0.2em] text-[#c6a572] uppercase">
              Score {r.score}
            </p>
            <h3 className="mt-2 text-lg">{r.name}</h3>
            <p className="text-sm text-[#9a9488]">
              {r.brand} · {r.category}
            </p>
            <p className="mt-2 text-sm">
              {formatMoney(r.price)} · {r.stock} in stock
            </p>
            <ul className="mt-3 space-y-1 text-xs text-[#9a9488]">
              {r.reasons.map((reason) => (
                <li key={reason}>• {reason}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </div>
  );
}
