const { PrismaClient } = require("@prisma/client");
const p = new PrismaClient();

async function main() {
  const r1 = await p.product.updateMany({
    where: {
      OR: [
        { name: { contains: "Cartier" } },
        { name: { contains: "Panthère" } },
        { name: { contains: "Panthere" } },
        { name: { contains: "Juste un Clou" } },
        { name: { contains: "Trinity" } },
        { name: { contains: "LOVE" } },
        { name: { contains: "Love ring" } },
        { name: { contains: "Tank" } },
        { name: { contains: "Declaration" } },
        { name: { contains: "Pasha" } },
        { name: { contains: "Santos" } },
        { name: { contains: "Clash de Cartier" } },
      ],
    },
    data: { brand: "Cartier" },
  });
  console.log("updated to Cartier:", r1.count);
  const sample = await p.product.findMany({
    where: { brand: "Cartier" },
    take: 8,
    select: { name: true, brand: true, price: true, stock: true },
  });
  console.log(sample);
}

main()
  .catch((e) => console.error(e))
  .finally(() => p.$disconnect());
