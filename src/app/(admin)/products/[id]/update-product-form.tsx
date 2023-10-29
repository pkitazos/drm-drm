/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { type Product } from "@prisma/client";
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
import { FormDropzone } from "~/components/ui/form-dropzone";
import { Input } from "~/components/ui/input";
import { Separator } from "~/components/ui/separator";
import { api } from "~/trpc/react";

export default function UpdateProductForm({
  productData,
}: {
  productData: Product;
}) {
  const form = useForm<z.infer<typeof ProductModel>>({
    resolver: zodResolver(ProductModel),
    defaultValues: productData,
  });

  const { mutateAsync } = api.products.update.useMutation();

  const onSubmit = form.handleSubmit((productData) => {
    void mutateAsync({ data: productData });
  });

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="flex flex-col items-center">
        <div className="flex w-full gap-6">
          <div className="flex w-full basis-1/3 items-center ">
            <FormField
              control={form.control}
              name="PictureMain"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <FormDropzone
                      className="h-64 w-64"
                      value={field.value}
                      submit={(url) => form.setValue("PictureMain", url)}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <div className="flex w-full basis-2/3 flex-col gap-4">
            <div className="flex w-full gap-3">
              <FormField
                control={form.control}
                name="ItemName"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Item Name</FormLabel>
                    <FormControl>
                      <Input placeholder="..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="BrandName"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Brand Name</FormLabel>
                    <FormControl>
                      <Input placeholder="..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex w-full gap-3">
              <FormField
                control={form.control}
                name="SKU_ID"
                render={({ field }) => (
                  <FormItem className="w-full">
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
                name="ASN"
                render={({ field }) => (
                  <FormItem className="w-full">
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
            </div>
            <FormField
              control={form.control}
              name="Category"
              render={({ field }) => (
                <FormItem className="w-full">
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
          </div>
        </div>
        <Separator className="my-14" />
        <div className="flex w-full gap-6">
          <div className="flex w-1/2 flex-col gap-3">
            <h2 className="mb-6 text-xl font-semibold">Inventory Details</h2>
            <div className="flex items-center gap-3">
              <FormField
                control={form.control}
                name="SalesPrice"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Sales Price</FormLabel>
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
            </div>

            <FormField
              control={form.control}
              name="QtyInStock"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Quantity in Stock</FormLabel>
                  <FormControl>
                    <Input placeholder="..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="QtyOnOrder"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Quantity on Order</FormLabel>
                  <FormControl>
                    <Input placeholder="..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex w-1/2 justify-end">
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
          </div>
        </div>
        <Separator className="my-16" />
        <div className="flex w-full flex-col gap-6">
          <FormField
            control={form.control}
            name="Description"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Description</FormLabel>
                <FormControl>
                  {/* @ts-ignore */}
                  <Input className="h-40" placeholder="..." {...field} />
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
              <FormItem className="h-60 w-full">
                <FormLabel>Product Detail</FormLabel>
                <FormControl>
                  {/* @ts-ignore */}
                  <Input className="h-40" placeholder="..." {...field} />
                </FormControl>
                <FormDescription>
                  HTML Formatted product detail (nullable)
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex w-full justify-end">
          <Button size="lg" type="submit">
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
}
