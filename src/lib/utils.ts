import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function slugify(label: string): string {
  return label.replaceAll("&", "and").replaceAll(" ", "-").toLowerCase();
}
