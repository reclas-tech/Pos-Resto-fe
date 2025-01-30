"use client";

import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoadingSVG } from "@/constants/svgIcons";
import { OtpValues, otpSchema } from "@/validations";
import { axiosInstance } from "@/utils/axios";
import { showAlert2 } from "@/lib/sweetalert2";
import { useRouter } from "next/navigation";
import OtpInput from "@/components/ui/auth/OtpInput";

function OtpInputPage() {
  const router = useRouter();
  const [submittedOtp, setSubmittedOtp] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<OtpValues>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: "",
    },
  });

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      router.push("/input-kode-otp");
    } else {
      Cookies.remove("token");
      router.push("/login");
    }
  }, [router]);

  /* eslint-disable */
  const onSubmit: SubmitHandler<OtpValues> = async (data) => {
    setLoading(true);
    setErrorMessage("");

    try {
      const token = Cookies.get("token");
      console.log("token sebelum", token);
      const response = await axiosInstance.post(
        "/auth/admin/otp-verification",
        {
          otp: data.otp,
        }
      );
      const result = response.data;
      if (result.statusCode === 200) {
        setSubmittedOtp(data.otp);
        showAlert2("success", "Berhasil.");
        Cookies.set("token", result?.data?.token, {
          expires: 1,


        });
        setTimeout(() => {
          router.push("/buat-password-baru");
          showAlert2("success", "Berhasil.");
        }, 10);
        reset();
      }
    } catch (error: any) {
      console.log(data.otp);
      let errorMessage =
        error.response?.data?.message || "Otp gagal. Silakan coba lagi!";
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

  // set error messege
  const otp = watch("otp");
  useEffect(() => {
    if (errorMessage) {
      setErrorMessage("");
    }
  }, [otp]);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="w-[338px]">
        <div className="space-y-4">
          <div>
            <h3 className="text-2xl font-semibold">Lupa Password</h3>
            <h4>Masukkan Kode OTP</h4>
          </div>
          <div className="flex flex-col">
            <OtpInput
              control={control}
              name="otp"
              key={submittedOtp ? "reset" : "active"}
            />
            {errors.otp && <p className="text-danger">{errors.otp.message}</p>}
          </div>
          <div className="space-y-2 text-center">
            <button
              type="submit"
              className="w-full bg-primaryColor rounded-md py-2"
              disabled={loading}
            >
              {loading ? <LoadingSVG /> : "Masuk"}
            </button>
            {errorMessage && <p className="text-danger mt-2">{errorMessage}</p>}
          </div>
        </div>
      </form>
    </div>
  );
}

export default OtpInputPage;
