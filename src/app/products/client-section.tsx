"use client";
import DataTable from "~/components/ui/data-table/data-table";
import { columns, type ProductData } from "./columns";

export function ClientSection() {
  const myData: ProductData[] = [
    {
      ItemName: "1993P 12-String Jetglo",
      BrandName: "Rickenbacker",
      SalesPrice: 499.0,
      QtyInStock: 2,
      QtyOnOrder: 0,
      Category: "GUEG_2",
      Online: true,
      CreatedOn: "2015-01-30T00:00:00",
    },
    {
      ItemName: "1993P 12-String Jetglo",
      BrandName: "Rickenbacker",
      SalesPrice: 499.0,
      QtyInStock: 2,
      QtyOnOrder: 0,
      Category: "GUEG_2",
      Online: true,
      CreatedOn: "2015-01-30T00:00:00",
    },
    {
      ItemName: "1993P 12-String Jetglo",
      BrandName: "Rickenbacker",
      SalesPrice: 499.0,
      QtyInStock: 2,
      QtyOnOrder: 0,
      Category: "GUEG_2",
      Online: true,
      CreatedOn: "2015-01-30T00:00:00",
    },
    {
      ItemName: "1993P 12-String Jetglo",
      BrandName: "Rickenbacker",
      SalesPrice: 499.0,
      QtyInStock: 2,
      QtyOnOrder: 0,
      Category: "GUEG_2",
      Online: true,
      CreatedOn: "2015-01-30T00:00:00",
    },
    {
      ItemName: "1993P 12-String Jetglo",
      BrandName: "Rickenbacker",
      SalesPrice: 499.0,
      QtyInStock: 2,
      QtyOnOrder: 0,
      Category: "GUEG_2",
      Online: true,
      CreatedOn: "2015-01-30T00:00:00",
    },
    {
      ItemName: "1993P 12-String Jetglo",
      BrandName: "Rickenbacker",
      SalesPrice: 499.0,
      QtyInStock: 2,
      QtyOnOrder: 0,
      Category: "GUEG_2",
      Online: true,
      CreatedOn: "2015-01-30T00:00:00",
    },
  ];
  return <DataTable columns={columns} data={myData} />;
}
