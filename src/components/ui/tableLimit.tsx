import React from 'react';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

// Definisikan tipe untuk props
interface TableLimitProps {
    handleLimitChange: (value: string) => void; // Fungsi dengan parameter string
    defaultValue?: string; // Opsional, defaultValue adalah string
}

const TableLimit: React.FC<TableLimitProps> = ({ handleLimitChange, defaultValue = "10" }) => {
    return (
        <Select onValueChange={handleLimitChange} defaultValue={defaultValue}>
            <SelectTrigger className="w-[60px] px-2 gap-2">
                <SelectValue placeholder={defaultValue} />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="20">20</SelectItem>
                    <SelectItem value="30">30</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    );
};

export default TableLimit;
