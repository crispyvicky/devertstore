import { NextRequest, NextResponse } from "next/server";
import { getRecommendations } from "@/lib/recommendations";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const productId = req.nextUrl.searchParams.get("productId") || undefined;
  const limit = Number(req.nextUrl.searchParams.get("limit") || 6);
  const sessionId = req.nextUrl.searchParams.get("sessionId");

  if (productId) {
    await prisma.recommendationEvent.create({
      data: {
        productId,
        sessionId: sessionId || undefined,
        eventType: "recommend_request",
      },
    });
  }

  const recommendations = await getRecommendations({ productId, limit });
  return NextResponse.json({
    seedProductId: productId || null,
    count: recommendations.length,
    recommendations,
  });
}
