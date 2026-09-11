import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { formatMoney } from "@/lib/utils";
import { adjustStock, updateProduct } from "@/lib/actions";

export const dynamic = "force-dynamic";

export default async function InventoryDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await prisma.product.findUnique({
    where: { id },
    include: {
      stockMovements: { orderBy: { createdAt: "desc" }, take: 12 },
    },
  });
  if (!product) notFound();

  return (
    <div className="space-y-8">
      <div>
        <Link
          href="/admin/inventory"
          className="text-[11px] tracking-[0.18em] text-[#9a9488] uppercase"
        >
          ← Inventory
        </Link>
        <h2 className="font-display mt-2 text-4xl">{product.name}</h2>
        <p className="text-sm text-[#9a9488]">
          {product.brand} · {product.sku}
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="border border-[#222] bg-[#0d0d0d] p-5">
          <h3 className="font-display text-2xl">Details</h3>
          <form action={updateProduct} className="mt-4 space-y-3">
            <input type="hidden" name="id" value={product.id} />
            <input name="name" defaultValue={product.name} className="w-full border border-[#2a2a2a] bg-transparent px-3 py-2 text-sm" />
            <input name="brand" defaultValue={product.brand} className="w-full border border-[#2a2a2a] bg-transparent px-3 py-2 text-sm" />
            <select name="category" defaultValue={product.category} className="w-full border border-[#2a2a2a] bg-[#0d0d0d] px-3 py-2 text-sm">
              <option>Shop</option>
              <option>Purses</option>
              <option>Shoes</option>
            </select>
            <input name="price" type="number" step="0.01" defaultValue={product.price} className="w-full border border-[#2a2a2a] bg-transparent px-3 py-2 text-sm" />
            <input name="lowStockAt" type="number" defaultValue={product.lowStockAt} className="w-full border border-[#2a2a2a] bg-transparent px-3 py-2 text-sm" />
            <label className="flex items-center gap-2 text-sm text-[#cfc8bb]">
              <input type="checkbox" name="active" defaultChecked={product.active} />
              Active in catalog
            </label>
            <button type="submit" className="bg-[#f4f1ea] px-4 py-2 text-[11px] tracking-[0.18em] text-black uppercase">
              Save changes
            </button>
          </form>
          <p className="mt-4 text-sm text-[#9a9488]">
            Current stock:{" "}
            <span className={product.stock <= product.lowStockAt ? "text-[#d46a6a]" : "text-white"}>
              {product.stock}
            </span>{" "}
            · {formatMoney(product.price)}
          </p>
        </section>

        <section className="border border-[#222] bg-[#0d0d0d] p-5">
          <h3 className="font-display text-2xl">Adjust stock</h3>
          <form action={adjustStock} className="mt-4 grid gap-3 sm:grid-cols-3">
            <input type="hidden" name="id" value={product.id} />
            <input name="delta" type="number" required placeholder="+/- qty" className="border border-[#2a2a2a] bg-transparent px-3 py-2 text-sm" />
            <input name="reason" placeholder="Reason" defaultValue="Manual adjustment" className="border border-[#2a2a2a] bg-transparent px-3 py-2 text-sm sm:col-span-2" />
            <button type="submit" className="bg-[#c6a572] px-4 py-2 text-[11px] tracking-[0.18em] text-black uppercase sm:col-span-3">
              Apply movement
            </button>
          </form>

          <h4 className="mt-8 text-[11px] tracking-[0.18em] text-[#9a9488] uppercase">
            Recent movements
          </h4>
          <ul className="mt-3 space-y-2 text-sm">
            {product.stockMovements.length === 0 ? (
              <li className="text-[#9a9488]">No movements yet.</li>
            ) : (
              product.stockMovements.map((m) => (
                <li key={m.id} className="flex justify-between border-b border-[#1a1a1a] pb-2">
                  <span>
                    {m.delta > 0 ? "+" : ""}
                    {m.delta} · {m.reason}
                  </span>
                  <span className="text-xs text-[#9a9488]">
                    {m.createdAt.toLocaleString()}
                  </span>
                </li>
              ))
            )}
          </ul>
        </section>
      </div>
    </div>
  );
}
