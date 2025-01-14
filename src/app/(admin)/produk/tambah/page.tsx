"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRupiah } from "@/hooks/useRupiah";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoadingSVG } from "@/constants/svgIcons";
import { z } from "zod";
import { productSchema } from "@/components/parts/admin/produk/validation";
import { postSubmitProduct } from "@/components/parts/admin/produk/api";
import {
  useGetCategory,
  useGetKitchen,
} from "@/components/parts/admin/kategori/api";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type FormValues = z.infer<typeof productSchema>;

function CreateProductPage() {
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const {
    data: categories,
    isLoading: isCategoriesLoading,
    error: categoriesError,
  } = useGetCategory(1, "", 10);
  const {
    data: kitchens,
    isLoading: isKitchensLoading,
    error: kitchensError,
  } = useGetKitchen(1, "", 10);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      category_id: "",
      kitchen_id: "",
      price: 0,
      cogp: 0,
      stock: 0,
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue("image", file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const { handlePostSubmit } = postSubmitProduct();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("price", data.price.toString());
      formData.append("stock", data.stock.toString());
      formData.append("cogp", data.cogp.toString());
      formData.append("category_id", data.category_id);
      formData.append("kitchen_id", data.kitchen_id);

      if (data.image) {
        formData.append("image", data.image);
      }

      handlePostSubmit(formData, setLoading);
    } catch (error) {
      console.error("Error submitting product:", error);
    }
  };

  if (isCategoriesLoading || isKitchensLoading) {
    return <LoadingSVG />;
  }
  if (categoriesError || kitchensError) {
    return <div>Error loading data</div>;
  }

  return (
    <form
      className="text-black dark:text-white"
      onSubmit={handleSubmit(onSubmit)}
      encType="multipart/form-data"
    >
      <div className="flex gap-4 justify-between mb-4">
        <div className="flex flex-col w-full">
          <Label htmlFor="nameProducts">Nama Produk</Label>
          <Input
            type="text"
            id="nameProducts"
            placeholder="Nama Produk"
            {...register("name")}
          />
          {errors.name && (
            <span className="text-sm text-red-500">{errors.name.message}</span>
          )}
        </div>

        <div className="flex flex-col w-full">
          <Label htmlFor="category">Kategori</Label>
          <Select
            value={String(watch("category_id"))}
            onValueChange={(value: string) => setValue("category_id", value)}
            {...register("category_id")}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Pilih Kategori" />
            </SelectTrigger>
            <SelectContent>
              {categories?.data?.items?.map((category: any) => (
                <SelectItem key={category.id} value={category.id}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.category_id && (
            <span className="text-sm text-red-500">
              {errors.category_id.message}
            </span>
          )}
        </div>
      </div>

      <div className="flex gap-4 justify-between mb-4">
        <div className="flex flex-col w-full">
          <Label htmlFor="price">Harga</Label>
          <Input
            type="number"
            id="price"
            placeholder="Rp."
            {...register("price", { valueAsNumber: true })}
          />
          {errors.price && (
            <span className="text-sm text-red-500">{errors.price.message}</span>
          )}
        </div>

        <div className="flex flex-col w-full">
          <Label htmlFor="cogp">HPP</Label>
          <Input
            type="number"
            id="cogp"
            placeholder="Rp."
            {...register("cogp", { valueAsNumber: true })}
          />
          {errors.cogp && (
            <span className="text-sm text-red-500">{errors.cogp.message}</span>
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
            {...register("stock", { valueAsNumber: true })}
          />
          {errors.stock && (
            <span className="text-sm text-red-500">{errors.stock.message}</span>
          )}
        </div>

        <div className="flex flex-col w-full">
          <Label htmlFor="kitchen">Dapur</Label>
          <Select
            value={String(watch("kitchen_id"))}
            onValueChange={(value: string) => setValue("kitchen_id", value)}
            {...register("kitchen_id")}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Pilih Dapur" />
            </SelectTrigger>
            <SelectContent>
              {kitchens?.data?.map((kitchen: any) => (
                <SelectItem key={kitchen.id} value={kitchen.id}>
                  {kitchen.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.kitchen_id && (
            <span className="text-sm text-red-500">
              {errors.kitchen_id.message}
            </span>
          )}
        </div>
      </div>

      <div className="w-full mb-5">
        <label className="block text-sm font-medium" htmlFor="productsCapture">
          Foto Produk
        </label>
        <div
          className="h-[170px] bg-white border border-dashed border-[#D9D9D9] rounded-lg overflow-hidden flex justify-center items-center mt-2 p-2 cursor-pointer"
          onClick={() => document.getElementById("image-upload")?.click()}
        >
          {imagePreview ? (
            <img
              src={imagePreview}
              width={200}
              height={170}
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
            onChange={handleImageChange}
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
        <Button variant={"default"} disabled={loading}>
          {loading ? <LoadingSVG /> : "Tambah"}
        </Button>
      </div>
    </form>
  );
}

export default CreateProductPage;
