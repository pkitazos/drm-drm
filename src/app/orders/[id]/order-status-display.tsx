import { type OrderStatus } from "@prisma/client";
import {
  MailCheck,
  Package,
  PackageCheck,
  PackageOpen,
  PackageX,
  Truck,
} from "lucide-react";
import { cn } from "~/lib/utils";

const dict = {
  Cancelled: 0,
  Placed: 1,
  Dispatched: 2,
  Delivering: 3,
  Delivered: 4,
  Completed: 5,
};

export const OrderStatusDisplay = ({ status }: { status: OrderStatus }) => {
  const ord = dict[status]!;

  return (
    <ol className="relative flex gap-12 border-t pt-8 text-gray-500 dark:border-gray-700 dark:text-gray-400">
      <li className="grid place-items-center">
        <span
          className={cn(
            `absolute -top-10 flex h-8 w-8 translate-y-6 items-center justify-center rounded-full ring-white`,
            ord > 0
              ? "bg-green-200 text-green-500"
              : "bg-gray-100 text-gray-700",
          )}
        >
          <MailCheck />
        </span>
        <h3 className="font-medium leading-tight">Placed</h3>
      </li>
      <li className="grid place-items-center">
        <span
          className={cn(
            `absolute -top-10 flex h-8 w-8 translate-y-6 items-center justify-center rounded-full ring-white`,
            ord > 1
              ? "bg-green-200 text-green-500"
              : "bg-gray-100 text-gray-700",
          )}
        >
          <Package />
        </span>
        <h3 className="font-medium leading-tight">Dispatched</h3>
      </li>
      <li className="grid place-items-center">
        <span
          className={cn(
            `absolute -top-10 flex h-8 w-8 translate-y-6 items-center justify-center rounded-full ring-white`,
            ord > 2
              ? "bg-green-200 text-green-500"
              : "bg-gray-100 text-gray-700",
          )}
        >
          <Truck />
        </span>
        <h3 className="font-medium leading-tight">Delivering</h3>
      </li>
      <li className="grid place-items-center">
        <span
          className={cn(
            `absolute -top-10 flex h-8 w-8 translate-y-6 items-center justify-center rounded-full ring-white`,
            ord > 3
              ? "bg-green-200 text-green-500"
              : "bg-gray-100 text-gray-700",
          )}
        >
          <PackageCheck />
        </span>
        <h3 className="font-medium leading-tight">Delivered</h3>
      </li>
      <li className="grid place-items-center">
        <span
          className={cn(
            `absolute -top-10 flex h-8 w-8 translate-y-6 items-center justify-center rounded-full ring-white`,
            ord > 4
              ? "bg-green-200 text-green-500"
              : "bg-gray-100 text-gray-700",
          )}
        >
          <PackageOpen />
        </span>
        <h3 className="font-medium leading-tight">Completed</h3>
      </li>
      <li className="grid place-items-center">
        <span
          className={cn(
            `absolute -top-10 flex h-8 w-8 translate-y-6 items-center justify-center rounded-full ring-white`,
            ord === 0 ? "bg-red-200 text-red-500" : "bg-gray-100 text-gray-700",
          )}
        >
          <PackageX />
        </span>
        <h3 className="font-medium leading-tight">Cancelled</h3>
      </li>
    </ol>
  );
};
