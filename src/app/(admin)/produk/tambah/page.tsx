"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRupiah } from "@/hooks/useRupiah";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormValuesProduct, productSchema } from "@/validations";
import { useRouter } from "next/navigation";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { showAlert2 } from "@/lib/sweetalert2";
import LoadingForm from "@/components/ui/LoadingForm";
import { AxiosError } from "axios";

type Category = "Kategori 1" | "Kategori 2";
type Kitchen = "Dapur 1" | "Dapur 2";

function CreateProductPage() {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FormValuesProduct>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      category: undefined,
      price: "",
      hpp: "",
      stock: "",
      kitchen: undefined,
      image: "",
    },
  });

  const [loading, setLoading] = useState(false);
  const navigate = useRouter();
  // const [accessToken] = useLocalStorage("accessToken", "");
  const axiosPrivate = useAxiosPrivate();

  // Create
  const onAddSubmit: SubmitHandler<FormValuesProduct> = async (data) => {
    console.log("Form data:", data);
    setLoading(true);
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("category", data.category);
    formData.append("price", data.price);
    formData.append("hpp", data.hpp);
    formData.append("stock", data.stock);
    formData.append("image", data.image);
    try {
      await axiosPrivate.post("/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      showAlert2("success", "Berhasil menambahkan data.");
      navigate.push("/produk");
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
    }
    // mutate(`produk/get?page=1`);
  };
  // Create

  const handleCategoryChange = (value: Category) => {
    setValue("category", value);
  };

  const handleKitchenChange = (value: Kitchen) => {
    setValue("kitchen", value);
  };

  const { value: price, onChange: handlePriceChange } = useRupiah();
  const { value: hpp, onChange: handleHppChange } = useRupiah();

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setImagePreview(reader.result);
          setValue("image", reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <form className="" onSubmit={handleSubmit(onAddSubmit)}>
        <div className="flex gap-4 justify-between mb-4">
          <div className="flex flex-col w-full">
            <Label htmlFor="nameProducts">Nama Produk</Label>
            <Input
              type="name"
              id="nameProducts"
              placeholder="Nama Produk"
              {...register("name")}
            />
            {errors.name && (
              <span className="text-sm text-red-500">
                {errors.name.message}
              </span>
            )}
          </div>
          <div className="flex flex-col w-full">
            <Label htmlFor="category">Kategori</Label>
            <Select
              onValueChange={handleCategoryChange}
              {...register("category")}
            >
              <SelectTrigger className="w-full text-neutral-500">
                <SelectValue placeholder="Pilih Kategori" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Kategori 1">Kategori 1</SelectItem>
                <SelectItem value="Kategori 2">Kategori 2</SelectItem>
              </SelectContent>
            </Select>
            {errors.category && (
              <span className="text-sm text-red-500">
                {errors.category.message}
              </span>
            )}
          </div>
        </div>

        <div className="flex gap-4 justify-between mb-4">
          <div className="flex flex-col w-full">
            <Label htmlFor="price">Harga</Label>
            <Input
              type="text"
              id="price"
              placeholder="Rp."
              value={price}
              onChange={(e) => {
                handlePriceChange(e);
                setValue("price", e.target.value.replace(/\D/g, ""));
              }}
            />
            {errors.price && (
              <span className="text-sm text-red-500">
                {errors.price.message}
              </span>
            )}
          </div>
          <div className="flex flex-col w-full">
            <Label htmlFor="hpp">HPP</Label>
            <Input
              type="text"
              id="hpp"
              placeholder="Rp."
              value={hpp}
              onChange={(e) => {
                handleHppChange(e);
                setValue("hpp", e.target.value.replace(/\D/g, ""));
              }}
            />
            {errors.hpp && (
              <span className="text-sm text-red-500">{errors.hpp.message}</span>
            )}
          </div>
        </div>

        <div className="flex gap-4 justify-between mb-4">
          <div className="flex flex-col w-full">
            <Label htmlFor="stocks">Stok</Label>
            <Input
              type="number"
              id="stocks"
              placeholder="Jumlah Stok"
              {...register("stock")}
            />
            {errors.stock && (
              <span className="text-sm text-red-500">
                {errors.stock.message}
              </span>
            )}
          </div>
          <div className="flex flex-col w-full">
            <Label htmlFor="kitchen">Dapur</Label>
            <Select
              onValueChange={handleKitchenChange}
              {...register("kitchen")}
            >
              <SelectTrigger className="w-full text-neutral-500">
                <SelectValue placeholder="Pilih Dapur" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Dapur 1">Dapur 1</SelectItem>
                <SelectItem value="Dapur 2">Dapur 2</SelectItem>
              </SelectContent>
            </Select>
            {errors.kitchen && (
              <span className="text-sm text-red-500">
                {errors.kitchen.message}
              </span>
            )}
          </div>
        </div>

        <div className="w-full mb-5">
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="productsCapture"
          >
            Foto Produk
          </label>
          <div
            className="h-[170px] bg-white border border-dashed border-[#D9D9D9] rounded-lg overflow-hidden flex justify-center items-center mt-2 p-2 cursor-pointer"
            onClick={() => document.getElementById("image-upload")?.click()}
          >
            {imagePreview ? (
              <Image
                src={imagePreview}
                width={100}
                height={100}
                alt="Preview"
                className="h-full w-[200px] object-cover"
              />
            ) : (
              <span className="text-gray-500 text-sm">Pilih file</span>
            )}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              id="image-upload"
              {...register("image")}
              onChange={handleFileChange}
            />
          </div>
          {errors.image && (
            <span className="text-sm text-red-500">{errors.image.message}</span>
          )}
        </div>

        <div className="flex justify-end gap-2">
          <Link href={"/produk"}>
            <Button variant={"outline"} className="border-secondaryColor">
              Batal
            </Button>
          </Link>
          <Button variant={"default"}>
            {loading ? <LoadingForm /> : "Tambah"}
          </Button>
        </div>
      </form>
    </>
  );
}

export default CreateProductPage;
