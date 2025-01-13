"use client";

import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { SearchInput } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import CreateModal from "@/components/ui/modal/create";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import PaginationTable from "@/components/ui/paginationTable";
import {
  postSubmitCategory,
  useGetCategory,
} from "@/components/parts/admin/kategori/api";
import TableLimit from "@/components/ui/tableLimit";
import {
  categorySchema,
  CategoryValues,
} from "@/components/parts/admin/kategori/validation";
import DataTable from "@/components/parts/admin/kategori/Datatable";
import { z } from "zod";

type FormValues = z.infer<typeof categorySchema>;

function CategoryPage() {
  const [loading, setLoading] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

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
  const { data } = useGetCategory(currentPage, search, limit);

  // useForm for Create
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CategoryValues>({
    resolver: zodResolver(categorySchema),
  });

  // create
  const url = `/category/admin/list?page=${currentPage}&limit=${limit}&search=${search}`;
  const { handlePostSubmit } = postSubmitCategory();
  const onSubmit: SubmitHandler<FormValues> = (data) => {
    handlePostSubmit(data, setLoading, url, setIsCreateModalOpen, reset);
  };

  return (
    <>
      <div className="flex items-center gap-2 text-secondaryColor dark:text-primaryColor font-bold text-3xl mb-5">
        Kategori
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
            title="Tambah Kategori"
            loading={loading}
          >
            <div className="flex flex-col w-full">
              <Label htmlFor="name">Nama Kategori</Label>
              <Input
                type="text"
                id="name"
                placeholder="Nama Kategori"
                className="w-full"
                {...register("name")}
              />
              {errors.name && (
                <span className="text-sm text-red-500">
                  {errors.name.message}
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
      <div className="pagi flex items-center justify-center md:justify-end mt-3 pb-5 lg:pb-0 mb-20">
        <PaginationTable
          currentPage={currentPage}
          totalPages={data?.data?.pagination?.last_page as number}
          onPageChange={onPageChange}
        />
      </div>
    </>
  );
}

export default CategoryPage;
