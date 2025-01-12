"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
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

function BerandaAdminPage() {
  const totalOrder = {
    total: 1000,
    percentage: "5,2",
  };

  const totalProductSale = {
    total: 219,
    percentage: "0,4",
  };

  const income = {
    total: "52.123.561",
    percentage: "10,2",
  };
  const kitchens = [
    {
      no: "1",
      name: "Dapur 1",
      income: "Rp. 200.000",
    },
    {
      no: "2",
      name: "Dapur 2",
      income: "Rp. 80.000",
    },
    {
      no: "3",
      name: "Dapur 3",
      income: "Rp. 73.000",
    },
    {
      no: "4",
      name: "Dapur 4",
      income: "Rp. 120.000",
    },
  ];

  const transactions = [
    {
      no: "1",
      name: "Dine In",
      total: "20",
    },
    {
      no: "2",
      name: "Take Away",
      total: "20",
    },
  ];

  const data = [
    { name: "1", sale: 10000 },
    { name: "2", sale: 20000 },
    { name: "3", sale: 9000 },
    { name: "4", sale: 10000 },
    { name: "5", sale: 5000 },
  ];

  const year = "2024";

  return (
    <>
      <div className="flex items-center justify-between pr-10 ">
        <p className="text-secondaryColor dark:text-primaryColor font-bold text-3xl">
          Beranda
        </p>
        <div className="w-1/4">
          <div className="relative w-full">
            <div className="absolute inset-y-0 right-3 flex items-center pl-3">
              <Search className="h-6 w-6" />
            </div>
            <Input placeholder="Search" className=" text-sm" />
          </div>
        </div>
      </div>

      <div className="flex gap-7 items-center mt-4">
        {/* Card Jumlah Pesanan */}
        <div className="py-2 pl-2 pr-12 bg-[#F9F9F9] rounded-md shadow-2xl shadow-[#F9F9F9]">
          <div className="flex gap-2 items-center">
            <div className="h-[70px] w-[6px] bg-primaryColor"></div>
            <div className="space-y-2">
              <p>Jumlah Pesanan</p>
              <span className="flex">
                <p className="text-2xl font-bold">{totalOrder.total}</p>
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
            <GrowthSVG />
            <p className="font-semibold">{totalOrder.percentage}%</p>
            <p>Dari Kemarin</p>
          </span>
        </div>

        {/* Card Produk Terjual */}
        <div className="py-2 pl-2 pr-12 bg-[#F9F9F9] rounded-md shadow-2xl shadow-[#F9F9F9]">
          <div className="flex gap-2 items-center">
            <div className="h-[70px] w-[6px] bg-[#444444]"></div>
            <div className="space-y-2">
              <p>Produk Terjual</p>
              <span className="flex space-x-4">
                <p className="text-2xl font-bold">{totalProductSale.total}</p>
                <p className="text-base leading-9">/hari</p>
              </span>
            </div>
            <div className="ml-6">
              <ProductSVG />
            </div>
          </div>
          <span className="flex ml-5 items-center space-x-1 text-sm">
            <DecreaseSVG />
            <p className="font-semibold">{totalProductSale.percentage}%</p>
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
                Rp. {income.total}
              </span>
            </div>
            <div className="ml-6">
              <MoneySVG />
            </div>
          </div>
          <span className="flex ml-5 items-center space-x-1 text-sm">
            <GrowthSVG />
            <p className="font-semibold">{income.percentage}%</p>
            <p>Dari Kemarin</p>
          </span>
        </div>
      </div>

      <div className="w-full flex  justify-between mt-6">
        <div className=" w-[60%] bg-[#F9F9F9] rounded-xl p-4 h-full shadow-[#F9F9F9] shadow-xl ">
          <p className="text-xl font-semibold">Profit Bulan Ini</p>

          <div className="w-full h-[390px] mt-2">
            {/* Chart Profit */}
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                style={{ backgroundColor: "white" }}
                width={500}
                height={300}
                data={data}
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
                  formatter={(value) => {
                    if (value === "sale") return year;
                    return value;
                  }}
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
                {kitchens.map((kitchenView) => (
                  <TableRow
                    className="text-sm text-[#141414] text-center dark:text-white"
                    key={kitchenView.no}
                  >
                    <TableCell className="font-medium text-center">
                      {kitchenView.no}
                    </TableCell>
                    <TableCell className="text-center">
                      {kitchenView.name}
                    </TableCell>
                    <TableCell className="text-center">
                      {kitchenView.income}
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
                  <TableHead className="w-[200px]">Dapur</TableHead>
                  <TableHead className="w-[150px]">Jumlah Pesanan</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.map((transactionView) => (
                  <TableRow
                    className="text-sm text-[#141414] text-center dark:text-white"
                    key={transactionView.no}
                  >
                    <TableCell className="font-medium text-center">
                      {transactionView.no}
                    </TableCell>
                    <TableCell className="text-center">
                      {transactionView.name}
                    </TableCell>
                    <TableCell className="text-center">
                      {transactionView.total}
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
