import { Pagination } from "@/types/interface";

interface Product {
  id: string;
  name: string;
  price: string;
  quantity: number;
}

export interface PacketInterface {
  statusCode?: number;
  message?: string;
  data: Data;
  currentPage: number;
  search?: string;
  limit?: number;
}

interface Data {
  items: Packet[];
  pagination: Pagination;
}

interface Packet {
  id: string;
  name: string;
  price: number;
  stock: number;
  cogp: number;
  products: Product[];
  image: string;
  created_at: string;
  updated_at: string;
  deleted_at: null;
}

export interface PacketOne {
  statusCode: number;
  message: string;
  data: Packet;
}

export interface PacketEdit {
  id: string;
  name: string;
  price: string;
  stock: string;
  cogp: string;
  products: Product[];
  image: string;
  created_at: string;
  updated_at: string;
  deleted_at: null;
}
