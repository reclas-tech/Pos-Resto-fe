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
  month: string;
  year: string;
  start: string | null;
  end: string | null;
  income: number; 
  tax: number; 
  cogp: number;
  charity: number | null;
  profit: number;
  tax_percent: number;
  charity_percent: number;
  transaction: number;
  transaction_success: number;
  transaction_failed: number;
  avg_income: number;
  product_count: number;
  categories: Category[];
  kitchens: Kitchen[];
}

// useGetReportApiResponse
export interface useGetReportApiResponse {
  statusCode: number;
  message: string;
  data: ReportData;
}
