import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const customerName = String(body.customerName || "").trim();
    const customerEmail = String(body.customerEmail || "").trim().toLowerCase();
    const notes = String(body.notes || "").trim() || null;
    const lines = Array.isArray(body.items) ? body.items : [];

    if (!customerName || !customerEmail || !lines.length) {
      return NextResponse.json(
        { error: "Name, email, and at least one item are required." },
        { status: 400, headers: corsHeaders }
      );
    }

    const prepared: {
      productId: string;
      quantity: number;
      unitPrice: number;
      name: string;
      brand: string;
    }[] = [];

    for (const line of lines) {
      const productId = String(line.productId || "");
      const quantity = Math.max(1, Number(line.quantity) || 1);
      if (!productId) {
        return NextResponse.json(
          { error: "Every bag item must be a live inventory product." },
          { status: 400, headers: corsHeaders }
        );
      }

      const product = await prisma.product.findUnique({ where: { id: productId } });
      if (!product || !product.active) {
        return NextResponse.json(
          { error: `Product unavailable: ${productId}` },
          { status: 400, headers: corsHeaders }
        );
      }
      if (product.stock < quantity) {
        return NextResponse.json(
          {
            error: `Insufficient stock for ${product.name}. Only ${product.stock} left.`,
          },
          { status: 409, headers: corsHeaders }
        );
      }

      prepared.push({
        productId: product.id,
        quantity,
        unitPrice: product.price,
        name: product.name,
        brand: product.brand,
      });
    }

    const total = prepared.reduce(
      (sum, item) => sum + item.unitPrice * item.quantity,
      0
    );

    const order = await prisma.$transaction(async (tx) => {
      const count = await tx.order.count();
      const orderNumber = `DRV-${1000 + count + 1}`;

      for (const item of prepared) {
        const product = await tx.product.findUnique({
          where: { id: item.productId },
        });
        if (!product || product.stock < item.quantity) {
          throw new Error(`Stock changed for ${item.name}`);
        }
        await tx.product.update({
          where: { id: item.productId },
          data: { stock: product.stock - item.quantity },
        });
        await tx.stockMovement.create({
          data: {
            productId: item.productId,
            delta: -item.quantity,
            reason: `Storefront order ${orderNumber}`,
          },
        });
      }

      return tx.order.create({
        data: {
          orderNumber,
          customerName,
          customerEmail,
          status: "confirmed",
          total,
          notes,
          items: {
            create: prepared.map((item) => ({
              productId: item.productId,
              quantity: item.quantity,
              unitPrice: item.unitPrice,
              name: item.name,
              brand: item.brand,
            })),
          },
        },
        include: { items: true },
      });
    });

    return NextResponse.json(
      {
        ok: true,
        order: {
          id: order.id,
          orderNumber: order.orderNumber,
          status: order.status,
          total: order.total,
          items: order.items,
        },
      },
      { status: 201, headers: corsHeaders }
    );
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Could not place order";
    return NextResponse.json(
      { error: message },
      { status: 500, headers: corsHeaders }
    );
  }
}
