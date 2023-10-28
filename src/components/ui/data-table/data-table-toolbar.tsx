"use client";

import { CrossIcon } from "lucide-react";
import { type Table } from "@tanstack/react-table";

import { Button } from "../button";

import { DataTableViewOptions } from "./data-table-view-options";

import { type ComponentType } from "react";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
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
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex w-full items-center justify-between">
      <div className="flex items-center space-x-2">
        <p className="text-slate-500">
          {table.getFilteredSelectedRowModel().rows.length} /{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected
        </p>
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
