"use client";

import DataTableKitchen from "@/components/parts/admin/dapur/DataTableKitchen";
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
  putSubmitChecker,
  useGetChecker,
  useGetKitchen,
} from "@/components/parts/admin/dapur/api";
import { kitchenChackerSchema, kitchenSchema } from "@/components/parts/admin/dapur/validation";

type FormValues = z.infer<typeof kitchenSchema>;
type FormValuesChacker = z.infer<typeof kitchenChackerSchema>;

function KitchenPage() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

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

  // Data fetching Get Kichen
  const { data } = useGetKitchen(currentPage, search, limit);

  // Data fetching Chacker
  const { data: dataChacker, mutate: mutateGetTakeAwayList } = useGetChecker();

  // useForm for Edit Chacker
  const {
    register: register2,
    handleSubmit: handleSubmit2,
    reset: reset2,
    formState: { errors: errors2 },
  } = useForm<FormValuesChacker>({
    resolver: zodResolver(kitchenChackerSchema),
  });

  // Data fetching chacker
  const { handleEditSubmit } = putSubmitChecker();

  // on edit chacker
  const onEditSubmit: SubmitHandler<FormValuesChacker> = (data) => {
    handleEditSubmit(data, setLoading, url, setIsEditModalOpen, reset2);
    mutateGetTakeAwayList();
  };

  // Handle Edit Modal Chacker
  const handleOpenEditModal = () => {
    reset2({
      checker_ip: dataChacker?.data?.checker_ip || "",
      link: dataChacker?.data?.link || "",
    });
    setIsEditModalOpen(true);
  };

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
      <div className="items-center gap-2 text-black mb-5 grid grid-cols-2 w-[30%] text-sm">
        <div className="">IP Address Checker</div>
        <span className="text-secondaryColor dark:text-primaryColor">
          : {dataChacker?.data?.checker_ip}
        </span>
        <div className="">Link Receiver</div>
        <span className="text-secondaryColor dark:text-primaryColor">
          : {dataChacker?.data?.link}
        </span>
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
        <div className="w-fit flex gap-4">
          <Button variant="default" onClick={handleOpenEditModal}>
            Edit IP Checker
          </Button>
          <CreateModal
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            onSubmit={handleSubmit2(onEditSubmit)}
            title="Edit IP Checker"
            loading={loading}
            addButtonText="Simpan"
          >
            <div className="flex flex-col w-full">
              <Label htmlFor="checker">IP Checker</Label>
              <Input
                type="text"
                id="checker"
                placeholder="IP Checker"
                className="w-full"
                {...register2("checker_ip")}
              />
              {errors2.checker_ip && (
                <span className="text-sm text-red-500 mt-1">
                  {errors2.checker_ip.message}
                </span>
              )}
            </div>
            <div className="flex flex-col w-full mt-3">
              <Label htmlFor="receiver">Link Receiver</Label>
              <Input
                type="text"
                id="receiver"
                placeholder="Alamat IP"
                className="w-full"
                {...register2("link")}
              />
              {errors2.link && (
                <span className="text-sm text-red-500 mt-1">
                  {errors2.link.message}
                </span>
              )}
            </div>
          </CreateModal>
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
                placeholder="Alamat IP"
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
