"use client";
import toast from "react-hot-toast";
import { useCart } from "~/lib/cart-context";
import { currencyFormatter } from "~/lib/currency";
import { api } from "~/trpc/react";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";

export function Checkout({
  loyalty,
  customerId,
  addressId,
}: {
  loyalty: number;
  customerId: number;
  addressId: string;
}) {
  const { mutateAsync } = api.orders.create.useMutation();

  const { contents, clearCart } = useCart();

  const products = contents.map((items) => {
    return { SKU_ID: items.SKU_ID };
  });

  const subtotal = contents
    .map(({ SalesPrice }) => SalesPrice)
    .reduce((acc, val) => acc + val, 0);

  const getDiscount = (loyalty: number) => {
    if (loyalty == 0) {
      return 0;
    } else if (loyalty == 1) {
      return contents
        .filter((item) => item.Category.startsWith("GU"))
        .map(({ SalesPrice }) => SalesPrice * 0.05)
        .reduce((acc, val) => acc + val, 0);
    } else if (loyalty == 2) {
      return contents
        .filter(
          (item) =>
            item.Category.startsWith("GU") || item.Category.startsWith("AC"),
        )
        .map(({ SalesPrice }) => SalesPrice * 0.1)
        .reduce((acc, val) => acc + val, 0);
    } else {
      return contents
        .map(({ SalesPrice }) => SalesPrice * 0.1)
        .reduce((acc, val) => acc + val, 0);
    }
  };

  const discount = getDiscount(loyalty);

  const shipping = subtotal ? 10 : 0;

  const total = subtotal - discount + shipping;

  const handleSubmit = async () => {
    await toast.promise(
      mutateAsync({
        CustomerId: customerId,
        products: products,
        OrderTotal: total,
        addressId: addressId,
      }).then(() => {
        clearCart();
      }),
      {
        success: "Order placed!",
        error: "plum plum",
        loading: "Loading...",
      },
    );
  };

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
      <Button className="mt-4 w-full" size="lg" onClick={handleSubmit}>
        Checkout
      </Button>
    </div>
  );
}
