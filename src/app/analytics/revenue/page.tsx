import { api } from "~/trpc/server";
import ClientPlot from "./client-plot";

// interface OrderWithPrice {
//   Id: number;
//   DateCreated: Date;
//   OrderTotal: number;
//   OrderStatus: string;
//   addressId: string;
//   CustomerId: number;
// }

const Page = async () => {
  const allOrders = await api.analytics.getAllOrders.query();
  const revenueByCategory = await api.analytics.getGroupedOrdersAndCategories.query();

  if (!allOrders || !revenueByCategory) return;

  const cumulativeSum = (
    (sum) => (value: number) =>
      (sum += value)
  )(0);

  let categoryData = Object.keys(revenueByCategory).map((category) => {
    return {
      x: ["2019", "2020", "2021", "2022", "2023"], 
      y: revenueByCategory[category],
      name: `${category}`,
      type: "bar"
    }
  })

  return (
    <div className="h-[88dvh] ">
      <div className="flex h-full justify-center">
        < ClientPlot data={[
            {
              x: allOrders.map((order) => order.DateCreated),
              y: allOrders.map((order) => order.OrderTotal).map(cumulativeSum),
              type: "scatter",
              mode: "lines",
              marker: { color: "red" },
            },
          ]} title="Total Revenue"  />
        < ClientPlot data={categoryData} title="Total Revenue Per Category" barmode="stack" />
      </div>
    </div>
  );
};

export default Page;
