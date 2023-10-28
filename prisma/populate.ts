import { PrismaClient } from "@prisma/client";
import { ProductModel } from "@prisma/schemas";
import { z } from "zod";

const db = new PrismaClient();

const GG_URL = `https://www.guitarguitar.co.uk/hackathon/`;
const CHUNK_SIZE = 50;

async function add_products() {
  console.log("adding products");
  const productSchema = z.array(ProductModel);

  const data = productSchema.parse(
    await fetch(GG_URL + "products/").then((e) => e.json()),
  );

  for (let i = 0; i < data.length / CHUNK_SIZE; i += 1) {
    const chunk = data.slice(i * CHUNK_SIZE, i * CHUNK_SIZE + CHUNK_SIZE);
    try {
      await db.product.createMany({ data: chunk });
      console.log(i);
    } catch {
      console.log(`failed chunk ${i}`);
    }
  }

  console.log("finished adding products");
}

async function main() {
  await add_products();
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    void db.$disconnect();
  });
