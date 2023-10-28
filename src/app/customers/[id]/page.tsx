import { api } from "~/trpc/server";
import { ClientSection } from "./client-section";
import Image from "next/image";
import { Separator } from "~/components/ui/separator";
import { Loyalty } from "~/components/loyalty";

export default async function Page({
  params: { id },
}: {
  params: { id: string };
}) {
  const userData = await api.customers.getById.query({ id: parseInt(id) });
  const userOrders = await api.orders.getByUserId.query({
    CustomerId: parseInt(id),
  });

  return (
    <main className="grid h-[88dvh] place-items-center">
      <section className="flex w-full justify-between">
        <div className="flex flex-col justify-center">
          <Image
            src={userData.avatar}
            width={300}
            height={300}
            alt="user Avatar"
            className="rounded-full border"
          />
          <h1 className="text-center">
            {userData.first_name} {userData.last_name}
          </h1>
          <Loyalty level={userData.LoyaltyLevel} />
        </div>
        <div></div>
        <div>
          Email: <p>{userData.email}</p>
          Phone: <p>{userData.phone_number}</p>
        </div>
      </section>
      <Separator className="my-5 mt-10" />
      <ClientSection orderData={userOrders} />
    </main>
  );
}
