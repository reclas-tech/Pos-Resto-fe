"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useInputRp } from "@/hooks/useRupiah";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PacketValues, packetSchema } from "@/validations";
import { LoadingSVG } from "@/constants/svgIcons";
import { Minus, Plus, Trash2 } from "lucide-react";
import {
  postSubmitPacket,
  useGetListProduct,
} from "@/components/parts/admin/paket/api";

interface SelectedProduct {
  id: string;
  name: string;
  quantity: number;
}

interface Product {
  id: string;
  name: string;
  price: number;
}

function CreatePacketPage() {
  // const navigate = useRouter();
  const [loading, setLoading] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState<SelectedProduct[]>(
    []
  );

  const { data: products } = useGetListProduct("");

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<PacketValues>({
    resolver: zodResolver(packetSchema),
    defaultValues: {
      name: "",
      price: 0,
      cogp: 0,
      // stock: 0,
      image: "",
    },
  });

  const handleAddProduct = (product: Product) => {
    const existingProduct = selectedProducts.find((p) => p.id === product.id);
    if (!existingProduct) {
      const newProduct: SelectedProduct = {
        id: product.id,
        name: product.name,
        quantity: 1,
      };
      setSelectedProducts([...selectedProducts, newProduct]);
    }
  };

  const handleIncreaseQuantity = (id: string) => {
    setSelectedProducts(
      selectedProducts.map((product) =>
        product.id === id
          ? { ...product, quantity: product.quantity + 1 }
          : product
      )
    );
  };

  const handleDecreaseQuantity = (id: string) => {
    setSelectedProducts(
      selectedProducts.map((product) =>
        product.id === id && product.quantity > 1
          ? { ...product, quantity: product.quantity - 1 }
          : product
      )
    );
  };

  const handleRemoveProduct = (id: string) => {
    setSelectedProducts(
      selectedProducts.filter((product) => product.id !== id)
    );
  };

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue("image", file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const { handlePostSubmit } = postSubmitPacket();

  const onAddSubmit: SubmitHandler<PacketValues> = (data) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("price", data.price.toString());
      formData.append("cogp", data.cogp.toString());
      formData.append("stock", data.stock.toString());

      if (data.image) {
        formData.append("image", data.image);
      }

      // Pastikan products dalam format array yang benar
      const productsArray = selectedProducts.map((product) => ({
        id: product.id,
        quantity: product.quantity,
      }));

      // Tambahkan products sebagai JSON string, pastikan tetap dalam format array
      formData.append("products", JSON.stringify(productsArray));

      // Tambahan: append ulang products dalam format array
      productsArray.forEach((product, index) => {
        formData.append(`products[${index}][id]`, product.id);
        formData.append(
          `products[${index}][quantity]`,
          product.quantity.toString()
        );
      });

      handlePostSubmit(formData, setLoading);
      console.log(formData);
      reset();
      setSelectedProducts([]);
      setImagePreview(null);
    } catch (error) {
      console.error("Error submitting product:", error);
    }
  };

  return (
    <>
      <form
        className="text-black dark:text-white"
        onSubmit={handleSubmit(onAddSubmit)}
      >
        <div className="w-full grid grid-cols-2 gap-x-4 gap-y-5">
          <div className="flex flex-col w-full">
            <Label htmlFor="nameProducts">Nama Paket</Label>
            <Input
              type="name"
              id="nameProducts"
              placeholder="Nama Paket"
              {...register("name")}
            />
            {errors.name && (
              <span className="text-sm text-red-500">
                {errors.name.message}
              </span>
            )}
          </div>
          <div className="flex flex-col w-full row-span-3 relative">
            <Label htmlFor="category">Produk</Label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="default"
                  className="w-1/3 mb-1 bg-primaryColor hover:bg-primaryColor hover:opacity-90"
                  iconLeft={<Plus />}
                >
                  Tambah Produk
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="transition-all duration-300 ease-in-out opacity-1 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 bg-white border border-gray-300 shadow-2xl rounded-md w-[500px] absolute left-[-70px]">
                <DropdownMenuLabel className="font-medium text-base w-full">
                  Pilih produk
                </DropdownMenuLabel>
                <div className="p-2 text-base space-y-2 max-h-32 overflow-y-auto ">
                  {products?.data?.items?.map((product: Product) => (
                    <div
                      key={product.id}
                      id="opsi-produk"
                      className="flex justify-between items-center hover:bg-gray-50 p-2 rounded-md "
                    >
                      <div>
                        <p className="font-medium">{product.name}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleAddProduct(product)}
                        className="flex items-center justify-center bg-secondaryColor w-8 h-8 rounded-md text-white"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
            <div
              id="hasil-opsi"
              className="w-full rounded-md border border-neutral-200 bg-transparent px-3 py-3 text-base shadow-sm transition-colors space-y-2 max-h-32 overflow-y-auto"
            >
              {selectedProducts.length === 0 ? (
                <span className="text-slate-400">Pilih produk</span>
              ) : (
                selectedProducts.map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center justify-between  p-2 rounded-md"
                  >
                    <span>{product.name}</span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleDecreaseQuantity(product.id)}
                      >
                        <Minus size={20} />
                      </button>
                      <span className="flex items-center justify-center border border-secondaryColor rounded-md font-medium w-10 h-6">
                        {product.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleIncreaseQuantity(product.id)}
                      >
                        <Plus size={20} />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleRemoveProduct(product.id)}
                        className=" text-red-600"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
          <div className="flex flex-col w-full ">
            <Label htmlFor="stocks">Stok</Label>
            <Input
              type="number"
              id="stocks"
              placeholder="Jumlah Stok"
              {...register("stock", {
                valueAsNumber: true,
              })}
            />
            {errors.stock && (
              <span className="text-sm text-red-500">
                {errors.stock.message}
              </span>
            )}
          </div>

          <div className="flex w-full space-x-3 items-center">
            <div className="flex flex-col w-full">
              <Label htmlFor="price">Harga</Label>
              <Input
                type="text"
                id="price"
                placeholder="Rp."
                value={useInputRp(watch("price"))}
                onChange={(e) => {
                  const numericValue =
                    parseInt(e.target.value.replace(/[^0-9]/g, ""), 10) || 0;
                  setValue("price", numericValue);
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
                value={useInputRp(watch("cogp"))}
                onChange={(e) => {
                  const numericValue =
                    parseInt(e.target.value.replace(/[^0-9]/g, ""), 10) || 0;
                  setValue("cogp", numericValue);
                }}
              />
              {errors.cogp && (
                <span className="text-sm text-red-500">
                  {errors.cogp.message}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="w-full my-5">
          <label
            className="block text-sm font-medium"
            htmlFor="productsCapture"
          >
            Foto Menu Paket
          </label>
          <div
            className="h-[170px] bg-white border border-dashed border-[#D9D9D9] rounded-lg overflow-hidden flex justify-center items-center mt-2 p-2 cursor-pointer"
            onClick={() => document.getElementById("image-upload")?.click()}
          >
            {imagePreview ? (
              <Image
                src={imagePreview || "waroeng aceh garuda"}
                alt="Preview"
                width={200}
                height={200}
                className="object-contain h-full"
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
          <Link href={"/produk/menu-paket"}>
            <Button variant={"outline"} className="border-secondaryColor">
              Batal
            </Button>
          </Link>
          <Button variant={"default"} disabled={loading}>
            {loading ? <LoadingSVG /> : "Tambah"}
          </Button>
        </div>
      </form>
    </>
  );
}

export default CreatePacketPage;
