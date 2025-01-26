"use client";

import React, { useEffect } from "react";
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

import { Checkbox } from "@/components/ui/checkbox";
import { useGetReport, useGetYears } from "@/components/parts/admin/laporan/api";
import DataIncomeComparation from "@/components/parts/admin/laporan/DataIncomeComparation";
import GrafikPendapatan from "@/components/parts/admin/laporan/DataIncomeGraph";
import { PrintSVG } from "@/constants/svgIcons";
import DataSummary from "@/components/parts/admin/laporan/DataSummary";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

function LaporanAdminPage() {
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();
  const [selectedMonth, setSelectedMonth] = useState<string | undefined>();
  const [selectedYear, setSelectedYear] = useState<string | undefined>();
  const [includeCharity, setIncludeCharity] = useState<boolean>(false);

  const { data: dataReport, isLoading, error } = useGetReport(
    startDate?.toISOString() || "",
    endDate?.toISOString() || "",
    selectedMonth || "",
    selectedYear || "",
    "1000"
  );

  const { data: years } = useGetYears();

  // Logika untuk mematikan filter
  useEffect(() => {
    // Jika startDate atau endDate dipilih, reset selectedMonth dan selectedYear
    if (startDate || endDate) {
      setSelectedMonth(undefined);
      setSelectedYear(undefined);
    }
  }, [startDate, endDate]);

  useEffect(() => {
    // Jika selectedMonth atau selectedYear dipilih, reset startDate dan endDate
    if (selectedMonth || selectedYear) {
      setStartDate(undefined);
      setEndDate(undefined);
    }
  }, [selectedMonth, selectedYear]);

  const charityDisplay = includeCharity && dataReport?.data?.charity_percent ? (
    <div className="flex justify-between text-[#707275]">
      <div>Potongan 2.5% Anak Yatim (Bulan)</div>
      <div>Rp. {(dataReport?.data?.charity ?? 0).toLocaleString()}</div>
    </div>
  ) : null;

  console.log("lalalalalalala", dataReport?.data?.charity_percent)

  const netProfit = (
    (dataReport?.data?.income ?? 0) -
    (dataReport?.data?.tax ?? 0) -
    (dataReport?.data?.cogp ?? 0) -
    (includeCharity ? (dataReport?.data?.charity ?? 0) : 0)
  ).toLocaleString();

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

  const renderPeriod = () => {
    // Jika startDate dan endDate dipilih
    if (startDate && endDate) {
      return `${format(new Date(startDate), "d MMMM yyyy")} - ${format(new Date(endDate), "d MMMM yyyy")}`;
    }

    // Jika bulan dan tahun dipilih
    if (selectedMonth && selectedYear) {
      const monthName = new Date(`${selectedYear}-${selectedMonth}-01`).toLocaleString('id-ID', { month: 'long' });
      return `${monthName} ${selectedYear}`;
    }

    // Jika startDate atau endDate tidak dipilih dan bulan/tahun juga tidak dipilih, tampilkan periode default (misalnya tanggal saat ini)
    else {
      return `${format(new Date(), "d MMMM yyyy")}`;
    }
  };

  const downloadPDF = async () => {
    const element = document.getElementById("report-content");

    if (!element) {
      console.error("Report content not found!");
      return;
    }

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    const pdfWidth = 210;
    const pdfHeight = 297;

    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");
    const imgHeight = (canvas.height * pdfWidth) / canvas.width;

    let position = 0;

    while (position < imgHeight) {
      pdf.addImage(
        imgData,
        "PNG",
        0,
        position > 0 ? -position : 0,
        pdfWidth,
        imgHeight
      );
      position += pdfHeight;

      if (position < imgHeight) {
        pdf.addPage(imgData);
      }
    }

    pdf.save("Laporan-Penjualan.pdf");
  };

  return (
    <>
      <div className="flex items-center gap-2 text-secondaryColor dark:text-primaryColor font-bold text-3xl mb-5">
        Laporan Keuangan
      </div>
      <main className="space-y-6">

        <section>
          <DataSummary />
        </section>

        <section className="space-y-8">
          <GrafikPendapatan />
          <DataIncomeComparation />
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
                          !startDate && "text-muted-foreground"
                        )}
                        onClick={() => {
                          setSelectedMonth(undefined);
                          setSelectedYear(undefined);
                        }}
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
                <div className="fit">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-between items-center text-left font-normal border-[#E4E4E7]",
                          !endDate && "text-muted-foreground"
                        )}
                        onClick={() => {
                          setSelectedMonth(undefined);
                          setSelectedYear(undefined);
                        }}
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
                <div className="w-fit">
                  <Select
                    value={selectedMonth}
                    onValueChange={setSelectedMonth}
                  // disabled={!!startDate || !!endDate}
                  >
                    <SelectTrigger className="w-[130px] px-2 gap-2">
                      <SelectValue
                        placeholder="Pilih Bulan"
                        className="text-[#9E9E9E]"
                      />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="01">Januari</SelectItem>
                        <SelectItem value="02">Februari</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div className="w-fit">
                  {/* isabled={!!startDate || !!endDate} */}
                  <Select value={selectedYear} onValueChange={setSelectedYear}>
                    <SelectTrigger className="w-[130px] px-2 gap-2">
                      <SelectValue
                        placeholder={
                          isLoading
                            ? "Loading..."
                            : error
                              ? "Gagal memuat"
                              : "Pilih Tahun"
                        }
                        className="text-[#9E9E9E]"
                      />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {isLoading && (
                          <SelectItem value="loading" disabled>
                            Loading...
                          </SelectItem>
                        )}
                        {error && (
                          <SelectItem value="error" disabled>
                            Error memuat data
                          </SelectItem>
                        )}
                        {!isLoading && !error && years && years.length > 0 ? (
                          years.map((year) => (
                            <SelectItem key={year} value={year.toString()}>
                              {year}
                            </SelectItem>
                          ))
                        ) : (
                          !isLoading &&
                          !error && (
                            <SelectItem value="no-data" disabled>
                              Tidak ada data
                            </SelectItem>
                          )
                        )}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="div">
                <Button className="" variant={"default"} onClick={downloadPDF}>
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
                checked={includeCharity}
                onCheckedChange={(value) => setIncludeCharity(value === true)}
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
            {/* Report Content */}
            {isLoading ? (
              <div className="text-center p-10">Loading...</div>
            ) : error ? (
              <div className="text-center p-10 text-red-500">Error loading report data</div>
            ) : dataReport && (
              <>
                <div id="report-content" className="m-10 mt-4 shadow-lg border bg-white">
                  <div className="p-10 space-y-10 text-sm">
                    {/* Header */}
                    <div className="space-y-4">
                      <div className="text-center font-semibold text-xl mb-2">
                        Laporan Penjualan <br /> Waroeng Aceh Garuda
                      </div>
                      <div className="text-center text-sm">
                        Periode {renderPeriod()}
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
                      {charityDisplay}
                      <div className="border border-dashed border-black/50 mt-8"></div>
                      <div className="flex justify-between text-black font-bold text-lg">
                        <div>TOTAL LABA BERSIH</div>
                        <div>Rp. {netProfit}</div>
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
              </>
            )}

          </div>
        </section>
      </main>
    </>
  );
}

export default LaporanAdminPage;
