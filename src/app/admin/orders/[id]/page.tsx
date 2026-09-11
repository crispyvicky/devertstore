import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ORDER_STATUSES, formatMoney, statusLabel } from "@/lib/utils";
import { updateOrderStatus } from "@/lib/actions";

export const dynamic = "force-dynamic";

export default async function OrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const order = await prisma.order.findUnique({
    where: { id },
    include: { items: true },
  });
  if (!order) notFound();

  const pipeline = ["pending", "confirmed", "packed", "shipped", "delivered"];

  return (
    <div className="space-y-8">
      <div>
        <Link
          href="/admin/orders"
          className="text-[11px] tracking-[0.18em] text-[#9a9488] uppercase"
        >
          ← Orders
        </Link>
        <h2 className="font-display mt-2 text-4xl">{order.orderNumber}</h2>
        <p className="text-sm text-[#9a9488]">
          {order.customerName} · {order.customerEmail}
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {pipeline.map((step) => {
          const activeIndex = pipeline.indexOf(order.status);
          const stepIndex = pipeline.indexOf(step);
          const done =
            order.status === "cancelled"
              ? false
              : activeIndex >= 0 && stepIndex <= activeIndex;
          return (
            <div
              key={step}
              className={`border px-3 py-1.5 text-[11px] tracking-[0.14em] uppercase ${
                done
                  ? "border-[#c6a572] text-[#c6a572]"
                  : "border-[#2a2a2a] text-[#6f6a62]"
              }`}
            >
              {statusLabel(step)}
            </div>
          );
        })}
        {order.status === "cancelled" ? (
          <div className="border border-[#d46a6a] px-3 py-1.5 text-[11px] tracking-[0.14em] text-[#d46a6a] uppercase">
            Cancelled
          </div>
        ) : null}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="border border-[#222] bg-[#0d0d0d] p-5">
          <h3 className="font-display text-2xl">Line items</h3>
          <ul className="mt-4 space-y-3 text-sm">
            {order.items.map((item) => (
              <li
                key={item.id}
                className="flex justify-between border-b border-[#1a1a1a] pb-3"
              >
                <div>
                  <p>{item.name}</p>
                  <p className="text-xs text-[#9a9488]">
                    {item.brand} · qty {item.quantity}
                  </p>
                </div>
                <p>{formatMoney(item.unitPrice * item.quantity)}</p>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-right text-lg">
            Total {formatMoney(order.total)}
          </p>
          {order.notes ? (
            <p className="mt-2 text-sm text-[#9a9488]">Note: {order.notes}</p>
          ) : null}
        </section>

        <section className="border border-[#222] bg-[#0d0d0d] p-5">
          <h3 className="font-display text-2xl">Update status</h3>
          <p className="mt-2 text-sm text-[#9a9488]">
            Moving from pending to confirmed deducts stock automatically.
          </p>
          <form action={updateOrderStatus} className="mt-4 space-y-3">
            <input type="hidden" name="id" value={order.id} />
            <select
              name="status"
              defaultValue={order.status}
              className="w-full border border-[#2a2a2a] bg-[#0d0d0d] px-3 py-2 text-sm"
            >
              {ORDER_STATUSES.map((s) => (
                <option key={s} value={s}>
                  {statusLabel(s)}
                </option>
              ))}
            </select>
            <button
              type="submit"
              className="w-full bg-[#f4f1ea] px-4 py-2 text-[11px] tracking-[0.18em] text-black uppercase"
            >
              Save status
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}
