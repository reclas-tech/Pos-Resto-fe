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
