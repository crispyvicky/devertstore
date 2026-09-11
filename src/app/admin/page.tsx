import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatMoney, statusLabel } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const [productCount, lowStock, orderCount, pending, recentOrders, revenue] =
    await Promise.all([
      prisma.product.count({ where: { active: true } }),
      prisma.product.findMany({
        where: { active: true },
        orderBy: { stock: "asc" },
      }),
      prisma.order.count(),
      prisma.order.count({ where: { status: "pending" } }),
      prisma.order.findMany({
        orderBy: { createdAt: "desc" },
        take: 5,
        include: { items: true },
      }),
      prisma.order.aggregate({
        _sum: { total: true },
        where: { status: { not: "cancelled" } },
      }),
    ]);

  const lowStockItems = lowStock.filter((p) => p.stock <= p.lowStockAt);

  const cards = [
    { label: "Active SKUs", value: String(productCount) },
    { label: "Low stock", value: String(lowStockItems.length), warn: true },
    { label: "Orders", value: String(orderCount) },
    { label: "Pending", value: String(pending) },
    {
      label: "Gross (non-cancelled)",
      value: formatMoney(revenue._sum.total || 0),
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <p className="text-[11px] tracking-[0.28em] text-[#c6a572] uppercase">
          Overview
        </p>
        <h2 className="font-display mt-1 text-4xl">Dashboard</h2>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
        {cards.map((card) => (
          <div
            key={card.label}
            className="border border-[#222] bg-[#0d0d0d] p-4"
          >
            <p className="text-[11px] tracking-[0.16em] text-[#9a9488] uppercase">
              {card.label}
            </p>
            <p
              className={`mt-3 font-display text-3xl ${
                card.warn && lowStockItems.length ? "text-[#d46a6a]" : ""
              }`}
            >
              {card.value}
            </p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="border border-[#222] bg-[#0d0d0d] p-5">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-display text-2xl">Low stock alerts</h3>
            <Link
              href="/admin/inventory"
              className="text-[11px] tracking-[0.16em] text-[#c6a572] uppercase"
            >
              Inventory
            </Link>
          </div>
          {lowStockItems.length === 0 ? (
            <p className="text-sm text-[#9a9488]">All SKUs above threshold.</p>
          ) : (
            <ul className="space-y-3">
              {lowStockItems.slice(0, 6).map((p) => (
                <li
                  key={p.id}
                  className="flex items-center justify-between border-b border-[#1a1a1a] pb-3 text-sm"
                >
                  <div>
                    <p>{p.name}</p>
                    <p className="text-xs text-[#9a9488]">
                      {p.brand} · {p.sku}
                    </p>
                  </div>
                  <span className="text-[#d46a6a]">{p.stock} left</span>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="border border-[#222] bg-[#0d0d0d] p-5">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-display text-2xl">Recent orders</h3>
            <Link
              href="/admin/orders"
              className="text-[11px] tracking-[0.16em] text-[#c6a572] uppercase"
            >
              Orders
            </Link>
          </div>
          <ul className="space-y-3">
            {recentOrders.map((o) => (
              <li
                key={o.id}
                className="flex items-center justify-between border-b border-[#1a1a1a] pb-3 text-sm"
              >
                <div>
                  <Link href={`/admin/orders/${o.id}`} className="hover:underline">
                    {o.orderNumber}
                  </Link>
                  <p className="text-xs text-[#9a9488]">
                    {o.customerName} · {o.items.length} items
                  </p>
                </div>
                <div className="text-right">
                  <p>{formatMoney(o.total)}</p>
                  <p className="text-xs text-[#9a9488]">{statusLabel(o.status)}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
