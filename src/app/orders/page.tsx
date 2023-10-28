import { api } from "~/trpc/server";
import { ClientSection } from "./client-section";

export default async function Page() {
  const data = await api.orders.getAll.query({ page: -1 });
  return (
    <main className="flex h-[86dvh] justify-center px-16 pt-6">
      <ClientSection orderData={data} />
    </main>
  );
}
