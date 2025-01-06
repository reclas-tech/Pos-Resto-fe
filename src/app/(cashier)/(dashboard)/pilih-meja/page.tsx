"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { DarkModeComponents } from "@/components/ui/darkModeButton";
import { Dialog, DialogPortal, DialogTrigger } from "@/components/ui/dialog";
import { motion } from "framer-motion";
import DetailModal from "@/components/ui/modal/detailAndo";
import { BackSVGKasir, RiwayatSVG } from "@/constants/svgIcons";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface DetailInvoice {
  id: number;
  name: string;
  quantity: number;
  price: number;
  subTotal: number;
}

function SelectTable() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("Semua Meja");
  const [activeFilterTakeAway, setActiveFilterTakeAway] = useState("Semua");
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const handleDetail = () => {
    console.log("Data diedit");
  };
  const handleFilterClick = (filter: React.SetStateAction<string>) => {
    setActiveFilter(filter);
    console.log(`Filter aktif: ${filter}`);
  };
  const handleFilterClickTakeAway = (filter: React.SetStateAction<string>) => {
    setActiveFilterTakeAway(filter);
    console.log(`Filter aktif: ${filter}`);
  };
  const mejaData = [
    { id: 1, status: "tersedia" },
    { id: 2, status: "terisi" },
    { id: 3, status: "tersedia" },
    { id: 4, status: "tersedia" },
    { id: 5, status: "terisi" },
  ];
  const transaksi: DetailInvoice[] = [
    {
      id: 1,
      name: "Steak sapi bakar",
      quantity: 1,
      price: 20000,
      subTotal: 30000,
    },
    {
      id: 2,
      name: "Ayam kentang",
      quantity: 1,
      price: 20000,
      subTotal: 30000,
    },
    {
      id: 3,
      name: "Mie kuah pedas",
      quantity: 2,
      price: 20000,
      subTotal: 30000,
    },
  ];

  return (
    <>
      <section className="text-xs border border-b pt-2 pb-2 pl-6 pr-6 flex justify-between">
        <div className="flex gap-4 items-center">
          <div className="flex gap-2">
            <div className="flex justify-center items-center aspect-square h-4 w-4 rounded-full bg-[#3395F0]/10 shadow focus:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50">
              <div className="h-2.5 w-2.5 bg-[#3395F0]/90 rounded-full" />
            </div>
            <div className="">
              Tersedia ({mejaData.filter((m) => m.status === "tersedia").length}
              )
            </div>
          </div>

          <div className="flex gap-2">
            <div className="flex justify-center items-center aspect-square h-4 w-4 rounded-full bg-[#FEA026]/10 shadow focus:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50">
              <div className="h-2.5 w-2.5 bg-primaryColor rounded-full" />
            </div>
            <div className="">
              Terisi ({mejaData.filter((m) => m.status === "terisi").length})
            </div>
          </div>

          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <button className="rounded-3xl text-xs bg-secondaryColor text-white p-1 px-2">
                Take Away
              </button>
            </DialogTrigger>
            <DialogPortal>
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: isOpen ? 0 : "100%" }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="fixed top-0 right-0 h-full max-w-xs w-full bg-white shadow-lg border-l z-50"
              >
                <div className="flex flex-col h-full text-xs">
                  <div className="flex justify-between w-full border-b pl-4 pr-4 pt-2 pb-2">
                    <Button
                      variant={"ghostButton"}
                      onClick={() => setIsOpen(false)}
                      className="text-gray-600 hover:text-gray-800 p-0"
                    >
                      <BackSVGKasir />
                    </Button>
                    <div className="flex space-x-2 font-bold">
                      <div className="text-secondaryColor flex items-center text-sm">
                        Take Away
                      </div>
                      <div className="rounded-full bg-[#114F44]/10 flex items-center h-fit justify-center m-auto">
                        <span className="text-[#114F44] font-bold text-[10px] p-2">
                          10
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 text-xs">
                    <div className="flex gap-2 pb-4">
                      {/* <Button
                        variant="outline"
                        className="rounded-3xl text-xs border-primaryColor bg-[#FFF5EE] text-primaryColor p-2"
                      > */}
                      <button
                        className={`rounded-3xl text-xs p-1 px-2 h-fit border ${
                          activeFilterTakeAway === "Semua"
                            ? "bg-[#FFF5EE] border-primaryColor text-primaryColor"
                            : ""
                        }`}
                        onClick={() => handleFilterClickTakeAway("Semua")}
                      >
                        Semua
                      </button>
                      <button
                        className={`rounded-3xl text-xs p-1 px-2 border ${
                          activeFilterTakeAway === "BelumBayar"
                            ? "bg-[#FFF5EE] border-primaryColor text-primaryColor"
                            : ""
                        }`}
                        onClick={() => handleFilterClickTakeAway("BelumBayar")}
                      >
                        Belum Bayar
                      </button>
                      <button
                        className={`rounded-3xl text-xs p-1 px-2 border ${
                          activeFilterTakeAway === "SudahBayar"
                            ? "bg-[#FFF5EE] border-primaryColor text-primaryColor"
                            : ""
                        }`}
                        onClick={() => handleFilterClickTakeAway("SudahBayar")}
                      >
                        Sudah Bayar
                      </button>
                    </div>
                    <div className="overflow-auto h-screen space-y-2 scroll-container">
                      <div className="border rounded-xl text-[10px]">
                        <div className="flex justify-between border-b p-2">
                          <div className="space-y-0">
                            <div className="flex gap-2">
                              <span className="flex items-center text-[#828487]">
                                #INV873
                              </span>
                              <div className="rounded-3xl text-[8px] p-1.5 text-primaryColor bg-[#FEA026]/10">
                                Belum Bayar
                              </div>
                            </div>
                            <div className="text-black font-bold text-xs">
                              Putri Diana
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => setIsDetailModalOpen(true)}
                              className="rounded-3xl text-[10px] pl-2 pr-2 pt-1 pb-1 text-primaryColor bg-white border border-primaryColor h-fit justify-center m-auto"
                            >
                              Detail
                            </button>
                            <button className="rounded-3xl text-[10px] pl-2 pr-2 pt-1 pb-1 text-white bg-primaryColor h-fit justify-center m-auto">
                              Bayar
                            </button>
                          </div>
                        </div>
                        <div className="flex justify-between border-b p-2">
                          <div className="text-[#828487] flex items-center">
                            7 Pesanan
                          </div>
                          <div className="flex gap-2">
                            <div className="text-black bg-[#F8F9FD] pl-2 pr-2 pt-1 pb-1 rounded-lg">
                              Rp. 120.000
                            </div>
                            <div className="flex gap-1 text-black bg-[#F8F9FD] pl-2 pr-2 pt-1 pb-1 rounded-lg">
                              <RiwayatSVG className="w-4 h-4" />
                              <div className="div">10.92</div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="border rounded-xl text-[10px]">
                        <div className="flex justify-between border-b p-2">
                          <div className="space-y-0">
                            <div className="flex gap-2">
                              <span className="flex items-center text-[#828487]">
                                #INV873
                              </span>
                              <div className="rounded-3xl text-[8px] p-1.5 text-[#35C335] bg-[#35C335]/10">
                                Sudah Bayar
                              </div>
                            </div>
                            <div className="text-black font-bold text-xs">
                              Putri Diana
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => setIsDetailModalOpen(true)}
                              className="rounded-3xl text-[10px] pl-2 pr-2 pt-1 pb-1 text-primaryColor bg-white border border-primaryColor h-fit justify-center m-auto"
                            >
                              Detail
                            </button>
                          </div>
                        </div>
                        <div className="flex justify-between border-b p-2">
                          <div className="text-[#828487] flex items-center">
                            7 Pesanan
                          </div>
                          <div className="flex gap-2">
                            <div className="text-black bg-[#F8F9FD] pl-2 pr-2 pt-1 pb-1 rounded-lg">
                              Rp. 120.000
                            </div>
                            <div className="flex gap-1 text-black bg-[#F8F9FD] pl-2 pr-2 pt-1 pb-1 rounded-lg">
                              <RiwayatSVG className="w-4 h-4" />
                              <div className="div">10.92</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </DialogPortal>
          </Dialog>
        </div>

        <div className="flex gap-2 items-center">
          <button
            className={`rounded-3xl text-xs p-1 px-2 h-fit border ${
              activeFilter === "Semua Meja"
                ? "bg-[#FFF5EE] border-primaryColor text-primaryColor"
                : ""
            }`}
            onClick={() => handleFilterClick("Semua Meja")}
          >
            Semua Meja
          </button>
          <button
            className={`rounded-3xl text-xs p-1 px-2 border ${
              activeFilter === "Tersedia"
                ? "bg-[#FFF5EE] border-primaryColor text-primaryColor"
                : ""
            }`}
            onClick={() => handleFilterClick("Tersedia")}
          >
            Tersedia
          </button>
          <button
            className={`rounded-3xl text-xs p-1 px-2 border ${
              activeFilter === "Terisi"
                ? "bg-[#FFF5EE] border-primaryColor text-primaryColor"
                : ""
            }`}
            onClick={() => handleFilterClick("Terisi")}
          >
            Terisi
          </button>
        </div>
      </section>

      <section className="grid grid-cols-8 gap-4 pt-6 pb-6 pl-12 pr-12">
        {mejaData.map((meja) => (
          <button
            key={meja.id}
            className={`rounded-lg border p-2 ${
              meja.status === "tersedia"
                ? "border-[#3395F0]"
                : "border-[#FEA026]"
            }`}
            onClick={() =>
              meja.status !== "tersedia" && setIsDetailModalOpen(true)
            }
          >
            <div
              className={`p-3 rounded-full ${
                meja.status === "tersedia"
                  ? "bg-[#3395F0]/10"
                  : "bg-[#FEA026]/10"
              }`}
            >
              <span
                className={`font-bold text-[10px] flex items-center justify-center ${
                  meja.status === "tersedia"
                    ? "text-[#3395F0]"
                    : "text-[#FEA026]"
                }`}
              >
                7-1
              </span>
            </div>
          </button>
        ))}
      </section>

      <DetailModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        onDetail={handleDetail}
        title="Detail Pesanan"
        classNameDialogFooter="p-4 border-t"
        showKeluarButton={true}
        showCetakButton={true}
        showBuyyButton={true}
        classNameDialogHeader="border-none p-4"
        classNameButton="w-fit rounded-3xl text-sm"
        classNameDialogTitle="text-center font-bold"
        closeButton={false}
      >
        <>
          <div className="justify-between flex text-xs">
            <div className="">
              <div className="text-secondaryColor font-bold">Take Away</div>
              <div className="text-black">Putri Diana</div>
            </div>
            <div className="">
              <div className="text-[#4F4F4F] font-bold">#Inv1231</div>
              <div className="text-[#989898]">19.35 WIB</div>
            </div>
          </div>

          <Table className="mt-4 mb-4 text-xs">
            <TableHeader className="bg-transparent">
              <TableRow className="border-none">
                <TableHead className="text-left border-b-2 text-[#636363]">
                  Nama
                </TableHead>
                <TableHead className="text-center border-b-2 text-[#636363]">
                  Jumlah
                </TableHead>
                <TableHead className="text-right border-b-2 text-[#636363]">
                  Harga
                </TableHead>
                <TableHead className="text-right border-b-2 text-[#636363]">
                  Subtotal
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transaksi.map((transaksiItem) => (
                <TableRow key={transaksiItem.id} className="border-none">
                  <TableCell className="text-start border-b text-[#6D6D6D]">
                    {transaksiItem.name}
                  </TableCell>
                  <TableCell className="text-center border-b text-[#6D6D6D]">
                    {transaksiItem.quantity}
                  </TableCell>
                  <TableCell className="text-right border-b text-[#6D6D6D]">
                    Rp. {transaksiItem.price.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right border-b text-[#6D6D6D]">
                    Rp. {transaksiItem.subTotal}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="flex justify-end items-end text-xs">
            <div className="text-end space-y-2">
              <div className="space-x-4">
                <span className="text-[#9C9C9C]">SUBTOTAL</span>
                <span className="text-[#19191C]">Rp. 95000</span>
              </div>
              <div className="space-x-4">
                <span className="text-[#9C9C9C]">PAJAK</span>
                <span className="text-[#19191C]">Rp. 10000</span>
              </div>
              <div className="space-x-4">
                <span className="text-[#9C9C9C]">TOTAL</span>
                <span className="text-primaryColor">Rp. 85000</span>
              </div>
            </div>
          </div>
        </>
      </DetailModal>

      <DarkModeComponents className="hidden" />
    </>
  );
}

export default SelectTable;
