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
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { categorySchema, FormValuesCategory } from "@/validations";
import { useParams, useRouter } from "next/navigation";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { showAlert2 } from "@/lib/sweetalert2";
import { AxiosError } from "axios";
import { useGetCategorySlug } from "@/sevices/api";

const products = [
  {
    no: "1",
    name: "Kategori 1",
  },
  {
    no: "2",
    name: "Kategori 2",
  },
  {
    no: "3",
    name: "Kategori 3",
  },
];

function CategoryPage() {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FormValuesCategory>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
    },
  });

  const {
    register: register2,
    handleSubmit: handleSubmit2,
    reset: reset2,
    formState: { errors: errors2 },
  } = useForm<FormValuesCategory>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "Category 1",
    },
  });

  // Read One
  const { slug } = useParams();
  const { data: dataUser } = useGetCategorySlug(slug as string);
  console.log("Get data : ", dataUser);
  useEffect(() => {
    if (dataUser?.data) {
      const timer = setTimeout(() => {
        setValue("name", dataUser?.data?.name ?? "Category 1");
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [dataUser, setValue]);
  // Read One

  const [loading, setLoading] = useState(false);
  const navigate = useRouter();
  // const [accessToken] = useLocalStorage("accessToken", "");
  const axiosPrivate = useAxiosPrivate();

  // Create
  const onAddSubmit: SubmitHandler<FormValuesCategory> = async (data) => {
    console.log("Form data:", data);
    setLoading(true);
    const formData = new FormData();
    formData.append("name", data.name);
    try {
      await axiosPrivate.post("/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      showAlert2("success", "Berhasil menambahkan data.");
      navigate.push("/category");
    } catch (error) {
      if (error instanceof AxiosError) {
        const errorMessage =
          error.response?.data?.data?.[0]?.message || "Gagal menambahkan data.";
        showAlert2("error", errorMessage);
      } else {
        showAlert2("error", "Terjadi kesalahan yang tidak terduga!");
      }
    } finally {
      setLoading(false);
      reset();
      setIsCreateModalOpen(false);
    }
    // mutate(`produk/get?page=1`);
  };
  // Create

  // Update
  const onEditSubmit: SubmitHandler<FormValuesCategory> = async (data) => {
    console.log("Form data:", data);
    setLoading(true);
    const formData = new FormData();
    formData.append("name", data.name);
    try {
      await axiosPrivate.put(`/${slug}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      showAlert2("success", "Berhasil menyimpan data.");
      navigate.push("/category");
    } catch (error) {
      if (error instanceof AxiosError) {
        const errorMessage =
          error.response?.data?.data?.[0]?.message || "Gagal memperbarui data.";
        showAlert2("error", errorMessage);
      } else {
        showAlert2("error", "Terjadi kesalahan yang tidak terduga!");
      }
    } finally {
      setLoading(false);
      reset2();
      setIsCreateModalOpen(false);
    }
    // mutate(`produk/get?page=1`);
  };
  // Update

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleDelete = () => {
    console.log("Data dihapus");
  };
  return (
    <>
      <div className="flex items-center gap-2 text-secondaryColor dark:text-primaryColor font-bold text-3xl mb-5">
        Kategori
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
      <div className="border border-[#E4E4E7] rounded-lg overflow-hidden">
        <Table>
          <TableHeader className="bg-primaryColor">
            <TableRow>
              <TableHead className="w-[60px]">No</TableHead>
              <TableHead className="w-[260px]">Nama Kategori</TableHead>
              <TableHead className="w-[160px]">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((categoryView) => (
              <TableRow
                className="text-sm text-[#141414] dark:text-white"
                key={categoryView.no}
              >
                <TableCell className="font-medium text-center">
                  {categoryView.no}
                </TableCell>
                <TableCell className="text-left">{categoryView.name}</TableCell>
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
                            title="Edit Kategori"
                            loading={loading}
                          >
                            <div className="flex flex-col w-full">
                              <Label htmlFor="name">Nama Kategori</Label>
                              <Input
                                type="text"
                                id="name"
                                placeholder="Edit Kategori"
                                className="w-full"
                                {...register2("name")}
                              />
                              {errors2.name && (
                                <span className="text-sm text-red-500">
                                  {errors2.name.message}
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

export default CategoryPage;
