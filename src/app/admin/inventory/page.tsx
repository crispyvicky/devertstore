import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatMoney } from "@/lib/utils";
import { createProduct } from "@/lib/actions";

export const dynamic = "force-dynamic";

export default async function InventoryPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; brand?: string; category?: string }>;
}) {
  const params = await searchParams;
  const q = params.q?.trim() || "";
  const brand = params.brand || "";
  const category = params.category || "";

  const products = await prisma.product.findMany({
    where: {
      AND: [
        q
          ? {
              OR: [
                { name: { contains: q } },
                { sku: { contains: q } },
                { brand: { contains: q } },
              ],
            }
          : {},
        brand ? { brand } : {},
        category ? { category } : {},
      ],
    },
    orderBy: [{ brand: "asc" }, { name: "asc" }],
  });

  const brands = [...new Set((await prisma.product.findMany()).map((p) => p.brand))].sort();

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[11px] tracking-[0.28em] text-[#c6a572] uppercase">
            Stock control
          </p>
          <h2 className="font-display mt-1 text-4xl">Inventory</h2>
        </div>
        <p className="text-sm text-[#9a9488]">{products.length} SKUs</p>
      </div>

      <form className="grid gap-3 border border-[#222] bg-[#0d0d0d] p-4 md:grid-cols-4">
        <input
          name="q"
          defaultValue={q}
          placeholder="Search name, SKU, brand"
          className="border border-[#2a2a2a] bg-transparent px-3 py-2 text-sm outline-none focus:border-[#c6a572]"
        />
        <select
          name="brand"
          defaultValue={brand}
          className="border border-[#2a2a2a] bg-[#0d0d0d] px-3 py-2 text-sm outline-none"
        >
          <option value="">All brands</option>
          {brands.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>
        <select
          name="category"
          defaultValue={category}
          className="border border-[#2a2a2a] bg-[#0d0d0d] px-3 py-2 text-sm outline-none"
        >
          <option value="">All categories</option>
          <option value="Shop">Shop</option>
          <option value="Purses">Purses</option>
          <option value="Shoes">Shoes</option>
        </select>
        <button
          type="submit"
          className="bg-[#f4f1ea] px-3 py-2 text-[11px] tracking-[0.18em] text-black uppercase"
        >
          Filter
        </button>
      </form>

      <div className="overflow-x-auto border border-[#222]">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-[#222] bg-[#0d0d0d] text-[11px] tracking-[0.14em] text-[#9a9488] uppercase">
            <tr>
              <th className="px-4 py-3">Product</th>
              <th className="px-4 py-3">SKU</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">Stock</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => {
              const low = p.stock <= p.lowStockAt;
              return (
                <tr key={p.id} className="border-b border-[#1a1a1a]">
                  <td className="px-4 py-3">
                    <Link
                      href={`/admin/inventory/${p.id}`}
                      className="hover:underline"
                    >
                      {p.name}
                    </Link>
                    <p className="text-xs text-[#9a9488]">{p.brand}</p>
                  </td>
                  <td className="px-4 py-3 text-[#cfc8bb]">{p.sku}</td>
                  <td className="px-4 py-3">{p.category}</td>
                  <td className="px-4 py-3">{formatMoney(p.price)}</td>
                  <td className={`px-4 py-3 ${low ? "text-[#d46a6a]" : ""}`}>
                    {p.stock}
                    {low ? " · low" : ""}
                  </td>
                  <td className="px-4 py-3">
                    {p.active ? (
                      <span className="text-[#7dba8a]">Active</span>
                    ) : (
                      <span className="text-[#9a9488]">Hidden</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <section className="border border-[#222] bg-[#0d0d0d] p-5">
        <h3 className="font-display text-2xl">Add product</h3>
        <form action={createProduct} className="mt-4 grid gap-3 md:grid-cols-3">
          <input name="name" required placeholder="Name" className="border border-[#2a2a2a] bg-transparent px-3 py-2 text-sm" />
          <input name="brand" required placeholder="Brand" className="border border-[#2a2a2a] bg-transparent px-3 py-2 text-sm" />
          <input name="sku" required placeholder="SKU" className="border border-[#2a2a2a] bg-transparent px-3 py-2 text-sm" />
          <select name="category" className="border border-[#2a2a2a] bg-[#0d0d0d] px-3 py-2 text-sm">
            <option>Shop</option>
            <option>Purses</option>
            <option>Shoes</option>
          </select>
          <input name="price" type="number" step="0.01" required placeholder="Price" className="border border-[#2a2a2a] bg-transparent px-3 py-2 text-sm" />
          <input name="stock" type="number" defaultValue={0} placeholder="Stock" className="border border-[#2a2a2a] bg-transparent px-3 py-2 text-sm" />
          <input name="lowStockAt" type="number" defaultValue={5} placeholder="Low stock at" className="border border-[#2a2a2a] bg-transparent px-3 py-2 text-sm" />
          <button type="submit" className="bg-[#c6a572] px-3 py-2 text-[11px] tracking-[0.18em] text-black uppercase md:col-span-2">
            Create SKU
          </button>
        </form>
      </section>
    </div>
  );
}
