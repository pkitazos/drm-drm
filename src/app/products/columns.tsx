import { Badge } from "~/components/ui/badge";
import { Checkbox } from "~/components/ui/checkbox";
import { DataTableColumnHeader } from "~/components/ui/data-table/data-table-column-header";
import { type ColumnDef } from "@tanstack/react-table";
import { Check } from "lucide-react";

export interface ProductData {
  ItemName: string;
  BrandName: string;
  SalesPrice: number;
  QtyInStock: number;
  QtyOnOrder: number;
  Category: string;
  Online: boolean;
  CreatedOn: string;
}

export const columns: ColumnDef<ProductData>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: "itemName",
    accessorKey: "ItemName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" canFilter />
    ),
  },
  {
    id: "brandName",
    accessorKey: "BrandName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Brand" />
    ),
  },
  {
    accessorKey: "SalesPrice",
    id: "SalesPrice",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Price" />
    ),
    cell: ({ row }) => <div>£{row.original.SalesPrice}</div>,
  },
  {
    accessorKey: "QtyInStock",
    id: "qtyInStock",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Quantity In Stock" />
    ),
    cell: ({ row }) => <p className="text-center">{row.original.QtyInStock}</p>,
  },
  {
    accessorKey: "QtyOnOrder",
    id: "qtyOnOrder",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Quantity On Order" />
    ),
    cell: ({ row }) => <p className="text-center">{row.original.QtyOnOrder}</p>,
  },
  {
    accessorKey: "Category",
    id: "category",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Category" />
    ),
    cell: ({ row }) => <Badge>{row.original.Category}</Badge>,
  },
  {
    accessorKey: "Online",
    id: "online",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Online" />
    ),
    cell: ({ row }) => {
      console.log(row.original.Online);
      return row.original.Online ? <Check /> : <></>;
    },
  },
  {
    accessorKey: "CreatedOn",
    id: "createdOn",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created On" />
    ),
  },
];
