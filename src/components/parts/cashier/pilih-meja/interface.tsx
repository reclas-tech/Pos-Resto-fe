interface Table {
  id: string;
  name: string;
  capacity: number;
  location: string;
  invoice: string | null;
  status: string;
}

export interface TableListApiResponse {
  statusCode: number;
  message: string;
  data: {
    tables: Table[];
    unavailable: number;
    available: number;
  };
}

interface DataTakeawayList {
  id: string;
  code: string;
  customer: string;
  created_at: string;
  item_count: number;
  status: string;
  price: number;
}

export interface TakeawayListApiResponse {
  statusCode: number;
  message: string;
  data: DataTakeawayList[];
}


export interface InvoiceDetailApiResponse {
  statusCode: number;
  message: string;
  data: InvoiceDetailData;
}

export interface InvoiceDetailData {
  id: string;
  tax: number;
  type: string;
  customer: string;
  price_sum: number;
  price: number;
  cashier: string;
  codes: string[];
  tables: string[];
  products: Product[];
  packets: Packet[];
}

interface Product {
  id: string;
  quantity: number;
  price_sum: number;
  name: string;
  price: number;
}

interface Packet {
  id: string;
  quantity: number;
  price_sum: number;
  name: string;
  price: number;
}