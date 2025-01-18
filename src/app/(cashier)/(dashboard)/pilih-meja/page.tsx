/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import clear from "@assets/clearIcon.png";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  BackSVGKasir,
  MoneyCardSVG,
  MoneyCashSVG,
  MoneyQrisSVG,
  SuccessSVG,
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
import DetailModal from "@/components/ui/modal/detailReusable";
import ProcessModal from "@/components/ui/modal/proses";
import ValidationModal from "@/components/ui/modal/validation";
import { useGetTableList, useGetTakeawayList } from "@/components/parts/cashier/pilih-meja/api";
import DataTableList from "@/components/parts/cashier/pilih-meja/DataTableList";
import DataTakeawayList from "@/components/parts/cashier/pilih-meja/DataTakeawayList";
import { Dialog, DialogPortal, DialogTrigger } from "@/components/ui/dialog";
import { motion } from "framer-motion";

interface DetailInvoice {
  id: number;
  name: string;
  quantity: number;
  price: number;
  subTotal: number;
}

// Handle validation input
const pinCashPaymentSchema = z.object({
  pin: z.string().length(6, "Pin harus 6 digit"),
});
const pinCashSchema = z.object({
  cash: z.string().min(1, "Cash On Hand Tidak Boleh Kosong"),
});
type PinCashTunaiFormData = z.infer<typeof pinCashPaymentSchema>;

