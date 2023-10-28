import { PrismaClient } from "@prisma/client";
import { ProductModel } from "@prisma/schemas";
import { z } from "zod";

const db = new PrismaClient();

async function main() {
  const gg_url = `https://www.guitarguitar.co.uk/hackathon/products/`;

  const productSchema = z.array(ProductModel);

  const data = productSchema.parse(
    await fetch(gg_url)
      .then((e) => e.json())
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-explicit-any
      .then((l) => l.filter((e: any) => e.BodyShape < 17)),
  );

  const chunkSize = 50;
  for (let i = 300; i < data.length; i += chunkSize) {
    const chunk = data.slice(i, i + chunkSize);
    try {
      await db.product.createMany({ data: chunk });
      console.log(i);
    } catch {
      console.log(`failed chunk ${i}`);
    }
  }

  console.log("booga");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    void db.$disconnect();
  });
