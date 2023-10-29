import { api } from "~/trpc/server";
import ClientSection from "./client-section";

export default async function Page() {
  const products = await api.products.getAll.query({ page: 1 });
  return <ClientSection products={products} />;
}