function SelectTable() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDetailModalOpenDineIn, setIsDetailModalOpenDineIn] = useState(false);
  const [isDetailModalOpenTakeAway, setIsDetailModalOpenTakeAway] =
    useState(false);
  const [isPaymentModalOpenDineIn, setIsPaymentModalOpenDineIn] =
    useState(false);
  const [isPaymentModalOpenTakeAway, setIsPaymentModalOpenTakeAway] =
    useState(false);
  const [isPaymentCashModalOpen, setIsPaymentCashModalOpen] = useState(false);
  const [isModalProsesCard, setIsModalProsesCard] = useState(false);
  const [isModalProsesQris, setIsModalProsesQris] = useState(false);
  const [isValidationModal, setIsValidationModal] = useState(false);
  const [isValidationModalCash, setIsValidationModalCash] = useState(false);
  const [isPaymentSuccessModal, setIsPaymentSuccessModal] = useState(false);
  const [pinValue, setPinValue] = useState<string>("");
  const [activeFilter, setActiveFilter] = useState("Semua Meja");

  // Handle filter status state
  const status =
    activeFilter === "Semua Meja" ? "" : activeFilter.toLowerCase();

  // Data fetching
  const { data } = useGetTableList(status);

  // Handle count available and filled
  const availableCount =
    data?.data?.tables?.filter(
      (table: { status: string }) => table?.status === "tersedia"
    ).length || 0;
  const filledCount =
    data?.data?.tables?.filter(
      (table: { status: string }) => table?.status === "terisi"
    ).length || 0;

  const handleFilterClick = (filter: React.SetStateAction<string>) => {
    setActiveFilter(filter);
    console.log(`Filter aktif: ${filter}`);
  };

  // Data fetching
  const { data: takeawayLIst } = useGetTakeawayList(status);

  // Handle count Takeaway
  const availableCountTakeawayList =
    takeawayLIst?.data?.length || 0;
  console.log("Test", availableCountTakeawayList);

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

  // Handle formated Input
  const formatRupiah = (angka: any) => {
    const number = angka.toString().replace(/\D/g, "");
    const formatted = new Intl.NumberFormat("id-ID").format(number);
    return `Rp ${formatted}`;
  };

  // Handle button click
  const handleButtonClick = (num: any) => {
    const newValue = pinValue.replace(/\D/g, "") + num;
    setPinValue(formatRupiah(newValue));
  };

  // Handle dalate on input kyboard number
  const handleDelete = () => {
    const numericValue = pinValue.replace(/\D/g, "");
    const newValue = numericValue.slice(0, -1);
    setPinValue(newValue ? formatRupiah(newValue) : "");
  };

  // Handle calculate change total amount and payment amount
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

  // OnSubmit Cash Payment
  const onSubmit = (e: any) => {
    e.preventDefault();
    console.log("Nominal Payment :", pinValue.replace(/\D/g, ""));
    console.log("Retun Emount :", calculateChange());
  };

  // Handle Modal Process Payment
  const animationLoadingProcess = (index: number): string | undefined => {
    const sequence = [0, 1, 2, 5, 8, 7, 6, 3];
    const position = sequence.indexOf(index);
    return position === -1 ? undefined : `${position * 0.15}s`;
  };
  useEffect(() => {
    if (isModalProsesCard || isModalProsesQris) {
      const timer = setTimeout(() => {
        setIsModalProsesCard(false);
        setIsModalProsesQris(false);
        setIsValidationModal(true);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isModalProsesCard, isModalProsesQris]);

  return (
    <>
      <section className="text-sm border border-b pt-4 pb-4 pl-8 pr-8 flex justify-between">
        <div className="flex gap-4 items-center">
          <div className="flex gap-2">
            <div className="flex justify-center items-center aspect-square h-4 w-4 rounded-full bg-[#3395F0]/10 shadow focus:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50">
              <div className="h-2.5 w-2.5 bg-[#3395F0]/90 rounded-full" />
            </div>
            <div>Tersedia ({availableCount})</div>
          </div>

          <div className="flex gap-2">
            <div className="flex justify-center items-center aspect-square h-4 w-4 rounded-full bg-[#FEA026]/10 shadow focus:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50">
              <div className="h-2.5 w-2.5 bg-primaryColor rounded-full" />
            </div>
            <div>Terisi ({filledCount})</div>
          </div>

          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <button className="rounded-3xl text-sm bg-secondaryColor text-white p-1.5 px-3">
                Take Away
              </button>
            </DialogTrigger>
            <DialogPortal>
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: isOpen ? 0 : "100%" }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="fixed top-0 right-0 h-full max-w-sm w-full bg-white shadow-lg border-l z-50"
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
                          {availableCountTakeawayList}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 text-sm">
                    {/* Data Table List */}
                    <DataTakeawayList
                      data={takeawayLIst?.data}
                      statusCode={200}
                      message={"Daftar TakeawayList Berhasil Didapatkan"}
                    />
                  </div>
                </div>
              </motion.div>
            </DialogPortal>
          </Dialog>

        </div>

        {/* Handle Filter Status */}
        <div className="flex gap-2 items-center">
          {["Semua Meja", "Tersedia", "Terisi"].map((filter) => (
            <button
              key={filter}
              className={`rounded-3xl text-sm p-1.5 px-3 border ${activeFilter === filter
                ? "bg-[#FFF5EE] border-primaryColor text-primaryColor"
                : ""
                }`}
              onClick={() => handleFilterClick(filter)}
            >
              {filter}
            </button>
          ))}
        </div>
      </section>

      {/* Data Table List */}
      <DataTableList
        data={data?.data}
        statusCode={200}
        message={"Daftar Meja Berhasil Didapatkan"}
      />

      {/* Handle Dine In */}
      <>
        {/* Modal Detail Order Dine In */}
        <DetailModal
          isOpen={isDetailModalOpenDineIn}
          onClose={() => {
            setIsDetailModalOpenDineIn(false);
          }}
          onDetail={() => setIsPaymentModalOpenDineIn(true)}
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
          <div className="space-y-4">
            <div className="justify-between flex text-sm">
              <div className="text-start">
                <div className="text-primaryColor font-bold truncate max-w-[255px]">
                  Dine In / T-1, T-2, T-3
                </div>
                <div className="text-black">Putri Diana</div>
              </div>
              <div className="text-end">
                <div className="text-[#4F4F4F] font-bold truncate max-w-[255px]">
                  #INV1231, #INV234
                </div>
                <div className="text-[#989898]">19.35 WIB</div>
              </div>
            </div>

            <div className="overflow-y-auto h-[200px] overflow-auto space-y-2 scroll-container text-sm">
              <Table>
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
            </div>

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
          </div>
        </DetailModal>

        {/* Modal Payment Dine In */}
        <PaymentModal
          isOpen={isPaymentModalOpenDineIn}
          onClose={() => {
            setIsPaymentModalOpenDineIn(false);
          }}
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
                <div className="overflow-y-auto h-[200px] overflow-auto space-y-2 scroll-container text-sm">
                  <Table>
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
                        <TableRow
                          key={transaksiItem.id}
                          className="border-none"
                        >
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
                      <span className="text-[#9C9C9C]">PB1</span>
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
                  className="justify-center text-sm p-2 h-fit w-full bg-primaryColor hover:bg-[#ce8b33]"
                >
                  <span>
                    <MoneyCashSVG className="!w-6 !h-6" />
                  </span>
                  <span>Bayar dengan Tunai</span>
                </Button>
                <Button
                  variant={"default"}
                  className="justify-center text-sm p-2 h-fit w-full bg-primaryColor hover:bg-[#ce8b33]"
                >
                  <span>
                    <MoneyCardSVG className="!w-6 !h-6" />
                  </span>
                  <span>Bayar dengan Kartu</span>
                </Button>
                <Button
                  variant={"default"}
                  className="justify-start text-sm p-2 h-fit w-full bg-primaryColor hover:bg-[#ce8b33]"
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
      </>

      {/* Handle Modal Payment Cash */}
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
                  onClick={() => setIsValidationModalCash(true)}
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

            <button
              onClick={() => {
                setIsValidationModalCash(true);
              }}
              type="button"
              className="w-full h-9 sm:h-9 md:h-10 rounded-md bg-[#114F44] hover:bg-[#104239] text-white font-medium text-sm sm:text-sm md:text-base"
            >
              Selesai
            </button>

            {/* Modal Validation Cash Payment */}
            <ValidationModal
              isOpen={isValidationModalCash}
              onClose={() => {
                setIsValidationModalCash(false);
              }}
              onSubmitTrigger={() => {
                const paymentForm = document.getElementById(
                  "paymentForm"
                ) as HTMLFormElement;
                if (paymentForm) {
                  paymentForm.requestSubmit();
                }
                setIsValidationModalCash(false);
                setIsPaymentSuccessModal(true);
              }}
              title=""
              classNameDialogFooter="flex md:justify-center"
              showKeluarButton={true}
              showSubmitButton={true}
              classNameDialogHeader=""
              classNameButton="w-full rounded-lg text-sm"
              classNameDialogTitle=""
              closeButton={false}
            >
              <div className="font-semibold text-black dark:text-white m-auto flex justify-center">
                <WarningSVG />
              </div>
              <div className="text-lg font-bold text-center mt-4">
                Apakah Pembayaran Selesai?
              </div>
            </ValidationModal>
            {/* Modal Validation Cash Payment */}
          </form>
        </>
      </PaymentModal>

      {/* Handle Modal Validation Payment */}
      <ValidationModal
        isOpen={isValidationModal}
        onClose={() => {
          setIsValidationModal(false);
        }}
        onSubmitTrigger={() => {
          const paymentForm = document.getElementById(
            "paymentForm"
          ) as HTMLFormElement;
          if (paymentForm) {
            paymentForm.requestSubmit();
          }
          setIsPaymentSuccessModal(true);
        }}
        title=""
        classNameDialogFooter="flex md:justify-center"
        showKeluarButton={true}
        showSubmitButton={true}
        classNameDialogHeader=""
        classNameButton="w-full rounded-lg text-sm"
        classNameDialogTitle=""
        closeButton={false}
      >
        <div className="font-semibold text-black dark:text-white m-auto flex justify-center">
          <WarningSVG />
        </div>
        <div className="text-lg font-bold text-center mt-4">
          Apakah Pembayaran Selesai?
        </div>
      </ValidationModal>

      {/* Handle Modal Payment Success */}
      <ValidationModal
        isOpen={isPaymentSuccessModal}
        onClose={() => {
          setIsPaymentSuccessModal(false);
          setIsValidationModal(false);
          setIsPaymentCashModalOpen(false);
        }}
        onSubmitTrigger={() => { }}
        title=""
        classNameDialogFooter="flex md:justify-center"
        showKeluarButton={true}
        showSubmitButton={true}
        classNameDialogHeader=""
        classNameButton="w-full rounded-lg text-sm"
        classNameDialogTitle=""
        closeButton={false}
        submitButtonText="Print"
        keluarButtonText="Tutup"
      >
        <div className="font-semibold text-black dark:text-white m-auto flex justify-center">
          <SuccessSVG />
        </div>
        <div className="text-lg font-bold text-center mt-4">
          Pembayaran sudah diterima
        </div>
      </ValidationModal>

      <DarkModeComponents className="hidden" />
    </>
  );
}

export default SelectTable;
