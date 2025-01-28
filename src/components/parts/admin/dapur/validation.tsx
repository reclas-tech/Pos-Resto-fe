"use client";

import { z } from "zod";

// Validation Kitchen Management
export const kitchenSchema = z.object({
  name: z.string().min(1, { message: "Nama dapur tidak boleh kosong!" }),
  ip: z.string().min(1, { message: "Alamat IP dapur tidak boleh kosong!" }),
});
export type KitchenSchemaValues = z.infer<typeof kitchenSchema>;

// Validation Chacker
export const kitchenChackerSchema = z.object({
  checker_ip: z.string().min(1, { message: "Chacker tidak boleh kosong!" }),
  link: z.string().min(1, { message: "Link Receiver tidak boleh kosong!" }),
});
export type KitchenChackerSchemaValues = z.infer<typeof kitchenChackerSchema>;
