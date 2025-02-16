/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import DeleteModal from "@/components/ui/modal/delete";
import EditModal from "@/components/ui/modal/edit";
import { SubmitHandler, useForm } from "react-hook-form";
import PinModal from "@/components/ui/modal/confirmationPin";
import DetailModal from "@/components/ui/modal/detailReusable";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FilterSVG } from "@/constants/svgIcons";
import { SearchInputCashier } from "@/components/ui/input";
import {
  putUpdateInvoice,
  useGetHistoryList,
  useGetOneInvoice,
} from "@/components/parts/cashier/history/api";
import DataTableList from "@/components/parts/cashier/history/DataTableList";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useReactToPrint } from "react-to-print";
import { useRef } from "react";
import HistoryReceipt from "@/components/ui/struk/HistoryReceipt";

interface Product {
  id: string;
  quantity: number;
  name: string;
  price: number;
}

interface Packet {
  id: string;
  quantity: number;
  name: string;
}

interface FormInputs {
  pin?: string;
  products?: Product[];
  packets?: Packet[];
}

function RiwayatTransaksi() {
  const [loading, setLoading] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeletePinModalOpen, setIsDeletePinModalOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [price, setPrice] = useState("");
  const [time, setTime] = useState("");
  const [invoice, setInvoice] = useState("");
  const [selectedFilter, setSelectedFilter] = useState({
    price: "",
    time: "",
    invoice: "",
  });
  const [isDetailModalOpenPending, setIsDetailModalOpenPending] =
    useState(false);
  const [isEditModalOpenTakeaway, setIsEditModalOpenTakeaway] = useState(false);
  const [isDetailModalOpenSuccess, setIsDetailModalOpenSuccess] =
    useState(false);
  const [selectedId, setSelectedId] = useState<string | number | null>(null);
  const [selectedPurchaseDetails, setSelectedPurchaseDetails] = useState<any[]>(
    []
  );

  // Fetch Data Hostory List
  const {
    data: dataGetHistoryList,
    error,
    mutate: mutateGetHistoryList,
  } = useGetHistoryList(search, price, time, invoice);

  // PRINT RECEIPT
  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({ contentRef });

  const handlePrint = () => {
    reactToPrintFn();
    console.log("test print");
  };

  // Handle Filter Change
  const handleFilterChange = (field: string, value: string) => {
    setSelectedFilter((prev) => ({ ...prev, [field]: value }));
  };

  // HandleOnDetail
  const onDetailModal = (
    id: string | number,
    status: string,
    isTakeawayModal: boolean
  ) => {
    setSelectedId(id);

    if (isTakeawayModal) {
      setIsDetailModalOpenPending(true);
      console.log(`Status Pending: ${id}, Status: ${status}`);
    } else {
      setIsDetailModalOpenSuccess(true);
      console.log(`Status Success: ${id}, Status: ${status}`);
    }
  };

  // GET ONE Invoice
  const { data: dataGetOneInvoice, mutate: mutateGetOneInvoice } =
    useGetOneInvoice(selectedId ? selectedId.toString() : "");

  // OnEdit Modal
  // ErrorHandle
  useEffect(() => {
    console.log("dataGetOneInvoice:", dataGetOneInvoice);
    if (dataGetOneInvoice?.data) {
      const products = Array.isArray(dataGetOneInvoice.data.products)
        ? dataGetOneInvoice.data.products.map((product: Product) => ({
            ...product,
            type: "product",
          }))
        : [];
      const packets = Array.isArray(dataGetOneInvoice.data.packets)
        ? dataGetOneInvoice.data.packets.map((packet: Packet) => ({
            ...packet,
            type: "packet",
          }))
        : [];
      setSelectedPurchaseDetails([...products, ...packets]);
    }
  }, [dataGetOneInvoice]);

  // Fetch data put invoice
  const { handlePutSubmit } = putUpdateInvoice(
    selectedId ? selectedId.toString() : ""
  );
  const { handleSubmit, reset } = useForm<FormInputs>();

  const onEditSubmit: SubmitHandler<FormInputs> = async () => {
    const formatedRequest = {
      products:
        selectedPurchaseDetails
          .filter((item) => item.type === "product")
          .map((product: Product) => ({
            id: product.id,
            quantity: product.quantity,
          })) || [],
      packets:
        selectedPurchaseDetails
          .filter((item) => item.type === "packet")
          .map((packet: Packet) => ({
            id: packet.id,
            quantity: packet.quantity,
          })) || [],
    };
    setIsEditModalOpenTakeaway(false);
    handlePutSubmit(formatedRequest, setLoading);
    mutateGetHistoryList();
    mutateGetOneInvoice();
  };

  const handlePinSubmit = (pin: string) => {
    const formatedRequest = {
      pin: pin || "",
    };
    handlePutSubmit(formatedRequest, setLoading);
    mutateGetHistoryList();
    mutateGetOneInvoice();
    reset();
  };

  const handleIncreaseQuantity = (id: string) => {
    const product = dataGetOneInvoice?.data?.products.find(
      (item) => item.id === id
    );
    const packet = dataGetOneInvoice?.data?.packets.find(
      (item) => item.id === id
    );

    if (!product && !packet) {
      console.log("Produk atau Packet tidak ditemukan");
      return;
    }

    const item = product || packet;
    const maxQuantity = item?.quantity || 0;

    setSelectedPurchaseDetails((prevDetails) =>
      prevDetails.map((purchaseDetail) =>
        purchaseDetail.id === id && purchaseDetail.quantity < maxQuantity
          ? { ...purchaseDetail, quantity: purchaseDetail.quantity + 1 }
          : purchaseDetail
      )
    );
  };

  const handleDecreaseQuantity = (id: number) => {
    setSelectedPurchaseDetails((prevDetails) =>
      prevDetails.map((purchaseDetail) =>
        purchaseDetail.id === id && purchaseDetail.quantity > 1
          ? { ...purchaseDetail, quantity: purchaseDetail.quantity - 1 }
          : purchaseDetail
      )
    );
  };

  const handleRemovePurchaseDetails = (id: number) => {
    setSelectedPurchaseDetails((prevDetails) =>
      prevDetails.map((purchaseDetail) =>
        purchaseDetail.id === id
          ? { ...purchaseDetail, quantity: 0 }
          : purchaseDetail
      )
    );
  };

  const handleDetail = () => {
    console.log("Data diedit");
  };
  if (error) return <div>Error loading data</div>;

  // const { handlePutSubmit } = putUpdateInvoice(selectedId ? selectedId.toString() : '');
  // const {
  //   handleSubmit,
  //   reset,
  // } = useForm<FormInputs>();

  // const onEditSubmit: SubmitHandler<FormInputs> = async () => {
  //   const formatedRequest = {
  //     products:
  //       selectedPurchaseDetails
  //         .filter((item) => item.type === "product")
  //         .map((product: Product) => ({
  //           id: product.id,
  //           quantity: product.quantity,
  //         })) || [],
  //     packets:
  //       selectedPurchaseDetails
  //         .filter((item) => item.type === "packet")
  //         .map((packet: Packet) => ({
  //           id: packet.id,
  //           quantity: packet.quantity,
  //         })) || [],
  //   };
  //   setIsEditModalOpenTakeaway(false)
  //   handlePutSubmit(formatedRequest, setLoading);
  // };

  // const handlePinSubmit = (pin: string) => {
  //   const formatedRequest = {
  //     pin: pin || "",
  //   };
  //   handlePutSubmit(formatedRequest, setLoading);
  //   mutateGetHistoryList()
  //   reset();
  // };

  return (
    <>
      <div className="pl-6 pr-6 pt-4 pb-4 text-xs">
        <section className="justify-start flex gap-4">
          <div className="">
            <SearchInputCashier
              className="w-[280px] text-xs h-8"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="filters">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant={"outline"}
                  className="justify-center border-secondaryColor text-sm p-2 h-8"
                >
                  <span>
                    <FilterSVG />
                  </span>
                  <span>Filter</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="transition-all duration-300 ease-in-out opacity-1 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 bg-[#E1E1E1] border border-gray-300 shadow-2xl rounded-md w-full">
                <div className="p-2 w-full text-sm text-[#000000] font-semibold">
                  <span>Pilih Filter</span>
                  <div className="border-b border-black/30 mt-1 mb-2"></div>

                  {/* Filter berdasarkan Invoice */}
                  <div className="space-y-2">
                    <span>ID Transaksi / Invoice</span>
                    <div>
                      <div className="flex items-center space-x-1">
                        <input
                          type="radio"
                          name="invoice"
                          value="asc"
                          id="invoice-asc"
                          checked={selectedFilter.invoice === "asc"}
                          onChange={() => handleFilterChange("invoice", "asc")}
                        />
                        <Label htmlFor="invoice-asc">Terendah</Label>
                      </div>
                      <div className="flex items-center space-x-1">
                        <input
                          type="radio"
                          name="invoice"
                          value="desc"
                          id="invoice-desc"
                          checked={selectedFilter.invoice === "desc"}
                          onChange={() => handleFilterChange("invoice", "desc")}
                        />
                        <Label htmlFor="invoice-desc">Tertinggi</Label>
                      </div>
                    </div>
                  </div>

                  {/* Filter berdasarkan Tanggal */}
                  <div className="space-y-2">
                    <span>Tanggal dan Waktu</span>
                    <div>
                      <div className="flex items-center space-x-1">
                        <input
                          type="radio"
                          name="time"
                          value="asc"
                          id="time-asc"
                          checked={selectedFilter.time === "asc"}
                          onChange={() => handleFilterChange("time", "asc")}
                        />
                        <Label htmlFor="time-asc">Terendah</Label>
                      </div>
                      <div className="flex items-center space-x-1">
                        <input
                          type="radio"
                          name="time"
                          value="desc"
                          id="time-desc"
                          checked={selectedFilter.time === "desc"}
                          onChange={() => handleFilterChange("time", "desc")}
                        />
                        <Label htmlFor="time-desc">Tertinggi</Label>
                      </div>
                    </div>
                  </div>

                  {/* Filter berdasarkan Harga */}
                  <div className="space-y-2">
                    <span>Total Harga</span>
                    <div>
                      <div className="flex items-center space-x-1">
                        <input
                          type="radio"
                          name="price"
                          value="asc"
                          id="price-asc"
                          checked={selectedFilter.price === "asc"}
                          onChange={() => handleFilterChange("price", "asc")}
                        />
                        <Label htmlFor="price-asc">Terendah</Label>
                      </div>
                      <div className="flex items-center space-x-1">
                        <input
                          type="radio"
                          name="price"
                          value="desc"
                          id="price-desc"
                          checked={selectedFilter.price === "desc"}
                          onChange={() => handleFilterChange("price", "desc")}
                        />
                        <Label htmlFor="price-desc">Tertinggi</Label>
                      </div>
                    </div>
                  </div>

                  {/* Tombol Terapkan */}
                  <div className="flex justify-end mt-4">
                    <Button
                      variant={"ghostButton"}
                      className="text-sm bg-secondaryColor text-white p-2 h-fit"
                      onClick={() => {
                        setPrice(selectedFilter.price);
                        setTime(selectedFilter.time);
                        setInvoice(selectedFilter.invoice);
                        console.log("Filter applied", selectedFilter);
                      }}
                    >
                      Terapkan
                    </Button>
                  </div>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </section>

        {/* History List */}
        <DataTableList
          data={dataGetHistoryList?.data ?? []}
          statusCode={200}
          message={"Daftar Meja Berhasil Didapatkan"}
          onDetailModal={onDetailModal}
        />
      </div>

      {/* Detail Status Success */}
      <DetailModal
        isOpen={isDetailModalOpenSuccess}
        onClose={() => setIsDetailModalOpenSuccess(false)}
        onPrint={() => handlePrint()}
        onDetail={handleDetail}
        title="Detail Riwayat Transaksi"
        classNameDialogFooter="p-4 border-t w-full"
        showCancelButton={true}
        showPrintButton={dataGetOneInvoice?.data?.status?.toLowerCase() !== "cancel"}
        classNameDialogHeader="border-none p-4"
        classNameButton="w-full rounded-lg text-sm"
        classNameDialogTitle="text-left font-bold"
        closeButton={false}
      >
        <>
          <div className="flex mb-4 gap-4 dark:text-white text-xs">
            <div className="flex flex-col w-full">
              <Label htmlFor="code" className="text-xs">
                ID Transaksi/Invoice
              </Label>
              <div className="flex h-9 w-full rounded-md border border-neutral-200 bg-transparent px-3 py-1 text-xs shadow-sm transition-colors text-neutral-500 dark:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primaryColor disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-800 dark:placeholder:text-neutral-400 dark:focus-visible:ring-neutral-300 items-center">
                {dataGetOneInvoice?.data?.code ?? "-"}
              </div>
            </div>
            <div className="flex flex-col w-full">
              <Label htmlFor="noTable" className="text-xs">
                Nomor Meja
              </Label>
              <div className="flex h-9 w-full rounded-md border border-neutral-200 bg-transparent px-3 py-1 text-xs shadow-sm transition-colors text-neutral-500 dark:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primaryColor disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-800 dark:placeholder:text-neutral-400 dark:focus-visible:ring-neutral-300 items-center">
                {dataGetOneInvoice?.data?.tables &&
                dataGetOneInvoice.data.tables.length > 0
                  ? dataGetOneInvoice.data.tables
                      .map((code) => `${code}`)
                      .join(", ")
                  : "-"}
              </div>
            </div>
          </div>
          <div className="flex mb-4 gap-4 dark:text-white">
            <div className="flex flex-col w-full">
              <Label htmlFor="dateTimeTransaction" className="text-xs">
                Tanggal dan Waktu Transaksi
              </Label>
              <div className="flex h-9 w-full rounded-md border border-neutral-200 bg-transparent px-3 py-1 text-xs shadow-sm transition-colors text-neutral-500 dark:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primaryColor disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-800 dark:placeholder:text-neutral-400 dark:focus-visible:ring-neutral-300 items-center">
                {dataGetOneInvoice?.data?.created_at
                  ? new Date(
                      dataGetOneInvoice.data.created_at
                    ).toLocaleDateString("id-ID", {
                      hour: "2-digit",
                      minute: "2-digit",
                    }) + " WIB"
                  : "-"}
              </div>
            </div>
            <div className="flex flex-col w-full">
              <Label htmlFor="totalPrice" className="text-xs">
                Total Harga
              </Label>
              <div className="flex h-9 w-full rounded-md border border-neutral-200 bg-transparent px-3 py-1 text-xs shadow-sm transition-colors text-neutral-500 dark:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primaryColor disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-800 dark:placeholder:text-neutral-400 dark:focus-visible:ring-neutral-300 items-center">
                Rp. {dataGetOneInvoice?.data?.price_sum.toLocaleString() ?? "-"}
              </div>
            </div>
          </div>
          <div className="flex mb-4 gap-4 dark:text-white">
            <div className="flex flex-col w-full">
              <Label htmlFor="name" className="text-xs">
                Nama Kasir
              </Label>
              <div className="flex h-9 w-full rounded-md border border-neutral-200 bg-transparent px-3 py-1 text-xs shadow-sm transition-colors text-neutral-500 dark:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primaryColor disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-800 dark:placeholder:text-neutral-400 dark:focus-visible:ring-neutral-300 items-center">
                {dataGetOneInvoice?.data?.cashier ?? "-"}
              </div>
            </div>
            <div className="flex flex-col w-full">
              <Label htmlFor="paymentMethod" className="text-xs">
                Metode Pembayaran
              </Label>
              <div className="flex h-9 w-full rounded-md border border-neutral-200 bg-transparent px-3 py-1 text-xs shadow-sm transition-colors text-neutral-500 dark:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primaryColor disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-800 dark:placeholder:text-neutral-400 dark:focus-visible:ring-neutral-300 items-center uppercase">
                {dataGetOneInvoice?.data?.payment ?? "-"}
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
                defaultValue={[
                  dataGetOneInvoice?.data?.products
                    .map((product) => `${product.quantity}x ${product.name}`)
                    .join("\n"),
                  dataGetOneInvoice?.data?.packets
                    ?.map((packet) => `${packet.quantity}x ${packet.name}`)
                    .join("\n"),
                ]
                  .filter(Boolean)
                  .join("\n")}
                disabled
              />
            </div>
            <div className="flex flex-col w-full space-y-2">
            <div className="flex flex-col w-full">
              <Label htmlFor="paymentMethod" className="text-xs">
                Diskon
              </Label>
              <div className="flex h-9 w-full rounded-md border border-neutral-200 bg-transparent px-3 py-1 text-xs shadow-sm transition-colors text-neutral-500 dark:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primaryColor disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-800 dark:placeholder:text-neutral-400 dark:focus-visible:ring-neutral-300 items-center uppercase">
                {dataGetOneInvoice?.data?.discount ?? "-"} %
              </div>
            </div>
              <div
                className={`rounded-lg text-xs w-fit text-white p-1 capitalize ${
                  dataGetOneInvoice?.data?.type === "take away"
                    ? "bg-secondaryColor"
                    : "bg-primaryColor"
                }`}
              >
                {dataGetOneInvoice?.data?.type}
              </div>
              <Label htmlFor="statusPurchase" className="text-xs mt-2">
                Status Pembayaran
              </Label>
              <div className="rounded-lg text-xs w-fit text-white bg-secondaryColor p-2 capitalize">
                {dataGetOneInvoice?.data?.status ?? "-"}
              </div>
            </div>
          </div>
        </>
      </DetailModal>

      {/* Detail Status Pending */}
      <DetailModal
        isOpen={isDetailModalOpenPending}
        onClose={() => setIsDetailModalOpenPending(false)}
        onDetail={handleDetail}
        onPrint={() => handlePrint()}
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
              setIsDetailModalOpenPending(false);
            }}
            variant={"outline"}
            className="rounded-lg text-xs w-[70px] text-white bg-secondaryColor p-2 absolute right-4 top-4"
          >
            Edit
          </Button>
          <div className="flex mb-4 gap-4 dark:text-white text-xs">
            <div className="flex flex-col w-full">
              <Label htmlFor="code" className="text-xs">
                ID Transaksi/Invoice
              </Label>
              <div className="flex h-9 w-full rounded-md border border-neutral-200 bg-transparent px-3 py-1 text-xs shadow-sm transition-colors text-neutral-500 dark:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primaryColor disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-800 dark:placeholder:text-neutral-400 dark:focus-visible:ring-neutral-300 items-center">
                {dataGetOneInvoice?.data?.code ?? "-"}
              </div>
            </div>
            <div className="flex flex-col w-full">
              <Label htmlFor="noTable" className="text-xs">
                Nomor Meja
              </Label>
              <div className="flex h-9 w-full rounded-md border border-neutral-200 bg-transparent px-3 py-1 text-xs shadow-sm transition-colors text-neutral-500 dark:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primaryColor disabled:cursor-not-allowed disabled:opacity-50 items-center">
                {dataGetOneInvoice?.data?.tables &&
                dataGetOneInvoice.data.tables.length > 0
                  ? dataGetOneInvoice.data.tables
                      .map((code) => `${code}`)
                      .join(", ")
                  : "-"}
              </div>
            </div>
          </div>
          <div className="flex mb-4 gap-4 dark:text-white">
            <div className="flex flex-col w-full">
              <Label htmlFor="dateTimeTransaction" className="text-xs">
                Tanggal dan Waktu Transaksi
              </Label>
              <div className="flex h-9 w-full rounded-md border border-neutral-200 bg-transparent px-3 py-1 text-xs shadow-sm transition-colors text-neutral-500 dark:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primaryColor disabled:cursor-not-allowed disabled:opacity-50 items-center">
                {dataGetOneInvoice?.data?.created_at
                  ? new Date(
                      dataGetOneInvoice.data.created_at
                    ).toLocaleDateString("id-ID", {
                      hour: "2-digit",
                      minute: "2-digit",
                    }) + " WIB"
                  : "-"}
              </div>
            </div>
            <div className="flex flex-col w-full">
              <Label htmlFor="totalPrice" className="text-xs">
                Total Harga
              </Label>
              <div className="flex h-9 w-full rounded-md border border-neutral-200 bg-transparent px-3 py-1 text-xs shadow-sm transition-colors text-neutral-500 dark:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primaryColor disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-800 dark:placeholder:text-neutral-400 dark:focus-visible:ring-neutral-300 items-center">
                Rp. {dataGetOneInvoice?.data?.price_sum.toLocaleString() ?? "-"}
              </div>
            </div>
          </div>
          <div className="flex mb-4 gap-4 dark:text-white">
            <div className="flex flex-col w-full">
              <Label htmlFor="name" className="text-xs">
                Nama Kasir
              </Label>
              <div className="flex h-9 w-full rounded-md border border-neutral-200 bg-transparent px-3 py-1 text-xs shadow-sm transition-colors text-neutral-500 dark:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primaryColor disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-800 dark:placeholder:text-neutral-400 dark:focus-visible:ring-neutral-300 items-center">
                {dataGetOneInvoice?.data?.cashier
                  ? dataGetOneInvoice.data.cashier
                  : "-"}
              </div>
            </div>
            <div className="flex flex-col w-full">
              <Label htmlFor="paymentMethod" className="text-xs">
                Metode Pembayaran
              </Label>
              <div className="flex h-9 w-full rounded-md border border-neutral-200 bg-transparent px-3 py-1 text-xs shadow-sm transition-colors text-neutral-500 dark:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primaryColor disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-800 dark:placeholder:text-neutral-400 dark:focus-visible:ring-neutral-300 items-center uppercase">
                {dataGetOneInvoice?.data?.payment ?? "-"}
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
                defaultValue={[
                  dataGetOneInvoice?.data?.products
                    .map((product) => `${product.quantity}x ${product.name}`)
                    .join("\n"),
                  dataGetOneInvoice?.data?.packets
                    ?.map((packet) => `${packet.quantity}x ${packet.name}`)
                    .join("\n"),
                ]
                  .filter(Boolean)
                  .join("\n")}
                disabled
              />
            </div>
            <div className="flex flex-col w-full space-y-2">
            <div className="flex flex-col w-full">
              <Label htmlFor="paymentMethod" className="text-xs">
                Diskon
              </Label>
              <div className="flex h-9 w-full rounded-md border border-neutral-200 bg-transparent px-3 py-1 text-xs shadow-sm transition-colors text-neutral-500 dark:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primaryColor disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-800 dark:placeholder:text-neutral-400 dark:focus-visible:ring-neutral-300 items-center uppercase">
                {dataGetOneInvoice?.data?.discount ?? "-"} %
              </div>
            </div>
              <div
                className={`rounded-lg text-xs w-fit text-white p-1 capitalize ${
                  dataGetOneInvoice?.data?.type === "take away"
                    ? "bg-secondaryColor"
                    : "bg-primaryColor"
                }`}
              >
                {dataGetOneInvoice?.data?.type}
              </div>
              <Label htmlFor="statusPurchase" className="text-xs">
                Status Pembayaran
              </Label>
              <div className="rounded-xl text-xs w-fit text-white bg-primaryColor p-2 capitalize">
                {dataGetOneInvoice?.data?.status ?? "-"}
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
            type="button"
            variant={"outline"}
            className="rounded-xl text-xs w-[120px] text-white bg-[#FF0000] absolute right-4 top-4 border-none"
          >
            Hapus Transaksi
          </Button>
          <DeleteModal
            isOpen={isDeleteModalOpen}
            onClose={() => {
              setIsDeleteModalOpen(false);
            }}
            onDelete={() => {
              setIsDeletePinModalOpen(true);
            }}
            title="Hapus"
            description="Anda yakin ingin menghapus item ini ?"
          />
          <div className="flex mb-4 gap-4 dark:text-white text-xs">
            <div className="flex flex-col w-full">
              <Label htmlFor="code" className="text-xs">
                ID Transaksi/Invoice
              </Label>
              <div className="flex h-9 w-full rounded-md border border-neutral-200 bg-transparent px-3 py-1 text-xs shadow-sm transition-colors text-neutral-500 dark:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primaryColor disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-800 dark:placeholder:text-neutral-400 dark:focus-visible:ring-neutral-300 items-center">
                {dataGetOneInvoice?.data?.code ?? "-"}
              </div>
            </div>
            <div className="flex flex-col w-full">
              <Label htmlFor="noTable" className="text-xs">
                Nomor Meja
              </Label>
              <div className="flex h-9 w-full rounded-md border border-neutral-200 bg-transparent px-3 py-1 text-xs shadow-sm transition-colors text-neutral-500 dark:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primaryColor disabled:cursor-not-allowed disabled:opacity-50 items-center">
                {dataGetOneInvoice?.data?.tables &&
                dataGetOneInvoice.data.tables.length > 0
                  ? dataGetOneInvoice.data.tables
                      .map((code) => `${code}`)
                      .join(", ")
                  : "-"}
              </div>
            </div>
          </div>
          <div className="flex mb-4 gap-4 dark:text-white">
            <div className="flex flex-col w-full">
              <Label htmlFor="dateTimeTransaction" className="text-xs">
                Tanggal dan Waktu Transaksi
              </Label>
              <div className="flex h-9 w-full rounded-md border border-neutral-200 bg-transparent px-3 py-1 text-xs shadow-sm transition-colors text-neutral-500 dark:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primaryColor disabled:cursor-not-allowed disabled:opacity-50 items-center">
                {dataGetOneInvoice?.data?.created_at
                  ? new Date(
                      dataGetOneInvoice.data.created_at
                    ).toLocaleDateString("id-ID", {
                      hour: "2-digit",
                      minute: "2-digit",
                    }) + " WIB"
                  : "-"}
              </div>
            </div>
            <div className="flex flex-col w-full">
              <Label htmlFor="totalPrice" className="text-xs">
                Total Harga
              </Label>
              <div className="flex h-9 w-full rounded-md border border-neutral-200 bg-transparent px-3 py-1 text-xs shadow-sm transition-colors text-neutral-500 dark:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primaryColor disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-800 dark:placeholder:text-neutral-400 dark:focus-visible:ring-neutral-300 items-center">
                Rp. {dataGetOneInvoice?.data?.price_sum.toLocaleString() ?? "-"}
              </div>
            </div>
          </div>
          <div className="flex mb-4 gap-4 dark:text-white">
            <div className="flex flex-col w-full">
              <Label htmlFor="name" className="text-xs">
                Nama Kasir
              </Label>
              <div className="flex h-9 w-full rounded-md border border-neutral-200 bg-transparent px-3 py-1 text-xs shadow-sm transition-colors text-neutral-500 dark:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primaryColor disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-800 dark:placeholder:text-neutral-400 dark:focus-visible:ring-neutral-300 items-center">
                {dataGetOneInvoice?.data?.cashier
                  ? dataGetOneInvoice.data.cashier
                  : "-"}
              </div>
            </div>
            <div className="flex flex-col w-full">
              <Label htmlFor="paymentMethod" className="text-xs">
                Metode Pembayaran
              </Label>
              <div className="flex h-9 w-full rounded-md border border-neutral-200 bg-transparent px-3 py-1 text-xs shadow-sm transition-colors text-neutral-500 dark:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primaryColor disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-800 dark:placeholder:text-neutral-400 dark:focus-visible:ring-neutral-300 items-center uppercase">
                {dataGetOneInvoice?.data?.payment ?? "-"}
              </div>
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

      {/* Struk */}
      <div className="hidden">
        <HistoryReceipt ref={contentRef} dataReceipt={dataGetOneInvoice} />
      </div>

      <PinModal
        isOpen={isDeletePinModalOpen}
        onClose={() => {
          setIsEditModalOpenTakeaway(false);
          setIsDeleteModalOpen(false);
          setIsDeletePinModalOpen(false);
        }}
        onDelete={handlePinSubmit}
      />
    </>
  );
}

export default RiwayatTransaksi;
