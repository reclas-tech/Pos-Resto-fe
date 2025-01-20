interface Card {
  id: string;
  code: string;
  type: string;
  status: string;
  customer: string;
  price_sum: number;
  created_at: string;
}

export interface ListApiResponse {
    statusCode: number;
    message: string;
    data: Card[]
}
