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
