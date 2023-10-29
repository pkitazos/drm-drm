"use client";
import { type Product } from "@prisma/client";
import { DataTable } from "~/components/ui/data-table/data-table";
import { columns } from "./columns";

export function ClientSection({ productData }: { productData: Product[] }) {
  return <DataTable columns={columns} data={productData} />;
}
