"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRupiah } from "@/hooks/useRupiah";

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
import { useRouter } from "next/navigation";
import { showAlert2 } from "@/lib/sweetalert2";
import { LoadingSVG } from "@/constants/svgIcons";
import { Minus, Plus, Trash2 } from "lucide-react";

interface SelectedProduct {
  id: number;
  name: string;
  quantity: number;
}

interface Product {
  id: number;
  name: string;
  price: number;
}

function CreatePacketPage() {
  const dummyProducts: Product[] = [
    { id: 1, name: "Nasi Padang", price: 15000 },
    { id: 2, name: "Rendang", price: 25000 },
    { id: 3, name: "Ayam Bakar", price: 20000 },
    { id: 4, name: "Gulai Ikan", price: 18000 },
    { id: 5, name: "Sayur Singkong", price: 8000 },
  ];

  const navigate = useRouter();
  const [loading, setLoading] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState<SelectedProduct[]>(
    []
  );

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<PacketValues>({
    resolver: zodResolver(packetSchema),
    defaultValues: {
      name: "",
      price: "",
      hpp: "",
      stock: "",
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

  const handleIncreaseQuantity = (id: number) => {
    setSelectedProducts(
      selectedProducts.map((product) =>
        product.id === id
          ? { ...product, quantity: product.quantity + 1 }
          : product
      )
    );
  };

  const handleDecreaseQuantity = (id: number) => {
    setSelectedProducts(
      selectedProducts.map((product) =>
        product.id === id && product.quantity > 1
          ? { ...product, quantity: product.quantity - 1 }
          : product
      )
    );
  };

  const handleRemoveProduct = (id: number) => {
    setSelectedProducts(
      selectedProducts.filter((product) => product.id !== id)
    );
  };

  // Create
  // const onAddSubmit: SubmitHandler<PacketValues> = async (data) => {
  //   console.log("Form data:", data);
  //   setLoading(true);
  //   const formData = new FormData();
  //   formData.append("name", data.name);
  //   formData.append("price", data.price);
  //   formData.append("hpp", data.hpp);
  //   formData.append("stock", data.stock);
  //   formData.append("image", data.image);

  //   try {
  //     await axiosPrivate.post("/produk", formData);
  //     showAlert2("success", "Berhasil menambahkan data.");
  //     navigate.push("/produk/menu-paket");
  //   } catch (error) {
  //     if (error instanceof AxiosError) {
  //       const errorMessage =
  //         error.response?.data?.data?.[0]?.message || "Gagal menambahkan data.";
  //       showAlert2("error", errorMessage);
  //     } else {
  //       showAlert2("error", "Terjadi kesalahan!");
  //     }
  //   } finally {
  //     setLoading(false);
  //     reset();
  //   }
  // };
  const onAddSubmit: SubmitHandler<PacketValues> = (data) => {
    setLoading(true);

    const packetData = {
      ...data,
      products: selectedProducts,
    };
    console.log("Form data:", packetData);
    showAlert2("success", "Berhasil menyimpan data ");
    reset();
    setSelectedProducts([]);
    setLoading(false);
    navigate.push("/produk/menu-paket");
  };

  const { value: price, onChange: handlePriceChange } = useRupiah();
  const { value: hpp, onChange: handleHppChange } = useRupiah();

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue("image", file);
      const objectUrl = URL.createObjectURL(file);
      setImagePreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
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
                  className="w-1/4 mb-1 bg-primaryColor hover:bg-primaryColor hover:opacity-90"
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
                  {dummyProducts.map((product) => (
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
              {...register("stock")}
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
                <span className="text-sm text-red-500">
                  {errors.hpp.message}
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
