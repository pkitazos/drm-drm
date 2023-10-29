import Link from "next/link";
import { BarChart, LineChart, Map } from "lucide-react";
import { Label } from "~/components/ui/label";

const page = () => {
  return (
    <ol className="flex h-[70dvh] items-center justify-center gap-10">
      <li className="relative flex h-full basis-1/4 items-center justify-center rounded border bg-gray-100 transition-transform duration-200 hover:scale-[1.02] hover:bg-orange-100">
        <Link
          className="grid justify-items-center gap-2"
          href={"analytics/loyalties"}
        >
          <BarChart />
          <Label>Loyalty Demographics</Label>
        </Link>
      </li>
      <li className="relative flex h-full basis-1/4 items-center justify-center rounded border bg-gray-100 transition-transform duration-200 hover:scale-[1.02] hover:bg-orange-100">
        <Link
          className="grid justify-items-center gap-2"
          href={"analytics/map"}
        >
          <Map />
          <Label>Orders</Label>
        </Link>
      </li>
      <li className="relative flex h-full basis-1/4 items-center justify-center rounded border  bg-gray-100 transition-transform duration-200 hover:scale-[1.02] hover:bg-orange-100">
        <Link
          className="grid justify-items-center gap-2"
          href={"analytics/revenue"}
        >
          <LineChart />
          <Label>Revenue</Label>
        </Link>
      </li>
    </ol>
  );
};

export default page;
