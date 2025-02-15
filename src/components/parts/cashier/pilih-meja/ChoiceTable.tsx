"use client";

import React, { useState } from "react";
import { TableListApiResponse } from "./interface";

interface DataTableListProps extends TableListApiResponse {
    onSelectTable: (selectedTableIds: Array<string | number>) => void;
}

const DataChoiceTableList: React.FC<DataTableListProps> = ({ data, onSelectTable }) => {
    const [selectedTables, setSelectedTables] = useState<Array<string | number>>([]);

    // Mengecek apakah ada meja "terisi" yang dipilih
    const selectedTerisiTable = data?.tables?.find(
        (table) => selectedTables.includes(table?.id) && table?.status === "terisi"
    );

    if (!data?.tables || data?.tables.length === 0) {
        return (
            <div className="col-span-4 flex justify-center items-center mt-4">
                <p className="text-sm text-gray-500">Meja Tidak Ditemukan</p>
            </div>
        );
    }

    const handleSelectTable = (tableId: string | number, status: string) => {
        setSelectedTables((prevSelected) => {
            const isAlreadySelected = prevSelected.includes(tableId);

            let updatedSelection: Array<string | number> = [];

            if (status === "terisi") {
                // Jika meja "terisi" yang sama diklik lagi, hapus dari daftar pilihan
                updatedSelection = isAlreadySelected ? [] : [tableId];
            } else {
                // Jika meja "tersedia" yang sama diklik lagi, toggle pilihannya
                updatedSelection = isAlreadySelected
                    ? prevSelected.filter(id => id !== tableId)
                    : [...prevSelected, tableId];
            }

            onSelectTable(updatedSelection);
            return updatedSelection;
        });
    };

    return (
        <div className="max-h-96 overflow-y-auto p-4 rounded-lg shadow-sm text-xs">
            <section className="grid grid-cols-5 gap-12 p-4">
                {data.tables.map((table) => {
                    const isSelected = selectedTables.includes(table?.id);
                    const isTersedia = table?.status === "tersedia";
                    const isTerisi = table?.status === "terisi";

                    // Meja "tersedia" disabled jika tidak ada meja "terisi" yang dipilih
                    const isDisabled = isTersedia && !selectedTerisiTable;

                    // Meja "terisi" lainnya juga harus disabled jika sudah ada yang dipilih
                    const isTerisiDisabled = isTerisi && selectedTerisiTable && !isSelected;

                    return (
                        <button
                            key={table?.id}
                            onClick={() => handleSelectTable(table?.id, table?.status)}
                            disabled={isDisabled || isTerisiDisabled}
                            className={`rounded-lg border p-3 transition-all ${isSelected ? "border-secondaryColor"
                                : isTersedia ? "border-[#3395F0]"
                                    : "border-[#FEA026]"
                                } ${isDisabled || isTerisiDisabled ? "opacity-50 cursor-not-allowed" : ""}`}
                        >
                            <div
                                className={`p-2 rounded-full flex items-center justify-center w-full h-full transition-all ${isSelected ? "bg-[#e6edec]"
                                    : isTersedia ? "bg-[#3395F0]/10"
                                        : "bg-[#FEA026]/10"
                                    }`}
                                style={{ aspectRatio: '1' }}
                            >
                                <span
                                    className={`font-bold text-xs transition-all ${isSelected ? "text-secondaryColor"
                                        : isTersedia ? "text-[#3395F0]"
                                            : "text-[#FEA026]"
                                        }`}
                                >
                                    {table?.name}
                                </span>
                            </div>
                        </button>
                    );
                })}
            </section>
        </div>
    );
};

export default DataChoiceTableList;
