"use client";

import { type Role } from "@prisma/client";
import { ShoppingCart } from "lucide-react";
import { useCart } from "~/lib/cart-context";
import { cn } from "~/lib/utils";
import { CartCard } from "./cart-card";
import { Checkout } from "./checkout";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

export function Cart({
  userData: { LoyaltyLevel, addressId, Id },
}: {
  userData: {
    Id: number;
    addressId: string;
    avatar: string;
    LoyaltyLevel: number;
    role: Role;
  };
}) {
  const { contents } = useCart();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <ShoppingCart className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex h-full w-[500px] flex-col justify-between">
        <SheetHeader>
          <SheetTitle>Your Shopping Cart</SheetTitle>
          <SheetDescription>Make changes to your cart here</SheetDescription>
        </SheetHeader>
        <div
          className={cn("flex flex-col justify-start gap-3 overflow-y-scroll")}
        >
          {contents.map((product, i) => (
            <CartCard key={i} product={product} idx={i} />
          ))}
        </div>
        <Checkout
          loyalty={LoyaltyLevel}
          addressId={addressId}
          customerId={Id}
        />
      </SheetContent>
    </Sheet>
  );
}
