"use client";

import React, { useEffect, useState } from "react";
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
import { Plus } from "lucide-react";
import { ActionSVG } from "@/constants/svgIcons";
import DeleteModal from "@/components/ui/modal/delete";
import CreateModal from "@/components/ui/modal/create";
import EditModal from "@/components/ui/modal/edit";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { tableSchema } from "@/validations";

const tables = [
  {
    no: "1",
    name: "A1",
    capacity: "10",
    location: "Indoor",
    status: "Tersedia",
  },
  {
    no: "2",
    name: "A2",
    capacity: "6",
    location: "Outdoor",
    status: "Terisi",
  },
  {
    no: "3",
    name: "A3",
    capacity: "10",
    location: "Indoor",
    status: "Unknown",
  },
];

type Location = "Indoor" | "Outdoor";

type FormValues = z.infer<typeof tableSchema>;

function TablePage() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // useForm for Create
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(tableSchema),
    defaultValues: {
      name: "",
      capacity: 0,
      location: undefined,
    },
  });

  // useForm for Edit
  const {
    register: register2,
    handleSubmit: handleSubmit2,
    reset: reset2,
    control: control2,
    formState: { errors: errors2 },
  } = useForm<FormValues>({
    resolver: zodResolver(tableSchema),
  });

  // Create Submit Function
  const onAddSubmit = (data: FormValues) => {
    if (data) {
      console.log("Add Form data:", data);
      reset();
      setIsCreateModalOpen(false);
    }
  };

  // Edit Submit Function
  const onEditSubmit = (data: FormValues) => {
    if (data) {
      console.log("Edit Form data:", data);
      reset2();
      setIsEditModalOpen(false);
    }
  };

  const handleDelete = () => {
    console.log("Data dihapus");
  };
  return (
    <>
      <div className="flex items-center gap-2 text-secondaryColor dark:text-primaryColor font-bold text-3xl mb-5">
        Meja
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
        <div className="w-fit">
          <Button
            variant="default"
            iconLeft={<Plus />}
            onClick={() => setIsCreateModalOpen(true)}
          >
            Tambah
          </Button>
          <CreateModal
            isOpen={isCreateModalOpen}
            onClose={() => setIsCreateModalOpen(false)}
            onSubmit={handleSubmit(onAddSubmit)}
            title="Tambah Dapur"
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
                    {...register("capacity", {
                      valueAsNumber: true,
                    })}
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
                      <SelectItem value="Indoor">Indoor</SelectItem>
                      <SelectItem value="Outdoor">Outdoor</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.location && (
                <span className="text-sm text-red-500">
                  {errors.location.message}
                </span>
              )}
            </div>
          </CreateModal>
        </div>
      </div>
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
            {tables.map((tableView) => (
              <TableRow
                className="text-sm text-[#141414] dark:text-white"
                key={tableView.no}
              >
                <TableCell className="font-medium text-center">
                  {tableView.no}
                </TableCell>
                <TableCell className="text-center">{tableView.name}</TableCell>
                <TableCell className="text-center">
                  {tableView.capacity} Orang
                </TableCell>
                <TableCell className="text-center">
                  {tableView.location}
                </TableCell>
                <TableCell className="text-center ">
                  <p
                    className={`text-center  p-1  text-white  rounded-md ${
                      tableView.status === "Tersedia"
                        ? "bg-[#114F44] "
                        : tableView.status === "Terisi"
                        ? "bg-[#EE1616]"
                        : "bg-primaryColor"
                    }`}
                  >
                    {tableView.status}
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
                        <div className="w-full">
                          <button
                            className="text-black dark:text-white w-full text-left"
                            onClick={() => setIsEditModalOpen(true)}
                          >
                            Edit
                          </button>
                          <EditModal
                            isOpen={isEditModalOpen}
                            onClose={() => setIsEditModalOpen(false)}
                            onSubmit={handleSubmit2(onEditSubmit)}
                            title="Edit Meja"
                          >
                            <div className="flex flex-col w-full">
                              <Label htmlFor="name">Nomor/Nama Meja</Label>
                              <Input
                                type="text"
                                id="name"
                                placeholder="Nomor/Nama Meja"
                                className="w-full"
                                {...register2("name")}
                                defaultValue={tableView.name}
                              />
                              {errors2.name && (
                                <span className="text-sm text-red-500 mt-1">
                                  {errors2.name.message}
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
                                    defaultValue={tableView.capacity}
                                    {...register2("capacity", {
                                      valueAsNumber: true,
                                    })}
                                  />
                                  {errors2.capacity && (
                                    <span className="text-sm text-red-500 mt-1">
                                      {errors2.capacity.message}
                                    </span>
                                  )}
                                </div>
                                <span className="w-[10%]">Orang</span>
                              </div>
                            </div>
                            <div className="flex flex-col w-full mt-4">
                              <Label htmlFor="location">
                                Pilih Lokasi Meja
                              </Label>
                              <Controller
                                name="location"
                                control={control2}
                                defaultValue={tableView.location as Location}
                                render={({ field }) => (
                                  <Select
                                    value={field.value}
                                    onValueChange={field.onChange}
                                    defaultValue={tableView.location}
                                  >
                                    <SelectTrigger className="w-full text-neutral-500">
                                      <SelectValue placeholder="Pilih Lokasi Meja" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="Indoor">
                                        Indoor
                                      </SelectItem>
                                      <SelectItem value="Outdoor">
                                        Outdoor
                                      </SelectItem>
                                    </SelectContent>
                                  </Select>
                                )}
                              />
                              {errors2.location && (
                                <span className="text-sm text-red-500">
                                  {errors2.location.message}
                                </span>
                              )}
                            </div>
                          </EditModal>
                        </div>
                        <button
                          className="text-black dark:text-white w-full text-left"
                          onClick={() => setIsDeleteModalOpen(true)}
                        >
                          Hapus
                        </button>
                        <DeleteModal
                          isOpen={isDeleteModalOpen}
                          onClose={() => setIsDeleteModalOpen(false)}
                          onDelete={handleDelete}
                          title="Hapus"
                          description="Anda yakin ingin menghapus item ini ?"
                        />
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

export default TablePage;
