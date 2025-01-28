"use client";

import { z } from "zod";

// Validation Login
export const loginSchema = z.object({
  email: z.string().email("Email tidak valid"),
  password: z
    .string()
    .min(6, { message: "Kata sandi minimal 6 karakter" })
    .max(32, { message: "Kata sandi maksimal 32 karakter" }),
});
export type LoginValues = z.infer<typeof loginSchema>;

// Validation ForgotPassword
export const forgotPasswordSchema = z.object({
  email: z.string().email("Email tidak valid"),
});
export type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>;

// Validation Otp
export const otpSchema = z.object({
  otp: z.string().length(6, { message: "OTP harus 6 digit" }),
});
export type OtpValues = z.infer<typeof otpSchema>;

// Validation NewPassword
export const newPasswordSchema = z
  .object({
    new_password: z
      .string({ message: "Kata sandi tidak boleh kosong!" })
      .min(6, { message: "Kata sandi minimal 6 karakter" })
      .max(32, { message: "Kata sandi maksimal 32 karakter" }),
    new_password_confirmation: z
      .string({ message: "Konfirmasi Kata sandi tidak boleh kosong!" })
      .min(6, { message: "Konfirmasi Kata sandi minimal 6 karakter" })
      .max(32, { message: "Konfirmasi Kata sandi maksimal 32 karakter" }),
  })
  .refine((data) => data.new_password === data.new_password_confirmation, {
    message: "Password dan konfirmasi password harus sama",
    path: ["new_password_confirmation"],
  });
export type NewPasswordValues = z.infer<typeof newPasswordSchema>;

// Validation Table Management
export const tableSchema = z.object({
  name: z.string().min(1, { message: "Nama meja tidak boleh kosong!" }),
  capacity: z.number().min(1, { message: "Kapasitas tidak boleh 0" }),
  location: z.enum(["Indoor", "Outdoor"], {
    required_error: "Lokasi meja harus dipilih",
  }),
});

// Validation Employee Management
export const employeeSchema = z.object({
  name: z.string().min(1, { message: "Nama karyawan harus diisi" }),
  role: z.enum(["Kasir", "Pelayan"], {
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
export type EmployeeValues = z.infer<typeof employeeSchema>;

// Validation Packet
export const packetSchema = z.object({
  name: z.string().min(1, { message: "Nama Produk harus diisi" }),
  price: z.number().min(1, { message: "Harga harus diisi" }),
  stock: z.number().min(1, { message: "Stok harus diisi" }),
  cogp: z.number().min(1, { message: "HPP harus diisi" }),
  image: z
    .union([z.instanceof(File), z.string()])
    .refine((val) => val instanceof File || val.length > 0, {
      message: "Foto produk wajib diunggah.",
    }),
  category_id: z.string().optional(),
});
export type PacketValues = z.infer<typeof packetSchema>;