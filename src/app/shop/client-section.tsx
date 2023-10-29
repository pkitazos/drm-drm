"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { type Product } from "@prisma/client";
import { ProductModel } from "@prisma/schemas";
import { z } from "Zod";
import { colours, pickups, shapes } from "prisma/helpers";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { ItemCard } from "~/components/item-card";
import { Button } from "~/components/ui/button";
import { Checkbox } from "~/components/ui/checkbox";
import { FormCombobox } from "~/components/ui/combobox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";

export default function ClientSection({ products }: { products: Product[] }) {
  const filterFormSchema = ProductModel.pick({
    Online: true,
    Colour: true,
    Pickup: true,
    BodyShape: true,
  })
    .extend({ minPrice: z.number(), maxPrice: z.number() })
    .partial();

  const form = useForm<z.infer<typeof filterFormSchema>>({
    resolver: zodResolver(filterFormSchema),
  });

  const data = form.watch();

  const filterFn = useCallback(
    (p: Product) => {
      const { BodyShape, Colour, Online, Pickup, maxPrice, minPrice } = data;

      if (Online !== undefined) if (p.Online !== Online) return false;
      if (maxPrice) if (p.SalesPrice > maxPrice) return false;
      if (minPrice) if (p.SalesPrice < minPrice) return false;
      if (BodyShape) if (p.BodyShape !== BodyShape) return false;
      if (Colour) if (p.Colour !== Colour) return false;
      if (Pickup) if (p.Pickup !== Pickup) return false;

      return true;
    },
    [data],
  );

  return (
    <div className="flex w-full flex-col pb-20">
      <Form {...form}>
        <Button onClick={() => form.reset()}>clear Form</Button>
        <FormField
          control={form.control}
          name="minPrice"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Min Price</FormLabel>
              <FormControl>
                <Input placeholder="..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="maxPrice"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Max Price</FormLabel>
              <FormControl>
                <Input placeholder="..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="Online"
          render={({ field }) => (
            <FormItem className="flex w-full items-center gap-3 pl-3">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div>
                <FormLabel>Online</FormLabel>
                <FormDescription>Can it be bought online</FormDescription>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex w-full flex-col items-start gap-6">
          <h2 className="mb-4 text-xl font-semibold">Variants</h2>
          <FormField
            control={form.control}
            name="Colour"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col">
                <FormLabel>Colour</FormLabel>
                <FormCombobox
                  field={field}
                  form={form}
                  options={colours.map((e) => ({ label: e, value: e }))}
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="Pickup"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col">
                <FormLabel>Pickup</FormLabel>
                <FormCombobox
                  field={field}
                  form={form}
                  options={pickups.map((e) => ({ label: e, value: e }))}
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="BodyShape"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col">
                <FormLabel>Shape</FormLabel>
                <FormCombobox
                  field={field}
                  form={form}
                  options={shapes.map((e) => ({ label: e, value: e }))}
                />
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </Form>
      <div className="grid grid-cols-4 gap-6">
        {products.filter(filterFn).map((product, i) => (
          <ItemCard key={i} item={product} />
        ))}
      </div>
    </div>
  );
}
