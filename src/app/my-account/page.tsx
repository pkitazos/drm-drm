import { type Order, type Product } from "@prisma/client";
import { AddressCard } from "~/components/address-card";
import { CustomerCard } from "~/components/customer-card";
import { OrderCard } from "~/components/order-card";
import { api } from "~/trpc/server";

export type OrderPayload = Order & { Products: Product[] };

export default async function Page() {
  const userId = 61;

  const customer = await api.customers.getById.query({ id: userId });
  const orders = await api.orders.getByUserId.query({ CustomerId: userId });
  const address = await api.addresses.getById.query({ id: customer.addressId });

  return (
    <div className="flex w-full flex-col justify-center">
      <div className="flex w-full items-center justify-center gap-12">
        <CustomerCard customer={customer} />
        <div className="-mt-6 w-96">
          <AddressCard address={address} />
        </div>
      </div>
      <div className="mt-24 flex w-full flex-col gap-6">
        {orders.map((order, i) => (
          <OrderCard key={i} orderPayload={order} />
        ))}
      </div>
    </div>
  );
}
