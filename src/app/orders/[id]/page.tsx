import { format } from "date-fns";
import { AddressCard } from "~/components/address-card";
import { CustomerCard } from "~/components/customer-card";
import { ItemCard } from "~/components/item-card";
import { Separator } from "~/components/ui/separator";
import { currencyFormatter } from "~/lib/currency";
import { api } from "~/trpc/server";

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
    <main className="flex flex-col">
      {/* <OrderStatusDisplay/> */}
      <section className="flex flex-row justify-around">
        <div>
          <h1>
            <span>Order Placed On</span> {format(order.DateCreated, "PPP")}
          </h1>
          <h2>
            <span>Total</span> {currencyFormatter.format(order.OrderTotal)}
          </h2>
          <AddressCard address={address} />
        </div>
        <CustomerCard customer={customer} withLink />
      </section>
      <Separator className="my-5" />
      <ul>
        {order.Products.map((product, i) => (
          <ItemCard item={product} key={i} />
        ))}
      </ul>
    </main>
  );
}
