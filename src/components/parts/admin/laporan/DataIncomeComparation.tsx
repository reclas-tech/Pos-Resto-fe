/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";
import { useState } from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useGetIncomeComparation } from "./api";

// Helper function to convert strings to Title Case
const toTitleCase = (str: string) => {
    return str
        .toLowerCase()
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
};

// Helper function to format numbers in Indonesian style
const formatToIDR = (value: number) => {
    return new Intl.NumberFormat("id-ID", {
        style: "decimal",
        minimumFractionDigits: 0,
    }).format(value);
};

const DataIncomeComparation = () => {
    const [selectedYear, setSelectedYear] = useState<string>("2024");

    // Fetch Api
    const { data, isLoading } = useGetIncomeComparation(Number(selectedYear));

    // Transform API data for Recharts
    const transformedData =
        data?.data?.map((monthData: any) => {
            const monthlyData: any = {
                name: monthData.month,
            };

            // Extract income data for each kitchen
            monthData.income.forEach((kitchenData: any) => {
                const kitchenName = Object.keys(kitchenData)[0]; // Get the kitchen name
                const value = Object.values(kitchenData)[0]; // Get the value for the kitchen
                const formattedName = kitchenName.toLowerCase().replace(/\s+/g, ""); // Convert to camelCase
                monthlyData[formattedName] = value; // Add it to the monthly data object
            });

            return monthlyData;
        }) || [];

    const handleYearChange = (value: string) => {
        setSelectedYear(value);
    };

    // Define a color palette for the bars
    const colorPalette = [
        "#FEA026", "#EE1616", "#114F44", "#2E8BC0", "#8B4513",
        "#FF5733", "#33FF57", "#33C1FF", "#C70039", "#900C3F",
        "#581845", "#FFC300", "#DAF7A6", "#8E44AD", "#2ECC71",
    ];

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
                        <XAxis dataKey="name" scale="point" padding={{ left: 50, right: 10 }} />
                        {/* <YAxis
                            tickFormatter={(value) => formatToIDR(value)} // Format Y-axis values
                        /> */}
                        <YAxis />
                        <Tooltip
                            formatter={(value: number) => formatToIDR(value)}
                        />
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
                        {Object.keys(transformedData[0] || {})
                            .filter((key) => key !== "name")
                            .map((kitchenKey, index) => {
                                // Extract kitchen name and format it to Title Case
                                const kitchenName = toTitleCase(kitchenKey.replace(/([A-Z])/g, " $1"));
                                return (
                                    <Bar
                                        key={kitchenKey}
                                        dataKey={kitchenKey}
                                        name={kitchenName}
                                        fill={colorPalette[index % colorPalette.length]} // Assign a unique color
                                        background={{ fill: "#eee" }}
                                        radius={[2, 2, 0, 0]}
                                    />
                                );
                            })}
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default DataIncomeComparation;
