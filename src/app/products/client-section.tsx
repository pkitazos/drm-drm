"use client";
import { Shape, type Product } from "@prisma/client";
import DataTable from "~/components/ui/data-table/data-table";
import { columns } from "./columns";

const filterable = [
  {
    name: "BodyShape",
  },
];

export function ClientSection({ productData }: { productData: Product[] }) {
  return (
    <DataTable
      columns={columns}
      data={productData}
      searchableField="brand" // needs to be column id
      filterableFields={[]}
    />
  );
}

// filterableFields: {
//   name: string;
//   values: FilterOption[];
// }[];
// }

// export interface FilterOption {
// label: string;
// value: string;
// icon?: ComponentType<{ className?: string | undefined }> | undefined;
// }
