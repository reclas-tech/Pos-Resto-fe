/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DeleteModal from "@/components/ui/modal/delete2";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ActionSVG } from "@/constants/svgIcons";
import Link from "next/link";
import React, { useState } from "react";
import { PacketInterface } from "./interface";
import { showAlert2 } from "@/lib/sweetalert2";
import { mutate } from "swr";
import useAxiosPrivateInstance from "@/hooks/useAxiosPrivateInstance";
import Cookies from "js-cookie";

const DataTablePacket: React.FC<PacketInterface> = ({
  data,
  currentPage,
  limit,
  search,
}) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const accessToken = Cookies.get("access_token"); // Ambil token langsung
  const axiosPrivate = useAxiosPrivateInstance();
  const handleDelete = async (id: string | number) => {
    try {
      const response = await axiosPrivate.delete(
        `/product/admin/packet/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      // alert
      showAlert2("success", response?.data?.message);
      // alert
      // Update the local data after successful deletion
    } catch (error: any) {
      // Extract error message from API response
      const errorMessage =
        error.response?.data?.data?.[0]?.message ||
        error.response?.data?.message ||
        "Gagal menghapus data!";
      showAlert2("error", errorMessage);
      //   alert
    }
    mutate(
      `/product/packet/admin/list?page=${currentPage}&limit=${limit}&search=${search}`
    );
  };

  return (
    <div className="Table">
      {/*  */}
      <div className="border border-[#E4E4E7] rounded-lg overflow-hidden">
        <Table>
          <TableHeader className="bg-primaryColor">
            <TableRow>
              <TableHead className="w-[60px]">No</TableHead>
              <TableHead className="w-[260px]">Nama Menu</TableHead>
              <TableHead className="w-[260px]">Harga</TableHead>
              <TableHead className="w-[260px]">Stok</TableHead>
              <TableHead className="w-[160px]">Aksi</TableHead>
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
                    {item?.name ?? "-"}
                  </TableCell>
                  <TableCell className="text-center">
                    {item?.price ?? "-"}
                  </TableCell>
                  <TableCell className="text-center">
                    {item?.stock ?? "-"}
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
                          <Link href={`/produk/edit-paket/${item?.id}`}>
                            <div className="w-full hover:text-primaryColor">
                              Edit
                            </div>
                          </Link>
                          <button
                            className="text-black hover:text-primaryColor  dark:text-white w-full text-left"
                            onClick={() => setIsDeleteModalOpen(true)}
                          >
                            Hapus
                          </button>
                          <DeleteModal
                            isOpen={isDeleteModalOpen}
                            onClose={() => setIsDeleteModalOpen(false)}
                            onDelete={() => handleDelete(item?.id)}
                            title="Hapus"
                            description="Anda yakin ingin menghapus item ini ?"
                          />
                        </div>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center">
                  Tidak ada data
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default DataTablePacket;
