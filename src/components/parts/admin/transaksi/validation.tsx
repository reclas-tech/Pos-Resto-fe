"use client";

import { z } from "zod";

// Validation Employee Management
export const employeeSchema = z.object({
  name: z.string().min(1, { message: "Nama karyawan harus diisi" }),
  role: z.string().min(1, { message: "Peran harus diisi" }),
  pin: z
    .string()
    .min(6, { message: "PIN minimal 6 karakter" })
    .max(6, { message: "PIN maksimal 6 karakter" }),
  phone: z
    .string()
    .min(10, { message: "Nomor telepon minimal 10 digit" })
    .max(13, { message: "Nomor telepon maksimal 13 digit" }),
  address: z.string().min(1, { message: "Alamat harus diisi" }),
});
export type EmployeeValues = z.infer<typeof employeeSchema>;