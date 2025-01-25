"use client";

import React from "react";
import { TableListApiResponse } from "./interface";

interface DataTableListProps extends TableListApiResponse {
  onDetailModal: (id: string | number, status: string) => void;
}

const DataTableList: React.FC<DataTableListProps> = ({ data, onDetailModal }) => {
  if (!data?.tables || data?.tables.length === 0) {
    return (
      <>
        <section className="grid grid-cols-8 gap-14 pt-8 pb-8 pl-16 pr-16 *:aspect-square">
          <div className="col-span-8 text-center font-bold text-xl text-gray-500">
            Data tidak tersedia
          </div>
        </section>
      </>
    );
  }
  return (
    <>
      <section className="grid grid-cols-8 gap-14 pt-8 pb-8 pl-16 pr-16">
        {data.tables.map((table, index) => {
          return (
            <button
              key={table?.id || index}
              onClick={() => onDetailModal(table?.invoice || "", table?.status)}
              disabled={table?.status === "tersedia"}
              className={`rounded-lg border p-3 ${table?.status === "tersedia" ? "border-[#3395F0]" : "border-[#FEA026]"} ${table?.status === "tersedia" ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              <div
                className={`p-2 rounded-full flex items-center justify-center w-full h-full ${table?.status === "tersedia" ? "bg-[#3395F0]/10" : "bg-[#FEA026]/10"}`}
                style={{ aspectRatio: '1' }} // memastikan aspek rasio tetap 1:1
              >
                <span
                  className={`font-bold text-xs ${table?.status === "tersedia" ? "text-[#3395F0]" : "text-[#FEA026]"}`}
                >
                  {table?.name}
                </span>
              </div>
            </button>
          );
        })}
      </section>
    </>
  );
};

export default DataTableList;

{
  /* {data.tables.map((table) => (
          <div
            key={table.id}
            className={`p-4 border rounded-lg shadow-md ${
              table.status === "tersedia" ? "bg-green-100" : "bg-red-100"
            }`}
          >
            <h2 className="text-xl font-semibold">{table.name}</h2>
            <p>Kapasitas: {table.capacity}</p>
            <p>Lokasi: {table.location}</p>
            <p>Status: {table.status}</p>
          </div>
        ))} */
}