"use client";

import DataTableKitchen from "@/components/parts/admin/dapur/DataTableKitchen";
import { kitchenSchema } from "@/validations";
import { Button } from "@/components/ui/button";
import { Input, SearchInput } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import CreateModal from "@/components/ui/modal/create";
import PaginationTable from "@/components/ui/paginationTable";
import TableLimit from "@/components/ui/tableLimit";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import {
  postSubmitKitchen,
  useGetKitchen,
} from "@/components/parts/admin/dapur/api";

type FormValues = z.infer<typeof kitchenSchema>;

function KitchenPage() {
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
  const { data } = useGetKitchen(currentPage, search, limit);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // useForm for Create
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(kitchenSchema),
  });

  // create
  const [loading, setLoading] = useState(false);
  const url = `/kitchen/admin/list?page=${currentPage}&limit=${limit}&search=${search}`;
  const { handlePostSubmit } = postSubmitKitchen();
  const onSubmit: SubmitHandler<FormValues> = (data) => {
    handlePostSubmit(data, setLoading, url, setIsCreateModalOpen, reset);
  };

  return (
    <>
      <div className="flex items-center gap-2 text-secondaryColor dark:text-primaryColor font-bold text-3xl mb-5">
        Dapur
      </div>
      <div className="flex justify-between mb-2">
        <div className="flex gap-2 w-full">
          <div className="w-fit">
            <TableLimit
              handleLimitChange={handleLimitChange}
              defaultValue="10"
            />
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
            title="Tambah Dapur"
            loading={loading}
          >
            <div className="flex flex-col w-full">
              <Label htmlFor="name">Nama Dapur</Label>
              <Input
                type="text"
                id="name"
                placeholder="Nama Dapur"
                className="w-full"
                {...register("name")}
              />
              {errors.name && (
                <span className="text-sm text-red-500 mt-1">
                  {errors.name.message}
                </span>
              )}
            </div>
            <div className="flex flex-col w-full mt-3">
              <Label htmlFor="ip">Alamat IP</Label>
              <Input
                type="text"
                id="ip"
                placeholder="Nama Dapur"
                className="w-full"
                {...register("ip")}
              />
              {errors.ip && (
                <span className="text-sm text-red-500 mt-1">
                  {errors.ip.message}
                </span>
              )}
            </div>
          </CreateModal>
        </div>
      </div>
      {/* Table */}
      <DataTableKitchen
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

export default KitchenPage;
