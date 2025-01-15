"use client";

import Image from "next/image";
import img from "@assets/bgLoginKasir.png";
import logo from "@assets/splashScreen.png";
import clear from "@assets/clearIcon.png";
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { DarkModeComponents } from "@/components/ui/darkModeButton";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import { axiosInstance } from "@/utils/axios";
import { showAlert2 } from "@/lib/sweetalert2";
import Cookies from "js-cookie";
import { LoadingSVG } from "@/constants/svgIcons";

const pinSchema = z.object({
  pin: z.string().length(6, "Pin harus 6 digit"),
});

type PinFormData = z.infer<typeof pinSchema>;

const LoginWaitersPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [pinValue, setPinValue] = useState<string>("");

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
        reset();
        showAlert2("success", "Berhasil Login.");
        Cookies.set("access_token", result?.data?.access_token, {
          expires: 1,
          secure: true,
          httpOnly: false,
        });
        Cookies.set("refresh_token", result?.data?.refresh_token, {
          expires: 7,
          secure: true,
          httpOnly: false,
        });
        Cookies.set("role", result?.data?.role, {
          expires: 7,
          secure: true,
          httpOnly: false,
        });
        setTimeout(() => {
          router.push("/pos");
        }, 10);
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

  return (
    <div className="w-full h-screen flex flex-col sm:flex-row">
      <DarkModeComponents />
      <div className="w-full sm:w-1/2 h-1/2 sm:h-full">
        <div className="w-full h-full bg-primaryColor relative flex justify-center items-center overflow-hidden">
          <div className="absolute w-[300px] sm:w-[450px] md:w-[600px] h-[300px] sm:h-[450px] md:h-[600px] bg-gradient-to-br from-5% from-white opacity-20 rounded-full top-[-150px] sm:top-[-225px] md:top-[-300px] right-[-150px] sm:right-[-225px] md:right-[-300px] z-0" />
          <div className="absolute w-[350px] sm:w-[525px] md:w-[700px] h-[350px] sm:h-[525px] md:h-[700px] bg-gradient-to-br from-5% from-white opacity-20 rounded-full bottom-[-125px] sm:bottom-[-187px] md:bottom-[-250px] left-[-175px] sm:left-[-262px] md:left-[-350px] z-0" />
          <div className="space-y-8 sm:space-y-10 md:space-y-14 z-10">
            <div className="space-y-4 sm:space-y-5 md:space-y-6 text-center text-white">
              <p className="text-3xl sm:text-3xl md:text-4xl font-bold leading-8 sm:leading-9 md:leading-10">
                Login Waiters
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
                  {errorMessage && (
                    <p className="text-danger mt-2">{errorMessage}</p>
                  )}
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
    </div>
  );
};

export default LoginWaitersPage;
