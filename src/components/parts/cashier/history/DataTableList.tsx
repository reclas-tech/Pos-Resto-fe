"use client";

import React from "react";
import { HistoryListApiResponse } from "./interface";
import { formatRupiah } from "@/hooks/useRupiah";
import { Button } from "@/components/ui/button";

interface DataTableListProps extends HistoryListApiResponse {
    onDetailModal: (id: string | number, status: string, isTakeawayModal: boolean) => void;
}

const DataTableList: React.FC<DataTableListProps> = ({ data, onDetailModal }) => {

    // cek data kosong
    const isDataEmpty = data.length === 0;

    if (isDataEmpty) {
        return (
            <div className="col-span-4 flex justify-center items-center mt-8">
                <p className="text-sm text-gray-500">
                Riwayat Tidak Ditemukan
                </p>
            </div>
        );
    }

    return (
        <>
            <section className="grid grid-cols-3 gap-4 mt-4">
                {data.map((item, index) => (
                    <div
                        key={item?.id || index}
                        className="flex border-primaryColor border rounded-lg p-2"
                    >
                        <div className="flex items-center space-x-4 w-full">
                            <button
                                className="flex-shrink-0 rounded-lg border border-secondaryColor flex items-center justify-center 
          aspect-square w-28 h-28 font-bold text-sm text-black text-center break-words px-2"
                            >
                                {item?.customer}
                            </button>
                            <div className="flex-grow min-w-0 space-y-2">
                                <p className="truncate font-semibold">{item?.code}</p>
                                <div>                
                                    {item?.created_at? new Date(item?.created_at).toLocaleDateString("id-ID", {hour: "2-digit",minute: "2-digit",}) + " WIB": "-"}</div>
                                <p className="font-medium">
                                    {formatRupiah(item?.price_sum.toLocaleString())}
                                </p>
                                <div className="flex gap-2">
                                    <Button
                                        variant="ghostButton"
                                        className={`text-sm text-white pl-2 pr-2 pt-1 pb-1 h-fit w-full ${item?.status === "success"
                                            ? "bg-secondaryColor"
                                            : item?.status === "pending"
                                                ? "bg-primaryColor"
                                                : "bg-[#FF0000]"
                                            }`}
                                    >
                                        {item?.status === "success"
                                            ? "Berhasil"
                                            : item?.status === "pending"
                                                ? "Tertunda"
                                                : "Gagal"}
                                    </Button>
                                    <Button
                                        variant="ghostButton"
                                        onClick={() => {
                                            // Tentukan apakah ini modal Takeaway atau DineIn
                                            const isTakeawayModal = item?.status === "pending";
                                            onDetailModal(item?.id || "", item?.status || "", isTakeawayModal);
                                        }}
                                        className="text-sm bg-white border border-secondaryColor text-black pl-2 pr-2 pt-1 pb-1 h-fit w-full"
                                    >
                                        Detail
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </section>
        </>
    );
};

export default DataTableList;