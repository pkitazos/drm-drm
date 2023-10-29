"use client";
import { useCart } from "~/lib/cart-context";
import { currencyFormatter } from "~/lib/currency";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { useSession } from "next-auth/react";
import { api } from "~/trpc/react";

export function Checkout() {
  const { contents } = useCart();
  const { data } = useSession();
  const { data: loyaltyData } = api.users.getLoyalty.useQuery({
    // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
    id: data?.user.id!,
  });

  const loyalty = loyaltyData?.UserLinking[0]?.customer.LoyaltyLevel;

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

  const discount = getDiscount(loyalty!);

  const shipping = subtotal ? 10 : 0;

  const total = subtotal - discount + shipping;

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
      <Button className="mt-4 w-full" size="lg">
        Checkout
      </Button>
    </div>
  );
}
