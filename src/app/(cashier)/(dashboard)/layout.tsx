"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { DarkModeComponents } from "@/components/ui/darkModeButton";
import Image from "next/image";
import { useRouter } from "next/navigation";
import logo from "@assets/splashScreen.png";
import {
  CloseSVG,
  DropDownSVG,
  KeluarIcon,
  LoadingSVG,
  MejaSVG,
  MoneyCloseCashierSVG,
  RiwayatSVG,
  SuccessSVG,
  WarningSVG,
} from "@/constants/svgIcons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import ValidationModal from "@/components/ui/modal/validation";
import Cookies from "js-cookie";
import { showAlert2 } from "@/lib/sweetalert2";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useInputRp } from "@/hooks/useRupiah";
import { axiosInstance } from "@/utils/axios";
import AuthGuardEmployee from "@/hooks/authGuardEmployee";

// Handle validation input
const closeCashierFormDataSchema = z.object({
  cash: z.number().min(1, { message: "Cash On Hand Tidak Boleh Kosong" }),
});
type CloseCashierFormData = z.infer<typeof closeCashierFormDataSchema>;

export default function RootLayoutDashboardCashier({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const [isValidationModal, setIsValidationModal] = useState(false);
  const [isValidationMoneyModal, setIsValidationMoneyModal] = useState(false);
  const [isValidationSuccessModal, setIsValidationSuccessModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const access_token = Cookies.get("access_token");
  const refresh_token = Cookies.get("refresh_token");
  const role = Cookies.get("role");

  // cek berdasarkan cookies
  const handleLogout = () => {
    setTimeout(() => {
      Cookies.remove("access_token");
      Cookies.remove("refresh_token");
      Cookies.remove("role");
      router.push("/login-kasir");
      showAlert2("success", "Berhasil Logout.");
    }, 10);
  };

  // Hook form dengan react-hook-form
  const {
    watch,
    handleSubmit,
    setValue,
    register: register,
    formState: { errors },
  } = useForm<CloseCashierFormData>({
    resolver: zodResolver(closeCashierFormDataSchema),
  });

  /* eslint-disable */
  const onSubmit: SubmitHandler<CloseCashierFormData> = async (data) => {
    console.log(data);
    setLoading(true);
    console.log(access_token)
    console.log(refresh_token)
    console.log(role)
    try {
      // Get API 
      const response = await axiosInstance.post("/cashier/close", data, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });

      // Cookie removed
      const result = response.data;
      if (result.statusCode === 200) {
        console.log("Form submitted:", data);
        setTimeout(() => {
          Cookies.remove("access_token");
          Cookies.remove("refresh_token");
          Cookies.remove("role");
        }, 10);
      }

      // Response API
      if (response.data.statusCode === 200) {
        console.log("Cash On Hand Submitted: ", response.data);
        setIsValidationSuccessModal(true);
        // showAlert2("success", "Cash on Hand berhasil!");
        // reset();
        // console.log("testtt");
      } else {
        console.log(data)
        showAlert2("error", response.data.message || "Terjadi kesalahan!");
      }

    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Terjadi kesalahan saat membuka cash!";
      showAlert2("error", errorMessage);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AuthGuardEmployee>
        <nav
          className={cn(
            "flex justify-between w-full pt-4 pb-4 pl-4 pr-4 text-sm border border-b",
            "h-full"
          )}
        >
          <div className="flex gap-4">
            <Image
              unoptimized
              src={logo}
              alt="logo"
              className="w-[45px] h-[52px]"
            />
            <div className="flex flex-col justify-center font-bold">
              <div className="text-black">Point Of Sale</div>
              <div className="text-[#828487]">Waroeng Aceh Garuda</div>
            </div>
          </div>

          <div className="flex gap-4 justify-center items-center">
            <div className="flex gap-2 items-center text-primaryColor">
              <MejaSVG />
              <span>Meja</span>
            </div>
            <div className="flex gap-2">
              <RiwayatSVG />
              <div className="flex flex-col justify-center text-[#737791]">
                Riwayat
              </div>
            </div>
          </div>

          <div className="flex gap-4 justify-between">
            <div className="flex flex-col justify-center">
              10:53:00 26/02/2023
            </div>
            <div className="flex gap-2">
              <div className="flex flex-col justify-center">
                <div className="text-black font-bold">Amalia Putri</div>
                <div className="text-black/50 text-xs">Kasir</div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex flex-col justify-center">
                    <DropDownSVG />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="transition-all duration-300 ease-in-out opacity-1 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 bg-white border border-gray-300 shadow-2xl rounded-md w-[150px]">
                  <div className="p-2 text-sm space-y-1">
                    <div className="w-full space-y-2">
                      <Button
                        variant={"outline"}
                        type="button"
                        onClick={() => setIsValidationModal(true)}
                        className="rounded-xl w-full justify-start text-sm border-none"
                        disabled={loading}
                      >
                        <span>
                          <KeluarIcon className="text-primaryColor" />
                        </span>
                        <span>Tutup Kasir</span>
                      </Button>
                      <Button
                        variant={"outline"}
                        onClick={handleLogout}
                        className="rounded-xl w-full justify-start text-sm border border-[#FF0000]"
                        disabled={loading}
                      >
                        <span>
                          <CloseSVG />
                        </span>
                        <span>{loading ? <LoadingSVG /> : "Keluar"}
                        </span>
                      </Button>
                    </div>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Handle Modal Validation */}
              <ValidationModal
                isOpen={isValidationModal}
                onClose={() => {
                  setIsValidationModal(false);
                }}
                onSubmitTrigger={() => {
                  setIsValidationMoneyModal(true);
                }}
                title=""
                classNameDialogFooter="flex md:justify-center"
                showKeluarButton={true}
                showSubmitButton={true}
                classNameDialogHeader=""
                classNameButton="w-full rounded-lg text-sm"
                classNameDialogTitle=""
                closeButton={false}
                keluarButtonText="Batalkan"
                submitButtonText="Ya"
              >
                <div className="font-semibold text-black dark:text-white m-auto flex justify-center">
                  <WarningSVG />
                </div>
                <div className="text-lg font-bold text-center mt-4 p-2">
                  Yakin untuk tutup kasir ?
                </div>
              </ValidationModal>
              {/* Handle Modal Validation */}

              {/* Handle Modal Uang Tunai */}
              <ValidationModal
                isOpen={isValidationMoneyModal}
                onClose={() => {
                  setIsValidationMoneyModal(false);
                }}
                onSubmitTrigger={() => {
                  setIsValidationSuccessModal(true);
                }}
                title=""
                classNameDialogFooter="flex md:justify-center mt-4"
                showKeluarButton={true}
                showSubmitButton={true}
                classNameDialogHeader=""
                classNameButton="w-full rounded-lg text-sm"
                classNameDialogTitle=""
                closeButton={false}
                keluarButtonText="Batalkan"
                submitButtonText="Simpan"
              >
                <div className="flex justify-start gap-8 text-sm">
                  <div className="text-secondaryColor"><MoneyCloseCashierSVG /></div>
                  <div className="font-bold flex justify-center items-center text-xl">Uang Tunai</div>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}
                  className="space-y-4" id="paymentForm">
                  <div className="space-y-1">
                    <Label className="text-sm" htmlFor="name">
                      Masukkan Uang Tunai di Tangan
                    </Label>
                    <Input
                      type="text"
                      id="price"
                      placeholder="Rp."
                      value={useInputRp(watch("cash"))}
                      {...register("cash")}
                      onChange={(e) => {
                        const numericValue =
                          parseInt(e.target.value.replace(/[^0-9]/g, ""), 10) || 0;
                        setValue("cash", numericValue);
                      }}
                    />
                    {errors.cash && (
                      <span className="text-sm text-red-500">
                        {errors.cash.message}
                      </span>
                    )}
                  </div>
                </form>
              </ValidationModal>
              {/* Handle Modal Uang Tunai */}

              {/* Handle Modal Validation */}
              <ValidationModal
                isOpen={isValidationSuccessModal}
                onClose={() => {
                  setIsValidationSuccessModal(false);
                  handleLogout()
                }}
                onSubmitTrigger={() => {
                  // handleLogout()
                  // router.push("/login-kasir");
                }}
                title=""
                classNameDialogFooter="flex md:justify-center"
                showKeluarButton={true}
                showSubmitButton={true}
                classNameDialogHeader=""
                classNameButton="w-full rounded-lg text-sm"
                classNameDialogTitle=""
                closeButton={false}
                keluarButtonText="Tutup"
                submitButtonText="Print"
              >
                <div className="font-semibold text-black dark:text-white m-auto flex justify-center">
                  <SuccessSVG />
                </div>
                <div className="text-lg font-bold text-center mt-4">
                  Kasir telah ditutup
                </div>
              </ValidationModal>
              {/* Handle Modal Validation */}
            </div>
          </div>
        </nav >
        <>{children}</>
        <DarkModeComponents className="hidden" />
      </AuthGuardEmployee>
    </>
  );
}
