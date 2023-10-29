import { api } from "~/trpc/server";
import ClientPlot from "./client-plot";

const Page = async () => {
  const yoy = await api.analytics.getYoyRevenue.query();
  const revenueByCategory =
    await api.analytics.getGroupedOrdersAndCategories.query();

  if (!yoy || !revenueByCategory) return;

  const categoryData = Object.keys(revenueByCategory).map((category) => {
    return {
      x: ["2019", "2020", "2021", "2022", "2023"],
      y: revenueByCategory[category],
      name: `${category}`,
      type: "bar",
    };
  });

  const dates = [
    new Date("2020-01-01"),
    new Date("2020-04-01"),
    new Date("2020-07-01"),
    new Date("2020-10-01"),
    new Date("2021-01-01"),
    new Date("2021-04-01"),
    new Date("2021-07-01"),
    new Date("2021-10-01"),
    new Date("2022-01-01"),
    new Date("2022-04-01"),
    new Date("2022-07-01"),
    new Date("2022-10-01"),
    new Date("2023-01-01"),
    new Date("2023-04-01"),
    new Date("2023-07-01"),
    new Date("2023-10-01"),
  ];

  return (
    <div className="h-[88dvh] ">
      <div className="flex h-full justify-center">
        <ClientPlot
          data={[
            {
              x: dates,
              y: yoy,
              type: "scatter",
              mode: "lines",
              marker: { color: "red" },
            },
          ]}
          title="Year-Over-Year Quarterly Revenue (2019-2023)"
          width={700}
          height={700}
        />
        <ClientPlot
          data={categoryData}
          title="Total Revenue Per Category (2019-2023)"
          barmode="stack"
          width={700}
          height={700}
        />
      </div>
    </div>
  );
};

export default Page;
