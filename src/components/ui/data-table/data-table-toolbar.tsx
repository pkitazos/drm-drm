"use client";

import { CrossIcon } from "lucide-react";
import { type Table } from "@tanstack/react-table";

import { Button } from "../button";
import { Input } from "../../input";
import { DataTableViewOptions } from "./data-table-view-options";

import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import { type ComponentType } from "react";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  searchableField: string;
  filterableFields: {
    name: string;
    values: FilterOption[];
  }[];
}

export interface FilterOption {
  label: string;
  value: string;
  icon?: ComponentType<{ className?: string | undefined }> | undefined;
}

export function DataTableToolbar<TData>({
  table,
  searchableField,
  filterableFields,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex w-full items-center justify-between">
      <div className="flex-1 text-sm text-muted-foreground">
        {table.getFilteredSelectedRowModel().rows.length} /{" "}
        {table.getFilteredRowModel().rows.length} row(s) selected
      </div>
      <div className="flex items-center space-x-2">
        {searchableField && (
          <Input
            placeholder="Filter tasks..."
            value={
              (table.getColumn(searchableField)?.getFilterValue() as string) ??
              ""
            }
            onChange={(event) =>
              table
                .getColumn(searchableField)
                ?.setFilterValue(event.target.value)
            }
            className="h-8 w-[150px] lg:w-[250px]"
          />
        )}
        {filterableFields.length !== 0 &&
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
          )}
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
        <DataTableViewOptions table={table} />
      </div>
    </div>
  );
}
