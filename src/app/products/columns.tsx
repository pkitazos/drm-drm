import { type Product } from "@prisma/client";
import { type ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { Check, X } from "lucide-react";
import { TipLink } from "~/components/tip-link";
import { Badge } from "~/components/ui/badge";
import { Checkbox } from "~/components/ui/checkbox";
import { DataTableColumnHeader } from "~/components/ui/data-table/data-table-column-header";
import { currencyFormatter } from "~/lib/currency";

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
    accessorKey: "ItemName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" canFilter />
    ),
    cell: ({ row }) => (
      <TipLink
        href={`/products/${row.original.SKU_ID}`}
        tip={<p>See Item Details</p>}
      >
        {row.original.ItemName}
      </TipLink>
    ),
  },
  {
    id: "brandName",
    accessorKey: "BrandName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Brand" canFilter />
    ),
    cell: ({ row }) => <p className="text-center">{row.original.BrandName}</p>,
  },
  {
    accessorKey: "SalesPrice",
    id: "SalesPrice",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Price" />
    ),
    cell: ({ row }) => (
      <p className="text-center">
        {currencyFormatter.format(row.original.SalesPrice)}
      </p>
    ),
  },
  {
    accessorKey: "QtyInStock",
    id: "qtyInStock",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="In Stock" />
    ),
    cell: ({ row }) => <p className="text-center">{row.original.QtyInStock}</p>,
  },
  {
    accessorKey: "QtyOnOrder",
    id: "qtyOnOrder",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="On Order" />
    ),
    cell: ({ row }) => <p className="text-center">{row.original.QtyOnOrder}</p>,
  },
  {
    accessorKey: "Category",
    id: "category",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Category" />
    ),
    cell: ({ row }) => (
      <p className="justifycenter flex">
        <Badge>{row.original.Category}</Badge>
      </p>
    ),
  },
  {
    accessorKey: "Colour",
    id: "color",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Colour" />
    ),
    cell: ({ row }) => (
      <p className="justifycenter flex">
        <Badge>{row.original.Colour}</Badge>
      </p>
    ),
  },
  {
    accessorKey: "Pickup",
    id: "pickup",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Pickup" />
    ),
    cell: ({ row }) => (
      <p className="justifycenter flex">
        <Badge>{row.original.Pickup}</Badge>
      </p>
    ),
  },
  {
    accessorKey: "BodyShape",
    id: "bodyShape",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="BodyShape" />
    ),
    cell: ({ row }) => (
      <p className="justifycenter flex">
        <Badge>{row.original.BodyShape}</Badge>
      </p>
    ),
  },
  {
    accessorKey: "Online",
    id: "online",
    header: ({ column }) => (
      <DataTableColumnHeader
        className="text-center"
        column={column}
        title="Online"
      />
    ),
    cell: ({ row }) => (
      <div className="flex justify-center">
        {row.original.Online ? (
          <Check className="stroke-lime-500" />
        ) : (
          <X className="stroke-red-600" />
        )}
      </div>
    ),
  },
  {
    accessorKey: "CreatedOn",
    id: "createdOn",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created On" />
    ),
    cell: ({ row }) => {
      const date = row.original.CreatedOn;
      return <p className="text-center">{format(date, "dd-mm-yyyy")}</p>;
    },
  },
];
