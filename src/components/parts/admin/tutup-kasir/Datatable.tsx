/* eslint-disable @typescript-eslint/no-unused-vars */
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
import React, { useRef, useState } from "react";
import { Label } from "@/components/ui/label";
import { showAlert2 } from "@/lib/sweetalert2";
import TableReceiptAdmin from "./struk";
import { useReactToPrint } from "react-to-print";
import { CloseCashierInterface } from "./interface";
import { useGetCloseCashierOne } from "./api";

const DataTable: React.FC<CloseCashierInterface> = ({ data, currentPage }) => {
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [selectedTransactionId, setSelectedTransactionId] = useState<string | null>(null);

    // Fetch the data for the selected transaction
    const { data: dataDetail } = useGetCloseCashierOne(selectedTransactionId?.toString() || "");

    // Content reference for printing
    const contentRef = useRef<HTMLDivElement>(null);
    const reactToPrintFn = useReactToPrint({ contentRef });

    const handleDetail = (id: string) => {
        setSelectedTransactionId(id);
        setIsDetailModalOpen(true);
    };

    const printReceiptDetail = (id: string) => {
        setSelectedTransactionId(id);
        reactToPrintFn();
    };

    const printReceipt = (id: string) => {
        // Perbarui ID transaksi yang dipilih dengan data transaksi terbaru
        setSelectedTransactionId(id);

        // Menunggu update data selesai baru memanggil reactToPrintFn
        setTimeout(() => {
            // Panggil print setelah ID dipilih dan data sudah siap
            reactToPrintFn();
        }, 1000); // Tambahkan delay jika perlu agar data benar-benar terupdate
    };



    return (
        <div className="Table">
            {/*  */}
            <div className="border border-[#E4E4E7] rounded-lg overflow-hidden">
                <Table>
                    <TableHeader className="bg-primaryColor">
                        <TableRow>
                            <TableHead className="w-[60px]">No</TableHead>
                            <TableHead className="w-[260px]">Nama Kasir</TableHead>
                            <TableHead className="w-[260px]">Tanggal</TableHead>
                            <TableHead className="w-[160px]">Total Pemasukan</TableHead>
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
                                        {item?.cashier?.name || "-"}
                                    </TableCell>
                                    <TableCell className="text-center">
                                        {item?.started_at
                                            ? format(parseISO(item.started_at), "dd/MM/yyyy")
                                            : "-"}
                                    </TableCell>
                                    <TableCell className="text-center">
                                        Rp. {new Intl.NumberFormat('id-ID').format(item?.income || 0)}
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
                                                            onDetail={printReceiptDetail}
                                                            title="Detail Riwayat Transaksi"
                                                            showCancelButton={true}
                                                            showCetakButton={true}
                                                            onPrint={() => { }}
                                                        >
                                                            <div className="flex mb-4 gap-4 dark:text-white">
                                                                <div className="flex flex-col w-full">
                                                                    <Label htmlFor="idTransaction">
                                                                        Nama Kasir
                                                                    </Label>
                                                                    <div className="flex h-9 w-full rounded-md border border-neutral-200 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors text-neutral-500 dark:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primaryColor disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-800 dark:placeholder:text-neutral-400 dark:focus-visible:ring-neutral-300 items-center">
                                                                        {dataDetail?.data[0]?.cashier_name || "-"}
                                                                    </div>
                                                                </div>
                                                                <div className="flex flex-col w-full">
                                                                    <Label htmlFor="noTable">Tanggal Kasir Mulai</Label>
                                                                    <div className="flex h-9 w-full rounded-md border border-neutral-200 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors text-neutral-500 dark:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primaryColor disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-800 dark:placeholder:text-neutral-400 dark:focus-visible:ring-neutral-300 items-center">
                                                                        {dataDetail?.data[0]?.start_at
                                                                            ? format(parseISO(dataDetail?.data[0]?.start_at), "dd/MM/yyyy, HH:mm:ss")
                                                                            : "-"}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="flex mb-4 gap-4 dark:text-white">
                                                                <div className="flex flex-col w-full">
                                                                    <Label htmlFor="dateTimeTransaction">
                                                                        Tanggal
                                                                    </Label>
                                                                    <div className="flex h-9 w-full rounded-md border border-neutral-200 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors text-neutral-500 dark:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primaryColor disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-800 dark:placeholder:text-neutral-400 dark:focus-visible:ring-neutral-300 items-center">
                                                                        {dataDetail?.data[0]?.date
                                                                            ? format(parseISO(dataDetail?.data[0]?.date), "dd/MM/yyyy")
                                                                            : "-"}
                                                                    </div>
                                                                </div>
                                                                <div className="flex flex-col w-full">
                                                                    <Label htmlFor="totalPrice">Tanggal Kasir Tutup</Label>
                                                                    <div className="flex h-9 w-full rounded-md border border-neutral-200 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors text-neutral-500 dark:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primaryColor disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-800 dark:placeholder:text-neutral-400 dark:focus-visible:ring-neutral-300 items-center">
                                                                        {dataDetail?.data[0]?.end_at
                                                                            ? format(parseISO(dataDetail?.data[0]?.end_at), "dd/MM/yyyy, HH:mm:ss")
                                                                            : "-"}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="flex mb-4 gap-4 dark:text-white">
                                                                <div className="flex flex-col w-full">
                                                                    <Label htmlFor="name">Setoran Kasir</Label>
                                                                    <div className="flex h-9 w-full rounded-md border border-neutral-200 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors text-neutral-500 dark:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primaryColor disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-800 dark:placeholder:text-neutral-400 dark:focus-visible:ring-neutral-300 items-center">
                                                                        Rp. {new Intl.NumberFormat('id-ID').format(dataDetail?.data[0]?.cashier_deposit || 0)}
                                                                    </div>
                                                                </div>
                                                                <div className="flex flex-col w-full">
                                                                    <Label htmlFor="paymentMethod">
                                                                        Setoran Tutup Kasir
                                                                    </Label>
                                                                    <div className="flex h-9 w-full rounded-md border border-neutral-200 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors text-neutral-500 dark:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primaryColor disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-800 dark:placeholder:text-neutral-400 dark:focus-visible:ring-neutral-300 items-center capitalize">
                                                                        Rp. {new Intl.NumberFormat('id-ID').format(dataDetail?.data[0]?.cash_on_hand_end || 0)}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="flex mb-4 gap-4 dark:text-white">
                                                                <div className="flex flex-col w-full">
                                                                    <Label htmlFor="name">Selisih</Label>
                                                                    <div className="flex h-9 w-full rounded-md border border-neutral-200 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors text-neutral-500 dark:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primaryColor disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-800 dark:placeholder:text-neutral-400 dark:focus-visible:ring-neutral-300 items-center">
                                                                        Rp. {new Intl.NumberFormat('id-ID').format(dataDetail?.data[0]?.difference || 0)}
                                                                    </div>
                                                                </div>
                                                                <div className="flex flex-col w-full">
                                                                    <Label htmlFor="paymentMethod">
                                                                        Total Pemasukan
                                                                    </Label>
                                                                    <div className="flex h-9 w-full rounded-md border border-neutral-200 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors text-neutral-500 dark:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primaryColor disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-800 dark:placeholder:text-neutral-400 dark:focus-visible:ring-neutral-300 items-center capitalize">
                                                                        Rp. {new Intl.NumberFormat('id-ID').format(dataDetail?.data[0]?.total || 0)}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </DetailModal>
                                                    </div>
                                                    <div style={{ display: 'none' }}>
                                                        <div ref={contentRef}>
                                                            {/* This is the content that will be printed */}
                                                            <TableReceiptAdmin idInvoice={selectedTransactionId || ""} />
                                                        </div>
                                                    </div>

                                                    <button
                                                        className={`text-black hover:text-primaryColor dark:text-white w-full text-left`}
                                                        onClick={() => printReceipt(item.id)}
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
