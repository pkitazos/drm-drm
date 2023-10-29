import { AddressCard } from "~/components/address-card";
import { CustomerCard } from "~/components/customer-card";
import { Separator } from "~/components/ui/separator";
import { api } from "~/trpc/server";
import { ClientSection } from "./client-section";

export default async function Page({
  params: { id },
}: {
  params: { id: string };
}) {
  const userData = await api.customers.getById.query({ id: parseInt(id) });
  const userOrders = await api.orders.getByUserId.query({
    CustomerId: parseInt(id),
  });

  const address = await api.addresses.getById.query({ id: userData.addressId });

  return (
    <main className="grid place-items-center">
      <section className="flex w-full justify-center gap-16">
        <CustomerCard customer={userData} />
        <div className="mt-8 flex flex-col gap-6">
          <div className="rounded-md bg-accent p-5 shadow-md">
            <p>
              <span className="font-semibold">Email:</span> {userData.email}
            </p>
            <p>
              <span className="font-semibold">Phone:</span>{" "}
              {userData.phone_number}
            </p>
          </div>
          <AddressCard address={address} />
        </div>
      </section>
      <Separator className="my-5 mt-10" />
      <ClientSection orderData={userOrders} />
    </main>
  );
}
