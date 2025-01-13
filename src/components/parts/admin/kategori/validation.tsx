"use client";

import { z } from "zod";

// Validation Category
export const categorySchema = z.object({
  name: z.string().min(1, { message: "Nama Category harus diisi" }),
});
export type CategoryValues = z.infer<typeof categorySchema>;

// edit
export const categorySchemaEdit = z.object({
  name: z.string().min(1, { message: "Nama Category harus diisi" }),
});
export type CategoryValuesEdit = z.infer<typeof categorySchemaEdit>;

