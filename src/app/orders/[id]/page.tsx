import { CustomerCard } from "~/components/customer-card";
import { api } from "~/trpc/server";

export default async function Page({
  params: { id },
}: {
  params: { id: string };
}) {
  const order = await api.orders.getById.query({ id: parseInt(id) });
  const customer = await api.customers.getById.query({
    id: order.CustomerId,
  });

  return (
    <main className="flex flex-col">
      {/* <OrderStatusDisplay/> */}

      <CustomerCard customer={customer} withLink />
    </main>
  );
}
