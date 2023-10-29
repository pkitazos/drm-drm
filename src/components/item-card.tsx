import { type Product } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { currencyFormatter } from "~/lib/currency";

export const ItemCard = ({ item }: { item: Product }) => {
  return (
    <Link href={`/products/${item.SKU_ID}`}>
      <div className="flex h-[30rem] w-60 flex-col items-center justify-between overflow-hidden rounded-md py-6 outline outline-slate-200 transition-transform hover:scale-[1.03] ">
        <Image
          src={item.PictureMain}
          width={100}
          height={200}
          alt="product"
          className="h-72 w-40 object-contain object-center"
        />
        <div className="flex h-32 w-56 flex-col justify-between px-4 py-2">
          <div className="flex flex-col">
            <h1 className="text-lg font-semibold">{item.ItemName}</h1>
            <h3>
              <span className="text-slate-500">from</span> {item.BrandName}
            </h3>
          </div>
          <h2 className="text-lg text-slate-500">
            {currencyFormatter.format(item.SalesPrice)}
          </h2>
        </div>
      </div>
    </Link>
  );
};
