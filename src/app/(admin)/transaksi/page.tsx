"use client";

import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SearchInput } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ActionSVG } from "@/constants/svgIcons";
import DetailModal from "@/components/ui/modal/detail";

const transaction = [
  {
    no: "1",
    idTransaction: "INV0001",
    dateTime: "15/12/2024 15:34",
    status: "Berhasil",
    totalPrice: "Rp. 45.000",
  },
  {
    no: "2",
    idTransaction: "INV0002",
    dateTime: "15/12/2024 15:52",
    status: "Gagal",
    totalPrice: "Rp. 105.000",
  },
  {
    no: "3",
    idTransaction: "INV0003",
    dateTime: "15/12/2024 19:50",
    status: "Tertunda",
    totalPrice: "Rp. 80.000",
  },
];

function TransactionPage() {
  const [isEditModalOpen, setIsSwtailModalOpen] = useState(false);

  const handleDetail = () => {
    console.log("Data diedit");
  };

  return (
    <>
      <div className="flex items-center gap-2 text-secondaryColor dark:text-primaryColor font-bold text-3xl mb-5">
        Transaksi
      </div>
      <div className="flex justify-between mb-2">
        <div className="flex gap-2 w-full">
          <div className="w-fit">
            <Select>
              <SelectTrigger className="w-[60px] px-2 gap-2">
                <SelectValue placeholder="10" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="w-full">
            <SearchInput className="w-[450px]" />
          </div>
        </div>
      </div>
      <div className="border border-[#E4E4E7] rounded-lg overflow-hidden">
        <Table>
          <TableHeader className="bg-primaryColor">
            <TableRow>
              <TableHead className="w-[60px]">No</TableHead>
              <TableHead className="w-[196px]">ID Transaksi/Invoice</TableHead>
              <TableHead className="">Tanggal dan Waktu</TableHead>
              <TableHead className="">Status</TableHead>
              <TableHead className="">Total Harga</TableHead>
              <TableHead className="w-[196px]">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transaction.map((transactionHistory) => (
              <TableRow
                className="text-sm text-[#141414] dark:text-white"
                key={transactionHistory.no}
              >
                <TableCell className="font-medium text-center">
                  {transactionHistory.no}
                </TableCell>
                <TableCell className="text-center">
                  {transactionHistory.idTransaction}
                </TableCell>
                <TableCell className="text-center">
                  {transactionHistory.dateTime}
                </TableCell>
                <TableCell className="text-center">
                  {transactionHistory.status}
                </TableCell>
                <TableCell className="text-center">
                  {transactionHistory.totalPrice}
                </TableCell>
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
                            className="text-black dark:text-white w-full text-left"
                            onClick={() => setIsSwtailModalOpen(true)}
                          >
                            Lihat Rincian
                          </button>
                          <DetailModal
                            isOpen={isEditModalOpen}
                            onClose={() => setIsSwtailModalOpen(false)}
                            onDetail={handleDetail}
                            title="Detail Riwayat Transaksi"
                            showCancelButton={true}
                            showPrintButton={true}
                          >
                            <div className="flex mb-4 gap-4">
                              <div className="flex flex-col w-full">
                                <Label htmlFor="idTransaction">
                                  ID Transaksi/Invoice
                                </Label>
                                <Input
                                  type="text"
                                  id="idTransaction"
                                  className="w-full"
                                />
                              </div>
                              <div className="flex flex-col w-full">
                                <Label htmlFor="noTable">Nomor Meja</Label>
                                <Input
                                  type="text"
                                  id="noTable"
                                  className="w-full"
                                />
                              </div>
                            </div>
                            <div className="flex mb-4 gap-4">
                              <div className="flex flex-col w-full">
                                <Label htmlFor="dateTimeTransaction">
                                  Tanggal dan Waktu Transaksi
                                </Label>
                                <Input
                                  type="text"
                                  id="dateTimeTransaction"
                                  className="w-full"
                                />
                              </div>
                              <div className="flex flex-col w-full">
                                <Label htmlFor="totalPrice">Total Harga</Label>
                                <Input
                                  type="text"
                                  id="totalPrice"
                                  className="w-full"
                                />
                              </div>
                            </div>
                            <div className="flex mb-4 gap-4">
                              <div className="flex flex-col w-full">
                                <Label htmlFor="name">Nama Kasir</Label>
                                <Input
                                  type="text"
                                  id="name"
                                  className="w-full"
                                />
                              </div>
                              <div className="flex flex-col w-full">
                                <Label htmlFor="paymentMethod">
                                  Metode Pembayaran
                                </Label>
                                <Input
                                  type="text"
                                  id="paymentMethod"
                                  className="w-full"
                                />
                              </div>
                            </div>
                            <div className="flex gap-4">
                              <div className="flex flex-col w-full">
                                <Label htmlFor="purchaseHistory">
                                  Rincian Pembelian
                                </Label>
                                <Input
                                  type="text"
                                  id="purchaseHistory"
                                  className="w-full"
                                />
                              </div>
                              <div className="flex flex-col w-full">
                                <Label htmlFor="statusPurchase">
                                  Status Pembayaran
                                </Label>
                                <Input
                                  type="text"
                                  id="statusPurchase"
                                  className="w-full"
                                />
                              </div>
                            </div>
                          </DetailModal>
                        </div>
                        <button
                          className="text-black dark:text-white w-full text-left"
                          onClick={() => setIsSwtailModalOpen(true)}
                        >
                          Print
                        </button>
                      </div>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="mt-2">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious className="w-10" href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>
                2
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext className="w-10" href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </>
  );
}

export default TransactionPage;
