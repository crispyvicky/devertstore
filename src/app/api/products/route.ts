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

export async function GET(req: NextRequest) {
  const brand = req.nextUrl.searchParams.get("brand") || undefined;
  const q = req.nextUrl.searchParams.get("q") || undefined;

  const products = await prisma.product.findMany({
    where: {
      active: true,
      ...(brand
        ? { brand: { contains: brand } }
        : {}),
      ...(q
        ? {
            OR: [
              { name: { contains: q } },
              { sku: { contains: q } },
              { brand: { contains: q } },
            ],
          }
        : {}),
    },
    orderBy: [{ brand: "asc" }, { name: "asc" }],
  });

  return NextResponse.json(
    {
      count: products.length,
      products: products.map((p) => ({
        id: p.id,
        name: p.name,
        brand: p.brand,
        sku: p.sku,
        price: p.price,
        stock: p.stock,
        category: p.category,
        imageUrl: p.imageUrl,
        lowStockAt: p.lowStockAt,
        inStock: p.stock > 0,
      })),
    },
    { headers: corsHeaders }
  );
}
