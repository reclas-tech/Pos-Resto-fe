"use client";

import { z } from "zod";

export const schemaLogin = z.object({
  nip: z.string({ message: "NIP tidak boleh kosong!" }),
  // .length(16, "NIP harus terdiri dari 16 karakter"),
  password: z
    .string({ message: "Kata sandi tidak boleh kosong!" })
    .min(6, { message: "Kata sandi minimal 6 karakter" })
    .max(32, { message: "Kata sandi maksimal 32 karakter" }),
});

export const schemaRegister = z.object({
  name: z.string().refine((val) => val !== "", "Nama lengkap harus diisi"),
  // name: z.string({ message: "Nama Lengkap tidak boleh kosong!" }),
  nip: z
    .string({ message: "NIP tidak boleh kosong!" })
    .length(18, "NIP harus terdiri dari 18 karakter"),
  telepon: z
    .string({ message: "Nomor telepon tidak boleh kosong!" })
    .min(10, "Nomor telepon harus terdiri dari minimal 12 digit")
    .max(15, "Nomor telepon harus terdiri dari maksimal 13 digit"),
  email: z
    .string({ message: "Email tidak boleh kosong!" })
    .email({ message: "Email harus sesuai dengan format email" }),
  password: z
    .string({ message: "Harap atur kata sandi anda" })
    .length(6, { message: "Kata sandi minimal 6 karakter" }),
  kecamatan_id: z.string({ message: "Pilih Asal Kecamatan" }),
  desa_id: z.string({ message: "Pilih Asal Desa" }),
  rt: z.string().refine((val) => val !== "", "RT harus diisi"),
  // rt: z.string({ message: "RT tidak boleh kosong!" }),
  rw: z.string().refine((val) => val !== "", "RW harus diisi"),
  // rw: z.string({ message: "RW tidak boleh kosong!" }),
  alamat: z.string().refine((val) => val !== "", "Alamat harus diisi"),
  // alamat: z.string({ message: "Alamat tidak boleh kosong!" }),
  term: z
    .boolean()
    .refine((val) => val === true, "Syarat dan ketentuan harus disetujui"),
  // term: z.boolean({ message: "Syarat dan ketentuan harus disetujui" }),
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
