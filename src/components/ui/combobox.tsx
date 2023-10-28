"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "~/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { FormControl } from "~/components/ui/form";

import {
  type PathValue,
  type ControllerRenderProps,
  type FieldValues,
  type Path,
  type UseFormReturn,
} from "react-hook-form";

export function FormCombobox<
  TFieldValues extends FieldValues,
  TFieldName extends Path<TFieldValues>,
>({
  options,
  form,
  field,
}: {
  field: ControllerRenderProps<TFieldValues, TFieldName>;
  form: UseFormReturn<TFieldValues>;
  options: { label: string; value: PathValue<TFieldValues, TFieldName> }[];
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <FormControl>
          <Button
            variant="outline"
            role="combobox"
            className={cn(
              "flex w-full justify-between",
              !field.value && "text-muted-foreground",
            )}
          >
            {field.value
              ? options.find((option) => option.value === field.value)?.label
              : "Select option"}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className="flex w-full p-0">
        <Command>
          <CommandInput placeholder="Search option..." />
          <CommandEmpty>No option found.</CommandEmpty>
          <CommandGroup>
            {options.map((option) => (
              <CommandItem
                value={option.label}
                key={option.value}
                onSelect={() => {
                  form.setValue(field.name, option.value);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    option.value === field.value ? "opacity-100" : "opacity-0",
                  )}
                />
                {option.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
