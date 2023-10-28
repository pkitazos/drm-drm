"use client";

import Plot from "react-plotly.js";
import { SpinnerComponent } from "~/components/ui/spinner";
import { api } from "~/trpc/react";

interface OrderWithPrice {
  Id: number;
  DateCreated: Date;
  OrderTotal: number;
  OrderStatus: string;
  addressId: string;
  CustomerId: number;
}

const Page = () => {
  const { data: allOrders } = api.analytics.getAllOrders.useQuery();

  const { data: revenueByCategory } =
    api.analytics.getGroupedOrdersAndCategories.useQuery();

  if (!allOrders || !revenueByCategory) return;

  const cumulativeSum = (
    (sum) => (value: number) =>
      (sum += value)
  )(0);

  // ["2019", "2020", "2021", "2022", "2023"]

  console.log(revenueByCategory)

  let test = Object.keys(revenueByCategory).map((category) => {
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
        <Plot
          data={[
            {
              x: allOrders.map((order) => order.DateCreated),
              y: allOrders.map((order) => order.OrderTotal).map(cumulativeSum),
              type: "scatter",
              mode: "lines",
              marker: { color: "red" },
            },
          ]}
          layout={{
            width: 900,
            height: 700,
            title: "Total Revenue",
          }}
        />
        <Plot
        // @ts-ignore
          data={test}
          layout={{
            width: 900,
            height: 700,
            title: "Total Revenue Per Category",
            barmode: "stack",
          }}
        />
      </div>
    </div>
  );
};

export default Page;
