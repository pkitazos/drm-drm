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
    Products: Product[];
  }

  interface Product {
    Category: string
  }

const Page = () => {
  const { data: orders, isLoading } =
    api.analytics.getOrdersAndPrice.useQuery();

    if (!orders) return

    orders.map((order: OrderWithPrice ) => {
        console.log(order)
      })

      const cumulativeSum = (sum => (value: number) => sum += value)(0);


  return (
    <div className="h-[88dvh]">
        <div className="flex h-full justify-center">
        <Plot
        data={[
          {
            x: orders.map((order) => order.DateCreated),
            y: orders.map((order) => order.OrderTotal).map(cumulativeSum),
            type: 'scatter',
            mode: 'lines+markers',
            marker: {color: 'red'},
          },
        ]}
        layout={ {width: 700, height: 700, title: 'A Fancy Plot'} }
      />
      </div>
    </div>
  );
};

export default Page;
