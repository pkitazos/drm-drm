import { Badge } from "~/components/ui/badge"
import { Checkbox } from "~/components/ui/checkbox";
import { DataTableColumnHeader } from "~/components/ui/data-table/data-table-column-header";
import { type ColumnDef } from "@tanstack/react-table";
import { Check } from "lucide-react";
import { type Product } from "@prisma/client";

export const columns: ColumnDef<Product>[] = [
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
    accessorKey: "Name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" canFilter />
    ),
  },
  {
    id: "brandName",
    accessorKey: "Brand",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Brand" />
    ),
  },
  {
    accessorKey: "SalesPrice",
    id: "salesPrice",
    header: ({column}) => {
      <DataTableColumnHeader column={column} title="Price" />;
    },
    cell: ({ row }) => (<div>£{row.original.SalesPrice}</div>),
  },
  {
    accessorKey: "QtyInStock",
    id: "qtyInStock",
    header: ({column}) => {
      <DataTableColumnHeader column={column} title="Quantity In Stock" />;
    }
  },
  {
    accessorKey: "QtyInOrder",
    id: "qtyInOrder",
    header: ({column}) => {
      <DataTableColumnHeader column={column} title="Quantity In Order" />;
    }
  },
  {
    accessorKey: "Category",
    id: "category",
    header: ({column}) => {
      <DataTableColumnHeader column={column} title="Category" />;
    },
    cell: ({row}) => {<Badge>{row.original.Category}</Badge>}
  },
  {
    accessorKey: "Online",
    id: "online",
    header: ({column}) => {
      <DataTableColumnHeader column={column} title="Category" />;
    },
    cell: ({row}) => {row.original.Online ? <Check /> : <></>}
  },
  {
    accessorKey: "CreatedOn",
    id: "createdOn",
    header: ({column}) => {
      <DataTableColumnHeader column={column} title="Created On" />;
    },
  },
];
