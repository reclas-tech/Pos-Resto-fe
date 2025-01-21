"use client";

import { postSubmitTable, useGetTable } from "@/components/parts/admin/meja/api";
import DataTable from "@/components/parts/admin/meja/Datatable";
import { tableSchema } from "@/components/parts/admin/meja/validation";
import { Button } from "@/components/ui/button";
import { Input, SearchInput } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import CreateModal from "@/components/ui/modal/create";
import PaginationTable from "@/components/ui/paginationTable";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import TableLimit from "@/components/ui/tableLimit";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";


type FormValues = z.infer<typeof tableSchema>;

function TablePage() {
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Search state
  const [search, setSearch] = useState("");
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
    setCurrentPage(1); // Reset to page 1
  };

  // Limit state
  const [limit, setLimit] = useState(10);
  const handleLimitChange = (value: string) => {
    setLimit(parseInt(value, 10));
    setCurrentPage(1); // Reset to page 1
  };

  // Data fetching
  const { data } = useGetTable(currentPage, search, limit);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // useForm for Create
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(tableSchema),
  });


  // create
  const [loading, setLoading] = useState(false);
  const url = `/table/admin/list?page=${currentPage}&limit=${limit}&search=${search}`;
  const { handlePostSubmit } = postSubmitTable();
  const onSubmit: SubmitHandler<FormValues> = (data) => {
    handlePostSubmit(data, setLoading, url, setIsCreateModalOpen, reset);
  };

  return (
    <>
      <div className="flex items-center gap-2 text-secondaryColor dark:text-primaryColor font-bold text-3xl mb-5">
        Meja
      </div>
      <div className="flex justify-between mb-2">
        <div className="flex gap-2 w-full">
          <div className="w-fit">
            <TableLimit handleLimitChange={handleLimitChange} defaultValue="10" />
          </div>
          <div className="w-full">
            <SearchInput
              className="w-[450px]"
              value={search}
              onChange={handleSearchChange}
            />
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
            onSubmit={handleSubmit(onSubmit)}
            title="Tambah Meja"
            loading={loading}
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
                      <SelectItem value="indoor">Indoor</SelectItem>
                      <SelectItem value="outdoor">Outdoor</SelectItem>
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
      {/* Table */}
      <DataTable
        data={data?.data}
        limit={limit}
        search={search}
        currentPage={currentPage}
      />

      {/* Pagination */}
      <div className="pagi flex items-center justify-center md:justify-end mt-3 pb-5 lg:pb-0">
        <PaginationTable
          currentPage={currentPage}
          totalPages={data?.data?.pagination?.last_page as number}
          onPageChange={onPageChange}
        />
      </div>
    </>
  );
}

export default TablePage;
