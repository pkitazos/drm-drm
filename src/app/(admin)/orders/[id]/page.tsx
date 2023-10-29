import { format } from "date-fns";
import { AddressCard } from "~/components/address-card";
import { CustomerCard } from "~/components/customer-card";
import { ItemCard } from "~/components/item-card";
import { Separator } from "~/components/ui/separator";
import { currencyFormatter } from "~/lib/currency";
import { api } from "~/trpc/server";
import { OrderStatusDisplay } from "./order-status-display";

export default async function Page({
  params: { id },
}: {
  params: { id: string };
}) {
  const order = await api.orders.getById.query({ id: parseInt(id) });
  const address = await api.addresses.getById.query({ id: order.addressId });
  const customer = await api.customers.getById.query({
    id: order.CustomerId,
  });

  return (
    <main className="flex flex-col items-center justify-center">
      <div className="mb-8 mt-3 w-3/5">
        <OrderStatusDisplay status={order.OrderStatus} />
      </div>

      <section className="flex flex-row justify-around gap-10">
        <div className="flex flex-col gap-8">
          <div className="mt-8 rounded-md bg-accent p-5 shadow-md">
            <h1>
              <span className="font-semibold">Order Placed On:</span>{" "}
              {format(order.DateCreated, "PPP")}
            </h1>
            <h2>
              <span className="font-semibold">Total:</span>{" "}
              {currencyFormatter.format(order.OrderTotal)}
            </h2>
          </div>
          <AddressCard address={address} />
        </div>
        <CustomerCard customer={customer} withLink />
      </section>
      <Separator className="my-5" />
      <ul>
        {order.Products.map((product, i) => (
          <ItemCard route="products" item={product} key={i} />
        ))}
      </ul>
    </main>
  );
}
