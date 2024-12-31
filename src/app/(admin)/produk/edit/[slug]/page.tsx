"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
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
import { showAlert2 } from "@/lib/sweetalert2";
import { AxiosError } from "axios";
import Cookies from "js-cookie";
import { axiosInstance } from "@/utils/axios";
import { LoadingSVG } from "@/constants/svgIcons";
// import { useRupiah } from "@/hooks/useRupiah";

type Category = "Kategori 1" | "Kategori 2";
type Kitchen = "Dapur 1" | "Dapur 2";

function EditProductPage() {
  const navigate = useRouter();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FormValuesProduct>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "Produk 1",
      category: "Kategori 1",
      price: "Rp. 45.000",
      hpp: "Rp. 3.000",
      stock: "23",
      kitchen: "Dapur 1",
      image:
        "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/c5ff7a56-6965-4066-9a80-d09ec285b8f2/W+NIKE+P-6000.png",
    },
  });

  // Get token akses from cookies
  const accessToken = Cookies.get("accessToken");
  useEffect(() => {
    if (!accessToken) {
      showAlert2("error", "Anda harus login terlebih dahulu!");
      navigate.push("/login");
    }
  }, [accessToken, navigate]);

  if (!accessToken) {
    return null;
  }
  // Get token akses from cookies

  // Read One
  // const { slug } = useParams();
  // const { data: dataUser } = useGetProductSlug(slug as string);
  // useEffect(() => {
  //   if (dataUser?.data) {
  //     const timer = setTimeout(() => {
  //       setValue("name", dataUser?.data?.name ?? "Produk 1");
  //       setValue("category", dataUser?.data?.category ?? "Kategori 1");
  //       setValue("price", dataUser?.data?.price ?? "45000");
  //       setValue("hpp", dataUser?.data?.hpp ?? "3000");
  //       setValue("kitchen", dataUser?.data?.kitchen ?? "23");
  //       setValue("stock", dataUser?.data?.stock ?? "Dapur 1");
  //       if (dataUser?.data?.image) {
  //         setImagePreview(dataUser?.data?.image);
  //       }
  //     }, 1000);
  //     return () => clearTimeout(timer);
  //   }
  // }, [dataUser, setValue]);
  // Read One

  // Update
  const onEditSubmit: SubmitHandler<FormValuesProduct> = async (data) => {
    console.log("Form data:", data);
    setLoading(true);
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("category", data.category);
    formData.append("price", data.price);
    formData.append("hpp", data.hpp);
    formData.append("stock", data.stock);
    if (data.image) {
      formData.append("image", data.image);
    }

    try {
      await axiosInstance.put(`/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${accessToken}`, // Send token
        },
      });
      showAlert2("success", "Berhasil menyimpan data.");
      navigate.push("/produk");
    } catch (error) {
      if (error instanceof AxiosError) {
        const errorMessage =
          error.response?.data?.data?.[0]?.message || "Gagal memperbarui data.";
        showAlert2("error", errorMessage);
      } else {
        showAlert2("error", "Terjadi kesalahan!");
      }
    } finally {
      setLoading(false);
      reset();
    }
  };
  // Update

  const handleCategoryChange = (value: Category) => {
    setValue("category", value);
  };

  const handleKitchenChange = (value: Kitchen) => {
    setValue("kitchen", value);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue("image", file);
      const objectUrl = URL.createObjectURL(file);
      setImagePreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    }
  };

  const [imagePreview, setImagePreview] = useState<string | null>(
    "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/c5ff7a56-6965-4066-9a80-d09ec285b8f2/W+NIKE+P-6000.png"
  );

  // const { value: price, onChange: handlePriceChange } = useRupiah();
  // const { value: hpp, onChange: handleHppChange } = useRupiah();

  return (
    <>
      <form
        className="text-black dark:text-white"
        onSubmit={handleSubmit(onEditSubmit)}
      >
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
              defaultValue="Kategori 1"
            >
              <SelectTrigger className="w-full">
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
              // value={price}
              {...register("price")}
              onChange={(e) => {
                // handlePriceChange(e);
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
              // value={hpp}
              {...register("hpp")}
              onChange={(e) => {
                // handleHppChange(e);
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
              type="name"
              id="stocks"
              defaultValue="23"
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
              defaultValue="Dapur 1"
              {...register("kitchen")}
            >
              <SelectTrigger className="w-full">
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
            className="block text-sm font-medium"
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
            {loading ? <LoadingSVG /> : "Simpan"}
          </Button>
        </div>
      </form>
    </>
  );
}

export default EditProductPage;
