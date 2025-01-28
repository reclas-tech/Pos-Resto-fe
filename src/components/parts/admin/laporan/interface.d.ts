// useGetSummaryApiResponse;
export interface useGetSummaryApiResponse {
  statusCode: number;
  message: string;
  data: {
    transaction: number;
    product: number;
    income: number;
    mean: number;
  };
}

interface MonthlyIncome {
  month: string; 
  income: number; 
}

// useGetIncomeGraphApiResponse
export interface useGetIncomeGraphApiResponse {
  statusCode: number;
  message: string;
  data: MonthlyIncome[];
}

interface KitchenIncome {
  [kitchenName: string]: number;
}

interface MonthlyComparison {
  month: string; 
  income: KitchenIncome[]; 
}

// useGetIncomeComparationApiResponse
export interface useGetIncomeComparationApiResponse {
  statusCode: number;
  message: string;
  data: MonthlyComparison[]; 
}

interface Category {
  id: string; 
  name: string;
  quantity: number; 
  income: number;
}

interface Kitchen {
  id: string;
  name: string;
  quantity: number; 
  income: number;
}

interface ReportData {
  month: string; // Bulan dalam format MM
  year: string; // Tahun dalam format YYYY
  start: string | null; // Tanggal mulai, bisa null
  end: string | null; // Tanggal akhir, bisa null
  income: number; // Total pemasukan
  charity: number; // Total donasi/amal
  tax: number; // Pajak
  bruto: number; // Pendapatan bruto
  cogp: number; // Cost of Goods Produced (Biaya produksi barang)
  profit: number; // Laba bersih
  tax_percent: number; // Persentase pajak
  charity_percent: number; // Persentase donasi/amal
  transaction: number; // Total transaksi
  transaction_success: number; // Jumlah transaksi berhasil
  transaction_failed: number; // Jumlah transaksi gagal
  avg_income: number; // Rata-rata pemasukan per transaksi
  product_count: number; // Jumlah produk yang terjual
  categories: Category[];
  kitchens: Kitchen[];
}

// useGetReportApiResponse
export interface useGetReportApiResponse {
  statusCode: number;
  message: string;
  data: ReportData;
}
