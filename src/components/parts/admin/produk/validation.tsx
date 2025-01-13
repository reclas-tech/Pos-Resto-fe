"use client";

import { z } from "zod";

// Validation product
export const productSchema = z.object({
  name: z.string().min(1, { message: "Nama Produk harus diisi" }),
  price: z.number().min(1, { message: "Harga harus diisi" }),
  stock: z.number().min(1, { message: "Stok harus diisi" }),
  cogp: z.number().min(1, { message: "HPP harus diisi" }),
  category_id: z.string().min(1, { message: "Kategori harus dipilih" }), // Expecting category_id to be a string.
  kitchen_id: z.string().min(1, { message: "Dapur harus dipilih" }), // Expecting kitchen_id to be a string.
  image: z
    .instanceof(File)
    .refine((file) => file.size > 0, { message: "Image is required" }),
});
export type ProductValues = z.infer<typeof productSchema>;
