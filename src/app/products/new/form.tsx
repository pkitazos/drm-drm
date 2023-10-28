"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProductModel } from "@prisma/schemas";
import { colours, pickups, shapes } from "prisma/helpers";
import { useForm } from "react-hook-form";
import { type z } from "zod";

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
import { api } from "~/trpc/react";
import { FormDropzone } from "~/components/ui/form-dropzone";

export default function CreateProductForm() {
  const form = useForm<z.infer<typeof ProductModel>>({
    resolver: zodResolver(ProductModel),
  });

  const { mutateAsync } = api.products.create.useMutation();

  const onSubmit = form.handleSubmit((productData) => {
    void mutateAsync({ data: productData });
  });

  return (
    <Form {...form}>
      <form onSubmit={onSubmit}>
        <FormField
          control={form.control}
          name="PictureMain"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Main Picture</FormLabel>
              <FormControl>
                <FormDropzone
                  value={field.value}
                  submit={(url) => form.setValue("PictureMain", url)}
                />
              </FormControl>
              <FormDescription>A picture of the item</FormDescription>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="SKU_ID"
          render={({ field }) => (
            <FormItem>
              <FormLabel>SKU ID</FormLabel>
              <FormControl>
                <Input placeholder="..." {...field} />
              </FormControl>
              <FormDescription>An ID for the product</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="ItemName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Item Name</FormLabel>
              <FormControl>
                <Input placeholder="..." {...field} />
              </FormControl>
              <FormDescription>The name of this item</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="ASN"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ASN</FormLabel>
              <FormControl>
                <Input placeholder="..." {...field} />
              </FormControl>
              <FormDescription>
                A global unique identifier (GTIN)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="Category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormControl>
                <Input placeholder="..." {...field} />
              </FormControl>
              <FormDescription>
                The category code for the type of this item
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="Online"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Online</FormLabel>
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormDescription>
                The category code for the type of this item
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="BrandName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Brand Name</FormLabel>
              <FormControl>
                <Input placeholder="..." {...field} />
              </FormControl>
              <FormDescription>The brand name of the product</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="Description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder="..." {...field} />
              </FormControl>
              <FormDescription>
                HTML Formatted description (nullable)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="ProductDetail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Detail</FormLabel>
              <FormControl>
                <Input placeholder="..." {...field} />
              </FormControl>
              <FormDescription>
                HTML Formatted product detail (nullable)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="SalesPrice"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sales Price</FormLabel>
              <FormControl>
                <Input placeholder="..." {...field} />
              </FormControl>
              <FormDescription>Sales price of the item</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="QtyInStock"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Quantity in Stock</FormLabel>
              <FormControl>
                <Input placeholder="..." {...field} />
              </FormControl>
              <FormDescription>Number of the item in stock</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="QtyOnOrder"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Quantity on Order</FormLabel>
              <FormControl>
                <Input placeholder="..." {...field} />
              </FormControl>
              <FormDescription>Number of the item on order</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="QtyOnOrder"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Quantity on Order</FormLabel>
              <FormControl>
                <Input placeholder="..." {...field} />
              </FormControl>
              <FormDescription>Number of the item on order</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="Colour"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Colour</FormLabel>
              <FormCombobox
                field={field}
                form={form}
                options={colours.map((e) => ({ label: e, value: e }))}
              />
              <FormDescription>Colour of the item</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="Pickup"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Pickup</FormLabel>
              <FormCombobox
                field={field}
                form={form}
                options={pickups.map((e) => ({ label: e, value: e }))}
              />
              <FormDescription>Pickup in the item</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="BodyShape"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Shape</FormLabel>
              <FormCombobox
                field={field}
                form={form}
                options={shapes.map((e) => ({ label: e, value: e }))}
              />
              <FormDescription>Shape of the item&apos;s body</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
