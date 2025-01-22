interface Card {
  id: string;
  code: string;
  type: string;
  status: string;
  customer: string;
  price_sum: number;
  created_at: string;
  payment: string;
  products: Product[];
  cashier: string;
}

export interface ListApiResponse {
    statusCode: number;
    message: string;
    data: Card[];
    search?: string;
    price?: string;
    time?: string;
    invoice?: string;
}

export interface RiwayatOneApiResponse {
    statusCode: number;
    message: string;
    data: Riwayat;
}

interface Riwayat {
  id: string;
  code: string;
  tax: number;
  type: string;
  status: string;
  customer: string;
  price_sum: number;
  created_at: string;
  payment?: string;
  products: Product[];
  packets: Packet[];
  tables: string[];
  cashier?: string;
}

interface Product {
  id: string;
  quantity: number;
  name: string;
  price: number;
}

interface Packet {
  id: string;
  quantity: number;
  name: string;
  price: number;
}
