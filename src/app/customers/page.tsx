import { api } from "~/trpc/server";
import { ClientSection } from "./client-section";

export default async function Page() {
  const data = await api.customers.getAll.query({ page: -1 });
  return (
    <main className="flex h-[88dvh] justify-center px-16 pt-6">
      <ClientSection customerData={data} />
    </main>
  );
}
