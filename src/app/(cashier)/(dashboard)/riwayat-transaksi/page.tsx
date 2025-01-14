"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { showAlert2 } from "@/lib/sweetalert2";
import { axiosPrivateInstance } from "@/utils/axios";
import { AxiosError } from "axios";
import { FilterSVG } from "@/constants/svgIcons";
import {
  transactionHistorySchema,
  transactionHistoryValues,
} from "@/validations";
import { Minus, Plus, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input, SearchInputCashier } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import DetailModal from "@/components/ui/modal/detailAndo";
import DeleteModal from "@/components/ui/modal/delete";
import EditModal from "@/components/ui/modal/edit";
import PinModal from "@/components/ui/modal/confirmationPin";

// interface InvoiceResponse {
//   statusCode: number;
//   message: string;
//   data: InvoiceData;
// }

// interface InvoiceData {
//   id: string;
//   name: string;
//   type: string;
//   code: string;
//   status: string;
//   price_sum: number;
//   created_at: string;
//   payment_method: string;
//   cashier_id: string;
//   tax: number;
//   invoice_tables: InvoiceTable[];
//   employee: Employee;
//   invoice_products: InvoiceProduct[];
//   invoice_packets: InvoicePacket[];
// }

// interface InvoiceTable {
//   id: string;
//   table_id: string;
//   invoice_id: string;
//   table: Table;
// }

// interface Table {
//   id: string;
//   name: string;
// }

// interface Employee {
//   id: string;
//   name: string;
// }

// interface InvoiceProduct {
//   id: string;
//   invoice_id: string;
//   product_id: string;
//   product: Product;
// }

// interface Product {
//   id: string;
//   name: string;
// }

// interface InvoicePacket {
//   id: string;
//   invoice: string;
//   packet_id: string;
//   packet: Packet;
// }

// interface Packet {
//   id: string;
//   name: string;
//   product_packets: ProductPacket[];
// }

