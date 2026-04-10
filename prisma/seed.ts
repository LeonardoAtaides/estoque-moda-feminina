import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const sizes = ["PP","P", "M", "G", "EG" , "EEG"];

  for (const name of sizes) {
    const exists = await prisma.size.findFirst({
      where: { name },
    });

    if (!exists) {
      await prisma.size.create({
        data: { name },
      });
    }
  }

  const categories = [
    "Vestido",
    "Blusa",
    "Calça",
    "Saia",
    "Shorts",
    "Peça Íntima",
  ];

  for (const name of categories) {
    const exists = await prisma.category.findFirst({
      where: { name },
    });

    if (!exists) {
      await prisma.category.create({
        data: { name },
      });
    }
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());