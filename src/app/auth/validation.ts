import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Email tidak valid"),
  password: z
    .string()
    .min(6, { message: "Kata sandi minimal 6 karakter" })
    .max(32, { message: "Kata sandi maksimal 32 karakter" }),
});

export const forgotPasswordSchema = z.object({
  email: z.string().email("Email tidak valid"),
});

export const newPasswordSchema = z.object({
  newPassword: z
    .string({ message: "Kata sandi tidak boleh kosong!" })
    .min(6, { message: "Kata sandi minimal 6 karakter" })
    .max(32, { message: "Kata sandi maksimal 32 karakter" }),
  confirmNewPassword: z
    .string({ message: "Konformasi Kata sandi tidak boleh kosong!" })
    .min(6, { message: "Konfirmasi Kata sandi minimal 6 karakter" })
    .max(32, { message: "Konformasi Kata sandi maksimal 32 karakter" }),
});
