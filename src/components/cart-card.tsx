"use client";
import Image from "next/image";
import { Button } from "./ui/button";
import { type Product } from "@prisma/client";
import { currencyFormatter } from "~/lib/currency";

export function CartCard({
  product,
  idx,
  remove,
}: {
  product: Product;
  idx: number;
  remove: (idx: number) => void;
}) {
  return (
    <div className="flex items-center gap-5 rounded-md bg-accent px-5 py-3">
      <Image
        width={100}
        height={100}
        className="h-36 w-36 rounded-sm bg-white object-contain object-center p-4"
        src={product.PictureMain}
        alt={""}
      />
      <div className="flex w-60 flex-col items-start justify-between gap-7">
        <div className="flex flex-col items-start">
          <p className="text-lg">{product.ItemName}</p>
          <p className="">{currencyFormatter.format(product.SalesPrice)}</p>
          <p className="text-slate-500">{product.BrandName}</p>
        </div>
        <div className="flex gap-4">
          <Button
            size="sm"
            variant="link"
            className="text-destructive"
            onClick={() => remove(idx)}
          >
            Remove
          </Button>
        </div>
      </div>
    </div>
  );
}
