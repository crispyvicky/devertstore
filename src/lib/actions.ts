"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { ORDER_STATUSES } from "@/lib/utils";

async function requireAdmin() {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");
  return session;
}

export async function createProduct(formData: FormData) {
  await requireAdmin();
  const name = String(formData.get("name") || "").trim();
  const brand = String(formData.get("brand") || "").trim();
  const sku = String(formData.get("sku") || "").trim().toUpperCase();
  const category = String(formData.get("category") || "Shop");
  const price = Number(formData.get("price") || 0);
  const stock = Number(formData.get("stock") || 0);
  const lowStockAt = Number(formData.get("lowStockAt") || 5);

  if (!name || !brand || !sku || price < 0) {
    throw new Error("Invalid product data");
  }

  await prisma.product.create({
    data: { name, brand, sku, category, price, stock, lowStockAt, active: true },
  });

  if (stock !== 0) {
    const product = await prisma.product.findUnique({ where: { sku } });
    if (product) {
      await prisma.stockMovement.create({
        data: {
          productId: product.id,
          delta: stock,
          reason: "Initial stock",
        },
      });
    }
  }

  revalidatePath("/admin/inventory");
  revalidatePath("/admin");
}

export async function updateProduct(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") || "");
  const name = String(formData.get("name") || "").trim();
  const brand = String(formData.get("brand") || "").trim();
  const category = String(formData.get("category") || "Shop");
  const price = Number(formData.get("price") || 0);
  const lowStockAt = Number(formData.get("lowStockAt") || 5);
  const active = formData.get("active") === "on" || formData.get("active") === "true";

  await prisma.product.update({
    where: { id },
    data: { name, brand, category, price, lowStockAt, active },
  });

  revalidatePath("/admin/inventory");
  revalidatePath(`/admin/inventory/${id}`);
  revalidatePath("/admin");
}

export async function adjustStock(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") || "");
  const delta = Number(formData.get("delta") || 0);
  const reason = String(formData.get("reason") || "Manual adjustment").trim();

  if (!id || !delta) throw new Error("Invalid stock adjustment");

  await prisma.$transaction(async (tx) => {
    const product = await tx.product.findUnique({ where: { id } });
    if (!product) throw new Error("Product not found");
    const next = product.stock + delta;
    if (next < 0) throw new Error("Stock cannot go below zero");

    await tx.product.update({ where: { id }, data: { stock: next } });
    await tx.stockMovement.create({
      data: { productId: id, delta, reason },
    });
  });

  revalidatePath("/admin/inventory");
  revalidatePath(`/admin/inventory/${id}`);
  revalidatePath("/admin");
}

export async function updateOrderStatus(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") || "");
  const status = String(formData.get("status") || "");

  if (!ORDER_STATUSES.includes(status as (typeof ORDER_STATUSES)[number])) {
    throw new Error("Invalid status");
  }

  await prisma.$transaction(async (tx) => {
    const order = await tx.order.findUnique({
      where: { id },
      include: { items: true },
    });
    if (!order) throw new Error("Order not found");

    const wasConfirmed =
      order.status === "pending" &&
      (status === "confirmed" || status === "packed" || status === "shipped" || status === "delivered");

    if (wasConfirmed) {
      for (const item of order.items) {
        const product = await tx.product.findUnique({ where: { id: item.productId } });
        if (!product || product.stock < item.quantity) {
          throw new Error(`Insufficient stock for ${item.name}`);
        }
        await tx.product.update({
          where: { id: item.productId },
          data: { stock: product.stock - item.quantity },
        });
        await tx.stockMovement.create({
          data: {
            productId: item.productId,
            delta: -item.quantity,
            reason: `Order ${order.orderNumber} confirmed`,
          },
        });
      }
    }

    await tx.order.update({ where: { id }, data: { status } });
  });

  revalidatePath("/admin/orders");
  revalidatePath(`/admin/orders/${id}`);
  revalidatePath("/admin/inventory");
  revalidatePath("/admin");
}

export async function createSampleOrder() {
  await requireAdmin();
  const products = await prisma.product.findMany({
    where: { active: true, stock: { gt: 0 } },
    take: 3,
  });
  if (!products.length) throw new Error("No products available");

  const count = await prisma.order.count();
  const orderNumber = `DRV-${1000 + count + 1}`;
  const selected = products.slice(0, Math.min(2, products.length));
  const total = selected.reduce((sum, p) => sum + p.price, 0);

  await prisma.order.create({
    data: {
      orderNumber,
      customerName: "Walk-in Guest",
      customerEmail: "guest@devert.store",
      status: "pending",
      total,
      notes: "Created from admin",
      items: {
        create: selected.map((p) => ({
          productId: p.id,
          quantity: 1,
          unitPrice: p.price,
          name: p.name,
          brand: p.brand,
        })),
      },
    },
  });

  revalidatePath("/admin/orders");
  revalidatePath("/admin");
}
