import { type Customer } from "@prisma/client";
import { type ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "~/components/ui/data-table/data-table-column-header";
import { Checkbox } from "~/components/ui/checkbox";
import { Star, StarOff } from "lucide-react";

export const columns: ColumnDef<Customer>[] = [
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
    id: "first_name",
    accessorKey: "first_name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="First Name" canFilter />
    ),
  },
  {
    id: "last_name",
    accessorKey: "last_name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Last Name" canFilter />
    ),
  },
  {
    id: "email",
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" canFilter />
    ),
  },
  {
    id: "LoyaltyLevel",
    accessorKey: "LoyaltyLevel",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Loyalty Level" canFilter />
    ),
    cell: ({ row }) => {
      const loyalty = row.original.LoyaltyLevel;

      switch (loyalty) {
        case 0:
          return (
            <>
              <StarOff />
            </>
          );
        case 1:
          return (
            <>
              <Star className="text-yellow-400" />
            </>
          );
        case 2:
          return (
            <>
              <Star className="text-yellow-400" />
              <Star className="text-yellow-400" />
            </>
          );
        case 3:
          return (
            <>
              <Star className="text-yellow-400" />
              <Star className="text-yellow-400" />
              <Star className="text-yellow-400" />
            </>
          );
      }
    },
  },
];
