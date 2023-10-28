import { api } from "~/trpc/server";
import { ClientSection } from "./client-section";
import Image from "next/image";
import { Separator } from "~/components/ui/separator";
import { Loyalty } from "~/components/loyalty";
import { AddressDisplay } from "~/components/address-display";

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
        <div className="flex flex-col justify-center">
          <Image
            src={userData.avatar}
            width={300}
            height={300}
            alt="user Avatar"
            className="rounded-full border shadow-md"
          />
          <h1 className="mt-2 text-center text-2xl font-bold">
            {userData.first_name} {userData.last_name}
          </h1>
          <Loyalty level={userData.LoyaltyLevel} />
        </div>
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
          <AddressDisplay address={address} />
        </div>
      </section>
      <Separator className="my-5 mt-10" />
      <ClientSection orderData={userOrders} />
    </main>
  );
}
