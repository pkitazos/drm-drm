"use client";
import { type Product } from "@prisma/client";
import { type ColumnDef } from "@tanstack/react-table";
import { type FunctionComponent } from "react";
import DataTable from "~/components/ui/data-table/data.table";

interface ClientSectionProps {
  columns: ColumnDef<Product>[]
}

export const ClientSection: FunctionComponent<ClientSectionProps> = ({columns}) => {
  return <DataTable columns={columns} data={[]} />;
}
