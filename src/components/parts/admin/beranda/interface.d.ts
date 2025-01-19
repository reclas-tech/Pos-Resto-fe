export interface SummaryInterface {
  statusCode: number
  message: string
  data: DataSummary
}
export interface DataSummary {
  order: Order
  item: Item
  income: Income
}
export interface Order {
  diff: number
  status: string
  yesterday: number
  today: number
}
export interface Item {
  diff: number
  status: string
  yesterday: number
  today: number
}
export interface Income {
  diff: number
  status: string
  yesterday: number
  today: number
}

// dine in
export interface DineTakeCount {
  statusCode: number
  message: string
  data: DataDineTake[]
}
export interface DataDineTake {
  name: string
  sum: number
}

// year grafik income
export interface GrafikIncome {
  statusCode: number
  message: string
  data: DataGrafik[]
}

export interface DataGrafik {
  value: number
  month: string
  year: string
}