import React from "react";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { signIn, signOut } from "next-auth/react";
import { CartCard } from "./cart-card";
import { Checkout } from "./checkout";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { cn } from "~/lib/utils";

export const AuthButton = async () => {
  const session = await getServerAuthSession();
  if (session) {
    const userId = session?.user.id;
    const data = await api.users.getIcon.query({ id: userId ?? "" });
    return (
      <div className="flex gap-2">
        <Avatar>
          <AvatarImage src={data?.UserLinking[0]?.customer.avatar} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <Button
          variant="outline"
          size="icon"
          className="h-10 w-20"
          onClick={() => signOut()}
        >
          Sign Out
        </Button>
      </div>
    );
  }
  return (
    <Button
      variant="outline"
      size="icon"
      className="h-10 w-20"
      onClick={() => signIn()}
    >
      Sign in
    </Button>
  );
};

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
