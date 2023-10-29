"use client";
import { useCart } from "~/lib/cart-context";
import { currencyFormatter } from "~/lib/currency";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { api } from "~/trpc/react";
import toast from "react-hot-toast";

export function Checkout() {
  const { mutateAsync } = api.orders.create.useMutation();

  const { contents, clearCart } = useCart();

  const subtotal = contents
    .map(({ SalesPrice }) => SalesPrice)
    .reduce((acc, val) => acc + val, 0);

  const discount = 0.95;
  //   1 - 5% off guitar only products
  //   2 - 10% off guitar and guitar accessory products
  //   3 - 10% off all products and and free delivery

  const shipping = subtotal ? 10 : 0;

  const total = subtotal ? subtotal * discount + shipping : 0;

  return (
    <div className="flex flex-col gap-3 rounded-md bg-accent px-5 py-3">
      <h3 className="mb-4 text-xl">Order Summary</h3>
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-500">Subtotal</p>
        <p className="text-sm">{currencyFormatter.format(subtotal)}</p>
      </div>
      <Separator />
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-500">Discount</p>
        <p className="text-sm">{currencyFormatter.format(discount)}</p>
      </div>
      <Separator />
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-500">Shipping</p>
        <p className="text-sm">{currencyFormatter.format(shipping)}</p>
      </div>
      <Separator />
      <div className="flex items-center justify-between">
        <p>Order total</p>
        <p>{currencyFormatter.format(total)}</p>
      </div>
      <Button
        className="mt-4 w-full"
        size="lg"
        onClick={() => {
          void toast.promise(
            mutateAsync({
              OrderTotal: total,
              addressId: "yes", //TODO these need real values
              CustomerId: 12, //TODO these need real values
              products: contents,
            }).then(() => clearCart()),
            {
              error: "something went wrong",
              loading: "processing",
              success: "checkout complete!",
            },
          );
        }}
      >
        Checkout
      </Button>
    </div>
  );
}
