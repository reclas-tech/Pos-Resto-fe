import { Pagination } from "@/types/interface";

export interface EmployeeInterface {
  data: Data;
  statusCode?: number;
  message?: string;
  currentPage: number;
  search?: string;
  limit?: number;
}

interface Data {
  pagination: Pagination;
  items: Employee[];
}

interface Employee {
  id: string;
  pin: string;
  name: string;
  phone: string;
  address: string;
  role: string;
}
export interface EmployeeOne {
  statusCode: number;
  message: string;
  data: Employee;
}
