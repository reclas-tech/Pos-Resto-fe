"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import { SearchInput } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import DataTable from "@/components/parts/admin/produk/Datatable";
import { useGetProduct } from "@/components/parts/admin/produk/api";
import PaginationTable from "@/components/ui/paginationTable";
import TableLimit from "@/components/ui/tableLimit";

function ProductPage() {
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
  const { data } = useGetProduct(currentPage, search, limit);

  return (
    <>
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
        <div className="w-fit flex items-center space-x-4">
          <Link href="/produk/menu-paket">
            <Button variant="default">Menu Paket</Button>
          </Link>
          <Link href="/produk/tambah">
            <Button variant="default" iconLeft={<Plus />}>
              Tambah
            </Button>
          </Link>
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

export default ProductPage;
