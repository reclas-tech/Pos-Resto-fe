"use client";

import { z } from "zod";

// Validation product
export const productSchema = z.object({
  name: z.string().min(1, { message: "Nama Produk harus diisi" }),
  price: z.number().min(1, { message: "Harga harus diisi" }),
  stock: z.number().min(1, { message: "Stok harus diisi" }),
  cogp: z.number().min(1, { message: "HPP harus diisi" }),
  category_id: z.string().min(1, { message: "Kategori harus dipilih" }),
  kitchen_id: z.string().min(1, { message: "Dapur harus dipilih" }),
  image: z
    .instanceof(File)
    .optional()
    .refine((file) => !file || file.size > 0, {
      message: "Gambar harus memiliki ukuran valid jika diunggah",
    }),
});

// Validation product
export const productSchemaEdit = z.object({
  name: z.string().min(1, { message: "Nama Produk harus diisi" }),
  price: z.number().min(1, { message: "Harga harus diisi" }),
  stock: z.number().min(1, { message: "Stok harus diisi" }),
  cogp: z.number().min(1, { message: "HPP harus diisi" }),
  category_id: z.string().min(1, { message: "Kategori harus dipilih" }),
  kitchen_id: z.string().min(1, { message: "Dapur harus dipilih" }),
  image: z
    .instanceof(File)
    .optional()
    .refine((file) => !file || file.size > 0, {
      message: "Gambar harus memiliki ukuran valid jika diunggah",
    }),
});

export type ProductValues = z.infer<typeof productSchema>;
