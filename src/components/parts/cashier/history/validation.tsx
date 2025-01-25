"use client";

import { z } from "zod";

// Validation for invoice history
export const invoiceHistorySchema = z.object({
    pin: z.string().length(6, "PIN must be exactly 6 digits").optional(),
    products: z.array(
        z.object({
            id: z.string().uuid("Invalid product ID").optional(),
            quantity: z.number().int().min(0, "Quantity must be at least 0"),
        })
    ),
    packets: z.array(
        z.object({
            id: z.string().uuid("Invalid packet ID").optional(),
            quantity: z.number().int().min(0, "Quantity must be at least 0"),
        })
    ),
});

export type InvoiceHistoryValues = z.infer<typeof invoiceHistorySchema>;
