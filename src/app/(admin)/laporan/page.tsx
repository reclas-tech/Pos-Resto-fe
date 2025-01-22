"use client";

import React from "react";
import { useState } from "react";
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
  TotalIncomeSVG,
  TotalTransactionsSVG,
} from "@/constants/svgIcons";
import { Checkbox } from "@/components/ui/checkbox";
import { useGetReport, useGetSummary } from "@/components/parts/admin/laporan/api";
import DataIncomeComparation from "@/components/parts/admin/laporan/DataIncomeComparation";
import GrafikPendapatan from "@/components/parts/admin/laporan/DataIncomeGraph";

function LaporanAdminPage() {
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [selectedMonth, setSelectedMonth] = useState<string>();
  const [selectedYear, setSelectedYear] = useState<string>();
  const [includeCharity, setIncludeCharity] = useState(false);
  const [filterType, setFilterType] = useState<'date-range' | 'month-year'>('month-year');
  const [kitchen, setKitchen] = useState<string>("");

  // Format dates for API
  const formattedStartDate = startDate ? format(startDate, 'yyyy-MM-dd') : '';
  const formattedEndDate = endDate ? format(endDate, 'yyyy-MM-dd') : '';

  const { data: dataReport, error, isLoading } = useGetReport(
    formattedStartDate,
    formattedEndDate,
    selectedMonth || '',
    selectedYear || '',
    includeCharity ? 'true' : 'false'
  );

  const { data: dataSummary } = useGetSummary(kitchen, formattedStartDate, formattedEndDate);

  // Calculate totals for kitchens
  const kitchenTotal = dataReport?.data.kitchens.reduce(
    (acc, kitchen) => acc + kitchen.income,
    0
  ) || 0;

  // Calculate totals for categories
  const categoryTotal = dataReport?.data.categories.reduce(
    (acc, category) => acc + category.income,
    0
  ) || 0;

  return (
    <>
      <div className="flex items-center gap-2 text-secondaryColor dark:text-primaryColor font-bold text-3xl mb-5">
        Laporan Keuangan
      </div>
      <main className="space-y-6">
        <section className="flex justify-start gap-2 w-full">
          <div className="w-fit">
            <Select value={kitchen} onValueChange={setKitchen}>
              <SelectTrigger className="w-[130px] px-2 gap-2 dark:text-white">
                <SelectValue placeholder="Pilih Dapur" className="text-[#9E9E9E]" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="Semua">Semua</SelectItem>
                  <SelectItem value="9e054677-6082-48a6-8757-f5fd6a9ff117">Dapur 1</SelectItem>
                  <SelectItem value="Dapur2">Dapur 2</SelectItem>
                  <SelectItem value="Dapur3">Dapur 3</SelectItem>
                  <SelectItem value="Dapur4">Dapur 4</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="w-fit justify-between flex gap-2 text-sm">
            {/* Calendar untuk Tanggal Awal dan Akhir */}
            <div className="fit">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn("w-full justify-between items-center text-left font-normal border-[#E4E4E7]", !startDate && "text-muted-foreground")}
                  >
                    <span>{startDate ? format(startDate, "dd-MM-yyyy") : "Tanggal Awal"}</span>
                    <CalendarIcon className="ml-2 text-secondaryColor dark:text-white" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={startDate} onSelect={setStartDate} initialFocus />
                </PopoverContent>
              </Popover>
            </div>
            <div className="fit items-center flex">to</div>
            {/* Calendar untuk Tanggal Akhir */}
            <div className="fit">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn("w-full justify-between items-center text-left font-normal border-[#E4E4E7]", !endDate && "text-muted-foreground")}
                  >
                    <span>{endDate ? format(endDate, "dd-MM-yyyy") : "Tanggal Akhir"}</span>
                    <CalendarIcon className="ml-2 text-secondaryColor dark:text-white" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={endDate} onSelect={setEndDate} initialFocus />
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
              <div className="text-black text-xm font-semibold">
                Rp. {dataSummary?.data.income.toLocaleString()}
              </div>
              <div className="text-[#030229] text-xs">Total Pendapatan</div>
            </div>
          </div>
          <div className="bg-white p-5 flex gap-4 shadow-lg rounded-lg border w-full">
            <button className="p-2 rounded-full bg-[#FEA026]/10 flex items-center justify-center w-12 h-12">
              <TotalTransactionsSVG />
            </button>
            <div className="justify-start text-start">
              <div className="text-black text-xm font-semibold">
                {dataSummary?.data.transaction.toLocaleString()}
              </div>
              <div className="text-[#030229] text-xs">Total Transaksi</div>
            </div>
          </div>
          <div className="bg-white p-5 flex gap-4 shadow-lg rounded-lg border w-full">
            <button className="p-2 rounded-full bg-[#5B81FF]/10 flex items-center justify-center w-12 h-12">
              <AverageIncomeSVG />
            </button>
            <div className="justify-start text-start">
              <div className="text-black text-xm font-semibold">
                Rp. {dataSummary?.data.mean.toLocaleString()}
              </div>
              <div className="text-[#030229] text-xs">Rata Pendapatan</div>
            </div>
          </div>
          <div className="bg-white p-5 flex gap-4 shadow-lg rounded-lg border w-full">
            <button className="p-2 rounded-full bg-[#FF8F6B]/10 flex items-center justify-center w-12 h-12">
              <ProductsSoldSVG />
            </button>
            <div className="justify-start text-start">
              <div className="text-black text-xm font-semibold">
                {dataSummary?.data.product.toLocaleString()}
              </div>
              <div className="text-[#030229] text-xs">Produk Terjual</div>
            </div>
          </div>
        </section>

        <section className="space-y-8">
          <GrafikPendapatan />
          <DataIncomeComparation />
        </section>

        <section className="space-y-8 text-sm">
          <div className="p-10 rounded-lg bg-white">
            <div className="flex justify-between mb-4">
              <div className="w-fit justify-start flex gap-2">
                {/* Start Date */}
                <div className="fit">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-between items-center text-left font-normal border-[#E4E4E7]",
                          !startDate && "text-muted-foreground"
                        )}
                      >
                        <span>
                          {startDate ? format(startDate, "dd-MM-yyyy") : "Tanggal Awal"}
                        </span>
                        <CalendarIcon className="ml-2 text-secondaryColor dark:text-white" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={startDate}
                        onSelect={setStartDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="fit items-center flex">to</div>

                {/* End Date */}
                <div className="fit">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-between items-center text-left font-normal border-[#E4E4E7]",
                          !endDate && "text-muted-foreground"
                        )}
                      >
                        <span>
                          {endDate ? format(endDate, "dd-MM-yyyy") : "Tanggal Akhir"}
                        </span>
                        <CalendarIcon className="ml-2 text-secondaryColor dark:text-white" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={endDate}
                        onSelect={setEndDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                {/* Month Select */}
                <div className="w-fit">
                  <Select onValueChange={setSelectedMonth}>
                    <SelectTrigger className="w-[130px] px-2 gap-2">
                      <SelectValue placeholder="Pilih Bulan" className="text-[#9E9E9E]" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="01">Januari</SelectItem>
                        <SelectItem value="02">Februari</SelectItem>
                        <SelectItem value="03">Maret</SelectItem>
                        <SelectItem value="04">April</SelectItem>
                        <SelectItem value="05">Mei</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>

                {/* Year Select */}
                <div className="w-fit">
                  <Select onValueChange={setSelectedYear}>
                    <SelectTrigger className="w-[130px] px-2 gap-2">
                      <SelectValue placeholder="Pilih Tahun" className="text-[#9E9E9E]" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="2023">2023</SelectItem>
                        <SelectItem value="2024">2024</SelectItem>
                        <SelectItem value="2025">2025</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Print Button */}
              <div className="div">
                <Button variant="default">
                  <PrintSVG className="text-white dark:text-secondaryColor" />
                  <span>Print</span>
                </Button>
              </div>
            </div>

            {/* This is the checkbox control */}
            <div className="border-2 rounded-lg border-black/10 flex p-2 gap-2 w-fit">
              <Checkbox
                className="text-black/30 border-2 border-black/30"
                id="charity"
                checked={includeCharity}
                onCheckedChange={(checked) => {
                  setIncludeCharity(checked as boolean);
                  // If charity is checked, automatically switch to month-year filter
                  if (checked) {
                    setFilterType('month-year');
                    setStartDate(undefined);
                    setEndDate(undefined);
                  }
                }}
                // Disable checkbox if using date range
                disabled={filterType === 'date-range'}
              />
              <div className="grid gap-1.5 leading-none">
                <label
                  htmlFor="charity"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 items-center flex"
                >
                  Potongan Anak Yatim
                </label>
              </div>
            </div>


            {/* Report Content */}
            {isLoading ? (
              <div className="text-center p-10">Loading...</div>
            ) : error ? (
              <div className="text-center p-10 text-red-500">Error loading report data</div>
            ) : dataReport && (
              <div id="report-content" className="m-10 mt-4 shadow-lg border bg-white">
                <div className="p-10 space-y-10 text-sm">
                  {/* Header */}
                  <div className="space-y-4">
                    <div className="text-center font-semibold text-xl mb-2">
                      Laporan Penjualan <br /> Waroeng Aceh Garuda
                    </div>
                    <div className="text-center text-sm">
                      Periode{" "}
                      {startDate
                        ? format(new Date(startDate), "d MMMM yyyy")
                        : dataReport?.data?.start
                          ? format(new Date(dataReport.data.start), "d MMMM yyyy")
                          : format(new Date(), "d MMMM yyyy")}
                      {" - "}
                      {endDate
                        ? format(new Date(endDate), "d MMMM yyyy")
                        : dataReport?.data?.end
                          ? format(new Date(dataReport.data.end), "d MMMM yyyy")
                          : format(new Date(), "d MMMM yyyy")}
                    </div>

                  </div>

                  {/* Financial Summary */}
                  <div className="space-y-4">
                    <div className="border border-dashed border-black/50 mt-8"></div>
                    <div className="flex justify-between text-[#707275]">
                      <div>Total Penjualan</div>
                      <div>Rp. {dataReport?.data?.income.toLocaleString()}</div>
                    </div>
                    <div className="flex justify-between text-[#707275]">
                      <div>Potongan PPN/PB {dataReport?.data?.tax_percent}%</div>
                      <div>Rp. {dataReport?.data?.tax.toLocaleString()}</div>
                    </div>
                    <div className="flex justify-between text-[#707275]">
                      <div>Potongan Harga Pokok Penjualan (HPP) </div>
                      <div>Rp. {dataReport?.data?.cogp.toLocaleString()}</div>
                    </div>
                    {/* This is the charity amount display */}
                    {filterType === 'month-year' && includeCharity && dataReport?.data?.charity && (
                      <div className="flex justify-between text-[#707275]">
                        <div>Potongan {dataReport?.data?.charity_percent}% Anak Yatim (Bulan)</div>
                        <div>Rp. {dataReport?.data?.charity.toLocaleString()}</div>
                      </div>
                    )}
                    <div className="border border-dashed border-black/50 mt-8"></div>
                    <div className="flex justify-between text-black font-bold text-lg">
                      <div>TOTAL LABA BERSIH</div>
                      <div>Rp. {(
                        dataReport?.data?.income -
                        dataReport?.data?.tax -
                        dataReport?.data?.cogp -
                        (filterType === 'month-year' && includeCharity && dataReport?.data?.charity ? dataReport?.data?.charity : 0)
                      ).toLocaleString()}</div>
                    </div>
                  </div>

                  {/* Transaction Summary */}
                  <div className="space-y-4">
                    <div className="font-semibold">Transaksi</div>
                    <div className="border"></div>
                    <div className="flex justify-between text-[#707275]">
                      <div>Jumlah Transaksi </div>
                      <div>{dataReport?.data?.transaction}</div>
                    </div>
                    <div className="flex justify-between text-[#707275]">
                      <div>Jumlah Transaksi Selesai</div>
                      <div>{dataReport?.data?.transaction_success}</div>
                    </div>
                    <div className="flex justify-between text-[#707275]">
                      <div>Jumlah Transaksi Dibatalkan</div>
                      <div>{dataReport?.data?.transaction_failed}</div>
                    </div>
                  </div>

                  {/* Invoice Summary */}
                  <div className="space-y-4">
                    <div className="font-semibold">Invoice</div>
                    <div className="border"></div>
                    <div className="flex justify-between text-[#707275]">
                      <div>Jumlah Invoice</div>
                      <div>{dataReport?.data?.transaction}</div>
                    </div>
                    <div className="flex justify-between text-[#707275]">
                      <div>Jumlah Pendapatan Invoice</div>
                      <div>Rp. {dataReport?.data?.income.toLocaleString()}</div>
                    </div>
                    <div className="flex justify-between text-[#707275]">
                      <div>Rata Rata Jumlah Pendapatan Invoice</div>
                      <div>Rp. {dataReport?.data.avg_income.toLocaleString()}/Invoice</div>
                    </div>
                    <div className="flex justify-between text-[#707275]">
                      <div>Jumlah Produk Terjual</div>
                      <div>{dataReport?.data?.product_count} Produk</div>
                    </div>
                  </div>

                  {/* Kitchen Sales */}
                  <div className="space-y-4">
                    <div className="font-semibold">Penjualan Produk Berdasarkan Dapur</div>
                    <div className="border"></div>
                    {dataReport?.data?.kitchens.map((kitchen) => (
                      <div key={kitchen?.id} className="flex justify-between text-[#707275]">
                        <div className="w-full text-start">{kitchen?.name}</div>
                        <div className="w-full text-center">{kitchen?.quantity}</div>
                        <div className="w-full text-end">Rp. {kitchen?.income.toLocaleString()}</div>
                      </div>
                    ))}
                    <div className="border border-dashed border-black/50 mt-8"></div>
                    <div className="flex justify-between text-black font-bold text-lg">
                      <div>TOTAL</div>
                      <div>Rp. {kitchenTotal.toLocaleString()}</div>
                    </div>
                  </div>

                  {/* Category Sales */}
                  <div className="space-y-4">
                    <div className="font-semibold">Penjualan Produk Berdasarkan Kategori</div>
                    <div className="border"></div>
                    {dataReport?.data?.categories.map((category) => (
                      <div key={category?.id} className="flex justify-between text-[#707275]">
                        <div className="w-full">{category?.name}</div>
                        <div className="w-full text-center">{category?.quantity}</div>
                        <div className="w-full text-end">Rp. {category?.income.toLocaleString()}</div>
                      </div>
                    ))}
                    <div className="border border-dashed border-black/50 mt-8"></div>
                    <div className="flex justify-between text-black font-bold text-lg">
                      <div>TOTAL</div>
                      <div>Rp. {categoryTotal.toLocaleString()}</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

      </main>
    </>
  );
}

export default LaporanAdminPage;
