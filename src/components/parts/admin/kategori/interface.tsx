import { Pagination } from "@/types/interface";

export interface CategoryInterface {
  statusCode?: number;
  message?: string;
  data: Data;
  currentPage: number;
  search?: string;
  limit?: number;
}

interface Data {
  items: Category[];
  pagination: Pagination;
}

interface Category {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
  deleted_at: null;
}

export interface CategoryOne {
  statusCode: number;
  message: string;
  data: Category;
}

export interface CategoryEdit {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
  deleted_at: null;
}
