"use client";

import React from "react";
import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  AverageIncomeSVG,
  PrintSVG,
  ProductsSoldSVG,
  TotalIncomeGrafikSVG,
  TotalIncomeSVG,
  TotalTransactionsSVG,
} from "@/constants/svgIcons";
import { Checkbox } from "@/components/ui/checkbox";

function LaporanAdminPage() {
  const [date, setDate] = useState<Date>();

  const incomeChart = [
    {
      name: "Januari",
      uv: 4000,
      pendapatan: 2400,
      amt: 2400,
    },
    {
      name: "Februari",
      uv: 3000,
      pendapatan: 1398,
      amt: 2210,
    },
    {
      name: "Maret",
      uv: 2000,
      pendapatan: 6800,
      amt: 2290,
    },
    {
      name: "April",
      uv: 2780,
      pendapatan: 3908,
      amt: 2000,
    },
    {
      name: "Mei",
      uv: 1890,
      pendapatan: 4800,
      amt: 2181,
    },
    {
      name: "Juni",
      uv: 2390,
      pendapatan: 3800,
      amt: 2500,
    },
    {
      name: "Juli",
      uv: 3490,
      pendapatan: 4300,
      amt: 2100,
    },
    {
      name: "Agustus",
      uv: 3490,
      pendapatan: 3900,
      amt: 2100,
    },
    {
      name: "September",
      uv: 3490,
      pendapatan: 4100,
      amt: 2100,
    },
    {
      name: "Oktober",
      uv: 3490,
      pendapatan: 4400,
      amt: 2100,
    },
    {
      name: "November",
      uv: 3490,
      pendapatan: 1000,
      amt: 2100,
    },
    {
      name: "Desember",
      uv: 3490,
      pendapatan: 2000,
      amt: 2100,
    },
  ];

  const salesComparisonBetweenKitchens = [
    {
      name: "Januari",
      uv: 4000,
      dapur1: 2400,
      dapur2: 6400,
      dapur3: 1400,
      amt: 2400,
    },
    {
      name: "Februari",
      uv: 3000,
      dapur1: 1398,
      dapur2: 4398,
      dapur3: 1398,
      amt: 2210,
    },
    {
      name: "Maret",
      uv: 2000,
      dapur1: 6800,
      dapur2: 5800,
      dapur3: 1800,
      amt: 2290,
    },
    {
      name: "April",
      uv: 2780,
      dapur1: 3908,
      dapur2: 6908,
      dapur3: 1908,
      amt: 2000,
    },
    {
      name: "Mei",
      uv: 1890,
      dapur1: 4800,
      dapur2: 8800,
      dapur3: 1800,
      amt: 2181,
    },
    {
      name: "Juni",
      uv: 2390,
      dapur1: 3800,
      dapur2: 5800,
      dapur3: 1800,
      amt: 2500,
    },
    {
      name: "Juli",
      uv: 3490,
      dapur1: 4300,
      dapur2: 2300,
      dapur3: 1300,
      amt: 2100,
    },
    {
      name: "Agustus",
      uv: 3490,
      dapur1: 3900,
      dapur2: 7900,
      dapur3: 1900,
      amt: 2100,
    },
    {
      name: "September",
      uv: 3490,
      dapur1: 4100,
      dapur2: 5100,
      dapur3: 1100,
      amt: 2100,
    },
    {
      name: "Oktober",
      uv: 3490,
      dapur1: 4400,
      dapur2: 4400,
      dapur3: 1400,
      amt: 2100,
    },
    {
      name: "November",
      uv: 3490,
      dapur1: 1000,
      dapur2: 3000,
      dapur3: 1000,
      amt: 2100,
    },
    {
      name: "Desember",
      uv: 3490,
      dapur1: 2000,
      dapur2: 1000,
      dapur3: 1000,
      amt: 2100,
    },
  ];

  return (
    <>
      <div className="flex items-center gap-2 text-secondaryColor dark:text-primaryColor font-bold text-3xl mb-5">
        Laporan Keuangan
      </div>
      <main className="space-y-6">
        <section className="flex justify-start gap-2 w-full">
          <div className="w-fit">
            <Select>
              <SelectTrigger className="w-[130px] px-2 gap-2 dark:text-white">
                <SelectValue
                  placeholder="Pilih Dapur"
                  className="text-[#9E9E9E]"
                />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="Keseluruhan">Keseluruhan</SelectItem>
                  <SelectItem value="Dapur1">Dapur 1</SelectItem>
                  <SelectItem value="Dapur2">Dapur 2</SelectItem>
                  <SelectItem value="Dapur3">Dapur 3</SelectItem>
                  <SelectItem value="Dapur4">Dapur 4</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="w-fit justify-between flex gap-2 text-sm">
            <div className="fit">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-between items-center text-left font-normal border-[#E4E4E7]",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <span>
                      {date ? format(date, "dd-MM-yyyy") : "Tanggal Awal"}
                    </span>
                    <CalendarIcon className="ml-2 text-secondaryColor dark:text-white" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="fit items-center flex">to</div>
            <div className="fit">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-between items-center text-left font-normal border-[#E4E4E7]",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <span>
                      {date ? format(date, "dd-MM-yyyy") : "Tanggal Akhir"}
                    </span>
                    <CalendarIcon className="ml-2 text-secondaryColor dark:text-white" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </section>

        <section className="flex justify-between gap-2">
          <div className="bg-white p-5 flex gap-4 shadow-lg rounded-lg border w-full">
            <button className="p-2 rounded-full bg-[#114F44]/10 flex items-center justify-center w-12 h-12">
              <TotalIncomeSVG />
            </button>
            <div className="justify-start text-start">
              <div className="text-black text-xm font-semibold">Rp. 30.000</div>
              <div className="text-[#030229] text-xs">Total Pendapatan</div>
            </div>
          </div>
          <div className="bg-white p-5 flex gap-4 shadow-lg rounded-lg border w-full">
            <button className="p-2 rounded-full bg-[#FEA026]/10 flex items-center justify-center w-12 h-12">
              <TotalTransactionsSVG />
            </button>
            <div className="justify-start text-start">
              <div className="text-black text-xm font-semibold">345</div>
              <div className="text-[#030229] text-xs">Total Transaksi</div>
            </div>
          </div>
          <div className="bg-white p-5 flex gap-4 shadow-lg rounded-lg border w-full">
            <button className="p-2 rounded-full bg-[#5B81FF]/10 flex items-center justify-center w-12 h-12">
              <AverageIncomeSVG />
            </button>
            <div className="justify-start text-start">
              <div className="text-black text-xm font-semibold">Rp.450.000</div>
              <div className="text-[#030229] text-xs">Rata Pendapatan</div>
            </div>
          </div>
          <div className="bg-white p-5 flex gap-4 shadow-lg rounded-lg border w-full">
            <button className="p-2 rounded-full bg-[#FF8F6B]/10 flex items-center justify-center w-12 h-12">
              <ProductsSoldSVG />
            </button>
            <div className="justify-start text-start">
              <div className="text-black text-xm font-semibold">678</div>
              <div className="text-[#030229] text-xs">Produk Terjual</div>
            </div>
          </div>
        </section>

        <section className="space-y-8">
          <div className="p-10 rounded-lg bg-[#F8F9FA]">
            <div className="flex justify-between mb-8">
              <div className="text-[#05004E] text-lg font-semibold flex items-center">
                Grafik Pendapatan
              </div>
              <div className="w-fit">
                <Select>
                  <SelectTrigger className="w-fit px-2 gap-2 border-secondaryColor">
                    <SelectValue
                      placeholder="2024"
                      className="text-[#9E9E9E]"
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="Semua">Semua</SelectItem>
                      <SelectItem value="2023">2023</SelectItem>
                      <SelectItem value="2024">2024</SelectItem>
                      <SelectItem value="2025">2025</SelectItem>
                      <SelectItem value="2026">2026</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="w-full h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  width={500}
                  height={300}
                  data={incomeChart}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                  barSize={44}
                >
                  <XAxis
                    dataKey="name"
                    scale="point"
                    padding={{ left: 40, right: 10 }}
                  />
                  {/* <YAxis /> */}
                  <Tooltip />
                  {/* <Legend /> */}
                  <CartesianGrid strokeDasharray="3 3" />
                  <Bar
                    dataKey="pendapatan"
                    fill="#FEA026"
                    background={{ fill: "#eee" }}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="p-5 flex gap-4 w-fit">
              <button className="p-2 rounded-xl bg-[#FEA026]/10 flex items-center justify-center w-12 h-12">
                <TotalIncomeGrafikSVG />
              </button>
              <div className="justify-start text-start">
                <div className="text-black text-xm font-semibold">
                  Pendapatan
                </div>
                <div className="text-[#030229] text-xs">Total Pendapatan</div>
              </div>
            </div>
          </div>

          <div className="p-10 rounded-lg bg-[#F8F9FA]">
            <div className="flex justify-between mb-8">
              <div className="text-[#05004E] text-lg font-semibold flex items-center">
                Perbandingan Penjualan Antar Dapur
              </div>
              <div className="w-fit">
                <Select>
                  <SelectTrigger className="w-fit px-2 gap-2 border-secondaryColor">
                    <SelectValue
                      placeholder="2024"
                      className="text-[#9E9E9E]"
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="Semua">Semua</SelectItem>
                      <SelectItem value="2023">2023</SelectItem>
                      <SelectItem value="2024">2024</SelectItem>
                      <SelectItem value="2025">2025</SelectItem>
                      <SelectItem value="2025">2026</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="w-full h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  width={500}
                  height={300}
                  data={salesComparisonBetweenKitchens}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                  barSize={20}
                  barCategoryGap="20%"
                  barGap={5}
                >
                  <XAxis
                    dataKey="name"
                    scale="point"
                    padding={{ left: 50, right: 10 }}
                  />
                  <YAxis />
                  <Tooltip />
                  <Legend
                    wrapperStyle={{
                      paddingTop: 20,
                      marginLeft: 40,
                    }}
                    layout="horizontal"
                    verticalAlign="bottom"
                    align="center"
                  />
                  <CartesianGrid strokeDasharray="3 3" />
                  <Bar
                    dataKey="dapur1"
                    fill="#FEA026"
                    background={{ fill: "#eee" }}
                    radius={[2, 2, 0, 0]}
                  />
                  <Bar
                    dataKey="dapur2"
                    fill="#EE1616"
                    background={{ fill: "#eee" }}
                    radius={[2, 2, 0, 0]}
                  />
                  <Bar
                    dataKey="dapur3"
                    fill="#114F44"
                    background={{ fill: "#eee" }}
                    radius={[2, 2, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </section>

        <section className="space-y-8 text-sm">
          <div className="p-10 rounded-lg bg-[#F8F9FA]">
            <div className="flex justify-between mb-4">
              <div className="w-fit justify-start flex gap-2">
                <div className="fit">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-between items-center text-left font-normal border-[#E4E4E7]",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <span>
                          {date ? format(date, "dd-MM-yyyy") : "Tanggal Awal"}
                        </span>
                        <CalendarIcon className="ml-2 text-secondaryColor dark:text-white" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="fit items-center flex">to</div>
                <div className="fit">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-between items-center text-left font-normal border-[#E4E4E7]",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <span>
                          {date ? format(date, "dd-MM-yyyy") : "Tanggal Akhir"}
                        </span>
                        <CalendarIcon className="ml-2 text-secondaryColor dark:text-white" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="w-fit">
                  <Select>
                    <SelectTrigger className="w-[130px] px-2 gap-2">
                      <SelectValue
                        placeholder="Pilih Bulan"
                        className="text-[#9E9E9E]"
                      />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="Januari">Januari</SelectItem>
                        <SelectItem value="Februari">Februari</SelectItem>
                        <SelectItem value="Maret">Maret</SelectItem>
                        <SelectItem value="April">April</SelectItem>
                        <SelectItem value="Mei">Mei</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div className="w-fit">
                  <Select>
                    <SelectTrigger className="w-[130px] px-2 gap-2">
                      <SelectValue
                        placeholder="Pilih Tahun"
                        className="text-[#9E9E9E]"
                      />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="Semua">Semua</SelectItem>
                        <SelectItem value="2023">2023</SelectItem>
                        <SelectItem value="2024">2024</SelectItem>
                        <SelectItem value="2025">2025</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="div">
                <Button className="" variant={"default"}>
                  <span>
                    <PrintSVG className="text-white dark:text-secondaryColor" />
                  </span>
                  <span>Print</span>
                </Button>
              </div>
            </div>
            <div className="border-2 rounded-lg border-black/10 flex p-2 gap-2 w-fit">
              <Checkbox
                className="text-black/30 border-2 border-black/30"
                id="terms1"
              />
              <div className="grid gap-1.5 leading-none">
                <label
                  htmlFor="terms1"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 items-center flex"
                >
                  Potongan Anak Yatim
                </label>
              </div>
            </div>
            <div className="m-10 mt-4 shadow-lg border">
              <div className="p-10 space-y-10 text-sm">
                <div className="space-y-4">
                  <div className="text-center font-semibold text-xl mb-2">
                    Laporan Penjualan <br /> Waroeng Aceh Garuda
                  </div>
                  <div className="text-center text-sm">
                    Periode 1 April 2024 - 30 April 2024
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="border border-dashed border-black/50 mt-8"></div>
                  <div className="flex justify-between text-[#707275]">
                    <div>Total Penjualan</div>
                    <div>Rp. 10.000.000</div>
                  </div>
                  <div className="flex justify-between text-[#707275]">
                    <div>Potongan PPN/PB 10%</div>
                    <div>Rp. 1.000.000</div>
                  </div>
                  <div className="flex justify-between text-[#707275]">
                    <div>Potongan 2.5% Anak Yatim (Bulan)</div>
                    <div>Rp. 250.000</div>
                  </div>
                  <div className="border border-dashed border-black/50 mt-8"></div>
                  <div className="flex justify-between text-black font-bold text-lg">
                    <div>TOTAL</div>
                    <div>Rp. 8.750.000</div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="border border-dashed border-black/50 mt-8"></div>
                  <div className="flex justify-between text-[#707275]">
                    <div>Total Penjualan</div>
                    <div>Rp. 10.000.000</div>
                  </div>
                  <div className="flex justify-between text-[#707275]">
                    <div>Total Harga Pokok Penjualan (HPP)</div>
                    <div>Rp. 1.000.000</div>
                  </div>
                  <div className="border border-dashed border-black/50 mt-8"></div>
                  <div className="flex justify-between text-black font-bold text-lg">
                    <div>TOTAL LABA BERSIH</div>
                    <div>Rp. 9.000.000</div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="font-semibold">Transaksi</div>
                  <div className="border"></div>
                  <div className="flex justify-between text-[#707275]">
                    <div>Total Penjualan</div>
                    <div>145</div>
                  </div>
                  <div className="flex justify-between text-[#707275]">
                    <div>Jumlah Transaksi Selesai</div>
                    <div>140</div>
                  </div>
                  <div className="flex justify-between text-[#707275]">
                    <div>Jumlah Transaksi Dibatalkan</div>
                    <div>5</div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="font-semibold">Invoice</div>
                  <div className="border"></div>
                  <div className="flex justify-between text-[#707275]">
                    <div>Jumlah Invoice</div>
                    <div>145</div>
                  </div>
                  <div className="flex justify-between text-[#707275]">
                    <div>Jumlah Pendapatan Invoice</div>
                    <div>Rp. 10.350.000</div>
                  </div>
                  <div className="flex justify-between text-[#707275]">
                    <div>Rata Rata Jumlah Pendapatan Invoice</div>
                    <div>Rp. 230.000/Invoice</div>
                  </div>
                  <div className="flex justify-between text-[#707275]">
                    <div>Jumlah Produk Terjual</div>
                    <div>980 Produk</div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="font-semibold">
                    Penjualan Produk Berdasarkan Dapur
                  </div>
                  <div className="border"></div>
                  <div className="flex justify-between text-[#707275]">
                    <div className="w-full text-start">Dapur 1</div>
                    <div className="w-full text-center">145</div>
                    <div className="w-full text-end">Rp. 800.000</div>
                  </div>
                  <div className="flex justify-between text-[#707275]">
                    <div className="w-full text-start">Dapur 2</div>
                    <div className="w-full text-center">123</div>
                    <div className="w-full text-end">Rp. 480.000</div>
                  </div>
                  <div className="flex justify-between text-[#707275]">
                    <div className="w-full text-start">Dapur 3</div>
                    <div className="w-full text-center">221</div>
                    <div className="w-full text-end">Rp. 765.000</div>
                  </div>
                  <div className="flex justify-between text-[#707275]">
                    <div className="w-full text-start">Dapur 4</div>
                    <div className="w-full text-center">311</div>
                    <div className="w-full text-end">Rp. 287.000</div>
                  </div>
                  <div className="border border-dashed border-black/50 mt-8"></div>
                  <div className="flex justify-between text-black font-bold text-lg">
                    <div>TOTAL</div>
                    <div>Rp. 3.180.000</div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="font-semibold">
                    Penjualan Produk Berdasarkan Kategori
                  </div>
                  <div className="border"></div>
                  <div className="flex justify-between text-[#707275]">
                    <div className="w-full">Makanan</div>
                    <div className="w-full text-center">145</div>
                    <div className="w-full text-end">Rp. 800.000</div>
                  </div>
                  <div className="flex justify-between text-[#707275]">
                    <div className="w-full">Minuman</div>
                    <div className="w-full text-center">123</div>
                    <div className="w-full text-end">Rp. 480.000</div>
                  </div>
                  <div className="flex justify-between text-[#707275]">
                    <div className="w-full">Snack</div>
                    <div className="w-full text-center">221</div>
                    <div className="w-full text-end">Rp. 765.000</div>
                  </div>
                  <div className="flex justify-between text-[#707275]">
                    <div className="w-full">Dessert</div>
                    <div className="w-full text-center">311</div>
                    <div className="w-full text-end">Rp. 287.000</div>
                  </div>
                  <div className="border border-dashed border-black/50 mt-8"></div>
                  <div className="flex justify-between text-black font-bold text-lg">
                    <div>TOTAL</div>
                    <div>Rp. 3.180.000</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default LaporanAdminPage;
