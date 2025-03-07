interface Order {
  id: string;
  code: string;
  type: string;
  status: string;
  customer: string;
  price_sum: number;
  created_at: string;
  tables: string[];
}

export interface HistoryListApiResponse {
  statusCode: number;
  message: string;
  data: Order[];
}

interface Product {
  id: string;
  note: string;
  quantity: number;
  name: string;
  price: number;
  price_sum:number;
}

interface Packet {
  id: string;
  note: string;
  quantity: number;
  name: string;
  price: number;
  price_sum: number;
}

interface OrderDetail {
  id: string;
  tax: number;
  code: string;
  type: "dine in" | "take away";
  status: "pending" | "success";
  payment: string | null;
  customer: string;
  price_sum: number;
  discount: number;
  created_at: string;
  products: Product[];
  packets: Packet[];
  tables: string[];
  cashier: string;
}

interface GetOneInvoiceApiResponse {
  statusCode: number;
  message: string;
  data: OrderDetail;
}
