import { api } from "~/trpc/server";
import CreateProductForm from "./create-product-form";

export default async function Page({
  params: { id },
}: {
  params: { id: string };
}) {
  const data = await api.products.getById.query({ id });
  return (
    <main className="flex h-[80dvh] items-center justify-center px-10">
      <CreateProductForm productData={data} />
    </main>
  );
}
