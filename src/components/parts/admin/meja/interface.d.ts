import { Pagination } from "@/types/interface";

export interface TableInterface {
  data: Data;
  statusCode?: number;
  message?: string;
  currentPage: number;
  search?: string;
  limit?: number;
}

interface Data {
  pagination: Pagination;
  items: Table[];
}

interface Table {
  id: string;
  name: string
  capacity: number
  location: string
  status: string
}
export interface TableOne {
  statusCode: number;
  message: string;
  data: Table;
}

export interface TableEdit {
  id: string;
  name: string
  capacity: number
  location: string
  status: string
}
