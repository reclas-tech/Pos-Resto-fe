"use client";

import { z } from "zod";

// Validation product
export const productSchema = z.object({
  name: z.string().min(1, { message: "Nama Produk harus diisi" }),
  price: z.string().min(1, { message: "Harga harus diisi" }),
  stock: z.string().min(1, { message: "Stok harus diisi" }),
  cogp: z.string().min(1, { message: "HPP harus diisi" }),
  category_id: z.enum(["Kategori 1", "Kategori 2"], {
    required_error: "Kategori harus dipilih",
  }),
  kitchen_id: z.enum(["Dapur 1", "Dapur 2"], {
    required_error: "Dapur harus dipilih",
  }),
  image: z
    .union([z.instanceof(File), z.string()])
    .refine((val) => val instanceof File || val.length > 0, {
      message: "Foto produk wajib diunggah.",
    }),
});
export type ProductValues = z.infer<typeof productSchema>;

// edit
export const productSchemaEdit = z.object({
  name: z.string().min(1, { message: "Nama Produk harus diisi" }),
  price: z.string().min(1, { message: "Harga harus diisi" }),
  stock: z.string().min(1, { message: "Stok harus diisi" }),
  cogp: z.string().min(1, { message: "HPP harus diisi" }),
  category_id: z.enum(["Kategori 1", "Kategori 2"], {
    required_error: "Kategori harus dipilih",
  }),
  kitchen_id: z.enum(["Dapur 1", "Dapur 2"], {
    required_error: "Dapur harus dipilih",
  }),
  image: z
    .union([z.instanceof(File), z.string()])
    .refine((val) => val instanceof File || val.length > 0, {
      message: "Foto produk wajib diunggah.",
    }),
});
export type ProductValuesEdit = z.infer<typeof productSchemaEdit>;
