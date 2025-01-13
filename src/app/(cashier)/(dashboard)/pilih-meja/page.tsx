"use client";

import React, { useState } from "react";
import Image from "next/image";
import clear from "@assets/clearIcon.png";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import {
  BackSVGKasir,
  MoneyCardSVG,
  MoneyCashSVG,
  MoneyQrisSVG,
  RiwayatSVG,
  WarningSVG,
} from "@/constants/svgIcons";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import PaymentModal from "@/components/ui/modal/payment";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DarkModeComponents } from "@/components/ui/darkModeButton";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import DetailModal from "@/components/ui/modal/detailAndo";

interface DetailInvoice {
  id: number;
  name: string;
  quantity: number;
  price: number;
  subTotal: number;
}

function SelectTable() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isPaymentCashModalOpen, setIsPaymentCashModalOpen] = useState(false);
  const [isConfirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
  const [pinValue, setPinValue] = useState<string>("");
  const [activeFilter, setActiveFilter] = useState("Semua Meja");
  const [activeFilterTakeAway, setActiveFilterTakeAway] = useState("Semua");

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
    { id: 6, status: "terisi" },
    { id: 7, status: "tersedia" },
    { id: 8, status: "terisi" },
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
    {
      id: 4,
      name: "Mie kuah pedas",
      quantity: 2,
      price: 20000,
      subTotal: 30000,
    },
    {
      id: 5,
      name: "Mie kuah pedas",
      quantity: 2,
      price: 20000,
      subTotal: 30000,
    },
  ];

  const pinCashPaymentSchema = z.object({
    pin: z.string().length(6, "Pin harus 6 digit"),
  });

  const pinCashSchema = z.object({
    cash: z.string().min(1, "Cash On Hand Tidak Boleh Kosong"),
  });

  type PinCashTunaiFormData = z.infer<typeof pinCashPaymentSchema>;

  const {
    handleSubmit,
    register: register,
    formState: { errors },
  } = useForm<PinCashTunaiFormData>({
    resolver: zodResolver(pinCashSchema),
    defaultValues: {
      pin: "",
    },
  });

  const formatRupiah = (angka: any) => {
    const number = angka.toString().replace(/\D/g, "");
    const formatted = new Intl.NumberFormat("id-ID").format(number);
    return `Rp ${formatted}`;
  };

  const calculateChange = () => {
    const totalAmount = 10000;
    const paymentAmount = parseInt(pinValue.replace(/\D/g, "") || "0");
    const change = paymentAmount - totalAmount;
    if (change < 0) {
      return `-${formatRupiah(Math.abs(change))}`;
    } else {
      return change >= 0 ? formatRupiah(change) : "Rp 0";
    }
  };

  const handleButtonClick = (num: any) => {
    const newValue = pinValue.replace(/\D/g, "") + num;
    setPinValue(formatRupiah(newValue));
  };

  const handleDelete = () => {
    const numericValue = pinValue.replace(/\D/g, "");
    const newValue = numericValue.slice(0, -1);
    setPinValue(newValue ? formatRupiah(newValue) : "");
  };

  const onSubmit = (e: any) => {
    e.preventDefault();
    console.log("Nominal Payment :", pinValue.replace(/\D/g, ""));
    console.log("Retun Emount :", calculateChange());
  };

  // const onSubmit: SubmitHandler<PinCashTunaiFormData> = async (data) => {
  //   console.log("Form data:", data);
  //   setLoading(true);
  //   const formData = new FormData();
  //   formData.append("name", data.pin);
  //   try {
  //     await axiosPrivateInstance.post("/", formData);
  //     showAlert2("success", "Berhasil menambahkan data.");
  //     navigate.push("/category");
  //   } catch (error) {
  //     if (error instanceof AxiosError) {
  //       const errorMessage =
  //         error.response?.data?.data?.[0]?.message || "Gagal menambahkan data.";
  //       showAlert2("error", errorMessage);
  //     } else {
  //       showAlert2("error", "Terjadi kesalahan!");
  //     }
  //   } finally {
  //     setLoading(false);
  //     setIsCreateModalOpen(false);
  //     reset();
  //   }
  // };

  return (
    <>
      <section className="text-sm border border-b pt-4 pb-4 pl-8 pr-8 flex justify-between">
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

          {/* Modal Take Away */}
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <button className="rounded-3xl text-sm bg-secondaryColor text-white p-1 px-2">
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
                <div className="flex flex-col h-full text-sm">
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
                        <span className="text-[#114F44] font-bold text-xs p-2">
                          10
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 text-sm">
                    <div className="flex gap-2 pb-4">
                      <button
                        className={`rounded-3xl text-sm p-1 px-2 h-fit border ${
                          activeFilterTakeAway === "Semua"
                            ? "bg-[#FFF5EE] border-primaryColor text-primaryColor"
                            : ""
                        }`}
                        onClick={() => handleFilterClickTakeAway("Semua")}
                      >
                        Semua
                      </button>
                      <button
                        className={`rounded-3xl text-sm p-1 px-2 border ${
                          activeFilterTakeAway === "BelumBayar"
                            ? "bg-[#FFF5EE] border-primaryColor text-primaryColor"
                            : ""
                        }`}
                        onClick={() => handleFilterClickTakeAway("BelumBayar")}
                      >
                        Belum Bayar
                      </button>
                      <button
                        className={`rounded-3xl text-sm p-1 px-2 border ${
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
                      <div className="border rounded-xl text-xs">
                        <div className="flex justify-between border-b p-2">
                          <div className="space-y-0">
                            <div className="flex gap-2">
                              <span className="flex items-center text-[#828487]">
                                #INV873
                              </span>
                              <div className="rounded-3xl text-[10px] p-1.5 text-primaryColor bg-[#FEA026]/10">
                                Belum Bayar
                              </div>
                            </div>
                            <div className="text-black font-bold text-sm">
                              Putri Diana
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => setIsDetailModalOpen(true)}
                              className="rounded-3xl text-xs pl-2 pr-2 pt-1 pb-1 text-primaryColor bg-white border border-primaryColor h-fit justify-center m-auto"
                            >
                              Detail
                            </button>
                            <button className="rounded-3xl text-xs pl-2 pr-2 pt-1 pb-1 text-white bg-primaryColor h-fit justify-center m-auto">
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
                      <div className="border rounded-xl text-xs">
                        <div className="flex justify-between border-b p-2">
                          <div className="space-y-0">
                            <div className="flex gap-2">
                              <span className="flex items-center text-[#828487]">
                                #INV873
                              </span>
                              <div className="rounded-3xl text-[10px] p-1.5 text-[#35C335] bg-[#35C335]/10">
                                Sudah Bayar
                              </div>
                            </div>
                            <div className="text-black font-bold text-sm">
                              Putri Diana
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => setIsDetailModalOpen(true)}
                              className="rounded-3xl text-xs pl-2 pr-2 pt-1 pb-1 text-primaryColor bg-white border border-primaryColor h-fit justify-center m-auto"
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
          {/* Modal Take Away */}
        </div>

        <div className="flex gap-2 items-center">
          <button
            className={`rounded-3xl text-sm p-1 px-2 h-fit border ${
              activeFilter === "Semua Meja"
                ? "bg-[#FFF5EE] border-primaryColor text-primaryColor"
                : ""
            }`}
            onClick={() => handleFilterClick("Semua Meja")}
          >
            Semua Meja
          </button>
          <button
            className={`rounded-3xl text-sm p-1 px-2 border ${
              activeFilter === "Tersedia"
                ? "bg-[#FFF5EE] border-primaryColor text-primaryColor"
                : ""
            }`}
            onClick={() => handleFilterClick("Tersedia")}
          >
            Tersedia
          </button>
          <button
            className={`rounded-3xl text-sm p-1 px-2 border ${
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

      <section className="grid grid-cols-8 gap-14 pt-8 pb-8 pl-16 pr-16 *:aspect-square">
        {mejaData.map((meja) => (
          <button
            key={meja.id}
            className={`rounded-lg border p-3 ${
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
              } flex items-center justify-center w-12 h-12`}
            >
              <span
                className={`font-bold text-xs ${
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

      {/* Modal Detail Order */}
      <DetailModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        onDetail={() => setIsPaymentModalOpen(true)}
        title="Detail Pesanan"
        classNameDialogFooter="p-4 border-t flex md:justify-end"
        showKeluarButton={true}
        showCetakButton={true}
        showBuyyButton={true}
        classNameDialogHeader="border-none mt-8"
        classNameButton="w-fit rounded-3xl text-sm"
        classNameDialogTitle="text-center font-bold pb-4"
        closeButton={false}
      >
        <>
          <div className="justify-between flex text-sm">
            <div className="">
              <div className="text-secondaryColor font-bold">Take Away</div>
              <div className="text-black">Putri Diana</div>
            </div>
            <div className="">
              <div className="text-[#4F4F4F] font-bold">#Inv1231</div>
              <div className="text-[#989898]">19.35 WIB</div>
            </div>
          </div>

          <Table className="mt-4 mb-4 text-sm">
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

          <div className="flex justify-end items-end text-sm">
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
      {/* Modal Detail Order */}

      {/* Modal Payment */}
      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        onSubmit={handleSubmit}
        title="Pembayaran"
        classNameDialogFooter=""
        showCancelButton={false}
        showPrintButton={false}
        classNameDialogHeader="border-b p-5"
        classNameButton="w-full rounded-lg text-sm"
        classNameDialogTitle="text-left font-semibold"
        closeButton={true}
      >
        <>
          <div className="p-4 flex w-full text-sm">
            <div className="w-[75%] space-y-2">
              <div className="text-primaryColor font-semibold">Dine In</div>
              <div className="flex justify-between w-full">
                <div className="w-[70%]">
                  <div className="div">#INV1231, #INV1231, #INV1231</div>
                  <div className="div">19.35 WIB</div>
                </div>
                <div className="w-[30%]">
                  Meja : T-1 / T-2 T-1 / T-2 / T-1 / T-2
                </div>
              </div>
              <div className="w-full">
                <div className="div">Kasir : John Doe</div>
                <div className="div">Pemesan : Putri Diana</div>
              </div>
              <div className="overflow-y-auto h-[200px] overflow-auto space-y-2 scroll-container">
                <Table className="mt-4 mb-4 text-sm">
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
                        <TableCell className="text-start border-b text-[#19191C]">
                          {transaksiItem.name}
                        </TableCell>
                        <TableCell className="text-center border-b text-[#19191C]">
                          {transaksiItem.quantity}
                        </TableCell>
                        <TableCell className="text-right border-b text-[#19191C]">
                          Rp. {transaksiItem.price.toLocaleString()}
                        </TableCell>
                        <TableCell className="text-right border-b text-[#19191C]">
                          Rp. {transaksiItem.subTotal}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <div className="flex justify-end items-end text-sm !mt-6">
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
                    <span className="text-[#19191C]">TOTAL</span>
                    <span className="text-primaryColor">Rp. 105.000</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-[25%] border-l pl-8 ml-5 space-y-2">
              <Button
                variant={"default"}
                onClick={() => {
                  setIsPaymentCashModalOpen(true);
                }}
                className="justify-center text-sm p-2 h-fit w-full bg-primaryColor"
              >
                <span>
                  <MoneyCashSVG className="!w-6 !h-6" />
                </span>
                <span>Bayar dengan Tunai</span>
              </Button>
              <Button
                variant={"default"}
                className="justify-center text-sm p-2 h-fit w-full bg-primaryColor"
              >
                <span>
                  <MoneyCardSVG className="!w-6 !h-6" />
                </span>
                <span>Bayar dengan Kartu</span>
              </Button>
              <Button
                variant={"default"}
                className="justify-start text-sm p-2 h-fit w-full bg-primaryColor"
              >
                <span>
                  <MoneyQrisSVG className="!w-6 !h-6" />
                </span>
                <span>QRIS</span>
              </Button>
            </div>
          </div>
        </>
      </PaymentModal>
      {/* Modal Payment */}

      {/* Modal Payment Cash */}
      <PaymentModal
        isOpen={isPaymentCashModalOpen}
        onClose={() => setIsPaymentCashModalOpen(false)}
        onSubmit={handleSubmit}
        title="Tunai"
        classNameDialogFooter=""
        showCancelButton={false}
        showPrintButton={false}
        classNameDialogHeader=""
        classNameButton="w-full rounded-lg text-sm"
        classNameDialogTitle="text-left font-semibold"
        closeButton={false}
        classNameDialogContent="sm:max-w-[400px] pt-3 pl-3 pr-3"
        classNameContent=""
      >
        <>
          <form onSubmit={onSubmit} className="space-y-4" id="paymentForm">
            <div className="space-y-1">
              <Label className="text-sm" htmlFor="name">
                Masukkan Nominal Pembayaran
              </Label>
              <Input
                type="text"
                id="name"
                placeholder="Rp. 0"
                className="w-full"
                value={pinValue}
                {...register("pin")}
                onChange={(e) => {
                  const numericValue = e.target.value.replace(/\D/g, "");
                  setPinValue(formatRupiah(numericValue));
                }}
              />
              {errors.pin && (
                <span className="text-sm text-red-500">
                  {errors.pin.message}
                </span>
              )}
            </div>

            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-2 sm:gap-2 md:gap-3">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => handleButtonClick(num)}
                    className="w-full h-9 sm:h-9 md:h-10 font-semibold text-[#334155] rounded-md bg-[#E2E8F0] hover:bg-[#dae1e9] flex items-center justify-center text-sm sm:text-sm md:text-base"
                  >
                    {num}
                  </button>
                ))}
              </div>
              <div className="grid grid-cols-3 gap-2 sm:gap-2 md:gap-3">
                <button
                  type="button"
                  onClick={handleDelete}
                  className="w-full h-9 sm:h-9 md:h-10 font-semibold text-[#334155] rounded-md bg-[#E2E8F0] hover:bg-[#dae1e9] flex items-center justify-center"
                >
                  <Image
                    src={clear}
                    alt="clear"
                    className="w-5 sm:w-5 md:w-6"
                    unoptimized
                  />
                </button>
                <button
                  type="button"
                  onClick={() => handleButtonClick(0)}
                  className="col-span-1 h-9 sm:h-9 md:h-10 font-semibold text-[#334155] rounded-md bg-[#E2E8F0] hover:bg-[#dae1e9] flex items-center justify-center text-sm sm:text-sm md:text-base"
                >
                  0
                </button>
                <button
                  type="button"
                  onClick={() => setConfirmationDialogOpen(true)}
                  className="col-span-1 h-9 sm:h-9 md:h-10 font-semibold text-white rounded-md bg-secondaryColor hover:bg-secondaryColor flex items-center justify-center text-sm"
                >
                  OK
                </button>
              </div>
            </div>

            <div className="space-y-1">
              <Label className="text-sm" htmlFor="change">
                Jumlah Kembalian
              </Label>
              <Input
                type="text"
                id="change"
                className="w-full"
                value={calculateChange()}
                readOnly
              />
            </div>

            {/* Modal Validation Cash Payment */}
            <Dialog
              open={isConfirmationDialogOpen}
              onOpenChange={setConfirmationDialogOpen}
            >
              <DialogTrigger asChild>
                <button className="w-full h-9 sm:h-9 md:h-10 rounded-md bg-[#114F44] hover:bg-[#104239] text-white font-medium text-sm sm:text-sm md:text-base">
                  Selesai
                </button>
              </DialogTrigger>
              <DialogContent className="w-[392px]">
                <DialogHeader className="relative p-4 rounded-lg">
                  <DialogTitle className="font-semibold text-black dark:text-white m-auto flex mb-4">
                    <WarningSVG />
                  </DialogTitle>
                  <DialogDescription className="text-lg font-bold text-center">
                    Apakah Pembayaran Selesai?
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter className="w-full pb-4 pl-4 pr-4 flex gap-2">
                  <DialogClose asChild>
                    <Button
                      className="w-full dark:text-white border-[#114F44] text-[#114F44]"
                      variant="outline"
                      type="button"
                    >
                      Gagal
                    </Button>
                  </DialogClose>
                  <DialogClose asChild>
                    <Button
                      type="submit"
                      className="w-full"
                      variant="default"
                      form="paymentForm"
                    >
                      Selesai
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            {/* Modal Validation Cash Payment */}
          </form>
        </>
      </PaymentModal>
      {/* Modal Payment Cash */}

      <DarkModeComponents className="hidden" />
    </>
  );
}

export default SelectTable;
