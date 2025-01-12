"use client";

import { z } from "zod";

// Validation Table Management
export const tableSchema = z.object({
  name: z.string().min(1, { message: "Nama meja tidak boleh kosong!" }),
  capacity: z.number().min(1, { message: "Kapasitas tidak boleh 0" }),
  location: z.string().min(1, { message: "Lokasi harus diisi" }),
});
export type TableValues = z.infer<typeof tableSchema>;

// edit
export const tableSchemaEdit = z.object({
  name: z.string().optional(),
  capacity: z.number().optional(),
  location: z.string().optional(),
});
export type TableValuesEdit = z.infer<typeof tableSchemaEdit>;
