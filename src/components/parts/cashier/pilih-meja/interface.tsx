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
