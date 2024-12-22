import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";

interface SelectItem {
  id: string;
  name: string;
}

interface InputProps {
  disabled?: boolean;
  typeInput?: string;
  placeholder?: string;
  label?: string;
  value?: any;
  name?: string;
  items?: SelectItem[];
  valueInput?: string;
  onChangeInputSearch?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChange?: (value: string) => void;
}

const SelectComponent = ({
  disabled = false,
  typeInput,
  placeholder,
  label,
  items = [],
  value,
  onChange,
  valueInput,
  onChangeInputSearch,
}: InputProps) => {
  const [searchTerm, setSearchTerm] = useState<string>(valueInput || "");

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    if (onChangeInputSearch) onChangeInputSearch(e);
  };

  const handleSelectChange = (value: string) => {
    console.log("Selected value:", value); // Debug log
    if (onChange) onChange(value);
  };

  if (typeInput === "selectSearch")
    return (
      <Select
        disabled={disabled}
        value={value}
        onValueChange={handleSelectChange}
      >
        <SelectTrigger className="text-xs md:text-sm w-full">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent className="pt-10">
          <div className="px-2 fixed border-b w-full top-0 flex items-center justify-between z-10 bg-white">
            <Search className="text-slate-400" />
            <Input
              placeholder="Search..."
              className="w-full border-0"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
          <SelectGroup>
            <SelectLabel>{label}</SelectLabel>
            {filteredItems.map((item) => (
              <SelectItem key={item.id} value={item.id}>
                {item.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    );

  if (typeInput === "select")
    return (
      <Select value={value} onValueChange={handleSelectChange}>
        <SelectTrigger className="text-xs md:text-sm w-full">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>{label}</SelectLabel>
            {items.map((item) => (
              <SelectItem key={item.id} value={item.id}>
                {item.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    );

  return null;
};

export default SelectComponent;
