import { PrismaClient } from "@prisma/client";
import { ProductModel, CustomerModel, AddressModel } from "@prisma/schemas";
import { custom, z } from "zod";

const db = new PrismaClient();

const GG_URL = `https://www.guitarguitar.co.uk/hackathon/`;
const CHUNK_SIZE = 50;

async function add_products() {
  console.log("adding products");
  const productSchema = z.array(ProductModel);

  const data = productSchema.parse(
    await fetch(GG_URL + "products/").then((e) => e.json()),
  );

  console.log(`found ${data.length} products to add`);

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

async function add_customers() {
  console.log("adding customers");
  const customerSchema = z.array(
    CustomerModel.omit({ addressId: true })
      .extend({
        address: AddressModel.omit({ id: true }),
      })
      .transform(({ address, ...rest }) => ({
        ...rest,
        address: { create: address },
      })),
  );

  const data = customerSchema.parse(
    await fetch(GG_URL + "customers/").then((e) => e.json()),
  );

  data[0]!.address;

  console.log(`found ${data.length} customers to add`);
  let i = 1;
  for (const customer of data) {
    try {
      await db.customer.create({ data: customer });
      console.log(`added chunk ${i}`);
    } catch {
      console.log(`failed chunk ${i}`);
    }
    i += 1;
  }

  console.log("finished adding customers");
}

async function main() {
  // await add_products();
  await add_customers();
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    void db.$disconnect();
  });
