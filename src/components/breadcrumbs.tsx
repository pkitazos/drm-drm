"use client";
import { ChevronRightIcon, HomeIcon, Slash } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Breadcrumbs() {
  const pathname = usePathname().split("/");

  if (pathname.length === 0)
    return (
      <ol className="ml-20 mt-7 flex items-center" aria-label="Breadcrumb">
        <li className="flex items-center text-sm text-gray-600 dark:text-gray-400">
          Home
          <Slash className="mx-2 h-4 w-4" />
        </li>
      </ol>
    );

  const leafPath = pathname.slice(1).pop()!;

  const paths = pathname.slice(1, -1);

  return (
    <ol className="flex items-center gap-x-4" aria-label="Breadcrumb">
      <li className="flex items-center text-sm text-gray-600 dark:text-gray-400">
        <Link className="hover:text-orange-500" href="/">
          <HomeIcon className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
        </Link>
      </li>

      {paths.length !== 0 &&
        paths.map((path, i) => (
          <li
            key={path}
            className="flex items-center gap-x-4 text-sm text-gray-600 dark:text-gray-400"
          >
            <ChevronRightIcon
              className="h-5 w-5 flex-shrink-0 text-gray-400"
              aria-hidden="true"
            />
            <Link
              className="font-medium hover:text-orange-500"
              href={`/${paths.slice(0, i + 1).join("/")}`}
            >
              {path}
            </Link>
          </li>
        ))}
      <li
        className="flex items-center gap-x-4 truncate text-sm font-semibold text-gray-800 dark:text-gray-200"
        aria-current="page"
      >
        <ChevronRightIcon
          className="h-5 w-5 flex-shrink-0 text-gray-400"
          aria-hidden="true"
        />
        {leafPath}
      </li>
    </ol>
  );
}
