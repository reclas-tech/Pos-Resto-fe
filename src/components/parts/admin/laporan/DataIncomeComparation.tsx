/* eslint-disable @typescript-eslint/no-explicit-any */

"use client"
import { useState } from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from 'recharts';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useGetIncomeComparation } from './api';

const DataIncomeComparation = () => {
    const [selectedYear, setSelectedYear] = useState<string>("2024");
    const { data, isLoading } = useGetIncomeComparation(Number(selectedYear));

    // Transform API data for Recharts
    const transformedData = data?.data.map(monthData => {
        const monthlyData: any = {
            name: monthData.month,
        };

        // Extract values for each kitchen
        monthData.income.forEach(kitchenData => {
            const kitchenName = Object.keys(kitchenData)[0];
            const value = Object.values(kitchenData)[0];
            // Convert kitchen names to camelCase for consistency
            const formattedName = kitchenName.toLowerCase().replace(/\s+/g, '');
            monthlyData[formattedName] = value;
        });

        return monthlyData;
    }) || [];

    const handleYearChange = (value: string) => {
        setSelectedYear(value);
    };

    if (isLoading) {
        return <div className="flex justify-center items-center h-[300px]">Loading...</div>;
    }

    return (
        <div className="p-10 rounded-lg bg-white">
            <div className="flex justify-between mb-8">
                <div className="text-[#05004E] text-lg font-semibold flex items-center">
                    Perbandingan Penjualan Antar Dapur
                </div>
                <div className="w-fit">
                    <Select onValueChange={handleYearChange} defaultValue={selectedYear}>
                        <SelectTrigger className="w-fit px-2 gap-2 border-secondaryColor">
                            <SelectValue placeholder={selectedYear} className="text-[#9E9E9E]" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="2023">2023</SelectItem>
                                <SelectItem value="2024">2024</SelectItem>
                                <SelectItem value="2025">2025</SelectItem>
                                <SelectItem value="2026">2026</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <div className="w-full h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        width={500}
                        height={300}
                        data={transformedData}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                        barSize={20}
                        barCategoryGap="20%"
                        barGap={5}
                    >
                        <XAxis
                            dataKey="name"
                            scale="point"
                            padding={{ left: 50, right: 10 }}
                        />
                        <YAxis />
                        <Tooltip />
                        <Legend
                            wrapperStyle={{
                                paddingTop: 20,
                                marginLeft: 40,
                            }}
                            layout="horizontal"
                            verticalAlign="bottom"
                            align="center"
                        />
                        <CartesianGrid strokeDasharray="3 3" />
                        <Bar
                            dataKey="dapur1"
                            name="Dapur 1"
                            fill="#FEA026"
                            background={{ fill: "#eee" }}
                            radius={[2, 2, 0, 0]}
                        />
                        <Bar
                            dataKey="dapur2"
                            name="Dapur 2"
                            fill="#EE1616"
                            background={{ fill: "#eee" }}
                            radius={[2, 2, 0, 0]}
                        />
                        <Bar
                            dataKey="dapur3"
                            name="Dapur 3"
                            fill="#114F44"
                            background={{ fill: "#eee" }}
                            radius={[2, 2, 0, 0]}
                        />
                        <Bar
                            dataKey="dapur4"
                            name="Dapur 4"
                            fill="#2E8BC0"
                            background={{ fill: "#eee" }}
                            radius={[2, 2, 0, 0]}
                        />
                        <Bar
                            dataKey="dapur5"
                            name="Dapur 5"
                            fill="#8B4513"
                            background={{ fill: "#eee" }}
                            radius={[2, 2, 0, 0]}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default DataIncomeComparation;