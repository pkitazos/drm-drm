"use client";
import { type Order } from "@prisma/client";
import DataTable from "~/components/ui/data-table/data-table";
import { columns } from "./columns";

export function ClientSection({ orderData }: { orderData: Order[] }) {
  return <DataTable columns={columns} data={orderData} />;
}
