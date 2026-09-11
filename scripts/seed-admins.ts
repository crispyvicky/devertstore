/**
 * Upsert 3 staff admin accounts. Run: npx tsx scripts/seed-admins.ts
 * Does NOT print passwords to logs in CI — see chat / team lead for credentials.
 */
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

/** Three distinct staff logins — keep private (not shown on /login UI). */
const STAFF = [
  {
    email: "ops@devert.store",
    name: "Operations Admin",
    password: "OpsMaison#9182",
  },
  {
    email: "curator@devert.store",
    name: "Salon Curator",
    password: "CurateLive#4471",
  },
  {
    email: "lead@devert.store",
    name: "Atelier Lead",
    password: "LeadAtelier#6630",
  },
] as const;

async function main() {
  for (const u of STAFF) {
    const passwordHash = await bcrypt.hash(u.password, 10);
    await prisma.user.upsert({
      where: { email: u.email },
      update: { passwordHash, name: u.name, role: "ADMIN" },
      create: {
        email: u.email,
        name: u.name,
        passwordHash,
        role: "ADMIN",
      },
    });
    console.log("Upserted admin:", u.email);
  }

  // Disable well-known demo account if it still exists
  const demo = await prisma.user.findUnique({
    where: { email: "admin@devert.store" },
  });
  if (demo) {
    const locked = await bcrypt.hash(`disabled-${Date.now()}-x9`, 10);
    await prisma.user.update({
      where: { email: "admin@devert.store" },
      data: { passwordHash: locked, name: "Disabled Demo" },
    });
    console.log("Locked legacy demo account: admin@devert.store");
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
