import { Pagination } from "@/types/interface";

export interface KitchenInterface {
  data: Data;
  statusCode?: number;
  message?: string;
  currentPage: number;
  search?: string;
  limit?: number;
}

interface Data {
  pagination: Pagination;
  items: Kitchen[];
}

interface Kitchen {
  id: string;
  name: string;
}
export interface KitchenOne {
  statusCode: number;
  message: string;
  data: Kitchen;
}

export interface KitchenEdit {
  id: string;
  name: string;
}
