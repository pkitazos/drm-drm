import { type OrderStatus } from "@prisma/client";
import {
  MailCheck,
  Package,
  PackageCheck,
  PackageOpen,
  PackageX,
  Truck,
} from "lucide-react";

export const OrderStatusDisplay = ({ status }: { status: OrderStatus }) => {
  const placedCheck = (input: string) => {
    return status != "Cancelled" ? "green-200" : "gray-" + input;
  };
  const dispatchedCheck = (input: string) => {
    return status != "Cancelled" && status != "Placed"
      ? "green-200"
      : "gray-" + input;
  };
  const deliveringCheck = (input: string) => {
    return status != "Cancelled" && status != "Placed" && status != "Dispatched"
      ? "green-200"
      : "gray-" + input;
  };
  const deliveredCheck = (input: string) => {
    return status != "Cancelled" &&
      status != "Placed" &&
      status != "Dispatched" &&
      status != "Delivering"
      ? "green-200"
      : "gray-" + input;
  };
  const completedCheck = (input: string) => {
    return status != "Cancelled" &&
      status != "Placed" &&
      status != "Dispatched" &&
      status != "Delivering"
      ? "green-200"
      : "gray-" + input;
  };
  const cancelledCheck = (input: string) => {
    return status == "Cancelled" ? "red-100" : "gray-" + input;
  };

  return (
    <ol className="relative flex gap-12 border-t border-gray-200 text-gray-500 dark:border-gray-700 dark:text-gray-400">
      <li>
        <span
          className={`absolute flex h-8 w-8 items-center justify-center bg-${placedCheck(
            "100",
          )} -top-10 rounded-full ring-white dark:bg-${placedCheck(
            "700",
          )} dark:ring-gray-900`}
        >
          <MailCheck />
        </span>
        <h3 className="font-medium leading-tight">Placed</h3>
      </li>
      <li>
        <span
          className={`absolute -top-10 flex h-8 w-8 items-center justify-center rounded-full bg-${dispatchedCheck(
            "100",
          )} ring-white dark:bg-${dispatchedCheck("700")} dark:ring-gray-900`}
        >
          <Package />
        </span>
        <h3 className="font-medium leading-tight">Dispatched</h3>
      </li>
      <li>
        <span
          className={`absolute -top-10 flex h-8 w-8 items-center justify-center rounded-full bg-${deliveringCheck(
            "100",
          )} ring-white dark:bg-${deliveringCheck("700")} dark:ring-gray-900`}
        >
          <Truck />
        </span>
        <h3 className="font-medium leading-tight">Delivering</h3>
      </li>
      <li>
        <span
          className={`absolute -top-10 flex h-8 w-8 items-center justify-center rounded-full bg-${deliveredCheck(
            "100",
          )}  ring-white dark:bg-${deliveredCheck("700")} dark:ring-gray-900`}
        >
          <PackageCheck />
        </span>
        <h3 className="font-medium leading-tight">Delivered</h3>
      </li>
      <li>
        <span
          className={`absolute -top-10 flex h-8 w-8 items-center justify-center rounded-full bg-${completedCheck(
            "100",
          )} ring-white dark:bg-${completedCheck("700")} dark:ring-gray-900`}
        >
          <PackageOpen />
        </span>
        <h3 className="font-medium leading-tight">Completed</h3>
      </li>
      <li>
        <span
          className={`absolute -top-10 flex h-8 w-8 items-center justify-center rounded-full bg-${cancelledCheck(
            "100",
          )} ring-white dark:bg-${cancelledCheck("700")} dark:ring-gray-900`}
        >
          <PackageX />
        </span>
        <h3 className="font-medium leading-tight">Cancelled</h3>
      </li>
    </ol>
  );
};
