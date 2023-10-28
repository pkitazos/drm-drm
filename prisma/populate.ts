import { PrismaClient } from "@prisma/client";
import cliProgress from "cli-progress";
import {
  AddressModel,
  CustomerModel,
  ProductModel,
  OrderModel,
} from "@prisma/schemas";
import { z } from "zod";

const db = new PrismaClient();

const GG_URL = `https://www.guitarguitar.co.uk/hackathon/`;
const CHUNK_SIZE = 50;

function randomRange(start: number, end: number) {
  const r = end - start;
  return start + r * Math.random();
}

const cityMap: Record<string, [number, number]> = {};
const AddressModelWithRandomGeo = AddressModel.omit({
  id: true,
  lat: true,
  lon: true,
}).transform((addr) => {
  if (!cityMap[addr.city]) {
    cityMap[addr.city] = [randomRange(25, 48), randomRange(-124, -67)];
  }
  const [lat, lon] = cityMap[addr.city]!;

  return { ...addr, lat, lon };
});

async function add_products() {
  console.log("adding products");
  const productSchema = z.array(ProductModel);

  const data = productSchema.parse(
    await fetch(GG_URL + "products/").then((e) => e.json()),
  );

  console.log(`found ${data.length} products to add`);
  const bar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
  bar.start(20, 0);

  const errs = [];

  for (let i = 0; i < data.length / CHUNK_SIZE; i += 1) {
    const chunk = data.slice(i * CHUNK_SIZE, i * CHUNK_SIZE + CHUNK_SIZE);
    try {
      await db.product.createMany({ data: chunk });
    } catch {
      errs.push(i);
    }
    bar.increment();
  }

  bar.stop();

  console.log("finished adding products");
  if (errs.length) {
    console.error(`failed on chunks: [${errs.join(", ")}]`);
  }
}

async function add_customers() {
  console.log("adding customers");
  const customerSchema = z.array(
    CustomerModel.omit({ addressId: true })
      .extend({
        address: AddressModelWithRandomGeo,
      })
      .transform(({ address, ...rest }) => ({
        ...rest,
        address: { create: address },
      })),
  );

  const data = customerSchema.parse(
    await fetch(GG_URL + "customers/").then((e) => e.json()),
  );

  console.log(`found ${data.length} customers to add`);
  let i = 1;

  const bar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
  bar.start(data.length, 0);

  const errs = [];

  for (const customer of data) {
    try {
      await db.customer.create({ data: customer });
    } catch {
      errs.push(i);
    }
    bar.increment();
    i += 1;
  }
  bar.stop();

  console.log("finished adding customers");
  if (errs.length) {
    console.error(`failed on customers: [${errs.join(", ")}]`);
  }
}

async function add_orders() {
  console.log("adding orders");
  const orderSchema = z.array(
    OrderModel.omit({ addressId: true })
      .extend({
        ShippingAddress: AddressModelWithRandomGeo,
        Products: z.array(z.object({ SKU_ID: z.string() })),
      })
      .transform(({ ShippingAddress, CustomerId, Products, ...rest }) => ({
        ...rest,
        ShippingAddress: { create: ShippingAddress },
        Customer: { connect: { Id: CustomerId } },
        Products: { connect: Products },
      })),
  );

  const data = orderSchema.parse(
    await fetch(GG_URL + "orders/").then((e) => e.json()),
  );

  console.log(`found ${data.length} orders to add`);
  let i = 1;

  const bar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
  bar.start(data.length, 0);

  const errs = [];

  for (const order of data) {
    try {
      await db.order.create({ data: order });
    } catch {
      errs.push(i);
    }
    i += 1;
    bar.increment();
  }
  bar.stop();

  console.log("finished adding orders");

  if (errs.length) {
    console.error(`failed on orders: [${errs.join(", ")}]`);
  }
}

async function main() {
  // await add_products();
  await add_customers();
  await add_orders();
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    void db.$disconnect();
  });
