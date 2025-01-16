"use client";

import { useGetPacket } from "@/components/parts/admin/paket/api";
import DataTablePacket from "@/components/parts/admin/paket/DataTablePacket";
import { Button } from "@/components/ui/button";
import { SearchInput } from "@/components/ui/input";
import PaginationTable from "@/components/ui/paginationTable";
import TableLimit from "@/components/ui/tableLimit";
import { Plus } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

function EmployeePage() {
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
  const { data } = useGetPacket(currentPage, search, limit);

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
        <div className="w-fit">
          <Link href="/produk/tambah-paket">
            <Button variant="default" iconLeft={<Plus />}>
              Tambah
            </Button>
          </Link>
        </div>
      </div>

      {/* Table */}
      <DataTablePacket
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

export default EmployeePage;
