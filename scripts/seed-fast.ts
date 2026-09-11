/**
 * Fast seed for Supabase — createMany in batches (skips existing SKUs).
 */
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const prisma = new PrismaClient();

// Re-use product list from main seed by evaluating the const array via regex extract is heavy;
// Instead import by running the compiled data: read seed.ts products JSON-like block.
// Simpler: dynamic import of seed products by spawning tsx eval — use createMany from seed file products.

type SeedProduct = {
  name: string;
  brand: string;
  sku: string;
  price: number;
  stock: number;
  category: string;
  lowStockAt?: number;
};

async function loadProducts(): Promise<SeedProduct[]> {
  const seedPath = join(dirname(fileURLToPath(import.meta.url)), "..", "prisma", "seed.ts");
  const text = readFileSync(seedPath, "utf8");
  const match = text.match(/const products = (\[[\s\S]*?\]) as const;/);
  if (!match) throw new Error("Could not parse products from seed.ts");
  return JSON.parse(match[1]) as SeedProduct[];
}

async function main() {
  const email = process.env.ADMIN_EMAIL || "admin@devert.store";
  const password = process.env.ADMIN_PASSWORD || "devert123";
  const name = process.env.ADMIN_NAME || "Devert Admin";
  const passwordHash = await bcrypt.hash(password, 10);

  await prisma.user.upsert({
    where: { email },
    update: { passwordHash, name },
    create: { email, name, passwordHash, role: "ADMIN" },
  });

  const products = await loadProducts();
  console.log("Seeding", products.length, "products…");

  const batchSize = 50;
  for (let i = 0; i < products.length; i += batchSize) {
    const batch = products.slice(i, i + batchSize).map((p) => ({
      name: p.name,
      brand: p.brand,
      sku: p.sku,
      price: p.price,
      stock: p.stock,
      category: p.category,
      lowStockAt: p.lowStockAt ?? 5,
      active: true,
    }));
    await prisma.product.createMany({ data: batch, skipDuplicates: true });
    console.log("batch", i / batchSize + 1, "/", Math.ceil(products.length / batchSize));
  }

  const count = await prisma.product.count({ where: { active: true } });
  console.log("Seeded admin:", email);
  console.log("Active products:", count);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
