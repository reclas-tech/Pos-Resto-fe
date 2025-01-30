"use client";

import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { DarkModeComponents } from "@/components/ui/darkModeButton";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
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
import { axiosInstance } from "@/utils/axios";
import AuthGuardEmployee from "@/hooks/authGuardEmployee";
import { useGetProfile } from "@/components/parts/cashier/profile/api";
import Link from "next/link";
import useSWR from "swr";
import useAxiosPrivateInstance from "@/hooks/useAxiosPrivateInstance";
import { useReactToPrint } from "react-to-print";
import { useRef } from "react";
import CloseCashierReceipt from "@/components/ui/struk/CloseCahierReceipt";
import HandleCloseCashier from "@/components/ui/modal/HandleCloseCashier";
import { useInputRp } from "@/hooks/useRupiah";
import { ChevronDown } from "lucide-react";
import { DropdownMenuLabel } from "@radix-ui/react-dropdown-menu";

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
  const pathname = usePathname();
  const [isValidationModal, setIsValidationModal] = useState(false);
  const [isValidationMoneyModal, setIsValidationMoneyModal] = useState(false);
  const [isValidationSuccessModal, setIsValidationSuccessModal] =
    useState(false);
  const [loading, setLoading] = useState(false);
  const [currentDate, setCurrentDate] = useState<string>("");
  const [currentTime, setCurrentTime] = useState<string>("");
  const access_token = Cookies.get("access_token");
  const axiosPrivate = useAxiosPrivateInstance();
  const role = Cookies.get("role");

  // Update date and time
  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();

      // Format date
      const dateFormatter = new Intl.DateTimeFormat("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });

      // Format time
      const timeFormatter = new Intl.DateTimeFormat("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      });

      setCurrentDate(dateFormatter.format(now));
      setCurrentTime(timeFormatter.format(now) + " WIB");
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);
    return () => clearInterval(interval);
  }, []);

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

  const handleLogoutWaiter = () => {
    setTimeout(() => {
      Cookies.remove("access_token");
      Cookies.remove("refresh_token");
      Cookies.remove("role");
      Cookies.remove("name");
      router.push("/login-waiters");
      showAlert2("success", "Berhasil Logout.");
    }, 10);
  };

  // Hook form dengan react-hook-form
  const {
    watch,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<CloseCashierFormData>({
    resolver: zodResolver(closeCashierFormDataSchema),
    defaultValues: {
      cash: 0, // Nilai awal untuk "cash"
    },
  });

  /* eslint-disable */
  const onSubmit: SubmitHandler<CloseCashierFormData> = async (data) => {
    setLoading(true);
    try {
      // Get API
      const response = await axiosInstance.post("/cashier/close", data, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });

      // Cookie Send
      const result = response.data;
      if (result.statusCode === 200) {
        console.log("Kasir Close Submitted:", data);
        // reset();
        Cookies.set("id", result?.data?.id, {
          expires: 7,
        });
        Cookies.set("cash_on_hand_start", result?.data?.cash_on_hand_start, {
          expires: 1,
        });
        Cookies.set("started_at", result?.data?.started_at, {
          expires: 7,
        });
        Cookies.set("cash_on_hand_end", result?.data?.cash_on_hand_end, {
          expires: 1,
        });
        Cookies.set("ended_at", result?.data?.ended_at, {
          expires: 7,
        });
        Cookies.set("created_at", result?.data?.created_at, {
          expires: 7,
        });
        Cookies.set("updated_at", result?.data?.updated_at, {
          expires: 7,
        });
        Cookies.set("deleted_at", result?.data?.deleted_at, {
          expires: 7,
        });
        Cookies.set("cashier_id", result?.data?.cashier_id, {
          expires: 7,
        });
      }

      // Response API
      if (response.data.statusCode === 200) {
        console.log("Cash On Hand Close Cashier: ", response.data);
        setIsValidationSuccessModal(true);
        reset();
      } else {
        console.log(data);
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

  const id = Cookies.get("id");

  // GET CLOSE CASHIER RECEIPT
  const { data: dataReceipt } = useSWR(
    id ? `/cashier/close/invoice/${id}` : null, 
    () =>
      axiosPrivate
        .get(`/cashier/close/invoice/${id}`, {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        })
        .then((res) => res.data)
  );

  // Handle Print
  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({ contentRef });

  const handlePrint = () => {
    reactToPrintFn();
  };

  const { data: dataProfile } = useGetProfile();

  return (
    <>
      {role === 'waiter' && (
        <>
          <div className=" flex justify-between items-center px-2 py-4 border border-b">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-10">
                <Image
                  src={logo}
                  alt="logo"
                  className="w-full h-full"
                  unoptimized
                />
              </div>
              <div>
                <p className="font-semibold text-sm">Point of Sale</p>
                <p className="font-normal text-xs text-[#828487]">
                  Warung Aceh Garuda
                </p>
              </div>
            </div>
            <div className="flex gap-4 justify-center items-center">
              <Link
                href="/pos"
                className={`flex gap-2 items-center ${pathname === "/pos" ? "text-primaryColor" : "text-[#737791]"
                  }`}
              >
                {pathname === "/pos" ? (
                  <MejaSVG strokeColor="#FEA026" />
                ) : (
                  <MejaSVG strokeColor="#737791" />
                )}
                <span>Pesanan</span>
              </Link>

              <Link
                href="/riwayat-transaksi"
                className={`flex gap-2 items-center ${pathname === "/riwayat-transaksi" ? "text-primaryColor" : "text-[#737791]"
                  }`}
              >
                {pathname === "/riwayat-transaksi" ? (
                  <RiwayatSVG strokeColor="#FEA026" />
                ) : (
                  <RiwayatSVG strokeColor="#737791" />
                )}
                <div className="flex flex-col justify-center">
                  Riwayat
                </div>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <div>
                  <p className="text-sm">
                    {loading ? "Memuat..." : dataProfile?.data?.name}
                  </p>
                  <p className="text-xs text-[#737791]">
                    {loading ? "Memuat..." : dataProfile?.data?.role}
                  </p>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <ChevronDown className="text-[#737791] w-5 h-5" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-white border border-gray-300 shadow-lg rounded-md">
                    <DropdownMenuLabel className="text-xs text-[#737791] hover:text-red-600">
                      <button onClick={() => handleLogoutWaiter()}>Keluar</button>
                    </DropdownMenuLabel>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
          <>{children}</>
        </>
      )}

      {role === 'cashier' && (
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
              <Link
                href="/pilih-meja"
                className={`flex gap-2 items-center ${pathname === "/pilih-meja" ? "text-primaryColor" : "text-[#737791]"
                  }`}
              >
                {pathname === "/pilih-meja" ? (
                  <MejaSVG strokeColor="#FEA026" />
                ) : (
                  <MejaSVG strokeColor="#737791" />
                )}
                <span>Meja</span>
              </Link>

              <Link
                href="/riwayat-transaksi"
                className={`flex gap-2 items-center ${pathname === "/riwayat-transaksi" ? "text-primaryColor" : "text-[#737791]"
                  }`}
              >
                {pathname === "/riwayat-transaksi" ? (
                  <RiwayatSVG strokeColor="#FEA026" />
                ) : (
                  <RiwayatSVG strokeColor="#737791" />
                )}
                <div className="flex flex-col justify-center">
                  Riwayat
                </div>
              </Link>
            </div>

            <div className="flex gap-4 justify-between">
              <div className="flex flex-col justify-center">
                {currentTime} {currentDate}
              </div>
              <div className="flex gap-2">
                <div className="flex flex-col justify-center">
                  <div className="text-black font-bold">{dataProfile?.data?.name}</div>
                  <div className="text-black/50 text-xs">{dataProfile?.data?.role}</div>
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
                          <span>{loading ? <LoadingSVG /> : "Keluar"}</span>
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
                <HandleCloseCashier
                  isOpen={isValidationMoneyModal}
                  onClose={() => setIsValidationMoneyModal(false)}
                  onSubmit={handleSubmit(onSubmit)}
                  showKeluarButton={true}
                  showSubmitButton={true}
                  title=""
                  classNameDialogHeader=""
                  classNameDialogFooter="flex md:justify-center mt-4"
                  classNameButton="w-full rounded-lg text-sm"
                  keluarButtonText="Batalkan"
                  submitButtonText="Simpan"
                >
                  <div className="flex justify-start gap-8 text-sm">
                    <div className="text-secondaryColor">
                      <MoneyCloseCashierSVG />
                    </div>
                    <div className="font-bold flex justify-center items-center text-xl">
                      Uang Tunai
                    </div>
                  </div>
                  <div className="space-y-4" id="paymentForm">
                    <div className="space-y-1">
                      <Label className="text-sm" htmlFor="name">
                        Masukkan Uang Tunai di Tangan
                      </Label>
                      <Input
                        type="text"
                        id="cash"
                        placeholder="Rp."
                        value={useInputRp(watch("cash"))}
                        onChange={(e) => {
                          const numericValue =
                            parseInt(e.target.value.replace(/[^0-9]/g, ""), 10) || 0;
                          setValue("cash", numericValue);
                        }}
                      />
                      {errors.cash && (
                        <span className="text-sm text-red-500">{errors.cash.message}</span>
                      )}
                    </div>
                  </div>
                </HandleCloseCashier>
              </div>
            </div>
          </nav>
          {/* Handle Modal Validation */}
          <ValidationModal
            isOpen={isValidationSuccessModal}
            onClose={() => {
              setIsValidationSuccessModal(false);
              handleLogout();
            }}
            onSubmitTrigger={async () => {
              try {
                await handlePrint();
              } catch (error) {
                console.error("Proses print dibatalkan atau gagal:", error);
              } finally {
                setIsValidationSuccessModal(false);
                await handleLogout();
                router.push("/login-kasir");
              }
            }}
            title=""
            showKeluarButton={true}
            showSubmitButton={true}
            classNameDialogHeader=""
            classNameDialogFooter="flex md:justify-center"
            classNameButton="w-full rounded-lg text-sm"
            classNameDialogTitle=""
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
          <>{children}</>
          {/* Struk */}
          <div className="hidden">
            <CloseCashierReceipt ref={contentRef} data={dataReceipt} />
          </div>
          <DarkModeComponents className="hidden" />
        </AuthGuardEmployee>
      )}
    </>
  );
}
