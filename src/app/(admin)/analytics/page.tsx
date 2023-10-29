import Link from "next/link";
import { BarChart, LineChart, Map } from "lucide-react";
import { Label } from "~/components/ui/label";

const page = () => {
  return (
    <ol className="flex h-[70dvh] items-center justify-center gap-10">
      <Link
        className="relative flex h-full basis-1/4 flex-col items-center justify-center gap-2 rounded  border bg-gray-100 transition-transform duration-200 hover:scale-[1.02] hover:bg-orange-100"
        href={"analytics/loyalties"}
      >
        <BarChart />
        <Label>Loyalty Demographics</Label>
      </Link>

      <Link
        className="relative flex h-full basis-1/4 flex-col items-center justify-center gap-2 rounded  border bg-gray-100 transition-transform duration-200 hover:scale-[1.02] hover:bg-orange-100"
        href={"analytics/map"}
      >
        <Map />
        <Label>Orders</Label>
      </Link>
      <Link
        className="relative flex h-full basis-1/4 flex-col items-center justify-center gap-2 rounded  border bg-gray-100 transition-transform duration-200 hover:scale-[1.02] hover:bg-orange-100"
        href={"analytics/revenue"}
      >
        <LineChart />
        <Label>Revenue</Label>
      </Link>
    </ol>
  );
};

export default page;
