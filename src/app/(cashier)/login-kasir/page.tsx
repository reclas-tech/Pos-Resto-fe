"use client";

import Image from "next/image";
import img from "@assets/bgLoginKasir.png";
import logo from "@assets/splashScreen.png";
import clear from "@assets/clearIcon.png";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import { axiosInstance } from "@/utils/axios";
import { showAlert2 } from "@/lib/sweetalert2";
import Cookies from "js-cookie";
import { LoadingSVG } from "@/constants/svgIcons";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { DarkModeComponents } from "@/components/ui/darkModeButton";
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserIcon } from "@/components/ui/icons/UserIcon";
import { useInputRp } from "@/hooks/useRupiah";
import { useGetProfile } from "@/components/parts/cashier/profile/api";


type PinFormData = z.infer<typeof pinSchema>;
type CashFormData = z.infer<typeof cashSchema>;

const pinSchema = z.object({
  pin: z.string().length(6, "Pin harus 6 digit"),
});

const cashSchema = z.object({
  cash: z.number().min(1, { message: "Cash On Hand Tidak Boleh Kosong" }),
});

const LoginKasirPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isModal, setIsModal] = useState<boolean>(false);
  const [pinValue, setPinValue] = useState<string>("");

  // Remove Akses Token
  // useEffect(() => {
  //   Cookies.remove("access_token");
  //   Cookies.remove("refresh_token");
  //   Cookies.remove("cash_on_hand_start");
  //   Cookies.remove("started_at");
  //   Cookies.remove("cashier_id");
  //   Cookies.remove("id");
  //   Cookies.remove("updated_at");
  //   Cookies.remove("created_at");
  // }, []);

  // Hook form dengan react-hook-form
  const {
    handleSubmit,
    formState: { errors },
    setValue,
    trigger,
    reset,
  } = useForm<PinFormData>({
    resolver: zodResolver(pinSchema),
    defaultValues: {
      pin: "",
    },
  });

  // Hook form dengan react-hook-form
  const {
    handleSubmit: handleCashOnHandSubmit,
    formState: { errors: errorCashOnHand },
    setValue: setValueCashOnHand,
    reset: resetCashOnHand,
    watch: watchCashOnHand
  } = useForm<CashFormData>({
    resolver: zodResolver(cashSchema),
  });

  /* eslint-disable */
  const onSubmit: SubmitHandler<PinFormData> = async (data) => {
    setLoading(true);
    setErrorMessage("");

    try {
      const response = await axiosInstance.post("/auth/employee/login", {
        pin: data.pin,
      });
      const result = response.data;
      if (result.statusCode === 200) {
        console.log("Form submitted:", data);
        setPinValue("");
        Cookies.set("access_token", result?.data?.access_token, {
          expires: 1,
        });
        Cookies.set("refresh_token", result?.data?.refresh_token, {
          expires: 7,
        });
        Cookies.set("role", result?.data?.role, {
          expires: 7,
        });

        // Check Token
        if (result?.data?.role === "waiter") {
          showAlert2("error", "Gagal Login.");
          reset();
          return;
        }

        if (result?.data?.any_active_shift === true) {
          router.push("/pilih-meja");
        } else if (result?.data?.any_active_shift === false) {
          setIsModal(true);
        }
      }
    } catch (error: any) {
      showAlert2("error", "Gagal Login.");

      let errorMessage =
        error.response?.data?.message || "Login gagal. Silakan coba lagi!";
      if (error.response?.data?.statusCode === 400) {
        console.log(error.response.data);
        errorMessage =
          error.response?.data?.data[0].message ||
          "Login gagal. Silakan coba lagi!";
      }
      setErrorMessage(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const onCashSubmit: SubmitHandler<CashFormData> = async (data) => {
    setLoading(true);
    const access_token = Cookies.get("access_token");
    const refresh_token = Cookies.get("refresh_token");
    const role = Cookies.get("role");

    try {
      // Check Token
      if (!access_token || !refresh_token || !role) {
        Cookies.remove("access_token");
        Cookies.remove("refresh_token");
        Cookies.remove("role");
        router.push("/login-kasir");
        return;
      }

      // Get API 
      const response = await axiosInstance.post("/cashier/open", data, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });

      // Cookie Send
      const result = response.data;
      if (result.statusCode === 201) {
        console.log("Form submitted:", data);
        setPinValue("");
        reset();
        setIsModal(true);
        Cookies.set("cash_on_hand_start", result?.data?.cash_on_hand_start, {
          expires: 1,
        });
        Cookies.set("started_at", result?.data?.started_at, {
          expires: 7,
        });
        Cookies.set("cashier_id", result?.data?.cashier_id, {
          expires: 7,
        });
        Cookies.set("id", result?.data?.id, {
          expires: 7,
        });
        Cookies.set("updated_at", result?.data?.updated_at, {
          expires: 7,
        });
        Cookies.set("created_at", result?.data?.created_at, {
          expires: 7,
        });
        setTimeout(() => {
        }, 10);
      }

      // Response API
      if (response.data.statusCode === 201) {
        console.log("Cash On Hand Submitted: ", response.data);
        showAlert2("success", "Cash on Hand berhasil!");
        resetCashOnHand();
        setIsModal(false);
        router.push("/pilih-meja");
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

  const handleButtonClick = (num: number) => {
    if (pinValue.length < 6) {
      const newValue = pinValue + num;
      setPinValue(newValue);
      setValue("pin", newValue);
      trigger("pin");
    }
  };

  const handleDelete = () => {
    const newValue = pinValue.slice(0, -1);
    setPinValue(newValue);
    setValue("pin", newValue);
    trigger("pin");
  };

  const { data: dataProfile } = useGetProfile();

  return (
    <div className="w-full h-screen flex flex-col sm:flex-row">
      <div className="w-full sm:w-1/2 h-1/2 sm:h-full">
        <div className="w-full h-full bg-primaryColor relative flex justify-center items-center overflow-hidden">
          <div className="absolute w-[300px] sm:w-[450px] md:w-[600px] h-[300px] sm:h-[450px] md:h-[600px] bg-gradient-to-br from-5% from-white opacity-20 rounded-full top-[-150px] sm:top-[-225px] md:top-[-300px] right-[-150px] sm:right-[-225px] md:right-[-300px] z-0" />
          <div className="absolute w-[350px] sm:w-[525px] md:w-[700px] h-[350px] sm:h-[525px] md:h-[700px] bg-gradient-to-br from-5% from-white opacity-20 rounded-full bottom-[-125px] sm:bottom-[-187px] md:bottom-[-250px] left-[-175px] sm:left-[-262px] md:left-[-350px] z-0" />
          <div className="space-y-8 sm:space-y-10 md:space-y-14 z-10">
            <div className="space-y-4 sm:space-y-5 md:space-y-6 text-center text-white">
              <p className="text-3xl sm:text-3xl md:text-4xl font-bold leading-8 sm:leading-9 md:leading-10">
                Login Kasir
              </p>
              <p className="text-xl sm:text-xl md:text-2xl leading-6 sm:leading-7 md:leading-8">
                Waroeng Aceh Garuda
              </p>
            </div>
            <div className="bg-white rounded-lg w-[280px] sm:w-[300px] md:w-[320px] h-[380px] sm:h-[405px] md:h-[430px] p-8 sm:space-y-3 md:space-y-4">
              <p className="text-center text-[#334155] text-lg sm:text-lg md:text-xl font-semibold">
                Kode Pin
              </p>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-4 sm:space-y-5 md:space-y-6"
              >
                <div className="flex justify-center space-x-2 relative">
                  {Array.from({ length: 6 }).map((_, index) => (
                    <div
                      key={index}
                      className="w-5 sm:w-5 md:w-6 h-7 sm:h-7 md:h-8 border-b-[3px] bg-[#E2E8F0] border-primaryColor rounded-t-md flex items-center text-[#334155] justify-center"
                    >
                      {pinValue[index] ? "•" : ""}
                    </div>
                  ))}
                  {errors.pin && (
                    <p className="text-red-500 text-xs sm:text-xs md:text-sm text-center absolute top-[105%] left-[30%]">
                      {errors.pin.message}
                    </p>
                  )}
                </div>

                <div className="space-y-4 sm:space-y-5 md:space-y-6">
                  <div className="grid grid-cols-3 gap-2 sm:gap-2 md:gap-3">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => handleButtonClick(num)}
                        className="w-full h-9 sm:h-9 md:h-10 font-semibold text-[#334155] rounded-md bg-[#E2E8F0] hover:bg-[#dae1e9] flex items-center justify-center text-sm sm:text-sm md:text-base"
                      >
                        {num}
                      </button>
                    ))}
                  </div>

                  <div className="grid grid-cols-3 gap-2 sm:gap-2 md:gap-3">
                    <button
                      type="button"
                      onClick={handleDelete}
                      className="w-full h-9 sm:h-9 md:h-10 font-semibold text-[#334155] rounded-md bg-[#E2E8F0] hover:bg-[#dae1e9] flex items-center justify-center"
                    >
                      <Image
                        src={clear}
                        alt="clear"
                        className="w-5 sm:w-5 md:w-6"
                        unoptimized
                      />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleButtonClick(0)}
                      className="col-span-2 h-9 sm:h-9 md:h-10 font-semibold text-[#334155] rounded-md bg-[#E2E8F0] hover:bg-[#dae1e9] flex items-center justify-center text-sm sm:text-sm md:text-base"
                    >
                      0
                    </button>
                  </div>

                  <button
                    type="submit"
                    className="w-full h-9 sm:h-9 md:h-10 rounded-md bg-[#114F44] hover:bg-[#104239] text-white font-medium text-sm sm:text-sm md:text-base"
                    disabled={loading}
                  >
                    {loading ? <LoadingSVG /> : "Kirim"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full sm:w-1/2 h-1/2 sm:h-full">
        <div className="w-full h-full flex justify-center items-center relative bg-gray-700">
          <Image
            unoptimized
            src={img}
            alt="bg"
            className="w-full h-full object-cover absolute mix-blend-overlay"
          />
          <Image
            unoptimized
            src={logo}
            alt="logo"
            className="w-[200px] sm:w-[250px] md:w-[300px] absolute"
          />
        </div>
      </div>

      {/* Cash On Hand Modal */}
      <Dialog open={isModal} onOpenChange={() => setIsModal(false)}>
        <DialogContent className="sm:max-w-[425px] md:max-w-[470px]">
          <form
            onSubmit={handleCashOnHandSubmit(onCashSubmit)}
            className="space-y-4 sm:space-y-5"
          >
            <DialogHeader className="relative p-3 sm:p-4 rounded-lg border-b">
              <DialogTitle className="font-semibold text-base sm:text-lg text-black dark:text-white">
                Kas di Tangan
              </DialogTitle>
            </DialogHeader>
            <div className="w-full flex flex-col items-center px-3 sm:px-4 space-y-3 sm:space-y-4">
              <div className="flex space-x-3 sm:space-x-4 items-center">
                <div
                  id="user"
                  className="bg-[#D9D9D9] w-16 sm:w-20 h-16 sm:h-20 rounded-full flex items-center justify-center"
                >
                  <span className="text-black w-12 sm:w-14 h-12 sm:h-14">
                    <UserIcon />
                  </span>
                </div>

                <div className="space-y-0">
                  <p className="text-xl sm:text-2xl font-medium">{dataProfile?.data?.name}</p>
                  <p className="text-base sm:text-lg font-light">{dataProfile?.data?.role}</p>
                </div>
              </div>
              <div className="space-y-1 w-full">
                <Label htmlFor="cash" className="text-sm sm:text-base">
                  Masukkan Uang Tunai di Tangan
                </Label>
                <Input
                  type="text"
                  id="cash"
                  placeholder="Rp."
                  value={useInputRp(watchCashOnHand("cash"))}
                  onChange={(e) => {
                    const numericValue =
                      parseInt(e.target.value.replace(/[^0-9]/g, ""), 10) || 0;
                    setValueCashOnHand("cash", numericValue);
                  }}
                />
                {errorCashOnHand?.cash && (
                  <span className="text-xs sm:text-sm text-red-500">
                    {errorCashOnHand.cash.message}
                  </span>
                )}
              </div>
            </div>
            <DialogDescription className="hidden"></DialogDescription>
            <DialogFooter className="w-full p-3 sm:p-4 pt-2 sm:pt-3 flex gap-2">
              <Button
                type="submit"
                className="w-full h-9 sm:h-10 text-sm sm:text-base"
                variant="default"
                disabled={loading}
              >
                {loading ? <LoadingSVG /> : "Ok"}
              </Button>
              {errorMessage && (
                <p className="text-danger mt-2">{errorMessage}</p>
              )}
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      <DarkModeComponents />
    </div>
  );
};

export default LoginKasirPage;
