"use client";

import { useState } from "react";
import Link from "next/link";
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

function EmployeePage() {
  const employees = [
    {
      no: "1",
      name: "Karyawan 1",
      pin: "123456",
      role: "Kasir",
    },
    {
      no: "2",
      name: "Karyawan 2",
      pin: "123457",
      role: "Admin",
    },
  ];

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleDelete = () => {
    console.log("Data dihapus");
  };

  return (
    <>
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
          <Link href="/karyawan/tambah">
            <Button variant="default" iconLeft={<Plus />}>
              Tambah
            </Button>
          </Link>
        </div>
      </div>
      <div className="border border-[#E4E4E7] rounded-lg overflow-hidden">
        <Table>
          <TableHeader className="bg-primaryColor">
            <TableRow>
              <TableHead className="w-[60px]">No</TableHead>
              <TableHead className="w-[260px]">Nama Karyawan</TableHead>
              <TableHead className="w-[260px]">Pin</TableHead>
              <TableHead className="w-[260px]">Role</TableHead>
              <TableHead className="w-[160px]">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {employees.map((employeesView) => (
              <TableRow
                className="text-sm text-[#141414] dark:text-white"
                key={employeesView.no}
              >
                <TableCell className="font-medium text-center">
                  {employeesView.no}
                </TableCell>
                <TableCell className="text-left">
                  {employeesView.name}
                </TableCell>
                <TableCell className="text-center">
                  {employeesView.pin}
                </TableCell>
                <TableCell className="text-center">
                  {employeesView.role}
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
                        <Link href={`/karyawan/edit/${employeesView.no}`}>
                          <div className="w-full">Edit</div>
                        </Link>
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

export default EmployeePage;
