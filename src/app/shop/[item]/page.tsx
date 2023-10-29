import Image from "next/image";
import { Badge } from "~/components/ui/badge";
import { Separator } from "~/components/ui/separator";
import { currencyFormatter } from "~/lib/currency";
import { api } from "~/trpc/server";
import { AddToCart } from "./add-to-cart";

export default async function Page({ params }: { params: { item: string } }) {
  const product = await api.products.getById.query({ id: params.item });

  return (
    <div className="flex gap-8">
      <div className="flex w-1/2 items-center justify-center">
        <Image
          className="h-[32rem] w-[32rem] bg-white object-contain object-center"
          src={product.PictureMain}
          alt={""}
          width={300}
          height={300}
        />
      </div>
      <div className="flex h-[32rem] w-96 flex-col">
        <div className="flex flex-col justify-between ">
          <div className="mb-5 flex flex-col gap-3">
            <h1 className="text-2xl font-semibold">{product.ItemName}</h1>
            <h2 className="text-lg text-slate-700">{product.BrandName}</h2>
            <p className="text-2xl">
              {currencyFormatter.format(product.SalesPrice)}
            </p>
            {product.ProductDetail ? (
              <p
                className="text-slate-500"
                dangerouslySetInnerHTML={{ __html: product.ProductDetail }}
              />
            ) : (
              <p className="text-slate-500">No Product details available</p>
            )}
          </div>
          <AddToCart product={product} />
        </div>
        <div className="flex flex-col gap-3">
          <Separator className="my-10" />
          <Badge className="w-fit">{product.Colour}</Badge>
          <Badge className="w-fit">{product.Pickup}</Badge>
          <Badge className="w-fit">{product.BodyShape}</Badge>
        </div>
      </div>
    </div>
  );
}
