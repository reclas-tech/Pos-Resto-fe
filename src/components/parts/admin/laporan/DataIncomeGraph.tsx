"use client"

import { useState } from 'react';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { TotalIncomeGrafikSVG } from '@/constants/svgIcons';
import { useGetIncomeGraph, useGetYears } from './api';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const GrafikPendapatan = () => {
    const [selectedYear, setSelectedYear] = useState('2024');
    const { data } = useGetIncomeGraph(Number(selectedYear));
    const { data: years, isLoading, error } = useGetYears();

    const incomeChart = data?.data.map((item) => ({
        name: item.month,
        pendapatan: Number(item.income),
    })) || [];

    const handleYearChange = (year: string) => {
        setSelectedYear(year);
    };

    return (
        <div className="p-10 rounded-lg bg-white">
            <div className="flex justify-between mb-8">
                <div className="text-[#05004E] text-lg font-semibold flex items-center">
                    Grafik Pendapatan
                </div>
                <div className="w-fit">
                    <Select value={selectedYear} onValueChange={handleYearChange}>
                        <SelectTrigger className="w-fit px-2 gap-2 border-secondaryColor">
                            <SelectValue
                                placeholder={
                                    isLoading
                                        ? "Loading..."
                                        : error
                                            ? "Gagal memuat tahun"
                                            : "Pilih Tahun"
                                }
                                className="text-[#9E9E9E]"
                            />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {isLoading ? (
                                    <SelectItem value="loading" disabled>
                                        Loading...
                                    </SelectItem>
                                ) : error ? (
                                    <SelectItem value="error" disabled>
                                        Gagal memuat data
                                    </SelectItem>
                                ) : (
                                    years?.map((year) => (
                                        <SelectItem key={year} value={year.toString()}>
                                            {year}
                                        </SelectItem>
                                    ))
                                )}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <div className="w-full h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={incomeChart}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        barSize={44}
                    >
                        <XAxis
                            dataKey="name"
                            scale="point"
                            padding={{ left: 40, right: 10 }}
                        />
                        <Tooltip />
                        <CartesianGrid strokeDasharray="3 3" />
                        <Bar
                            dataKey="pendapatan"
                            fill="#FEA026"
                            background={{ fill: "#eee" }}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
            <div className="p-5 flex gap-4 w-fit">
                <button className="p-2 rounded-xl bg-[#FEA026]/10 flex items-center justify-center w-12 h-12">
                    <TotalIncomeGrafikSVG />
                </button>
                <div className="justify-start text-start">
                    <div className="text-black text-xm font-semibold">
                        Pendapatan
                    </div>
                    <div className="text-[#030229] text-xs">Total Pendapatan</div>
                </div>
            </div>
        </div>
    );
};

export default GrafikPendapatan;
