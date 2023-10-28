import { api } from "~/trpc/server";
import CreateProductForm from "./create-product-form";

export default async function Page({
  params: { id },
}: {
  params: { id: string };
}) {
  const data = await api.products.getById.query({ id });
  return (
    <main className="mt-[12dvh] flex h-[80dvh] flex-col items-center justify-center px-10">
      <div className="w-4/6">
        <div className="flex w-full justify-start">
          <h1 className="mb-8 text-4xl font-semibold">Edit product</h1>
        </div>
        <CreateProductForm productData={data} />
      </div>
    </main>
  );
}
