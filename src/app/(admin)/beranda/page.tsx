"use client";

import React, { useEffect, useState } from "react";
// import { Input } from "@/components/ui/input";
// import { Search } from "lucide-react";
import CheckoutIcon from "@assets/icons8-group-96.png";
import {
  GrowthSVG,
  DecreaseSVG,
  ProductSVG,
  MoneySVG,
} from "@/constants/svgIcons";
import Image from "next/image";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Label,
  ResponsiveContainer,
} from "recharts";
import { useGetDineTake, useGetGrafikIncome, useGetKitchen, useGetSummary } from "@/components/parts/admin/beranda/api";

function BerandaAdminPage() {

  // Data fetching
  // summary
  const { data: dataSummary } = useGetSummary();
  // order
  const orderData = dataSummary?.data?.order;
  // Determine the status and icon
  const isIncrease = orderData?.status === "up";
  // item
  const itemData = dataSummary?.data?.item;
  // Determine the status and icon
  const isIncreaseItem = itemData?.status === "up";
  // income
  const incomeData = dataSummary?.data?.income;
  // Determine the status and icon
  const isIncreaseIncome = incomeData?.status === "up";

  // dine takeway count
  const { data: dataDineTake } = useGetDineTake();
  // kitchen count
  const { data: dataKitchen } = useGetKitchen();
  // grafik income
  const { data: dataGrafik } = useGetGrafikIncome();
  type ChartData = {
    name: string;
    sale: number;
  };
  const [chartData, setChartData] = useState<ChartData[]>([]); // Define the type here

  useEffect(() => {
    if (dataGrafik?.statusCode === 200) {
      const transformedData: ChartData[] = dataGrafik.data.map((item) => ({
        name: `${item.month} ${item.year}`, // Combine month and year for X-axis
        sale: item.value, // Use `sale` as Y-axis key
      }));
      setChartData(transformedData); // No more type error
    }
  }, [dataGrafik]);

  return (
    <>
      <div className="flex items-center justify-between pr-10 ">
        <p className="text-secondaryColor dark:text-primaryColor font-bold text-3xl">
          Beranda
        </p>
        {/* <div className="w-1/4">
          <div className="relative w-full">
            <div className="absolute inset-y-0 right-3 flex items-center pl-3">
              <Search className="h-6 w-6" />
            </div>
            <Input placeholder="Search" className=" text-sm" />
          </div>
        </div> */}
      </div>

      <div className="flex gap-7 items-center mt-4">
        {/* Card Jumlah Pesanan */}
        <div className="py-2 pl-2 pr-12 bg-[#F9F9F9] rounded-md shadow-2xl shadow-[#F9F9F9]">
          <div className="flex gap-2 items-center">
            <div className="h-[70px] w-[6px] bg-primaryColor"></div>
            <div className="space-y-2">
              <p>Jumlah Pesanan</p>
              <span className="flex">
                <p className="text-2xl font-bold">{dataSummary?.data?.order?.today || "-"}</p>
                <p className="text-base leading-9">/hari</p>
              </span>
            </div>
            <div className="w-10 h-7 ml-6">
              <Image
                src={CheckoutIcon}
                alt="checkout"
                className="w-full h-full"
                unoptimized
              />
            </div>
          </div>
          <span className="flex ml-5 items-center space-x-1 text-sm">
            {isIncrease ? <GrowthSVG /> : <DecreaseSVG />}
            <p className="font-semibold">{dataSummary?.data?.order?.diff || "-"}%</p>
            <p>Dari Kemarin</p>
          </span>
        </div>

        {/* Card Produk Terjual */}
        <div className="py-2 pl-2 pr-12 bg-[#F9F9F9] rounded-md shadow-2xl shadow-[#F9F9F9]">
          <div className="flex gap-2 items-center">
            <div className="h-[70px] w-[6px] bg-[#444444]"></div>
            <div className="space-y-2">
              <p>Produk Terjual</p>
              <span className="flex">
                <p className="text-2xl font-bold">{dataSummary?.data?.item?.today || "-"}</p>
                <p className="text-base leading-9">/hari</p>
              </span>
            </div>
            <div className="ml-6">
              <ProductSVG />
            </div>
          </div>
          <span className="flex ml-5 items-center space-x-1 text-sm">
            {isIncreaseItem ? <GrowthSVG /> : <DecreaseSVG />}
            <p className="font-semibold">{dataSummary?.data?.item?.diff || "-"}%</p>
            <p>Dari Kemarin</p>
          </span>
        </div>

        {/* Card Pendapatan */}
        <div className="py-2 pl-2 pr-12 bg-[#F9F9F9] rounded-md shadow-2xl shadow-[#F9F9F9]">
          <div className="flex gap-2 items-center">
            <div className="h-[70px] w-[6px] bg-[#FF0000]"></div>
            <div className="space-y-2">
              <p>Pendapatan</p>
              <span className="font-bold text-xl leading-10">
                Rp. {dataSummary?.data?.income?.today.toLocaleString() || "-"}
              </span>
            </div>
            <div className="ml-6">
              <MoneySVG />
            </div>
          </div>
          <span className="flex ml-5 items-center space-x-1 text-sm">
            {isIncreaseIncome ? <GrowthSVG /> : <DecreaseSVG />}
            <p className="font-semibold">{dataSummary?.data?.income?.diff || "-"}%</p>
            <p>Dari Kemarin</p>
          </span>
        </div>
      </div>

      <div className="w-full flex  justify-between mt-6">
        <div className=" w-[60%] bg-[#F9F9F9] rounded-xl p-4 h-full shadow-[#F9F9F9] shadow-xl ">
          <p className="text-xl font-semibold">Profit Berdasarkan Bulan</p>
          {/* grafik */}
          <div className="w-full h-[390px] mt-2">
            {/* Chart Profit */}
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                style={{ backgroundColor: "white" }}
                data={chartData}
                margin={{
                  top: 20,
                  right: 30,
                  bottom: 25,
                  left: 20,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" tick={false}>
                  <Label value="Profit" offset={2} position="insideBottom" />
                </XAxis>
                <YAxis />
                <Tooltip />
                <Legend
                  verticalAlign="bottom"
                  height={15}
                  wrapperStyle={{
                    paddingTop: "10px",
                  }}
                  formatter={(value) => (value === "sale" ? "Yearly Profit" : value)}
                />
                <Line type="monotone" dataKey="sale" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </div>

        </div>
        <div className=" w-[37%] space-y-8 ">
          {/* Table Kitchens */}
          <div className="border border-[#E4E4E7] rounded-lg overflow-hidden shadow-xl">
            <Table>
              <TableHeader className="bg-primaryColor">
                <TableRow>
                  <TableHead className="w-[60px]">No</TableHead>
                  <TableHead className="w-[200px]">Dapur</TableHead>
                  <TableHead className="w-[150px]">Total Pendapatan</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {dataKitchen?.data?.map((kitchenView, index) => (
                  <TableRow
                    className="text-sm text-[#141414] text-center dark:text-white"
                    key={index}
                  >
                    <TableCell className="font-medium text-center">
                      {index + 1}
                    </TableCell>
                    <TableCell className="text-center">
                      {kitchenView?.name || "-"}
                    </TableCell>
                    <TableCell className="text-center">
                      Rp. {kitchenView?.sum.toLocaleString() || "-"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Table Transactions  */}
          <div className="border border-[#E4E4E7] rounded-lg overflow-hidden">
            <Table>
              <TableHeader className="bg-primaryColor">
                <TableRow>
                  <TableHead className="w-[60px]">No</TableHead>
                  <TableHead className="w-[200px]">Pesanan</TableHead>
                  <TableHead className="w-[150px]">Jumlah Pesanan</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {dataDineTake?.data?.map((transactionView, index) => (
                  <TableRow
                    className="text-sm text-[#141414] text-center dark:text-white"
                    key={index}
                  >
                    <TableCell className="font-medium text-center">
                      {index + 1}
                    </TableCell>
                    <TableCell className="text-center">
                      {transactionView?.name || "-"}
                    </TableCell>
                    <TableCell className="text-center">
                      {transactionView?.sum || "-"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </>
  );
}

export default BerandaAdminPage;
