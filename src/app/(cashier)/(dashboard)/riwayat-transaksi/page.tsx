"use client";

import { Input, SearchInputCashier } from "@/components/ui/input";
import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { FilterSVG } from "@/constants/svgIcons";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import DetailModal from "@/components/ui/modal/detailAndo";
import DeleteModal from "@/components/ui/modal/delete";
import EditModal from "@/components/ui/modal/edit";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  transactionHistorySchema,
  transactionHistoryValues,
} from "@/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { showAlert2 } from "@/lib/sweetalert2";
import { axiosPrivateInstance } from "@/utils/axios";
import { AxiosError } from "axios";
import PinModal from "@/components/ui/modal/confirmationPin";

function RiwayatTransaksi() {
  const [loading, setLoading] = useState(false);
  const navigate = useRouter();
  const [isDetailModalOpenDineIn, setIsDetailModalOpenDineIn] = useState(false);
  const [isDetailModalOpenTakeaway, setIsDetailModalOpenTakeaway] =
    useState(false);
  const [isEditModalOpenTakeaway, setIsEditModalOpenTakeaway] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeletePinModalOpen, setIsDeletePinModalOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<transactionHistoryValues>({
    resolver: zodResolver(transactionHistorySchema),
    defaultValues: {
      cashier_id: "",
    },
  });

  // Update
  const onEditSubmit: SubmitHandler<transactionHistoryValues> = async (
    data
  ) => {
    console.log("Form data:", data);
    setLoading(true);
    const formData = new FormData();
    formData.append("name", data.cashier_id);

    try {
      await axiosPrivateInstance.put(`/`, formData);
      showAlert2("success", "Berhasil menyimpan data.");
      navigate.push("/category");
    } catch (error) {
      if (error instanceof AxiosError) {
        const errorMessage =
          error.response?.data?.data?.[0]?.message || "Gagal memperbarui data.";
        showAlert2("error", errorMessage);
      } else {
        showAlert2("error", "Terjadi kesalahan!");
      }
    } finally {
      setLoading(false);
    }
  };
  // Update

  const handleDetail = () => {
    console.log("Data diedit");
  };

  const handleDelete = () => {
    // setIsEditModalOpenTakeaway(false);
    console.log("Data dihapus");
  };

  return (
    <>
      <div className="pl-6 pr-6 pt-4 pb-4 text-xs">
        <section className="justify-start flex gap-4">
          <div className="">
            <SearchInputCashier className="w-[280px] text-xs h-8" />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant={"outline"}
                className="justify-center border-secondaryColor text-xs p-2 h-fit"
              >
                <span>
                  <FilterSVG />
                </span>
                <span>Filter</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="transition-all duration-300 ease-in-out opacity-1 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 bg-[#E1E1E1] border border-gray-300 shadow-2xl rounded-md w-full">
              <>
                <div className="p-2 w-full text-xs text-[#000000] font-semibold">
                  <span>Pilih Filter</span>
                  <div className="border-b border-black/30 mt-1 mb-2"></div>
                  <div className="flex justify-between gap-4 ">
                    <div className="space-y-2">
                      <span>ID Transaksi / Invoice</span>
                      <RadioGroup defaultValue="comfortable">
                        <div className="flex items-center space-x-1">
                          <RadioGroupItem value="terendah" id="r1" />
                          <Label
                            className="text-xs flex items-center justify-center m-auto"
                            htmlFor="r2"
                          >
                            Terendah
                          </Label>
                        </div>
                        <div className="flex items-center space-x-1">
                          <RadioGroupItem value="tertinggi" id="r2" />
                          <Label
                            className="text-xs flex items-center justify-center m-auto"
                            htmlFor="r2"
                          >
                            Tertinggi
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>
                    <div className="space-y-2">
                      <span>Tanggal dan Waktu</span>
                      <RadioGroup defaultValue="comfortable">
                        <div className="flex items-center space-x-1">
                          <RadioGroupItem value="terendah" id="r1" />
                          <Label
                            className="text-xs flex items-center justify-center m-auto"
                            htmlFor="r2"
                          >
                            Terendah
                          </Label>
                        </div>
                        <div className="flex items-center space-x-1">
                          <RadioGroupItem value="tertinggi" id="r2" />
                          <Label
                            className="text-xs flex items-center justify-center m-auto"
                            htmlFor="r2"
                          >
                            Tertinggi
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>
                    <div className="space-y-2">
                      <span>Total Harga</span>
                      <RadioGroup defaultValue="comfortable">
                        <div className="flex items-center space-x-1">
                          <RadioGroupItem value="terendah" id="r1" />
                          <Label
                            className="text-xs flex items-center justify-center m-auto"
                            htmlFor="r2"
                          >
                            Terendah
                          </Label>
                        </div>
                        <div className="flex items-center space-x-1">
                          <RadioGroupItem value="tertinggi" id="r2" />
                          <Label
                            className="text-xs flex items-center justify-center m-auto"
                            htmlFor="r2"
                          >
                            Tertinggi
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>
                  <div className="flex justify-end mt-4">
                    <Button
                      variant={"ghostButton"}
                      className="text-xs bg-secondaryColor text-white p-2 h-fit"
                    >
                      Berhasil
                    </Button>
                  </div>
                </div>
              </>
            </DropdownMenuContent>
          </DropdownMenu>
        </section>

        <section className="mt-3 grid grid-cols-3 gap-4">
          <div className="flex justify-between gap-4 w-full border-primaryColor border rounded-lg p-1">
            <div className="absolute border h-[10px] w-[40px] ml-[22px] mt-[0px] rounded-lg"></div>
            <div className="absolute border h-[10px] w-[40px] ml-[22px] mt-[76px] rounded-lg"></div>
            <div className="absolute border h-[40px] w-[10px] -ml-[0px] mt-[22px] rounded-lg"></div>
            <div className="absolute border h-[40px] w-[10px] ml-[78px] mt-[22px] rounded-lg"></div>
            <div className="w-[40%] flex items-center">
              <div className="rounded-lg border-2 p-2 ml-3.5 border-[#FEA026]">
                <div className="rounded-full bg-[#FEA026]/10">
                  <span className="font-bold text-[10px] flex items-center justify-center text-[#FEA026] h-[40px] w-[40px]">
                    7 10
                  </span>
                </div>
              </div>
            </div>
            <div className="w-[60%] space-y-1">
              <div>#INV0001</div>
              <div>26/02/2023 09:46:00</div>
              <div>Rp. 126.000</div>
              <div className="flex justify-between gap-2">
                <Button
                  variant={"ghostButton"}
                  className="text-xs bg-secondaryColor text-white pl-2 pr-2 pt-1 pb-1 h-fit w-full"
                >
                  Berhasil
                </Button>
                <Button
                  variant={"ghostButton"}
                  onClick={() => setIsDetailModalOpenTakeaway(true)}
                  className="text-xs bg-white border border-secondaryColor text-black pl-2 pr-2 pt-1 pb-1 h-fit w-full"
                >
                  Detail
                </Button>
              </div>
            </div>
          </div>

          <div className="flex justify-between gap-4 w-full border-primaryColor border rounded-lg p-1">
            <div className="absolute border h-[10px] w-[40px] ml-[22px] mt-[0px] rounded-lg"></div>
            <div className="absolute border h-[10px] w-[40px] ml-[22px] mt-[76px] rounded-lg"></div>
            <div className="absolute border h-[40px] w-[10px] -ml-[0px] mt-[22px] rounded-lg"></div>
            <div className="absolute border h-[40px] w-[10px] ml-[78px] mt-[22px] rounded-lg"></div>
            <div className="w-[40%] flex items-center">
              <div className="rounded-lg border-2 p-2 ml-3.5 border-[#FEA026]">
                <div className="rounded-full bg-[#FEA026]/10">
                  <span className="font-bold text-[10px] flex items-center justify-center text-[#FEA026] h-[40px] w-[40px]">
                    7 10
                  </span>
                </div>
              </div>
            </div>
            <div className="w-[60%] space-y-1">
              <div>#INV0001</div>
              <div>26/02/2023 09:46:00</div>
              <div>Rp. 126.000</div>
              <div className="flex justify-between gap-2">
                <Button
                  variant={"ghostButton"}
                  className="text-xs bg-secondaryColor text-white pl-2 pr-2 pt-1 pb-1 h-fit w-full"
                >
                  Berhasil
                </Button>
                <Button
                  variant={"ghostButton"}
                  onClick={() => setIsDetailModalOpenTakeaway(true)}
                  className="text-xs bg-white border border-secondaryColor text-black pl-2 pr-2 pt-1 pb-1 h-fit w-full"
                >
                  Detail
                </Button>
              </div>
            </div>
          </div>

          <div className="flex justify-between gap-4 w-full border-primaryColor border rounded-lg p-1">
            <div className="absolute border h-[10px] w-[40px] ml-[22px] mt-[0px] rounded-lg"></div>
            <div className="absolute border h-[10px] w-[40px] ml-[22px] mt-[76px] rounded-lg"></div>
            <div className="absolute border h-[40px] w-[10px] -ml-[0px] mt-[22px] rounded-lg"></div>
            <div className="absolute border h-[40px] w-[10px] ml-[78px] mt-[22px] rounded-lg"></div>
            <div className="w-[40%] flex items-center">
              <div className="rounded-lg border-2 p-2 ml-3.5 border-[#FEA026]">
                <div className="rounded-full bg-[#FEA026]/10">
                  <span className="font-bold text-[10px] flex items-center justify-center text-[#FEA026] h-[40px] w-[40px]">
                    7 10
                  </span>
                </div>
              </div>
            </div>
            <div className="w-[60%] space-y-1">
              <div>#INV0001</div>
              <div>26/02/2023 09:46:00</div>
              <div>Rp. 126.000</div>
              <div className="flex justify-between gap-2">
                <Button
                  variant={"ghostButton"}
                  className="text-xs bg-secondaryColor text-white pl-2 pr-2 pt-1 pb-1 h-fit w-full"
                >
                  Berhasil
                </Button>
                <Button
                  variant={"ghostButton"}
                  onClick={() => setIsDetailModalOpenTakeaway(true)}
                  className="text-xs bg-white border border-secondaryColor text-black pl-2 pr-2 pt-1 pb-1 h-fit w-full"
                >
                  Detail
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>

      <DetailModal
        isOpen={isDetailModalOpenDineIn}
        onClose={() => setIsDetailModalOpenDineIn(false)}
        onDetail={handleDetail}
        title="Detail Riwayat Transaksi"
        classNameDialogFooter="p-4 border-t w-full"
        showCancelButton={true}
        showPrintButton={true}
        classNameDialogHeader="border-none p-4"
        classNameButton="w-full rounded-lg text-sm"
        classNameDialogTitle="text-left font-bold"
        closeButton={false}
      >
        <>
          <div className="flex mb-4 gap-4 dark:text-white text-xs">
            <div className="flex flex-col w-full">
              <Label htmlFor="idTransaction" className="text-xs">
                ID Transaksi/Invoice
              </Label>
              <div className="flex h-9 w-full rounded-md border border-neutral-200 bg-transparent px-3 py-1 text-xs shadow-sm transition-colors text-neutral-500 dark:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primaryColor disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-800 dark:placeholder:text-neutral-400 dark:focus-visible:ring-neutral-300 items-center">
                INV0001
              </div>
            </div>
            <div className="flex flex-col w-full">
              <Label htmlFor="noTable" className="text-xs">
                Nomor Meja
              </Label>
              <div className="flex h-9 w-full rounded-md border border-neutral-200 bg-transparent px-3 py-1 text-xs shadow-sm transition-colors text-neutral-500 dark:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primaryColor disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-800 dark:placeholder:text-neutral-400 dark:focus-visible:ring-neutral-300 items-center">
                A1
              </div>
            </div>
          </div>
          <div className="flex mb-4 gap-4 dark:text-white">
            <div className="flex flex-col w-full">
              <Label htmlFor="dateTimeTransaction" className="text-xs">
                Tanggal dan Waktu Transaksi
              </Label>
              <div className="flex h-9 w-full rounded-md border border-neutral-200 bg-transparent px-3 py-1 text-xs shadow-sm transition-colors text-neutral-500 dark:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primaryColor disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-800 dark:placeholder:text-neutral-400 dark:focus-visible:ring-neutral-300 items-center">
                15/12/2024 15:34
              </div>
            </div>
            <div className="flex flex-col w-full">
              <Label htmlFor="totalPrice" className="text-xs">
                Total Harga
              </Label>
              <div className="flex h-9 w-full rounded-md border border-neutral-200 bg-transparent px-3 py-1 text-xs shadow-sm transition-colors text-neutral-500 dark:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primaryColor disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-800 dark:placeholder:text-neutral-400 dark:focus-visible:ring-neutral-300 items-center">
                Rp. 105.000
              </div>
            </div>
          </div>
          <div className="flex mb-4 gap-4 dark:text-white">
            <div className="flex flex-col w-full">
              <Label htmlFor="name" className="text-xs">
                Nama Kasir
              </Label>
              <div className="flex h-9 w-full rounded-md border border-neutral-200 bg-transparent px-3 py-1 text-xs shadow-sm transition-colors text-neutral-500 dark:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primaryColor disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-800 dark:placeholder:text-neutral-400 dark:focus-visible:ring-neutral-300 items-center">
                John Doe
              </div>
            </div>
            <div className="flex flex-col w-full">
              <Label htmlFor="paymentMethod" className="text-xs">
                Metode Pembayaran
              </Label>
              <div className="flex h-9 w-full rounded-md border border-neutral-200 bg-transparent px-3 py-1 text-xs shadow-sm transition-colors text-neutral-500 dark:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primaryColor disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-800 dark:placeholder:text-neutral-400 dark:focus-visible:ring-neutral-300 items-center">
                -
              </div>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex flex-col w-full">
              <Label htmlFor="purchaseHistory" className="text-xs">
                Rincian Pembelian
              </Label>
              <textarea
                id="purchaseHistory"
                className="w-full h-20 p-2 text-xs border dark:border-none rounded-md text-black/50 dark:text-white bg-white dark:bg-transparent"
                defaultValue={`1x Nasi\n1x Ayam Goreng\n1x Es Teh Manis`}
                disabled
              />
            </div>
            <div className="flex flex-col w-full space-y-2">
              <div className="rounded-lg text-xs w-fit text-white bg-secondaryColor p-1">
                Takeaway
              </div>
              <Label htmlFor="statusPurchase" className="text-xs mt-2">
                Status Pembayaran
              </Label>
              <div className="rounded-lg text-xs w-fit text-white bg-secondaryColor p-2">
                Berhasil
              </div>
            </div>
          </div>
        </>
      </DetailModal>

      <DetailModal
        isOpen={isDetailModalOpenTakeaway}
        onClose={() => setIsDetailModalOpenTakeaway(false)}
        onDetail={handleDetail}
        title="Detail Riwayat Transaksi"
        classNameDialogFooter="p-4 border-t w-full"
        showCancelButton={true}
        showPrintButton={false}
        classNameDialogHeader="border-none p-4"
        classNameButton="w-full rounded-lg text-sm"
        classNameDialogTitle="text-left font-bold"
        closeButton={false}
      >
        <>
          <Button
            onClick={() => {
              setIsEditModalOpenTakeaway(true);
              setIsDetailModalOpenTakeaway(false);
            }}
            variant={"outline"}
            className="rounded-lg text-xs w-[70px] text-white bg-secondaryColor p-2 absolute right-4 top-4"
          >
            Edit
          </Button>
          <div className="flex mb-4 gap-4 dark:text-white text-xs">
            <div className="flex flex-col w-full">
              <Label htmlFor="idTransaction" className="text-xs">
                ID Transaksi/Invoice
              </Label>
              <div className="flex h-9 w-full rounded-md border border-neutral-200 bg-transparent px-3 py-1 text-xs shadow-sm transition-colors text-neutral-500 dark:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primaryColor disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-800 dark:placeholder:text-neutral-400 dark:focus-visible:ring-neutral-300 items-center">
                INV0001
              </div>
            </div>
            <div className="flex flex-col w-full">
              <Label htmlFor="noTable" className="text-xs">
                Nomor Meja
              </Label>
              <div className="flex h-9 w-full rounded-md border border-neutral-200 bg-transparent px-3 py-1 text-xs shadow-sm transition-colors text-neutral-500 dark:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primaryColor disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-800 dark:placeholder:text-neutral-400 dark:focus-visible:ring-neutral-300 items-center">
                A1
              </div>
            </div>
          </div>
          <div className="flex mb-4 gap-4 dark:text-white">
            <div className="flex flex-col w-full">
              <Label htmlFor="dateTimeTransaction" className="text-xs">
                Tanggal dan Waktu Transaksi
              </Label>
              <div className="flex h-9 w-full rounded-md border border-neutral-200 bg-transparent px-3 py-1 text-xs shadow-sm transition-colors text-neutral-500 dark:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primaryColor disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-800 dark:placeholder:text-neutral-400 dark:focus-visible:ring-neutral-300 items-center">
                15/12/2024 15:34
              </div>
            </div>
            <div className="flex flex-col w-full">
              <Label htmlFor="totalPrice" className="text-xs">
                Total Harga
              </Label>
              <div className="flex h-9 w-full rounded-md border border-neutral-200 bg-transparent px-3 py-1 text-xs shadow-sm transition-colors text-neutral-500 dark:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primaryColor disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-800 dark:placeholder:text-neutral-400 dark:focus-visible:ring-neutral-300 items-center">
                Rp. 105.000
              </div>
            </div>
          </div>
          <div className="flex mb-4 gap-4 dark:text-white">
            <div className="flex flex-col w-full">
              <Label htmlFor="name" className="text-xs">
                Nama Kasir
              </Label>
              <div className="flex h-9 w-full rounded-md border border-neutral-200 bg-transparent px-3 py-1 text-xs shadow-sm transition-colors text-neutral-500 dark:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primaryColor disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-800 dark:placeholder:text-neutral-400 dark:focus-visible:ring-neutral-300 items-center">
                John Doe
              </div>
            </div>
            <div className="flex flex-col w-full">
              <Label htmlFor="paymentMethod" className="text-xs">
                Metode Pembayaran
              </Label>
              <div className="flex h-9 w-full rounded-md border border-neutral-200 bg-transparent px-3 py-1 text-xs shadow-sm transition-colors text-neutral-500 dark:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primaryColor disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-800 dark:placeholder:text-neutral-400 dark:focus-visible:ring-neutral-300 items-center">
                Tunai
              </div>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex flex-col w-full">
              <Label htmlFor="purchaseHistory" className="text-xs">
                Rincian Pembelian
              </Label>
              <textarea
                id="purchaseHistory"
                className="w-full h-20 p-2 text-xs border dark:border-none rounded-md text-black/50 dark:text-white bg-white dark:bg-transparent"
                defaultValue={`1x Nasi\n1x Ayam Goreng\n1x Es Teh Manis`}
                disabled
              />
            </div>
            <div className="flex flex-col w-full space-y-2">
              <div className="rounded-lg text-xs w-fit text-white bg-secondaryColor p-1">
                Takeaway
              </div>
              <Label htmlFor="statusPurchase" className="text-xs">
                Status Pembayaran
              </Label>
              <div className="rounded-xl text-xs w-fit text-white bg-primaryColor p-2">
                Tertunda
              </div>
            </div>
          </div>
        </>
      </DetailModal>

      <EditModal
        isOpen={isEditModalOpenTakeaway}
        onClose={() => setIsEditModalOpenTakeaway(false)}
        onSubmit={handleSubmit(onEditSubmit)}
        title="Detail Riwayat Transaksi"
        classNameDialogContent="sm:max-w-[640px]"
        loading={loading}
      >
        <>
          <Button
            onClick={() => {
              setIsDeleteModalOpen(true);
            }}
            variant={"outline"}
            className="rounded-xl text-xs w-[120px] text-white bg-[#FF0000] absolute right-4 top-4 border-none"
          >
            Hapus Transaksi
          </Button>
          <DeleteModal
            isOpen={isDeleteModalOpen}
            onClose={() => {
              setIsDeleteModalOpen(false);
              setIsDeletePinModalOpen(true);
            }}
            title="Hapus"
            description="Anda yakin ingin menghapus item ini ?"
          />
          <PinModal
            isOpen={isDeletePinModalOpen}
            onClose={() => {
              setIsEditModalOpenTakeaway(false);
              setIsDeleteModalOpen(false);
              setIsDeletePinModalOpen(false);
            }}
            onDelete={handleDelete}
          />
          <div className="flex gap-4 justify-between mb-4 text-xs">
            <div className="flex flex-col w-full">
              <Label htmlFor="idTransaction" className="text-xs">
                ID Transaksi/Invoice
              </Label>
              <Input
                type="name"
                id="idTransaction"
                placeholder="Id Transaksi"
                className="text-xs"
                {...register("cashier_id")}
              />
              {errors.cashier_id && (
                <span className="text-xs text-red-500">
                  {errors.cashier_id.message}
                </span>
              )}
            </div>
            <div className="flex flex-col w-full">
              <Label htmlFor="noTable" className="text-xs">
                Nomor Meja
              </Label>
              <Input
                type="name"
                id="noTable"
                placeholder="Nomor Meja"
                className="text-xs"
                {...register("cashier_id")}
              />
              {errors.cashier_id && (
                <span className="text-xs text-red-500">
                  {errors.cashier_id.message}
                </span>
              )}
            </div>
          </div>

          <div className="flex gap-4 justify-between mb-4 text-xs">
            <div className="flex flex-col w-full">
              <Label htmlFor="dateTime" className="text-xs">
                Tanggal dan Waktu Transaksi
              </Label>
              <Input
                type="name"
                id="dateTime"
                placeholder="Tanggal dan Waktu Transaksi"
                className="text-xs"
                {...register("cashier_id")}
              />
              {errors.cashier_id && (
                <span className="text-xs text-red-500">
                  {errors.cashier_id.message}
                </span>
              )}
            </div>
            <div className="flex flex-col w-full">
              <Label htmlFor="price" className="text-xs">
                Total Harga
              </Label>
              <Input
                type="name"
                id="price"
                placeholder="Total Harga"
                className="text-xs"
                {...register("cashier_id")}
              />
              {errors.cashier_id && (
                <span className="text-xs text-red-500">
                  {errors.cashier_id.message}
                </span>
              )}
            </div>
          </div>

          <div className="flex gap-4 justify-between mb-4 text-xs">
            <div className="flex flex-col w-full">
              <Label htmlFor="nameCashier" className="text-xs">
                Nama Kasir
              </Label>
              <Input
                type="name"
                id="nameCashier"
                placeholder="Nama Kasir"
                className="text-xs"
                {...register("cashier_id")}
              />
              {errors.cashier_id && (
                <span className="text-xs text-red-500">
                  {errors.cashier_id.message}
                </span>
              )}
            </div>
            <div className="flex flex-col w-full">
              <Label htmlFor="paymentMethod" className="text-xs">
                Metode Pembayaran
              </Label>
              <Input
                type="name"
                id="paymentMethod"
                placeholder="Metode Pembayaran"
                className="text-xs"
                {...register("cashier_id")}
              />
              {errors.cashier_id && (
                <span className="text-xs text-red-500">
                  {errors.cashier_id.message}
                </span>
              )}
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex flex-col w-full">
              <Label htmlFor="purchaseHistory" className="text-xs">
                Rincian Pembelian
              </Label>
              {/* <textarea
                          id="purchaseHistory"
                          className="w-full h-20 p-2 text-xs border dark:border-none rounded-md text-black/50 dark:text-white bg-white dark:bg-transparent"
                          defaultValue={`1x Nasi\n1x Ayam Goreng\n1x Es Teh Manis`}
                          disabled
                        /> */}
              <div className="w-full rounded-md border border-neutral-200 bg-transparent px-3 py-3 text-base shadow-sm transition-colors space-y-2 max-h-32 overflow-y-auto">
                {/* {selectedProducts.length === 0 ? ( */}
                {/* <span className="text-slate-400">Pilih produk</span> */}
                {/* ) : ( */}
                {/* selectedProducts.map((product) => ( */}
                <div
                  // key={product.id}
                  className="flex items-center justify-between p-2 rounded-md"
                >
                  {/* <span>{product.name}</span> */}
                  <span className="text-xs">Nasi</span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      // onClick={() =>
                      //   handleDecreaseQuantity(product.id)
                      // }
                    >
                      {/* <Minus size={20} /> */}-
                    </button>
                    <span className="flex items-center justify-center border border-secondaryColor rounded-md font-medium w-10 h-6">
                      {/* {product.quantity} */}1
                    </span>
                    <button
                      type="button"
                      // onClick={() =>
                      //   handleIncreaseQuantity(product.id)
                      // }
                    >
                      {/* <Plus size={20} /> */}+
                    </button>
                    <button
                      type="button"
                      // onClick={() =>
                      //   handleRemoveProduct(product.id)
                      // }
                      className="text-red-600"
                    >
                      {/* <Trash2 size={20} /> */}o
                    </button>
                  </div>
                </div>
                {/* )) */}
                {/* )} */}
              </div>
            </div>
            <div className="flex flex-col w-full space-y-2">
              <div className="rounded-lg text-xs w-fit text-white bg-primaryColor p-1">
                Dine In
              </div>
              <Label htmlFor="statusPurchase" className="text-xs">
                Status Pembayaran
              </Label>
              <div className="rounded-xl text-xs w-fit text-white bg-primaryColor p-2">
                Tertunda
              </div>
            </div>
          </div>
        </>
      </EditModal>
    </>
  );
}

export default RiwayatTransaksi;
