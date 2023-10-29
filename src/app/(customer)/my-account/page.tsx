import { type Order, type Product } from "@prisma/client";
import { AddressCard } from "~/components/address-card";
import { CustomerCard } from "~/components/customer-card";
import { OrderCard } from "~/components/order-card";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";

export type OrderPayload = Order & { Products: Product[] };

export default async function Page() {
  const session = await getServerAuthSession();
  const userId = session?.user.id;

  const { UserLinking } = await api.users.getLoyalty.query({ id: userId! });

  const customer = await api.customers.getById.query({
    id: UserLinking[0]!.customer.Id,
  });

  const orders = await api.orders.getByUserId.query({
    CustomerId: customer.Id,
  });
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
