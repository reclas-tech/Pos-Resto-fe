import { Pagination } from "@/types/interface";

export interface CloseCashierInterface {
  data: Data;
  statusCode?: number;
  message?: string;
  currentPage: number;
  search?: string;
  limit?: number;
}

interface Data {
  pagination: Pagination;
  items: CloseCashier[];
}

interface CloseCashier {
  id: string
  cash_on_hand_start: number
  started_at: string
  cash_on_hand_end: number
  ended_at: string
  created_at: string
  updated_at: string
  cashier_id: string
  income: number
  cashier: Cashier
}

export interface Cashier {
  id: string
  name: string
}

// get one
export interface CloseCashierOne {
  statusCode: number;
  message: string;
  data: CloseCashierData[];
}
export interface CloseCashierData {
  date: string
  cashier_name: string
  start_at: string
  end_at: string
  cash_on_hand_start: number
  income: number
  cash_on_hand_end: number
  transaction_count: number
  cashier_deposit: number
  difference: number
  cash: number
  debit: number
  qris: number
  total: number
}
