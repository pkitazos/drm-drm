import { ItemCard } from "~/components/item-card";
import { api } from "~/trpc/server";

export default async function Page() {
  const products = await api.products.getAll.query({ page: 1 });
  return (
    <div className="flex w-full flex-col pb-20">
      <div className="grid grid-cols-4 gap-6">
        {products.map((product, i) => (
          <ItemCard key={i} route="shop" item={product} />
        ))}
      </div>
    </div>
  );
}