// interface ProductPacket {
//   id: string;
//   packet_id: string;
//   quantity: string;
//   product_id: string;
//   products: Product;
// }

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
    reset,
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
    setLoading(true);
    const transaction_history = {
      ...data,
      PuchaseDetailss: selectedPurchaseDetails,
    };
    console.log("Updated data:", transaction_history);
    showAlert2("success", "Berhasil memperbarui data");
    setLoading(false);
    reset();
    setSelectedPurchaseDetails([]);

    console.log("Form data:", data);
    setLoading(true);
    const formData = new FormData();
    formData.append("name", data.cashier_id);

    try {
      await axiosPrivateInstance.put(`/`, formData);
      showAlert2("success", "Berhasil menyimpan data.");
      navigate.push("/riwayat-transaksi");
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

  interface SelectedPurchase {
    id: number;
    name: string;
    quantity: number;
  }

  const initialSelectedPurchaseDetails: SelectedPurchase[] = [
    { id: 1, name: "Nasi Padang", quantity: 2 },
    { id: 2, name: "Rendang", quantity: 1 },
    { id: 3, name: "Ayam Bakar", quantity: 3 },
  ];

  const [selectedPurchaseDetails, setSelectedPurchaseDetails] = useState<
    SelectedPurchase[]
  >(initialSelectedPurchaseDetails);

  const handleIncreaseQuantity = (id: number) => {
    setSelectedPurchaseDetails(
      selectedPurchaseDetails.map((PuchaseDetails) =>
        PuchaseDetails.id === id
          ? { ...PuchaseDetails, quantity: PuchaseDetails.quantity + 1 }
          : PuchaseDetails
      )
    );
  };

  const handleDecreaseQuantity = (id: number) => {
    setSelectedPurchaseDetails(
      selectedPurchaseDetails.map((PuchaseDetails) =>
        PuchaseDetails.id === id && PuchaseDetails.quantity > 1
          ? { ...PuchaseDetails, quantity: PuchaseDetails.quantity - 1 }
          : PuchaseDetails
      )
    );
  };

  const handleRemovePurchaseDetails = (id: number) => {
    setSelectedPurchaseDetails(
      selectedPurchaseDetails.filter(
        (PuchaseDetails) => PuchaseDetails.id !== id
      )
    );
  };

  return (
    <>
      <main className="pl-8 pr-8 pt-4 text-sm space-y-4">
        <section className="justify-start flex gap-4">
          <div className="">
            <SearchInputCashier className="w-[280px] text-sm h-9" />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant={"outline"}
                className="justify-center border-secondaryColor text-sm p-2 h-fit"
              >
                <span>
                  <FilterSVG />
                </span>
                <span>Filter</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="transition-all duration-300 ease-in-out opacity-1 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 bg-[#E1E1E1] border border-gray-300 shadow-2xl rounded-md w-full">
              <>
                <div className="p-2 w-full text-sm text-[#000000] font-semibold">
                  <span>Pilih Filter</span>
                  <div className="border-b border-black/30 mt-1 mb-2"></div>
                  <div className="flex justify-between gap-4 ">
                    <div className="space-y-2">
                      <span>ID Transaksi / Invoice</span>
                      <RadioGroup defaultValue="comfortable">
                        <div className="flex items-center space-x-1">
                          <RadioGroupItem value="terendah" id="r1" />
                          <Label
                            className="text-sm flex items-center justify-center m-auto"
                            htmlFor="r2"
                          >
                            Terendah
                          </Label>
                        </div>
                        <div className="flex items-center space-x-1">
                          <RadioGroupItem value="tertinggi" id="r2" />
                          <Label
                            className="text-sm flex items-center justify-center m-auto"
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
                            className="text-sm flex items-center justify-center m-auto"
                            htmlFor="r2"
                          >
                            Terendah
                          </Label>
                        </div>
                        <div className="flex items-center space-x-1">
                          <RadioGroupItem value="tertinggi" id="r2" />
                          <Label
                            className="text-sm flex items-center justify-center m-auto"
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
                            className="text-sm flex items-center justify-center m-auto"
                            htmlFor="r2"
                          >
                            Terendah
                          </Label>
                        </div>
                        <div className="flex items-center space-x-1">
                          <RadioGroupItem value="tertinggi" id="r2" />
                          <Label
                            className="text-sm flex items-center justify-center m-auto"
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
                      className="text-sm bg-secondaryColor text-white p-2 h-fit"
                    >
                      Berhasil
                    </Button>
                  </div>
                </div>
              </>
            </DropdownMenuContent>
          </DropdownMenu>
        </section>
        <section className="grid grid-cols-3 gap-4">
          <div className="flex justify-between gap-4 w-full border-primaryColor border rounded-lg p-4">
            <div className="absolute border h-[10px] w-[40px] ml-[38px] -mt-[8px] rounded-lg"></div>
            <div className="absolute border h-[10px] w-[40px] ml-[38px] mt-[88px] rounded-lg"></div>
            <div className="absolute border h-[40px] w-[10px] ml-[2px] mt-[22px] rounded-lg"></div>
            <div className="absolute border h-[40px] w-[10px] ml-[98px] mt-[22px] rounded-lg"></div>
            <div className="w-[40%] justify-center flex items-center">
              <button className="rounded-lg border p-3 border-primaryColor">
                <div className="p-2 rounded-full bg-[#FEA026]/10 flex items-center justify-center w-12 h-12">
                  <span className="font-bold text-xs text-primaryColor">
                    71-11
                  </span>
                </div>
              </button>
            </div>
            <div className="w-[60%] space-y-1 justify-center">
              <div className="div">
                <div>#INV0001</div>
                <div>26/02/2023 09:46:00</div>
                <div>Rp. 126.000</div>
                <div className="flex justify-between gap-2">
                  <Button
                    variant={"ghostButton"}
                    className="text-sm bg-secondaryColor text-white pl-2 pr-2 pt-1 pb-1 h-fit w-full"
                  >
                    Berhasil
                  </Button>
                  <Button
                    variant={"ghostButton"}
                    onClick={() => setIsDetailModalOpenTakeaway(true)}
                    className="text-sm bg-white border border-secondaryColor text-black pl-2 pr-2 pt-1 pb-1 h-fit w-full"
                  >
                    Detail
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-between gap-4 w-full border-primaryColor border rounded-lg p-4">
            <div className="absolute border h-[10px] w-[40px] ml-[38px] -mt-[8px] rounded-lg"></div>
            <div className="absolute border h-[10px] w-[40px] ml-[38px] mt-[88px] rounded-lg"></div>
            <div className="absolute border h-[40px] w-[10px] ml-[2px] mt-[22px] rounded-lg"></div>
            <div className="absolute border h-[40px] w-[10px] ml-[98px] mt-[22px] rounded-lg"></div>
            <div className="w-[40%] justify-center flex items-center">
              <button className="rounded-lg border p-3 border-primaryColor">
                <div className="p-2 rounded-full bg-[#FEA026]/10 flex items-center justify-center w-12 h-12">
                  <span className="font-bold text-xs text-primaryColor">
                    71-11
                  </span>
                </div>
              </button>
            </div>
            <div className="w-[60%] space-y-1 justify-center">
              <div className="div">
                <div>#INV0001</div>
                <div>26/02/2023 09:46:00</div>
                <div>Rp. 126.000</div>
                <div className="flex justify-between gap-2">
                  <Button
                    variant={"ghostButton"}
                    className="text-sm bg-primaryColor text-white pl-2 pr-2 pt-1 pb-1 h-fit w-full"
                  >
                    Tertunda
                  </Button>
                  <Button
                    variant={"ghostButton"}
                    onClick={() => setIsDetailModalOpenTakeaway(true)}
                    className="text-sm bg-white border border-secondaryColor text-black pl-2 pr-2 pt-1 pb-1 h-fit w-full"
                  >
                    Detail
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Detail Riwayat Transaksi */}
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
          <div className="flex mb-4 gap-4 dark:text-white text-sm">
            <div className="flex flex-col w-full">
              <Label htmlFor="idTransaction" className="text-sm">
                ID Transaksi/Invoice
              </Label>
              <div className="flex h-9 w-full rounded-md border border-neutral-200 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors text-neutral-500 dark:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primaryColor disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-800 dark:placeholder:text-neutral-400 dark:focus-visible:ring-neutral-300 items-center">
                INV0001
              </div>
            </div>
            <div className="flex flex-col w-full">
              <Label htmlFor="noTable" className="text-sm">
                Nomor Meja
              </Label>
              <div className="flex h-9 w-full rounded-md border border-neutral-200 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors text-neutral-500 dark:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primaryColor disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-800 dark:placeholder:text-neutral-400 dark:focus-visible:ring-neutral-300 items-center">
                A1
              </div>
            </div>
          </div>
          <div className="flex mb-4 gap-4 dark:text-white">
            <div className="flex flex-col w-full">
              <Label htmlFor="dateTimeTransaction" className="text-sm">
                Tanggal dan Waktu Transaksi
              </Label>
              <div className="flex h-9 w-full rounded-md border border-neutral-200 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors text-neutral-500 dark:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primaryColor disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-800 dark:placeholder:text-neutral-400 dark:focus-visible:ring-neutral-300 items-center">
                15/12/2024 15:34
              </div>
            </div>
            <div className="flex flex-col w-full">
              <Label htmlFor="totalPrice" className="text-sm">
                Total Harga
              </Label>
              <div className="flex h-9 w-full rounded-md border border-neutral-200 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors text-neutral-500 dark:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primaryColor disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-800 dark:placeholder:text-neutral-400 dark:focus-visible:ring-neutral-300 items-center">
                Rp. 105.000
              </div>
            </div>
          </div>
          <div className="flex mb-4 gap-4 dark:text-white">
            <div className="flex flex-col w-full">
              <Label htmlFor="name" className="text-sm">
                Nama Kasir
              </Label>
              <div className="flex h-9 w-full rounded-md border border-neutral-200 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors text-neutral-500 dark:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primaryColor disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-800 dark:placeholder:text-neutral-400 dark:focus-visible:ring-neutral-300 items-center">
                John Doe
              </div>
            </div>
            <div className="flex flex-col w-full">
              <Label htmlFor="paymentMethod" className="text-sm">
                Metode Pembayaran
              </Label>
              <div className="flex h-9 w-full rounded-md border border-neutral-200 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors text-neutral-500 dark:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primaryColor disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-800 dark:placeholder:text-neutral-400 dark:focus-visible:ring-neutral-300 items-center">
                -
              </div>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex flex-col w-full">
              <Label htmlFor="purchaseHistory" className="text-sm">
                Rincian Pembelian
              </Label>
              <textarea
                id="purchaseHistory"
                className="w-full h-20 p-2 text-sm border dark:border-none rounded-md text-black/50 dark:text-white bg-white dark:bg-transparent"
                defaultValue={`1x Nasi\n1x Ayam Goreng\n1x Es Teh Manis`}
                disabled
              />
            </div>
            <div className="flex flex-col w-full space-y-2">
              <div className="rounded-lg text-sm w-fit text-white bg-secondaryColor p-1">
                Takeaway
              </div>
              <Label htmlFor="statusPurchase" className="text-sm mt-2">
                Status Pembayaran
              </Label>
              <div className="rounded-lg text-sm w-fit text-white bg-secondaryColor p-2">
                Berhasil
              </div>
            </div>
          </div>
        </>
      </DetailModal>
      {/* Detail Riwayat Transaksi */}

      <DetailModal
        isOpen={isDetailModalOpenTakeaway}
        onClose={() => setIsDetailModalOpenTakeaway(false)}
        onDetail={handleDetail}
        title="Detail Riwayat Transaksi"
        classNameDialogFooter="p-4 border-t w-full"
        showCancelButton={true}
        showPrintButton={true}
        classNameDialogHeader="border-b p-5"
        classNameButton="w-full rounded-lg text-sm"
        classNameDialogTitle="text-left font-semibold"
        closeButton={false}
      >
        <>
          <Button
            onClick={() => {
              setIsEditModalOpenTakeaway(true);
              setIsDetailModalOpenTakeaway(false);
            }}
            variant={"outline"}
            className="rounded-lg text-sm w-[70px] text-white bg-secondaryColor p-2 absolute right-4 top-4"
          >
            Edit
          </Button>
          <div className="space-y-4">
            <div className="flex gap-4 dark:text-white text-sm">
              <div className="flex flex-col w-full">
                <Label htmlFor="idTransaction" className="text-sm">
                  ID Transaksi/Invoice
                </Label>
                <div className="flex h-9 w-full rounded-md border border-neutral-200 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors text-neutral-500 dark:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primaryColor disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-800 dark:placeholder:text-neutral-400 dark:focus-visible:ring-neutral-300 items-center">
                  INV0001
                </div>
              </div>
              <div className="flex flex-col w-full">
                <Label htmlFor="noTable" className="text-sm">
                  Nomor Meja
                </Label>
                <div className="flex h-9 w-full rounded-md border border-neutral-200 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors text-neutral-500 dark:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primaryColor disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-800 dark:placeholder:text-neutral-400 dark:focus-visible:ring-neutral-300 items-center">
                  A1
                </div>
              </div>
            </div>
            <div className="flex gap-4 dark:text-white">
              <div className="flex flex-col w-full">
                <Label htmlFor="dateTimeTransaction" className="text-sm">
                  Tanggal dan Waktu Transaksi
                </Label>
                <div className="flex h-9 w-full rounded-md border border-neutral-200 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors text-neutral-500 dark:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primaryColor disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-800 dark:placeholder:text-neutral-400 dark:focus-visible:ring-neutral-300 items-center">
                  15/12/2024 15:34
                </div>
              </div>
              <div className="flex flex-col w-full">
                <Label htmlFor="totalPrice" className="text-sm">
                  Total Harga
                </Label>
                <div className="flex h-9 w-full rounded-md border border-neutral-200 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors text-neutral-500 dark:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primaryColor disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-800 dark:placeholder:text-neutral-400 dark:focus-visible:ring-neutral-300 items-center">
                  Rp. 105.000
                </div>
              </div>
            </div>
            <div className="flex gap-4 dark:text-white">
              <div className="flex flex-col w-full">
                <Label htmlFor="name" className="text-sm">
                  Nama Kasir
                </Label>
                <div className="flex h-9 w-full rounded-md border border-neutral-200 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors text-neutral-500 dark:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primaryColor disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-800 dark:placeholder:text-neutral-400 dark:focus-visible:ring-neutral-300 items-center">
                  John Doe
                </div>
              </div>
              <div className="flex flex-col w-full">
                <Label htmlFor="paymentMethod" className="text-sm">
                  Metode Pembayaran
                </Label>
                <div className="flex h-9 w-full rounded-md border border-neutral-200 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors text-neutral-500 dark:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primaryColor disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-800 dark:placeholder:text-neutral-400 dark:focus-visible:ring-neutral-300 items-center">
                  Tunai
                </div>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex flex-col w-full">
                <Label htmlFor="purchaseHistory" className="text-sm">
                  Rincian Pembelian
                </Label>
                <textarea
                  id="purchaseHistory"
                  className="w-full h-20 p-2 text-sm border dark:border-none rounded-md text-black/50 dark:text-white bg-white dark:bg-transparent"
                  defaultValue={`1x Nasi\n1x Ayam Goreng\n1x Es Teh Manis`}
                  disabled
                />
              </div>
              <div className="flex flex-col w-full space-y-2">
                <div className="rounded-lg text-sm w-fit text-white bg-secondaryColor p-1">
                  Takeaway
                </div>
                <Label htmlFor="statusPurchase" className="text-sm">
                  Status Pembayaran
                </Label>
                <div className="rounded-xl text-sm w-fit text-white bg-primaryColor p-2">
                  Tertunda
                </div>
              </div>
            </div>
          </div>
        </>
      </DetailModal>

      {/* Edit Detail Transaksi */}
      <EditModal
        isOpen={isEditModalOpenTakeaway}
        onClose={() => setIsEditModalOpenTakeaway(false)}
        onSubmit={handleSubmit(onEditSubmit)}
        title="Detail Riwayat Transaksi"
        classNameDialogContent="sm:max-w-[704px]"
        loading={loading}
      >
        <>
          <Button
            onClick={() => {
              setIsDeleteModalOpen(true);
            }}
            variant={"outline"}
            className="rounded-xl text-sm w-[120px] text-white bg-[#FF0000] absolute right-4 top-4 border-none"
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
          <div className="space-y-4">
            <div className="flex gap-4 justify-between text-sm">
              <div className="flex flex-col w-full">
                <Label htmlFor="idTransaction" className="text-sm">
                  ID Transaksi/Invoice
                </Label>
                <Input
                  type="name"
                  id="idTransaction"
                  placeholder="Id Transaksi"
                  className="text-sm"
                  {...register("cashier_id")}
                />
                {errors.cashier_id && (
                  <span className="text-sm text-red-500">
                    {errors.cashier_id.message}
                  </span>
                )}
              </div>
              <div className="flex flex-col w-full">
                <Label htmlFor="noTable" className="text-sm">
                  Nomor Meja
                </Label>
                <Input
                  type="name"
                  id="noTable"
                  placeholder="Nomor Meja"
                  className="text-sm"
                  {...register("cashier_id")}
                />
                {errors.cashier_id && (
                  <span className="text-sm text-red-500">
                    {errors.cashier_id.message}
                  </span>
                )}
              </div>
            </div>
            <div className="flex gap-4 justify-between text-sm">
              <div className="flex flex-col w-full">
                <Label htmlFor="dateTime" className="text-sm">
                  Tanggal dan Waktu Transaksi
                </Label>
                <Input
                  type="name"
                  id="dateTime"
                  placeholder="Tanggal dan Waktu Transaksi"
                  className="text-sm"
                  {...register("cashier_id")}
                />
                {errors.cashier_id && (
                  <span className="text-sm text-red-500">
                    {errors.cashier_id.message}
                  </span>
                )}
              </div>
              <div className="flex flex-col w-full">
                <Label htmlFor="price" className="text-sm">
                  Total Harga
                </Label>
                <Input
                  type="name"
                  id="price"
                  placeholder="Total Harga"
                  className="text-sm"
                  {...register("cashier_id")}
                />
                {errors.cashier_id && (
                  <span className="text-sm text-red-500">
                    {errors.cashier_id.message}
                  </span>
                )}
              </div>
            </div>
            <div className="flex gap-4 justify-between text-sm">
              <div className="flex flex-col w-full">
                <Label htmlFor="nameCashier" className="text-sm">
                  Nama Kasir
                </Label>
                <Input
                  type="name"
                  id="nameCashier"
                  placeholder="Nama Kasir"
                  className="text-sm"
                  {...register("cashier_id")}
                />
                {errors.cashier_id && (
                  <span className="text-sm text-red-500">
                    {errors.cashier_id.message}
                  </span>
                )}
              </div>
              <div className="flex flex-col w-full">
                <Label htmlFor="paymentMethod" className="text-sm">
                  Metode Pembayaran
                </Label>
                <Input
                  type="name"
                  id="paymentMethod"
                  placeholder="Metode Pembayaran"
                  className="text-sm"
                  {...register("cashier_id")}
                />
                {errors.cashier_id && (
                  <span className="text-sm text-red-500">
                    {errors.cashier_id.message}
                  </span>
                )}
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex flex-col w-full text-sm">
                <Label htmlFor="purchaseHistory" className="text-sm">
                  Rincian Pembelian
                </Label>
                <div className="w-full rounded-md border border-neutral-200 bg-transparent px-3 py-3 text-base shadow-sm transition-colors space-y-2 max-h-20 overflow-y-auto">
                  {selectedPurchaseDetails.length === 0 ? (
                    <span className="text-slate-400">Pilih produk</span>
                  ) : (
                    selectedPurchaseDetails.map((PuchaseDetails) => (
                      <div
                        key={PuchaseDetails.id}
                        className="flex items-center justify-between rounded-md"
                      >
                        <span className="text-sm">{PuchaseDetails.name}</span>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() =>
                              handleDecreaseQuantity(PuchaseDetails.id)
                            }
                          >
                            <Minus size={20} />
                          </button>
                          <span className="flex items-center justify-center border border-secondaryColor rounded-md font-medium w-10 h-6">
                            {PuchaseDetails.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              handleIncreaseQuantity(PuchaseDetails.id)
                            }
                          >
                            <Plus size={20} />
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              handleRemovePurchaseDetails(PuchaseDetails.id)
                            }
                            className="text-red-600"
                          >
                            <Trash2 size={20} />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
              <div className="flex flex-col w-full space-y-2">
                <div className="rounded-lg text-sm w-fit text-white bg-primaryColor p-1">
                  Dine In
                </div>
                <Label htmlFor="statusPurchase" className="text-sm">
                  Status Pembayaran
                </Label>
                <div className="rounded-xl text-sm w-fit text-white bg-primaryColor p-2">
                  Tertunda
                </div>
              </div>
            </div>
          </div>
        </>
      </EditModal>
      {/* Edit Detail Transaksi */}
    </>
  );
}

export default RiwayatTransaksi;
