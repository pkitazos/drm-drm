import { api } from "~/trpc/server";
import UpdateProductForm from "./update-product-form";

export default async function Page({
  params: { id },
}: {
  params: { id: string };
}) {
  const data = await api.products.getById.query({ id });
  return (
    <main className="flex flex-col items-center justify-center px-10">
      <div className="w-4/6">
        <div className="flex w-full justify-start">
          <h1 className="mb-8 text-4xl font-semibold">Edit product</h1>
        </div>
        <UpdateProductForm productData={data} />
      </div>
    </main>
  );
}
