"use client";
import { type Product } from "@prisma/client";
import { type ReactNode, createContext, useContext, useState } from "react";

interface cardContextType {
  contents: Product[];
  add: (product: Product) => void;
  remove: (idx: number) => void;
  clearCart: () => void;
}

const cartContext = createContext<cardContextType>({
  contents: [],
  add: () => {
    return;
  },
  remove: () => {
    return;
  },
  clearCart: () => {
    return;
  },
});

export const CartContextProvider = ({ children }: { children: ReactNode }) => {
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);

  const add = (product: Product) => {
    setSelectedProducts((prev) => [...prev, product]);
  };

  const remove = (idx: number) => {
    setSelectedProducts((prev) => prev.filter((_, i) => i !== idx));
  };

  const clearCart = () => setSelectedProducts([]);

  return (
    <cartContext.Provider
      value={{ add, remove, clearCart, contents: selectedProducts }}
    >
      {children}
    </cartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(cartContext);
};
