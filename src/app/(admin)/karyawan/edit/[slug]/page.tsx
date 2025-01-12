"use client";

import { putSubmitEmployee, useGetEmployeeOne } from "@/components/parts/admin/karyawan/api";
import { employeeSchema } from "@/components/parts/admin/karyawan/validation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import LoadingForm from "@/components/ui/LoadingForm";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

// type Role = "cashier" | "waiter";

type FormValues = z.infer<typeof employeeSchema>;

const EditEmployeePage: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(employeeSchema),
  });

    // GET ONE SLUG
    const { slug } = useParams();
    const { data: dataUser } = useGetEmployeeOne(slug as string);

    useEffect(() => {
        if (dataUser?.data) {
            const timer = setTimeout(() => {
                setValue("name", dataUser?.data?.name ?? '');
                setValue("phone", dataUser?.data?.phone ?? '');
                setValue("address", dataUser?.data?.address ?? '');
                setValue("pin", dataUser?.data?.pin ?? '');
                setValue("role", dataUser?.data?.role ?? '');
                // 
            }, 100);

            return () => clearTimeout(timer); // Clean up the timeout on component unmount or data change
        }
    }, [dataUser, setValue]);

    // GET ONE SLUG

  // API CREATE
  const { handlePostSubmit } = putSubmitEmployee(slug as string);
  const onSubmit: SubmitHandler<FormValues> = (data) => {
    handlePostSubmit(data, setLoading);
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
            <Controller
              name="role"
              control={control}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Peran" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cashier">Kasir</SelectItem>
                    <SelectItem value="waiter">Pelayan</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
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
              {...register("phone")}
            />
            {errors.phone && (
              <span className="text-sm text-red-500">
                {errors.phone.message}
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
          <Button
            type="submit"
            variant={"default"}
            className="px-2 w-[90px]"
            disabled={loading}
          >
            {loading ? <LoadingForm /> : "Simpan"}
          </Button>
        </div>
      </form>
    </>
  );
};

export default EditEmployeePage;
