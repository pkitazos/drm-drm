"use client";
import { type Customer } from "@prisma/client";
import { DataTable } from "~/components/ui/data-table/data-table";
import { columns } from "./columns";

export function ClientSection({ customerData }: { customerData: Customer[] }) {
  return <DataTable columns={columns} data={customerData} />;
}
