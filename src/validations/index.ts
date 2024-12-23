"use client";

import { z } from "zod";

export const schemaLogin = z.object({
  name: z.string({ message: "Nama tidak boleh kosong!" }),
  password: z
    .string({ message: "Kata sandi tidak boleh kosong!" })
    .min(6, { message: "Kata sandi minimal 6 karakter" })
    .max(32, { message: "Kata sandi maksimal 32 karakter" }),
});

export const schemaRegister = z.object({
  name: z.string().refine((val) => val !== "", "Nama lengkap harus diisi"),
  email: z
    .string({ message: "Email tidak boleh kosong!" })
    .email({ message: "Email harus sesuai dengan format email" }),
  password: z
    .string({ message: "Harap atur kata sandi anda" })
    .length(6, { message: "Kata sandi minimal 6 karakter" }),
});

export const schemaForgotPassword = z.object({
  newPassword: z
    .string({ message: "Kata sandi tidak boleh kosong!" })
    .min(6, { message: "Kata sandi minimal 6 karakter" })
    .max(32, { message: "Kata sandi maksimal 32 karakter" }),
  confirmNewPassword: z
    .string({ message: "Konformasi Kata sandi tidak boleh kosong!" })
    .min(6, { message: "Konfirmasi Kata sandi minimal 6 karakter" })
    .max(32, { message: "Konformasi Kata sandi maksimal 32 karakter" }),
  oldPassword: z
    .string({ message: "Ulangi Kata sandi tidak boleh kosong!" })
    .min(6, { message: "Ulangi Kata sandi minimal 6 karakter" })
    .max(32, { message: "Ulangi Kata sandi maksimal 32 karakter" }),
});

// Validation Kitchen Management
export const kitchenSchema = z.object({
  name: z.string().min(1, { message: "Nama dapur tidak boleh kosong!" }),
});

// Validation Employee Management
export const employeeSchema = z.object({
  name: z.string().min(1, { message: "Nama karyawan harus diisi" }),
  role: z.enum(["Kasir", "Admin"], {
    required_error: "Peran harus dipilih",
  }),
  pin: z
    .string()
    .min(6, { message: "PIN minimal 6 karakter" })
    .max(6, { message: "PIN maksimal 6 karakter" }),
  no_hp: z
    .string()
    .min(10, { message: "Nomor telepon minimal 10 digit" })
    .max(13, { message: "Nomor telepon maksimal 13 digit" }),
  address: z.string().min(1, { message: "Alamat harus diisi" }),
});

// Validation Product
export type FormValuesProduct = z.infer<typeof productSchema>;
export const productSchema = z.object({
  name: z.string().min(1, { message: "Nama Produk harus diisi" }),
  price: z.string().min(1, { message: "Harga harus diisi" }),
  stock: z.string().min(1, { message: "Stok harus diisi" }),
  category: z.enum(["Kategori 1", "Kategori 2"], {
    required_error: "Kategori harus dipilih",
  }),
  hpp: z.string().min(1, { message: "HPP harus diisi" }),
  kitchen: z.enum(["Dapur 1", "Dapur 2"], {
    required_error: "Dapur harus dipilih",
  }),
  image: z.string().nonempty("Foto produk wajib diunggah."),
});

// Validation Category
export type FormValuesCategory = z.infer<typeof categorySchema>;
export const categorySchema = z.object({
  name: z.string().min(1, { message: "Nama Produk harus diisi" }),
});
