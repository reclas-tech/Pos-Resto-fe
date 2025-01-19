"use client";

import { useGetTransaksi } from "@/components/parts/admin/transaksi/api";
import DataTable from "@/components/parts/admin/transaksi/Datatable";
import { SearchInput } from "@/components/ui/input";
import PaginationTable from "@/components/ui/paginationTable";
import TableLimit from "@/components/ui/tableLimit";
import React, { useState } from "react";


function TransactionPage() {
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
  const { data } = useGetTransaksi(currentPage, search, limit);

  return (
    <>
      <div className="flex items-center gap-2 text-secondaryColor dark:text-primaryColor font-bold text-3xl mb-5">
        Transaksi
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

export default TransactionPage;
