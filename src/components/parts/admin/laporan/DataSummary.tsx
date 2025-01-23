"use client"

import React, { useState } from 'react';
import {
    AverageIncomeSVG,
    ProductsSoldSVG,
    TotalIncomeSVG,
    TotalTransactionsSVG,
} from "@/constants/svgIcons";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { useGetKitchen, useGetSummary } from './api';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';

export default function DataSummary() {
    const [kitchen, setKitchen] = React.useState('');
    const [startDateFilter, setStartDateFilter] = useState<Date>();
    const [endDateFilter, setEndDateFilter] = useState<Date>();

    const { data: dataSummary, isLoading, error } = useGetSummary(
        kitchen,
        startDateFilter?.toISOString() || "",
        endDateFilter?.toISOString() || ""
    );

    const { data: dataKitchen } = useGetKitchen(); // Pastikan untuk mendapatkan isLoading dan error dari hook

    const handleKitchenChange = (value: string) => {
        setKitchen(value);
    };

    console.log(dataKitchen)

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading data</div>;

    return (
        <section>
            <div className="flex justify-start gap-2 w-full mb-4">
                <div className="w-fit">
                    <Select value={kitchen} onValueChange={handleKitchenChange}>
                        <SelectTrigger className="w-[130px] px-2 gap-2 dark:text-white">
                            <SelectValue
                                placeholder="Pilih Dapur"
                                className="text-[#9E9E9E]"
                            />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="Semua">Semua</SelectItem>
                                {Array.isArray(dataKitchen?.data) && dataKitchen?.data?.length > 0 ? (
                                    dataKitchen?.data?.map((dapur: {id: string, name: string}) => (
                                        <SelectItem key={dapur.id} value={dapur.id}>
                                            {dapur.name}
                                        </SelectItem>
                                    ))
                                ) : (
                                    <SelectItem value="no-data" disabled>
                                        Tidak ada data dapur
                                    </SelectItem>
                                )}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>

                <div className="w-fit justify-between flex gap-2 text-sm">
                    <div className="fit">
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant={"outline"}
                                    className={cn("w-full justify-between items-center text-left font-normal border-[#E4E4E7]", !startDateFilter && "text-muted-foreground")}
                                >
                                    <span>{startDateFilter ? format(startDateFilter, "dd-MM-yyyy") : "Tanggal Awal"}</span>
                                    <CalendarIcon className="ml-2 text-secondaryColor dark:text-white" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                                <Calendar mode="single" selected={startDateFilter} onSelect={setStartDateFilter} initialFocus />
                            </PopoverContent>
                        </Popover>
                    </div>
                    <div className="fit items-center flex">to</div>
                    <div className="fit">
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant={"outline"}
                                    className={cn("w-full justify-between items-center text-left font-normal border-[#E4E4E7]", !endDateFilter && "text-muted-foreground")}
                                >
                                    <span>{endDateFilter ? format(endDateFilter, "dd-MM-yyyy") : "Tanggal Akhir"}</span>
                                    <CalendarIcon className="ml-2 text-secondaryColor dark:text-white" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                                <Calendar mode="single" selected={endDateFilter} onSelect={setEndDateFilter} initialFocus />
                            </PopoverContent>
                        </Popover>
                    </div>
                </div>
            </div>

            <div className="flex justify-between gap-2">
                <div className="bg-white p-5 flex gap-4 shadow-lg rounded-lg border w-full">
                    <button className="p-2 rounded-full bg-[#114F44]/10 flex items-center justify-center w-12 h-12">
                        <TotalIncomeSVG />
                    </button>
                    <div className="justify-start text-start">
                        <div className="text-black text-xm font-semibold">
                            Rp. {dataSummary?.data.income.toLocaleString()}
                        </div>
                        <div className="text-[#030229] text-xs">Total Pendapatan</div>
                    </div>
                </div>
                <div className="bg-white p-5 flex gap-4 shadow-lg rounded-lg border w-full">
                    <button className="p-2 rounded-full bg-[#FEA026]/10 flex items-center justify-center w-12 h-12">
                        <TotalTransactionsSVG />
                    </button>
                    <div className="justify-start text-start">
                        <div className="text-black text-xm font-semibold">
                            {dataSummary?.data.transaction.toLocaleString()}
                        </div>
                        <div className="text-[#030229] text-xs">Total Transaksi</div>
                    </div>
                </div>
                <div className="bg-white p-5 flex gap-4 shadow-lg rounded-lg border w-full">
                    <button className="p-2 rounded-full bg-[#5B81FF]/10 flex items-center justify-center w-12 h-12">
                        <AverageIncomeSVG />
                    </button>
                    <div className="justify-start text-start">
                        <div className="text-black text-xm font-semibold">
                            Rp. {dataSummary?.data.mean.toLocaleString()}
                        </div>
                        <div className="text-[#030229] text-xs">Rata Pendapatan</div>
                    </div>
                </div>
                <div className="bg-white p-5 flex gap-4 shadow-lg rounded-lg border w-full">
                    <button className="p-2 rounded-full bg-[#FF8F6B]/10 flex items-center justify-center w-12 h-12">
                        <ProductsSoldSVG />
                    </button>
                    <div className="justify-start text-start">
                        <div className="text-black text-xm font-semibold">
                            {dataSummary?.data.product.toLocaleString()}
                        </div>
                        <div className="text-[#030229] text-xs">Produk Terjual</div>
                    </div>
                </div>
            </div>
        </section>
    );
}