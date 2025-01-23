import React, { useEffect, useState } from "react";
import { ListApiResponse } from "./interface";
import { Button } from "@/components/ui/button";
import { formatRupiah } from "@/hooks/useRupiah";
import { putRiwayatTransaksi, useGetOneListCard } from "./api";
import DetailModal from "@/components/ui/modal/detailReusable";
import { Label } from "@/components/ui/label";
import { format, parseISO } from "date-fns";
import EditModal from "@/components/ui/modal/edit";
import { SubmitHandler, useForm } from "react-hook-form";
import PinModal from "@/components/ui/modal/confirmationPin";
import DeleteModal from "@/components/ui/modal/delete";
import { Input } from "@/components/ui/input";
import { Minus, Plus, Trash2 } from "lucide-react";
// import EditModal from "@/components/ui/modal/edit";

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

const DataRiwayat: React.FC<ListApiResponse> = ({ data }) => {
  const [isDetailModalOpenDineIn, setIsDetailModalOpenDineIn] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  // const [isPrintSuccess, setIsPrintSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeletePinModalOpen, setIsDeletePinModalOpen] = useState(false);
  const [selectedTransactionId, setSelectedTransactionId] = useState<
    string | null
  >("");
  const [selectedPurchaseDetails, setSelectedPurchaseDetails] = useState<any[]>(
    []
  );
  const [pinValue, setPinValue] = useState<string>("");
  const { data: dataDetail } = useGetOneListCard(
    selectedTransactionId?.toString() || ""
  );
  console.log(dataDetail);

  useEffect(() => {
    console.log("dataDetail:", dataDetail);

    if (dataDetail?.data) {
      const products = Array.isArray(dataDetail.data.products)
        ? dataDetail.data.products.map((product: Product) => ({
            ...product,
            type: "product",
          }))
        : [];
      const packets = Array.isArray(dataDetail.data.packets)
        ? dataDetail.data.packets.map((packet: Packet) => ({
            ...packet,
            type: "packet",
          }))
        : [];

      setSelectedPurchaseDetails([...products, ...packets]);
    }
  }, [dataDetail]);

  console.log(selectedPurchaseDetails);
  const [pinFromModal, setPinFromModal] = useState<string>("");
  const { handlePutSubmit } = putRiwayatTransaksi(selectedTransactionId || "");
  const {
    register,
    handleSubmit,
    trigger,
    setValue,
    formState: { errors },
  } = useForm<FormInputs>();

  const onSubmit: SubmitHandler<FormInputs> = async (formData) => {
    const formatedRequest = {
      pin: formData.pin || "",
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
    console.log(formatedRequest);
    handlePutSubmit(formatedRequest, setLoading);
  };

  const handlePinSubmit = (pin: string) => {
    const formatedRequest = {
      pin: pinFromModal || "",
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
    console.log("Pin received from modal:", pin);
    setPinFromModal(pin);
    handlePutSubmit(formatedRequest, setLoading);
  };

  const handleDetailModal = () => {
    setIsDetailModalOpenDineIn(true);
  };

  const handleIncreaseQuantity = (id: number) => {
    setSelectedPurchaseDetails((prevDetails) =>
      prevDetails.map((purchaseDetail) =>
        purchaseDetail.id === id
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

  const handleButtonClick = (num: number) => {
    if (pinValue.length < 6) {
      const newValue = pinValue + num;
      setPinValue(newValue);
      setValue("pin", newValue);
      trigger("pin");
    }
  };

  const handleDelete = () => {
    const newValue = pinValue.slice(0, -1);
    setPinValue(newValue);
    setValue("pin", newValue);
    trigger("pin");
  };
  const formatedProduct = dataDetail?.data.products
    .map((product: Product) => `${product.quantity}x ${product.name}`)
    .join("\n");

  // const handlePrint = () => {
  //   setIsPrintSuccess(true);
  // };
  if (!data) {
    return (
      <>
        <section className="grid grid-cols-8 gap-14 pt-8 pb-8 pl-16 pr-16 *:aspect-square">
          <div className="col-span-8 text-center font-bold text-xl text-gray-500">
            Data tidak tersedia
          </div>
        </section>
      </>
    );
  }
  return (
    <>
      {/* Before Revisi Pandu */}
      {/* <section className="grid grid-cols-3 gap-4">
        {data.map((item, index) => {
          return (
            <>
              <div className="flex justify-between gap-4 w-full border-primaryColor border rounded-lg p-2">
                <div className="w-[40%] justify-center flex items-center">
                  <button
                    key={item?.id || index}
                    className="rounded-lg border border-primaryColor flex items-center justify-center w-28 h-28 font-bold text-sm text-primaryColor"
                  >
                    {item?.customer}
                  </button>
                  <div className="w-[60%] space-y-2 justify-center">
                    <div>{item?.code}</div>
                    <div>26/02/2023 09:46:00</div>
                    <div>{formatRupiah(item?.price_sum.toLocaleString())}</div>
                    <div className="flex justify-between gap-2">
                      <Button
                        variant={"ghostButton"}
                        className={`text-sm  text-white pl-2 pr-2 pt-1 pb-1 h-fit w-full ${
                          item?.status === "success"
                            ? "bg-secondaryColor"
                            : "bg-primaryColor"
                        }`}
                      >
                        {item?.status === "success"
                          ? "Berhasil"
                          : item?.status === "pending"
                          ? "Tertunda"
                          : "Gagal"}
                      </Button>
                      <Button
                        variant={"ghostButton"}
                        onClick={() => {
                          setSelectedTransactionId(item?.id);
                          if (item?.status === "pending") {
                            setIsEditModalOpen(true);
                          } else {
                            setIsDetailModalOpenDineIn(true);
                          }
                        }}
                        className="text-sm bg-white border border-secondaryColor text-black pl-2 pr-2 pt-1 pb-1 h-fit w-full"
                      >
                        Detail
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </section> */}
      {/* After Pandu Revisi */}
      <section className="grid grid-cols-3 gap-4">
        {data.map((item, index) => (
          <div
            key={item?.id || index}
            className="flex border-primaryColor border rounded-lg p-2"
          >
            <div className="flex items-center space-x-4 w-full">
              <button
                className="flex-shrink-0 rounded-lg border border-secondaryColor flex items-center justify-center 
          aspect-square w-28 h-28 font-bold text-sm text-black text-center break-words px-2"
              >
                {item?.customer}
              </button>
              <div className="flex-grow min-w-0 space-y-2">
                <p className="truncate font-semibold">{item?.code}</p>
                <div>26/02/2023 09:46:00</div>
                <p className="font-medium">
                  {formatRupiah(item?.price_sum.toLocaleString())}
                </p>
                <div className="flex gap-2">
                  <Button
                    variant="ghostButton"
                    className={`text-sm text-white pl-2 pr-2 pt-1 pb-1 h-fit w-full ${
                      item?.status === "success"
                        ? "bg-secondaryColor"
                        : item?.status === "pending"
                        ? "bg-primaryColor"
                        : "bg-[#FF0000]"
                    }`}
                  >
                    {item?.status === "success"
                      ? "Berhasil"
                      : item?.status === "pending"
                      ? "Tertunda"
                      : "Gagal"}
                  </Button>
                  <Button
                    variant="ghostButton"
                    onClick={() => {
                      setSelectedTransactionId(item?.id);
                      if (item?.status === "pending") {
                        setIsEditModalOpen(true);
                      } else {
                        setIsDetailModalOpenDineIn(true);
                      }
                    }}
                    className="text-sm bg-white border border-secondaryColor text-black pl-2 pr-2 pt-1 pb-1 h-fit w-full"
                  >
                    Detail
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>
      <DetailModal
        isOpen={isDetailModalOpenDineIn}
        onClose={() => {
          setIsDetailModalOpenDineIn(false);
        }}
        onDetail={handleDetailModal}
        title="Detail Riwayat Transaksi"
        classNameDialogFooter="p-4 border-t w-full"
        showCancelButton={true}
        showPrintButton={dataDetail?.data?.status === "success" ? true : false}
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
                {dataDetail?.data?.code}
              </div>
            </div>
            <div className="flex flex-col w-full">
              <Label htmlFor="noTable" className="text-sm">
                Nomor Meja
              </Label>
              <div className="flex h-9 w-full rounded-md border border-neutral-200 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors text-neutral-500 dark:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primaryColor disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-800 dark:placeholder:text-neutral-400 dark:focus-visible:ring-neutral-300 items-center">
                {dataDetail?.data?.tables.join(", ") || "-"}
              </div>
            </div>
          </div>
          <div className="flex mb-4 gap-4 dark:text-white">
            <div className="flex flex-col w-full">
              <Label htmlFor="dateTimeTransaction" className="text-sm">
                Tanggal dan Waktu Transaksi
              </Label>
              <div className="flex h-9 w-full rounded-md border border-neutral-200 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors text-neutral-500 dark:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primaryColor disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-800 dark:placeholder:text-neutral-400 dark:focus-visible:ring-neutral-300 items-center">
                {dataDetail?.data?.created_at
                  ? format(
                      parseISO(dataDetail?.data?.created_at),
                      "dd/MM/yyyy HH:mm"
                    )
                  : "-"}
              </div>
            </div>
            <div className="flex flex-col w-full">
              <Label htmlFor="totalPrice" className="text-sm">
                Total Harga
              </Label>
              <div className="flex h-9 w-full rounded-md border border-neutral-200 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors text-neutral-500 dark:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primaryColor disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-800 dark:placeholder:text-neutral-400 dark:focus-visible:ring-neutral-300 items-center">
                {formatRupiah(
                  dataDetail?.data?.price_sum.toLocaleString() || "0"
                )}
              </div>
            </div>
          </div>
          <div className="flex mb-4 gap-4 dark:text-white">
            <div className="flex flex-col w-full">
              <Label htmlFor="name" className="text-sm">
                Nama Kasir
              </Label>
              <div className="flex h-9 w-full rounded-md border border-neutral-200 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors text-neutral-500 dark:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primaryColor disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-800 dark:placeholder:text-neutral-400 dark:focus-visible:ring-neutral-300 items-center">
                {dataDetail?.data?.cashier || "-"}
              </div>
            </div>
            <div className="flex flex-col w-full">
              <Label htmlFor="paymentMethod" className="text-sm">
                Metode Pembayaran
              </Label>
              <div className="flex h-9 w-full rounded-md border border-neutral-200 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors text-neutral-500 dark:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primaryColor disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-800 dark:placeholder:text-neutral-400 dark:focus-visible:ring-neutral-300 items-center">
                {dataDetail?.data?.payment || "-"}
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
                defaultValue={formatedProduct}
                disabled
              />
            </div>
            <div className="flex flex-col w-full space-y-2">
              <div
                className={`rounded-lg text-sm w-fit text-white ${
                  dataDetail?.data?.type === "dine in"
                    ? "bg-primaryColor"
                    : dataDetail?.data?.type === "take away"
                    ? "bg-secondaryColor"
                    : "bg-error"
                } p-1`}
              >
                {dataDetail?.data?.type === "dine in" ? "Dine In" : "Take Away"}
              </div>
              <Label htmlFor="statusPurchase" className="text-sm mt-2">
                Status Pembayaran
              </Label>
              <div
                className={`rounded-lg text-sm w-fit text-white ${
                  dataDetail?.data?.status === "success"
                    ? "bg-secondaryColor"
                    : dataDetail?.data?.status === "pending"
                    ? "bg-primaryColor"
                    : "bg-error"
                } p-2`}
              >
                {dataDetail?.data?.status === "success"
                  ? "Berhasil"
                  : dataDetail?.data?.status === "pending"
                  ? "Tertunda"
                  : "Gagal"}
              </div>
            </div>
          </div>
        </>
      </DetailModal>

      <EditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSubmit={handleSubmit(onSubmit)}
        title="Detail Riwayat Transaksi"
        classNameDialogContent="sm:max-w-[704px]"
        editButtonText="Kirim"
        cancelButtonText="Tutup"
        loading={loading}
      >
        <>
          <Button
            onClick={() => {
              setIsDeletePinModalOpen(true);
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
            }}
            title="Hapus"
            description="Anda yakin ingin menghapus item ini ?"
          />
          <PinModal
            isOpen={isDeletePinModalOpen}
            onClose={() => {
              setIsEditModalOpen(false);
              setIsDeleteModalOpen(false);
              setIsDeletePinModalOpen(false);
            }}
            onDelete={handlePinSubmit}
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
                  value={dataDetail?.data?.code}
                  disabled
                  // {...register("cashier_id")}
                />
                {/* {errors.cashier_id && (
                  <span className="text-sm text-red-500">
                    {errors.cashier_id.message}
                  </span>
                )} */}
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
                  value={dataDetail?.data?.tables.join(", ") || "-"}
                  disabled
                  // {...register("cashier_id")}
                />
                {/* {errors.cashier_id && (
                  <span className="text-sm text-red-500">
                    {errors.cashier_id.message}
                  </span>
                )} */}
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
                  disabled
                  value={
                    dataDetail?.data?.created_at
                      ? format(
                          parseISO(dataDetail?.data?.created_at),
                          "dd/MM/yyyy HH:mm"
                        )
                      : "-"
                  }
                  // {...register("cashier_id")}
                />
                {/* {errors.cashier_id && (
                  <span className="text-sm text-red-500">
                    {errors.cashier_id.message}
                  </span>
                )} */}
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
                  value={formatRupiah(
                    dataDetail?.data?.price_sum.toLocaleString() || "0"
                  )}
                  disabled
                />
                {/* {errors.cashier_id && (
                  <span className="text-sm text-red-500">
                    {errors.cashier_id.message}
                  </span>
                )} */}
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
                  value={dataDetail?.data?.cashier || "-"}
                  // {...register("cashier_id")}
                />
                {/* {errors.cashier_id && (
                  <span className="text-sm text-red-500">
                    {errors.cashier_id.message}
                  </span>
                )} */}
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
                  value={dataDetail?.data?.payment || "-"}
                  // {...register("cashier_id")}
                />
                {/* {errors.cashier_id && (
                  <span className="text-sm text-red-500">
                    {errors.cashier_id.message}
                  </span>
                )} */}
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
    </>
  );
};

export default DataRiwayat;
