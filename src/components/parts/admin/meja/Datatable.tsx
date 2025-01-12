/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import CreateModal from "@/components/ui/modal/create";
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
import useAxiosPrivateInstance from "@/hooks/useAxiosPrivateInstance";
import { showAlert2 } from "@/lib/sweetalert2";
import { zodResolver } from "@hookform/resolvers/zod";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { mutate } from "swr";
import { putSubmitTable, useGetTableOne } from "./api";
import { TableEdit, TableInterface } from "./interface";
import { tableSchema } from "./validation";
import { z } from "zod";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";

const DataTable: React.FC<TableInterface> = ({ data, currentPage, limit, search }) => {
    type FormValues = z.infer<typeof tableSchema>;
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const accessToken = Cookies.get("access_token"); // Ambil token langsung
    const axiosPrivate = useAxiosPrivateInstance();
    const handleDelete = async (id: string | number) => {
        try {
            const response = await axiosPrivate.delete(`/table/admin/delete/${id}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            showAlert2('success', response?.data?.message);
        } catch (error: any) {
            const errorMessage = error.response?.data?.data?.[0]?.message || error.response?.data?.message || 'Gagal menghapus data!';
            showAlert2('error', errorMessage);
        } mutate(`/table/admin/list?page=${currentPage}&limit=${limit}&search=${search}`);
    };

    // edit
    const {
        register,
        handleSubmit,
        control,
        setValue,
        reset,
        formState: { errors },
    } = useForm<FormValues>({
        resolver: zodResolver(tableSchema),
    });

    // edit
    const [selectedItem, setSelectedItem] = useState<TableEdit | null>(null);
    const id = selectedItem?.id ?? ''
    const [loading, setLoading] = useState(false);
    // GET ONE 
    const { data: dataUser } = useGetTableOne(id as string);

    useEffect(() => {
        if (dataUser?.data) {
            const timer = setTimeout(() => {
                setValue("name", dataUser?.data?.name ?? '');
                setValue("capacity", dataUser?.data?.capacity ?? '');
                setValue("location", dataUser?.data?.location ?? '');
                // 
            }, 1000);

            return () => clearTimeout(timer); // Clean up the timeout on component unmount or data change
        }
    }, [dataUser, setValue]);

    // GET ONE
    // 
    const { handlePostSubmit } = putSubmitTable(id);
    const url = `/table/admin/list?page=${currentPage}&limit=${limit}&search=${search}`;
    const onSubmit: SubmitHandler<FormValues> = (data) => {
        handlePostSubmit(data, setLoading, url,setIsEditModalOpen, reset);
    };



    return (
        <div className="Table">
            {/*  */}
            <div className="border border-[#E4E4E7] rounded-lg overflow-hidden">
                <Table>
                    <TableHeader className="bg-primaryColor">
                        <TableRow>
                            <TableHead className="w-[60px]">No</TableHead>
                            <TableHead className="w-[260px]">Nomor/Nama Meja</TableHead>
                            <TableHead className="w-[260px]">Kapasitas Meja</TableHead>
                            <TableHead className="w-[260px]">Lokasi Meja</TableHead>
                            <TableHead className="w-[97px]">Status Meja</TableHead>
                            <TableHead className="w-[270px]">Aksi</TableHead>
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
                                        {item?.capacity ?? "-"} Orang
                                    </TableCell>
                                    <TableCell className="text-center">
                                        {item?.location ?? "-"}
                                    </TableCell>
                                    <TableCell className="text-center">
                                        <p
                                            className={`text-center  p-1  text-white  rounded-md ${item?.status === "Tersedia"
                                                ? "bg-[#114F44] "
                                                : item?.status === "Terisi"
                                                    ? "bg-[#EE1616]"
                                                    : "bg-primaryColor"
                                                }`}
                                        >
                                            {item?.status}
                                        </p>
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
                                                    {/* edit */}
                                                    <button
                                                        className="text-black hover:text-primaryColor dark:text-white w-full text-left"
                                                        onClick={() => {
                                                            setSelectedItem(item); // Simpan data item yang dipilih
                                                            setIsEditModalOpen(true); // Buka modal edit
                                                        }}
                                                    >
                                                        Edit
                                                    </button>
                                                    <CreateModal
                                                        isOpen={isEditModalOpen}
                                                        onClose={() => {
                                                            setSelectedItem(null); // Reset selectedItem
                                                            setIsEditModalOpen(false);
                                                        }}
                                                        onSubmit={handleSubmit(onSubmit)}
                                                        title="Edit Meja"
                                                        loading={loading}
                                                        addButtonText ="Simpan"
                                                    >
                                                        <div className="flex flex-col w-full">
                                                            <Label htmlFor="name">Nomor/Nama Meja</Label>
                                                            <Input
                                                                type="text"
                                                                id="name"
                                                                placeholder="Nomor/Nama Meja"
                                                                className="w-full"
                                                                {...register("name")}
                                                            />
                                                            {errors.name && (
                                                                <span className="text-sm text-red-500 mt-1">
                                                                    {errors.name.message}
                                                                </span>
                                                            )}
                                                        </div>
                                                        <div className="flex flex-col w-full mt-4">
                                                            <Label htmlFor="capacity">Kapasitas Meja</Label>
                                                            <div className="flex space-x-2 items-center">
                                                                <div className="w-[87%]">
                                                                    <Input
                                                                        type="number"
                                                                        id="capacity"
                                                                        placeholder="Kapasitas Meja"
                                                                        {...register("capacity", { valueAsNumber: true })}
                                                                    />
                                                                    {errors.capacity && (
                                                                        <span className="text-sm text-red-500 mt-1">
                                                                            {errors.capacity.message}
                                                                        </span>
                                                                    )}
                                                                </div>
                                                                <span className="w-[10%]">Orang</span>
                                                            </div>
                                                        </div>
                                                        <div className="flex flex-col w-full mt-4">
                                                            <Label htmlFor="location">Pilih Lokasi Meja</Label>
                                                            <Controller
                                                                name="location"
                                                                control={control}
                                                                render={({ field }) => (
                                                                    <Select value={field.value} onValueChange={field.onChange}>
                                                                        <SelectTrigger className="w-full text-neutral-500">
                                                                            <SelectValue placeholder="Pilih Lokasi Meja" />
                                                                        </SelectTrigger>
                                                                        <SelectContent>
                                                                            <SelectItem value="indoor">Indoor</SelectItem>
                                                                            <SelectItem value="outdoor">Outdoor</SelectItem>
                                                                        </SelectContent>
                                                                    </Select>
                                                                )}
                                                            />
                                                            {errors.location && (
                                                                <span className="text-sm text-red-500">{errors.location.message}</span>
                                                            )}
                                                        </div>
                                                    </CreateModal>

                                                    {/* hapus */}
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
