import { Pagination } from "@/types/interface";

export interface ProductInterface {
  statusCode?: number;
  message?: string;
  data: Data;
  currentPage: number;
  search?: string;
  limit?: number;
}

interface Data {
  items: Product[];
  pagination: Pagination;
}

interface Product {
  id: string;
  name: string;
  price: string;
  stock: string;
  cogp: string;
  category_id: string;
  kitchen_id: string;
  image: string;
  created_at: string;
  updated_at: string;
  deleted_at: null;
}

export interface ProductOne {
  statusCode: number;
  message: string;
  data: Product;
}

export interface ProductEdit {
  id: string;
  name: string;
  price: string;
  stock: string;
  cogp: string;
  category_id: string;
  kitchen_id: string;
  image: string;
  created_at: string;
  updated_at: string;
  deleted_at: null;
}
