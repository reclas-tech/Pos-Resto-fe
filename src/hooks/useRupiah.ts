import { useState } from "react";

export const useRupiah = () => {
  const [value, setValue] = useState<string>("");

  const formatRupiah = (value: string): string => {
    const numericValue = value.replace(/\D/g, "");
    if (!numericValue) return "";
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(Number(numericValue));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setValue(formatRupiah(inputValue));
  };

  return { value, onChange: handleChange, setValue };
};

export const useInputRp = (value: number | string) => {
  if (!value) return "Rp 0";
  const number = typeof value === "string" ? parseInt(value, 10) : value;
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(number).replace(/,00$/, "");
};


export const formatRupiah = (value: string): string => {
  const numericValue = value.replace(/\D/g, "");
  if (!numericValue) return "";
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(Number(numericValue));
};