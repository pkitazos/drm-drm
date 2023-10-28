"use client";

import { CrossIcon } from "lucide-react";
import { type Table } from "@tanstack/react-table";

import { Button } from "../button";
import { Input } from "../input";
import { DataTableViewOptions } from "./data-table-view-options";

import { DataTableFacetedFilter } from "./data-table-faceted-filter";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  searchableField: string;
  filterableFields: string[];
}

export function DataTableToolbar<TData>({
  table,
  searchableField,
  filterableFields,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter tasks..."
          value={
            (table.getColumn(searchableField)?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn(searchableField)?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {filterableFields.map(
          (field, i) =>
            table.getColumn(field) && (
              <DataTableFacetedFilter
                key={i}
                column={table.getColumn(field)}
                title={field}
                options={[]}
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
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}
