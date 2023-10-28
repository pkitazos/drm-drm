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
  const yoy = await api.analytics.getYoyRevenue.query();
  const revenueByCategory =
    await api.analytics.getGroupedOrdersAndCategories.query();

  if (!yoy || !revenueByCategory) return;

  const cumulativeSum = (
    (sum) => (value: number) =>
      (sum += value)
  )(0);

  const categoryData = Object.keys(revenueByCategory).map((category) => {
    return {
      x: ["2019", "2020", "2021", "2022", "2023"],
      y: revenueByCategory[category],
      name: `${category}`,
      type: "bar",
    };
  });

  const getDates = () => {
    let dates = []
    let temp = new Date("2019-01-01")
    for (let i=0; i<4; i++){
      dates.push(temp)
      temp.setMonth(temp.getMonth()+3)
    }
    temp = new Date("2020-01-01")
    for (let i=0; i<4; i++){
      dates.push(temp)
      temp.setMonth(temp.getMonth()+3)
    }
    temp = new Date("2021-01-01")
    for (let i=0; i<4; i++){
      dates.push(temp)
      temp.setMonth(temp.getMonth()+3)
    }
    temp = new Date("2022-01-01")
    for (let i=0; i<4; i++){
      dates.push(temp)
      temp.setMonth(temp.getMonth()+3)
    }
    temp = new Date("2023-01-01")
    for (let i=0; i<4; i++){
      dates.push(temp)
      temp.setMonth(temp.getMonth()+3)
    }
    return dates
  }

  console.log(getDates())
import { api } from "~/trpc/server";
import ClientPlot from "./client-plot";

const Page = async () => {
  const allOrders = await api.analytics.getAllOrders.query();
  const revenueByCategory =
    await api.analytics.getGroupedOrdersAndCategories.query();

  if (!allOrders || !revenueByCategory) return;

  const cumulativeSum = (
    (sum) => (value: number) =>
      (sum += value)
  )(0);

  const categoryData = Object.keys(revenueByCategory).map((category) => {
    return {
      x: ["2019", "2020", "2021", "2022", "2023"],
      y: revenueByCategory[category],
      name: `${category}`,
      type: "bar",
    };
  });

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
