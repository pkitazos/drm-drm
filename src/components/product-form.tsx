"use client";

import { type Product } from "@prisma/client";
import { useForm } from "react-hook-form";
import { colours, pickups, shapes } from "../../prisma/helpers";
import { api } from "../trpc/react";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";

export const ProductForm = () => {
  const { mutate } = api.products.create.useMutation();

  const { register, handleSubmit } = useForm<Product>();
  const onSubmit = handleSubmit((productData) => {
    // console.log({ data: productData });
    mutate({ data: productData });
  });

  return (
    <form onSubmit={onSubmit}>
      <div className="flex items-center">
        <div>
          <Label>ASN</Label>
          <input {...register("ASN", { required: true })} />
        </div>
        <div>
          <Label>Category</Label>
          <input {...register("Category", { required: true })} />
        </div>
        <div className="flex flex-col gap-2">
          <Label>Online</Label>
          <Checkbox {...register("Online")} />
        </div>
      </div>
      <div>
        <Label>ItemName</Label>
        <input {...register("ItemName", { required: true })} />
      </div>
      <div>
        <Label>BrandName</Label>
        <input {...register("BrandName", { required: true })} />
      </div>
      <div>
        <Label>Description</Label>
        <input {...register("Description")} />
      </div>
      <div>
        <Label>ProductDetail</Label>
        <input {...register("ProductDetail")} />
      </div>
      <div className="flex">
        <div>
          <Label>SalesPrice</Label>
          <input {...register("SalesPrice", { required: true })} />
        </div>
        <div>
          <Label>QtyInStock</Label>
          <input {...register("QtyInStock", { required: true })} />
        </div>
        <div>
          <Label>QtyOnOrder</Label>
          <input {...register("QtyOnOrder", { required: true })} />
        </div>
      </div>
      <div className="flex">
        <div>
          <Label>Colour</Label>
          <select {...register("Colour", { required: true })}>
            {colours.map((colour) => (
              <option value={colour} key={colour}>
                {colour}
              </option>
            ))}
            {/* <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Colour" />
            </SelectTrigger>
            <SelectContent>
              {colours.map((colour) => <SelectItem value={colour} key={colour}>{colour}</SelectItem>)}
            </SelectContent> */}
          </select>
        </div>
        <div>
          <Label>Pickup</Label>
          <select {...register("Pickup", { required: true })}>
            {pickups.map((pickup) => (
              <option value={pickup} key={pickup}>
                {pickup}
              </option>
            ))}
            {/* <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Pickup" />
            </SelectTrigger>
            <SelectContent>
              {pickups.map((pickup) => <SelectItem value={pickup} key={pickup}>{pickup}</SelectItem>)}
            </SelectContent> */}
          </select>
        </div>
        <div>
          <Label>BodyShape</Label>
          <select {...register("BodyShape", { required: true })}>
            {shapes.map((shape) => (
              <option value={shape} key={shape}>
                {shape}
              </option>
            ))}
            {/* <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Shape" />
            </SelectTrigger>
            <SelectContent>
              {shapes.map((shape) => <SelectItem value={shape} key={shape}>{shape}</SelectItem>)}
            </SelectContent> */}
          </select>
        </div>
      </div>
      <Button type="submit">Submit</Button>
    </form>
  );
};
