"use client";
import { Music, ShoppingCart } from "lucide-react";
import { useCart } from "~/lib/cart-context";
import { Breadcrumbs } from "./breadcrumbs";
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
import { cn } from "~/lib/utils";

export default function Header() {
  return (
    <header className="fixed left-14 top-0 z-50 flex h-[14dvh] w-[calc(100%-3.5rem)] justify-between bg-background px-7 pt-3">
      <div className="flex flex-col items-start justify-center gap-2">
        <Breadcrumbs />
        <div className="flex items-center gap-3">
          <Music className="stroke-[3] text-orange-500" />
          <h1 className="text-2xl font-semibold">drum-drum</h1>
        </div>
      </div>
      <Cart />
    </header>
  );
}

function Cart() {
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
          className={cn(
            "flex flex-col justify-start gap-3",
            contents.length >= 3 && "overflow-y-scroll",
          )}
        >
          {contents.map((product, i) => (
            <CartCard key={i} product={product} idx={i} />
          ))}
        </div>
        <Checkout />
      </SheetContent>
    </Sheet>
  );
}
