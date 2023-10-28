import { type Order } from "@prisma/client";
import { type ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { Checkbox } from "~/components/ui/checkbox";
import { DataTableColumnHeader } from "~/components/ui/data-table/data-table-column-header";
import { currencyFormatter } from "~/lib/currency";

export const columns: ColumnDef<Order>[] = [
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
    id: "DateCreated",
    accessorKey: "DateCreated",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date Created" canFilter />
    ),
    cell: ({ row }) => <p>{format(row.original.DateCreated, "PPP")}</p>,
  },
  {
    id: "OrderTotal",
    accessorKey: "OrderTotal",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Total Cost of Order"
        canFilter
      />
    ),
    cell: ({ row }) => (
      <div>{currencyFormatter.format(row.original.OrderTotal)}</div>
    ),
  },
  {
    id: "OrderStatus",
    accessorKey: "OrderStatus",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Order Status" canFilter />
    ),
  },
  {
    id: "CustomerId",
    accessorKey: "CustomerId",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Customer ID" canFilter />
    ),
  },
];
