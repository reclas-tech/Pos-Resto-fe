import { Pagination } from "@/types/interface";

export interface TransaksiInterface {
  data: Data;
  statusCode?: number;
  message?: string;
  currentPage: number;
  search?: string;
  limit?: number;
}

interface Data {
  pagination: Pagination;
  items: Transaksi[];
}

interface Transaksi {
  id: string;
  code: string;
  status: string;
  price_sum: number;
  created_at: string;
}
// get one
export interface TransaksiOne {
  statusCode: number;
  message: string;
  data: TransaksiData;
}
export interface TransaksiData {
  id: string
  tax: number
  code: string
  type: string
  status: string
  payment: string
  price_sum: number
  created_at: string
  products: Product[]
  packets: Packet[]
  tables: string[]
  cashier: string
}

export interface Product {
  quantity: number
  name: string
  price: number
}

export interface Packet {
  quantity: number
  name: string
  price: number
}

