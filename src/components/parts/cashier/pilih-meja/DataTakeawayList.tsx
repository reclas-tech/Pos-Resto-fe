"use client";

import React, { useState } from "react";
import { TakeawayListApiResponse } from "./interface";
import { RiwayatSVG } from "@/constants/svgIcons";

interface DataTakeawayListProps extends TakeawayListApiResponse {
  onDetailModal: (id: string | number, status: string) => void;
  onPaymentModal: (id: string | number, status: string) => void;
}

const DataTakeawayLIst: React.FC<DataTakeawayListProps> = ({
  data,
  onDetailModal,
  onPaymentModal,
}) => {
  const [activeFilterTakeAway, setActiveFilterTakeAway] = useState("Semua");

  const handleFilterClickTakeAway = (filter: React.SetStateAction<string>) => {
    setActiveFilterTakeAway(filter);
    console.log(`Filter aktif: ${filter}`);
  };

  // Filter data berdasarkan status
  const filteredData =
    activeFilterTakeAway === "Semua"
      ? data
      : data?.filter((item) =>
          activeFilterTakeAway === "Belum Bayar"
            ? item.status.toLowerCase() === "belum bayar"
            : item.status.toLowerCase() === "sudah bayar"
        );

  return (
    <>
      {/* Handle Filter Status */}
      <div className="flex gap-2 pb-4">
        {["Semua", "Belum Bayar", "Sudah Bayar"].map((filter) => (
          <button
            key={filter}
            className={`rounded-3xl text-xs p-1 px-2 h-fit border ${
              activeFilterTakeAway === filter
                ? "bg-[#FFF5EE] border-primaryColor text-primaryColor"
                : ""
            }`}
            onClick={() => handleFilterClickTakeAway(filter)}
          >
            {filter}
          </button>
        ))}
      </div>
      <div className="overflow-auto h-screen space-y-2 scroll-container">
        {filteredData && filteredData.length > 0 ? (
          filteredData.map((takeawayList, index) => {
            const convertToDecimalHours = (date: Date) => {
              const hours = date.getHours();
              const minutes = date.getMinutes();
              const decimalMinutes = minutes / 60;
              return (hours + decimalMinutes).toFixed(2);
            };

            const createdAt = new Date(takeawayList?.created_at);
            const decimalHours = convertToDecimalHours(createdAt);

            return (
              <div
                key={takeawayList?.id || index}
                className="border rounded-xl text-xs"
              >
                <div className="flex justify-between border-b p-2">
                  <div className="space-y-0">
                    <div className="flex gap-4">
                      <div className="flex items-center text-[#828487]">
                        #INV{takeawayList?.code}
                      </div>
                      <div
                        className={`w-fit h-fit rounded-3xl text-[10px] p-1 pl-1.5 pr-1.5 capitalize ${
                          takeawayList?.status === "sudah bayar"
                            ? "text-primaryColor bg-[#FEA026]/10"
                            : "text-[#35C335] bg-[#35C335]/10"
                        }`}
                      >
                        {takeawayList?.status}
                      </div>
                    </div>
                    <div className="text-black font-bold text-sm">
                      {takeawayList?.customer}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      // onClick={() => setIsDetailModalOpenTakeAway(true)}
                      onClick={() =>
                        onDetailModal(
                          takeawayList?.id || index,
                          takeawayList?.status
                        )
                      }
                      className="rounded-3xl text-xs pl-2 pr-2 pt-1 pb-1 text-primaryColor bg-white border border-primaryColor h-fit justify-center m-auto"
                    >
                      Detail
                    </button>
                    {takeawayList?.status === "belum bayar" && (
                      <button
                        onClick={() =>
                          onPaymentModal(
                            takeawayList?.id || index,
                            takeawayList?.status
                          )
                        }
                        className="rounded-3xl text-xs pl-2 pr-2 pt-1 pb-1 text-white bg-primaryColor h-fit justify-center m-auto"
                      >
                        Bayar
                      </button>
                    )}
                  </div>
                </div>
                <div className="flex justify-between border-b p-2">
                  <div className="text-[#828487] flex items-center w-[30%]">
                    {takeawayList?.item_count} Pesanan
                  </div>
                  <div className="flex gap-2 w-[70%] justify-end">
                    <div className="text-black bg-[#F8F9FD] pl-2 pr-2 pt-1 pb-1 rounded-lg">
                      Rp. {takeawayList?.price?.toLocaleString("id-ID")}
                    </div>
                    <div className="flex gap-1 text-black bg-[#F8F9FD] pl-2 pr-2 pt-1 pb-1 rounded-lg">
                      <RiwayatSVG className="w-4 h-4" />
                      <div className="div">{decimalHours}</div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center text-gray-500 mt-4">
            Data tidak tersedia
          </div>
        )}
      </div>
    </>
  );
};

export default DataTakeawayLIst;
