"use client";
import {
  HomeIcon,
  Package,
  Contact2,
  ScanBarcode,
  LineChart,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "~/lib/utils";

const Sidebar = () => {
  const path = usePathname();

  return (
    <ol className="items-centre fixed top-0 flex h-[100dvh] w-14 flex-col gap-10 bg-gray-100 p-5 pt-6">
      <li
        title="Home"
        className="flex items-center text-sm text-gray-600 dark:text-gray-400"
      >
        <Link className="hover:text-orange-500" href="/">
          <HomeIcon
            className={cn(
              "h-5 w-5 flex-shrink-0",
              path == "/" && "text-orange-400",
            )}
            aria-hidden="true"
          />
        </Link>
      </li>
      <li
        title="Orders"
        className="flex items-center text-sm text-gray-600 dark:text-gray-400"
      >
        <Link className="hover:text-orange-500" href="/orders">
          <Package
            className={cn(
              "h-5 w-5 flex-shrink-0",
              path == "/orders" && "text-orange-400",
            )}
            aria-hidden="true"
          />
        </Link>
      </li>
      <li
        title="Customers"
        className="flex items-center text-sm text-gray-600 dark:text-gray-400"
      >
        <Link className="hover:text-orange-500" href="/customers">
          <Contact2
            className={cn(
              "h-5 w-5 flex-shrink-0",
              path == "/customers" && "text-orange-400",
            )}
            aria-hidden="true"
          />
        </Link>
      </li>
      <li
        title="Products"
        className="flex items-center text-sm text-gray-600 dark:text-gray-400"
      >
        <Link className="hover:text-orange-500" href="/products">
          <ScanBarcode
            className={cn(
              "h-5 w-5 flex-shrink-0",
              path == "/products" && "text-orange-400",
            )}
            aria-hidden="true"
          />
        </Link>
      </li>
      <li
        title="Analytics"
        className="flex items-center text-sm text-gray-600 dark:text-gray-400"
      >
        <Link className="hover:text-orange-500" href="/analytics">
          <LineChart
            className={cn(
              "h-5 w-5 flex-shrink-0",
              path == "/analytics" && "text-orange-400",
            )}
            aria-hidden="true"
          />
        </Link>
      </li>
    </ol>
  );
};

export default Sidebar;
