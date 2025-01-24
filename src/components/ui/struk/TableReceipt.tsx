/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

type Product = {
  id: string;
  name: string;
  quantity: number;
  note?: string;
  price?: number;
};

type TableReceiptProps = {
  data: {
    code: string;
    created_at: string;
    type: string;
    price_sum: number;
    tax: number;
    products: Product[];
    packets: Product[];
    tables: string[];
    customer: string;
  } | null;
  ref?: any;
};

const TableReceipt: React.FC<TableReceiptProps> = ({ data, ref }) => {
  if (!data) return null;

  return (
    <div id="struk" className="bg-white p-[2%] text-[10px] w-full" ref={ref}>
      <p className="uppercase text-center font-medium">Checker</p>

      <div className="text-left mt-6 grid grid-cols-2 pb-2 border-b border-dashed border-black">
        <p>No Transaksi</p>
        <p>: {data.code}</p>
        <p>Waktu</p>
        <p>: {new Date(data.created_at).toLocaleString()}</p>
        <p>Nama Pemesan</p>
        <p>: {data.customer}</p>
        <p>Nomor Meja</p>
        <p>: {data.tables.join(", ")}</p>
      </div>

      <div className="mt-2 space-y-2 border-b border-dashed border-black pb-2">
        {data.products.map((product) => (
          <div key={product.id}>
            <span className="flex space-x-[2%]">
              <p>{product.quantity}x</p>
              <p>{product.name}</p>
            </span>
            {product.note && product.note.trim() !== "" && (
              <ul className="list-disc ml-6">
                <li className="">{product.note}</li>
              </ul>
            )}
          </div>
        ))}

        {data.packets.map((packet) => (
          <div key={packet.id}>
            <span className="flex space-x-[2%]">
              <p>{packet.quantity}x</p>
              <p>{packet.name}</p>
            </span>
            {packet.note && packet.note.trim() !== "" && (
              <ul className="list-disc ml-6">
                <li className="">{packet.note}</li>
              </ul>
            )}
          </div>
        ))}
      </div>

      <p className="text-center mt-4">
        {new Date(data.created_at).toLocaleString()}
      </p>
      <p className="text-center">Cetak : Waroeng Aceh Garuda</p>
    </div>
  );
};

export default TableReceipt;
