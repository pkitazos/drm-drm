import { type Product } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { currencyFormatter } from "~/lib/currency";

export const ItemCard = ({ item }: { item: Product }) => {
  return (
    <Link href={`/products/${item.SKU_ID}`}>
      <div className="flex w-[175px] flex-col items-center overflow-hidden rounded-md shadow-md transition-transform hover:scale-110 ">
        <Image src={item.PictureMain} width={100} height={100} alt="product" />
        <div className="w-40">
          <h1 className="bold underline decoration-dotted">{item.ItemName}</h1>
          <h3>
            <span className="text-slate-500">from</span> {item.BrandName}
          </h3>
          <h2 className="text-slate-500">
            {currencyFormatter.format(item.SalesPrice)}
          </h2>
        </div>
      </div>
    </Link>
  );
};
