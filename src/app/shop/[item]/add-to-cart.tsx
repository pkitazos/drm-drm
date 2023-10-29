"use client";
import { type Product } from "@prisma/client";
import toast from "react-hot-toast";
import { Button } from "~/components/ui/button";
import { useCart } from "~/lib/cart-context";

export function AddToCart({
  product,
  disabled,
}: {
  product: Product;
  disabled: boolean;
}) {
  const { add } = useCart();
  return (
    <Button
      size="lg"
      onClick={() => {
        add(product);
        toast.success("Added item to cart");
      }}
      disabled={disabled}
    >
      Add to cart
    </Button>
  );
}
