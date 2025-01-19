"use client"
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import DetailModal from "@/components/ui/modal/detailReusable";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { ActionSVG } from "@/constants/svgIcons";
import { format, parseISO } from "date-fns";
import React, { useState } from "react";
import { TransaksiInterface } from "./interface";
import { useGetTransaksiOne } from "./api";
import { Label } from "@/components/ui/label";

const DataTable: React.FC<TransaksiInterface> = ({ data, currentPage }) => {
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [selectedTransactionId, setSelectedTransactionId] = useState<string | null>(null);

    // Data fetching
    const { data: dataDetail } = useGetTransaksiOne(selectedTransactionId?.toString() || "");
    const handleDetail = (id: string) => {
        setSelectedTransactionId(id);
        setIsDetailModalOpen(true);
    };

    return (
        <div className="Table">
            {/*  */}
            <div className="border border-[#E4E4E7] rounded-lg overflow-hidden">
                <Table>
                    <TableHeader className="bg-primaryColor">
                        <TableRow>
                            <TableHead className="w-[60px]">No</TableHead>
                            <TableHead className="w-[260px]">ID Transaksi/Invoice</TableHead>
                            <TableHead className="w-[260px]">Tanggal dan Waktu</TableHead>
                            <TableHead className="w-[260px]">Status</TableHead>
                            <TableHead className="w-[160px]">Total Harga</TableHead>
                            <TableHead className="w-[196px]">Aksi</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data?.items?.length > 0 ? (
                            data?.items?.map((item, index) => (
                                <TableRow
                                    className="text-sm text-[#141414] dark:text-white"
                                    key={item.id}
                                >
                                    <TableCell className="font-medium text-center">
                                        {(currentPage - 1) * 10 + (index + 1)}
                                    </TableCell>
                                    <TableCell className="text-center">
                                        {item?.code || "-"}
                                    </TableCell>
                                    <TableCell className="text-center">
                                        {item?.created_at
                                            ? format(parseISO(item.created_at), "dd/MM/yyyy HH:mm")
                                            : "-"}
                                    </TableCell>
                                    <TableCell className="text-center flex justify-center">
                                        <div
                                            className={`capitalize ${item?.status === "success"
                                                ? "bg-secondaryColor"
                                                : item?.status === "pending"
                                                    ? "bg-[#FEA026]"
                                                    : "bg-[#EE1616]"
                                                } rounded-lg text-xs p-2 w-fit text-white`}
                                        >
                                            {item?.status}
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-center">
                                        Rp. {new Intl.NumberFormat('id-ID').format(item?.price_sum || 0)}
                                    </TableCell>
                                    {/* aksi */}
                                    <TableCell className="flex m-auto justify-center text-secondaryColor dark:text-white">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button className="border-none" variant={"ghostButton"}>
                                                    <ActionSVG color="currentColor" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent className="transition-all duration-300 ease-in-out opacity-1 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 bg-white border border-gray-300 shadow-2xl rounded-md">
                                                <DropdownMenuLabel className="font-semibold text-secondaryColor text-sm w-full shadow-md">
                                                    Pilih Aksi
                                                </DropdownMenuLabel>
                                                <div className="p-2 text-sm space-y-1">
                                                    <div className="w-full">
                                                        <button
                                                            className="text-black hover:text-primaryColor dark:text-white w-full text-left"
                                                            onClick={() => handleDetail(item.id)}
                                                        >
                                                            Lihat Rincian
                                                        </button>
                                                        <DetailModal
                                                            isOpen={isDetailModalOpen}
                                                            onClose={() => setIsDetailModalOpen(false)}
                                                            onDetail={handleDetail}
                                                            title="Detail Riwayat Transaksi"
                                                            showCancelButton={true}
                                                            showPrintButton={true}
                                                        >
                                                            <div className="flex mb-4 gap-4 dark:text-white">
                                                                <div className="flex flex-col w-full">
                                                                    <Label htmlFor="idTransaction">
                                                                        ID Transaksi/Invoice
                                                                    </Label>
                                                                    <div className="flex h-9 w-full rounded-md border border-neutral-200 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors text-neutral-500 dark:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primaryColor disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-800 dark:placeholder:text-neutral-400 dark:focus-visible:ring-neutral-300 items-center">
                                                                        {dataDetail?.data?.code || "-"}
                                                                    </div>
                                                                </div>
                                                                <div className="flex flex-col w-full">
                                                                    <Label htmlFor="noTable">Nomor Meja</Label>
                                                                    <div className="flex h-9 w-full rounded-md border border-neutral-200 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors text-neutral-500 dark:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primaryColor disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-800 dark:placeholder:text-neutral-400 dark:focus-visible:ring-neutral-300 items-center">
                                                                        {dataDetail?.data?.tables?.join(", ")}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="flex mb-4 gap-4 dark:text-white">
                                                                <div className="flex flex-col w-full">
                                                                    <Label htmlFor="dateTimeTransaction">
                                                                        Tanggal dan Waktu Transaksi
                                                                    </Label>
                                                                    <div className="flex h-9 w-full rounded-md border border-neutral-200 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors text-neutral-500 dark:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primaryColor disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-800 dark:placeholder:text-neutral-400 dark:focus-visible:ring-neutral-300 items-center">
                                                                        {dataDetail?.data?.created_at
                                                                            ? format(parseISO(dataDetail?.data?.created_at), "dd/MM/yyyy HH:mm")
                                                                            : "-"}
                                                                    </div>
                                                                </div>
                                                                <div className="flex flex-col w-full">
                                                                    <Label htmlFor="totalPrice">Total Harga</Label>
                                                                    <div className="flex h-9 w-full rounded-md border border-neutral-200 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors text-neutral-500 dark:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primaryColor disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-800 dark:placeholder:text-neutral-400 dark:focus-visible:ring-neutral-300 items-center">
                                                                        Rp. {new Intl.NumberFormat('id-ID').format(dataDetail?.data?.price_sum || 0)}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="flex mb-4 gap-4 dark:text-white">
                                                                <div className="flex flex-col w-full">
                                                                    <Label htmlFor="name">Nama Kasir</Label>
                                                                    <div className="flex h-9 w-full rounded-md border border-neutral-200 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors text-neutral-500 dark:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primaryColor disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-800 dark:placeholder:text-neutral-400 dark:focus-visible:ring-neutral-300 items-center">
                                                                        {dataDetail?.data?.cashier || "-"}
                                                                    </div>
                                                                </div>
                                                                <div className="flex flex-col w-full">
                                                                    <Label htmlFor="paymentMethod">
                                                                        Metode Pembayaran
                                                                    </Label>
                                                                    <div className="flex h-9 w-full rounded-md border border-neutral-200 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors text-neutral-500 dark:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primaryColor disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-800 dark:placeholder:text-neutral-400 dark:focus-visible:ring-neutral-300 items-center capitalize">
                                                                        {dataDetail?.data?.payment || "-"}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="flex gap-4">
                                                                <div className="flex flex-col w-full">
                                                                    <Label htmlFor="purchaseHistory">
                                                                        Rincian Pembelian
                                                                    </Label>
                                                                    <div className="w-full h-24 p-2 text-sm border dark:border-none rounded-md text-black/50 dark:text-white bg-white dark:bg-transparent overflow-auto">
                                                                        <ul className="">
                                                                            {dataDetail?.data?.products?.map((product, index) => (
                                                                                <li key={index}>
                                                                                    {product.quantity}x {product.name}
                                                                                </li>
                                                                            ))}
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                                <div className="flex flex-col w-full">
                                                                    <Label htmlFor="statusPurchase">
                                                                        Status Pembayaran
                                                                    </Label>
                                                                    <div
                                                                        className={`capitalize ${dataDetail?.data?.status === "success"
                                                                            ? "bg-secondaryColor"
                                                                            : dataDetail?.data?.status === "pending"
                                                                                ? "bg-[#FEA026]"
                                                                                : "bg-[#EE1616]"
                                                                            } rounded-lg text-xs p-2 w-fit text-white`}
                                                                    >
                                                                        {dataDetail?.data?.status || "-"}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </DetailModal>
                                                    </div>
                                                    <button
                                                        className="text-black hover:text-primaryColor dark:text-white w-full text-left"
                                                        onClick={() => setIsDetailModalOpen(true)}
                                                    >
                                                        Print
                                                    </button>
                                                </div>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center">Tidak ada data</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default DataTable;
