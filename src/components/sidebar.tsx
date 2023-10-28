import {
  HomeIcon,
  Package,
  Contact2,
  ScanBarcode,
  LineChart,
} from "lucide-react";
import Link from "next/link";

const Sidebar = () => {
  return (
    <ol className="flex h-[100dvh] flex-col items-start gap-10 p-5 pt-6 bg-gray-100">
      <li title="Home" className="flex items-center text-sm text-gray-600 dark:text-gray-400">
        <Link className="hover:text-orange-500" href="/">
          <HomeIcon className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
        </Link>
      </li>
      <li title="Orders" className="flex items-center text-sm text-gray-600 dark:text-gray-400">
        <Link className="hover:text-orange-500" href="/orders">
          <Package className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
        </Link>
      </li>
      <li title="Customers" className="flex items-center text-sm text-gray-600 dark:text-gray-400">
        <Link className="hover:text-orange-500" href="/customers">
          <Contact2 className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
        </Link>
      </li>
      <li title="Products"className="flex items-center text-sm text-gray-600 dark:text-gray-400">
        <Link className="hover:text-orange-500" href="/products">
          <ScanBarcode className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
        </Link>
      </li>
      <li title="Analytics" className="flex items-center text-sm text-gray-600 dark:text-gray-400">
        <Link className="hover:text-orange-500" href="/analytics">
          <LineChart className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
        </Link>
      </li>
    </ol>
  );
};

export default Sidebar;
