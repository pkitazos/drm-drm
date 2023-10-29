import { api } from "~/trpc/server";
import ClientPlot from "../revenue/client-plot";

const Page = async () => {
  const loyalties: number[] = [0, 1, 2, 3];
  const categoriesByLoyalty =
    await api.analytics.getLoyaltyRevenueByCategory.query();

  const categoryData = Object.keys(categoriesByLoyalty).map((category) => {
    return {
      x: loyalties,
      y: categoriesByLoyalty[category],
      name: category,
      type: "bar",
    };
  });

  return (
    <div className="h-[70dvh]">
      <div className="flex h-full justify-center">
        <ClientPlot
          data={categoryData}
          title="Total Revenue Per Category By Demographic (2019-2023)"
          barmode="group"
          width={1400}
          height={680}
          xaxis="Loyalty Levels"
          yaxis="Revenue (£)"
        />
      </div>
    </div>
  );
};

export default Page;
