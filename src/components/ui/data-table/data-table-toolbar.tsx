"use client";

import { CrossIcon } from "lucide-react";
import { type Table } from "@tanstack/react-table";

import { Button } from "../button";

import { DataTableViewOptions } from "./data-table-view-options";

import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import { type ComponentType } from "react";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  filterableFields: FilterOption[];
}

export interface FilterOption {
  name: string;
  values: {
    label: string;
    value: string;
    icon?: ComponentType<{ className?: string | undefined }> | undefined;
  }[];
}

export function DataTableToolbar<TData>({
  table,
  filterableFields,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex w-full items-center justify-between">
      <div className="flex items-center space-x-2">
        <p className="text-slate-500">
          {table.getFilteredSelectedRowModel().rows.length} /{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected
        </p>
        {/* {filterableFields.length !== 0 &&
          filterableFields.map(
            (field, i) =>
              table.getColumn(field.name) && (
                <DataTableFacetedFilter
                  key={i}
                  column={table.getColumn(field.name)}
                  title={field.name}
                  options={field.values}
                />
              ),
          )} */}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <CrossIcon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}
