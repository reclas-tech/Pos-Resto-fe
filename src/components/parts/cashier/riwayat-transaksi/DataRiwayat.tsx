import React from "react";
import { ListApiResponse, Product } from "./interface";

interface DataRiwayatProps extends ListApiResponse {
  onDetailModal: (
    id: string | number,
    status: string,
    code: string,
    type: string,
    payment: string,
    price_sum: number,
    cashier: string,
    products: Product[]
  ) => void;
}

const DataRiwayat: React.FC<DataRiwayatProps> = ({ data, onDetailModal }) => {
    if (!data)
};
