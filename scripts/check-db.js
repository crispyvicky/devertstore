const { PrismaClient } = require("@prisma/client");
const p = new PrismaClient();
p.product
  .count()
  .then((c) => {
    console.log("products", c);
    return p.user.count();
  })
  .then((u) => console.log("users", u))
  .catch((e) => console.error("DBERR", e.message))
  .finally(() => p.$disconnect());
