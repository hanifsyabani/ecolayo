"use client";

import { useQuery } from "@tanstack/react-query";
import BarChart from "../chart/barchart";
import { GetProducts } from "@/service/admin/products";
import { Card, CardContent } from "../ui/card";
import PieChart from "../chart/piechart";
import { GetUsers } from "@/service/admin/users";

export default function ChartDashboard() {
  const { data: products, isLoading: isLoadingProducts } = useQuery({
    queryFn: () => GetProducts(),
    queryKey: ["dataProducts"],
  });

  const {data: users, isLoading: isLoadingUsers} = useQuery({
    queryFn: () => GetUsers(),
    queryKey: ["dataUsers"],
  });

  if (isLoadingProducts || isLoadingUsers) return <div className="spinner" />;

  // // reduce adalah fungsi JavaScript yang digunakan untuk mengubah array menjadi satu nilai/output tertentu.
  // acc (Accumulator)
  // Ini adalah penampung hasil sementara.

  // {
  //   "Elektronik": 5,
  //   "Fashion": 3
  // }

  const categoryCounts = products.reduce((acc: any, product: any) => {
    const categoryName = product.category.name;
    acc[categoryName] = (acc[categoryName] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const labels = Object.keys(categoryCounts);
  const data = Object.values(categoryCounts) as number[];

  const maleUser = users.filter(
    (user: any) => user.gender  === "male"
  );
  const femaleUser = users.filter(
    (user: any) => user.gender  === "female"
  );

  return (
    <div className="flex justify-center gap-4 ">
      <Card className="w-[55%]">
        <CardContent className="bg-white flex justify-center w-full">
          <BarChart labels={labels} datas={data} />
        </CardContent>
      </Card>
      <Card className="w-[45%]">
        <CardContent className="bg-white flex justify-center w-full h-full">
          <PieChart maleCount={maleUser.length} femaleCount={femaleUser.length} />
        </CardContent>
      </Card>
    </div>
  );
}
