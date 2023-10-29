import Image from "next/image";
import { type OrderPayload } from "~/app/(customer)/my-account/page";
import { currencyFormatter } from "~/lib/currency";
import { Button } from "./ui/button";
import Link from "next/link";
import { BuyAgain } from "./buy-again";

export function OrderCard({ orderPayload }: { orderPayload: OrderPayload }) {
  const orderProduct = orderPayload.Products[0]!;

  return (
    <div className="flex gap-6 rounded-md bg-accent px-6 py-4">
      <div className="flex w-1/5">
        <Image
          className="h-48 w-48 rounded-md bg-white object-contain object-center p-2"
          src={orderProduct.PictureMain}
          alt={""}
          width={100}
          height={100}
        />
      </div>
      <div className="flex w-4/5 flex-col justify-between">
        <div className="flex flex-col gap-2">
          <div className="flex justify-between">
            <h1 className="text-xl font-semibold">{orderProduct.ItemName}</h1>
            <p className="text-semibold">
              {currencyFormatter.format(orderProduct.SalesPrice)}
            </p>
          </div>
          {orderProduct.ProductDetail ? (
            <p
              className="text-slate-500"
              dangerouslySetInnerHTML={{ __html: orderProduct.ProductDetail }}
            />
          ) : (
            <p className="text-slate-500">No Product details available</p>
          )}
        </div>
        <div className="flex justify-end">
          <Button asChild variant="link">
            <Link href={`/shop/${orderProduct.SKU_ID}`}>view item</Link>
          </Button>
          <BuyAgain product={orderProduct} />
        </div>
      </div>
    </div>
  );
}
