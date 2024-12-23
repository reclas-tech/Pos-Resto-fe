"use client";

import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { employeeSchema } from "@/validations";

type Role = "Kasir" | "Admin";

type FormValues = z.infer<typeof employeeSchema>;

const CreateEmployeePage: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(employeeSchema),
    defaultValues: {
      name: "",
      role: undefined,
      pin: "",
      no_hp: "",
      address: "",
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log("Form data:", data);
    reset();
  };

  const handleRoleChange = (value: Role) => {
    setValue("role", value);
  };
  return (
    <>
      <form className="" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex gap-4 justify-between mb-4">
          <div className="flex flex-col w-full">
            <Label htmlFor="name">Nama Karyawan</Label>
            <Input
              type="text"
              id="name"
              placeholder="Nama Karyawan"
              {...register("name")}
            />
            {errors.name && (
              <span className="text-sm text-red-500">
                {errors.name.message}
              </span>
            )}
          </div>
          <div className="flex flex-col w-full">
            <Label htmlFor="role">Peran</Label>
            <Select onValueChange={handleRoleChange}>
              <SelectTrigger className="w-full text-neutral-500">
                <SelectValue placeholder="Pilih Peran" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Kasir">Kasir</SelectItem>
                <SelectItem value="Admin">Admin</SelectItem>
              </SelectContent>
            </Select>
            {errors.role && (
              <span className="text-sm text-red-500">
                {errors.role.message}
              </span>
            )}
          </div>
        </div>

        <div className="flex gap-4 justify-between mb-4">
          <div className="flex flex-col w-full">
            <Label htmlFor="pin">Pin</Label>
            <Input
              type="text"
              id="pin"
              placeholder="Pin"
              {...register("pin")}
            />
            {errors.pin && (
              <span className="text-sm text-red-500">{errors.pin.message}</span>
            )}
          </div>
          <div className="flex flex-col w-full">
            <Label htmlFor="no_hp">Nomor Telepon</Label>
            <Input
              type="text"
              id="no_hp"
              placeholder="Nomor Telepon"
              {...register("no_hp")}
            />
            {errors.no_hp && (
              <span className="text-sm text-red-500">
                {errors.no_hp.message}
              </span>
            )}
          </div>
        </div>

        <div className="flex gap-4 justify-between mb-4">
          <div className="flex flex-col w-1/2 pr-[0.5%]">
            <Label htmlFor="stocks">Alamat</Label>
            <textarea
              id=""
              className="flex h-40 w-full rounded-md border border-neutral-200 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primaryColor disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-800 dark:placeholder:text-neutral-400 dark:focus-visible:ring-neutral-300"
              placeholder="Masukkan Alamat"
              {...register("address")}
            ></textarea>
            {errors.address && (
              <span className="text-sm text-red-500">
                {errors.address.message}
              </span>
            )}
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Link href={"/karyawan"}>
            <Button variant={"outline"}>Batal</Button>
          </Link>
          <Button type="submit" variant={"default"}>
            Tambah
          </Button>
        </div>
      </form>
    </>
  );
};

export default CreateEmployeePage;
