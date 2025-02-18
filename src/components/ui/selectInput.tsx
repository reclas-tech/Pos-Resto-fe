/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface SelectProps {
    label?: string;
    options: { label: string; value: string | number }[];
    placeholder: string;
    value?: string | undefined | number | null | any;
    onChange: (value: string | undefined | number | null | any) => void;
    width?: string; // Optional prop to control width (default to 180px)
}

export const SelectInput: React.FC<SelectProps> = ({
    options,
    placeholder,
    value,
    onChange,
    width = "w-[180px",
}) => {
    return (
        <Select onValueChange={onChange} value={value}>
            <SelectTrigger className={`rounded-md bg-white ${width}`}>
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent className="bg-white">
                <SelectGroup>
                    {/* <SelectLabel>{label}</SelectLabel> */}
                    <SelectItem className="cursor-pointer" value="all">
                        Pilih Diskon
                    </SelectItem>
                    {options?.map((option) => (
                        <SelectItem className="cursor-pointer" key={option.value} value={String(option.value)}>
                            {option.label} %
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
};
