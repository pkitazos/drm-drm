"use client";
import { type Product } from "@prisma/client";
import { DataTable } from "~/components/ui/data-table/data-table";
import { columns } from "./columns";
import { shapes } from "prisma/helpers";

const filterable = [
  {
    name: "bodyShape",
    values: shapes.map((shape) => ({ label: shape, value: shape })),
  },
];

export function ClientSection({ productData }: { productData: Product[] }) {
  return (
    <DataTable
      columns={columns}
      data={productData}
      filterableFields={filterable}
    />
  );
}
