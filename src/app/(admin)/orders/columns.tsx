import { type Order } from "@prisma/client";
import { type ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import Link from "next/link";
import { TipLink } from "~/components/tip-link";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Checkbox } from "~/components/ui/checkbox";
import { DataTableColumnHeader } from "~/components/ui/data-table/data-table-column-header";
import { currencyFormatter } from "~/lib/currency";
import { cn } from "~/lib/utils";

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
    cell: ({ row }) => {
      const status = row.original.OrderStatus;

      return (
        <Badge
          className={cn(
            status === "Placed" && "bg-amber-500",
            status === "Dispatched" && "bg-yellow-300",
            status === "Delivering" && "bg-lime-300",
            status === "Delivered" && "bg-green-300",
            status === "Completed" && "bg-emerald-500",
            status === "Cancelled" && "bg-red-500",
          )}
        >
          {status}
        </Badge>
      );
    },
  },
  {
    id: "CustomerId",
    accessorKey: "CustomerId",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Customer ID" canFilter />
    ),
    cell: ({ row }) => (
      <TipLink
        href={`/customers/${row.original.CustomerId}`}
        tip={<p>See Customer Details</p>}
      >
        {row.original.CustomerId}
      </TipLink>
    ),
  },
  {
    id: "actions",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Actions" />
    ),
    cell: ({ row }) => (
      <Button asChild variant="outline">
        <Link href={`/orders/${row.original.Id}`}>Order Details</Link>
      </Button>
    ),
  },
];
