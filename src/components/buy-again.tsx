"use client";
import { type Product } from "@prisma/client";
import toast from "react-hot-toast";
import { Button } from "~/components/ui/button";
import { useCart } from "~/lib/cart-context";

export function BuyAgain({ product }: { product: Product }) {
  const { add } = useCart();
  return (
    <Button
      variant="outline"
      onClick={() => {
        add(product);
        toast.success("Added item to cart");
      }}
    >
      Buy Again
    </Button>
  );
}
