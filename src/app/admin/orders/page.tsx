import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatMoney, statusLabel } from "@/lib/utils";
import { createSampleOrder } from "@/lib/actions";

export const dynamic = "force-dynamic";

export default async function OrdersPage() {
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    include: { items: true },
  });

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[11px] tracking-[0.28em] text-[#c6a572] uppercase">
            Fulfillment
          </p>
          <h2 className="font-display mt-1 text-4xl">Orders</h2>
        </div>
        <form action={createSampleOrder}>
          <button
            type="submit"
            className="border border-[#c6a572] px-4 py-2 text-[11px] tracking-[0.18em] text-[#c6a572] uppercase"
          >
            Create sample order
          </button>
        </form>
      </div>

      <div className="overflow-x-auto border border-[#222]">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-[#222] bg-[#0d0d0d] text-[11px] tracking-[0.14em] text-[#9a9488] uppercase">
            <tr>
              <th className="px-4 py-3">Order</th>
              <th className="px-4 py-3">Customer</th>
              <th className="px-4 py-3">Items</th>
              <th className="px-4 py-3">Total</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Created</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o.id} className="border-b border-[#1a1a1a]">
                <td className="px-4 py-3">
                  <Link href={`/admin/orders/${o.id}`} className="hover:underline">
                    {o.orderNumber}
                  </Link>
                </td>
                <td className="px-4 py-3">
                  <p>{o.customerName}</p>
                  <p className="text-xs text-[#9a9488]">{o.customerEmail}</p>
                </td>
                <td className="px-4 py-3">{o.items.length}</td>
                <td className="px-4 py-3">{formatMoney(o.total)}</td>
                <td className="px-4 py-3">{statusLabel(o.status)}</td>
                <td className="px-4 py-3 text-[#9a9488]">
                  {o.createdAt.toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
