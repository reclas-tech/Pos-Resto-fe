// types.ts
export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity?: number;
  note?: string;
  stock: number;
}

export interface Packet {
  id: string;
  name: string;
  cogp: number;
  price: number;
  stock: number;
  image: string;
  products: ProductInPacket[];
  quantity?: number;
  note?: string;
}

export interface ProductInPacket {
  id: string;
  packet_id: string;
  product_id: string;
  quantity: number;
  product: {
    id: string;
    name: string;
  };
}

export interface CustomerOrder {
  type: "take away" | "dine in";
  customerName: string;
  tableIds?: string[];
  tableNames?: string[];
}

export interface TableData {
  id: string;
  name: string;
  status: "tersedia" | "terisi";
}
export interface Category {
  id: string;
  name: string;
}
