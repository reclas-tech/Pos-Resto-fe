"use client";

import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { axiosInstance } from "@/utils/axios";
import { showAlert2 } from "@/lib/sweetalert2";
import { useRouter } from "next/navigation";
import { LoadingSVG } from "@/constants/svgIcons";
import { ForgotPasswordValues, forgotPasswordSchema } from "@/validations";
import InputEmail from "@/components/ui/auth/InputEmail";

function ForgetPasswordPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<ForgotPasswordValues>({
    defaultValues: {
      email: "",
    },
    resolver: zodResolver(forgotPasswordSchema),
  });

  /* eslint-disable */
  const onSubmit: SubmitHandler<ForgotPasswordValues> = async (data) => {
    setLoading(true);
    setErrorMessage("");

    try {
      const response = await axiosInstance.post("/auth/admin/forget-password", {
        email: data.email,
      });
      const result = response.data;
      if (result.statusCode === 200) {
        Cookies.set("token", result?.data?.token, {
          expires: 1,
          secure: true,
          
        });
        Cookies.set("exp", result?.data?.refresh_token, {
          expires: 7,
          secure: true,
          
        });
        setTimeout(() => {
          router.push("/input-kode-otp");
          showAlert2("success", "Berhasil Cek OTP Di Email.");
        }, 10);
        reset();
      }
    } catch (error: any) {
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

  // set error messege
  const email = watch("email");
  useEffect(() => {
    if (errorMessage) {
      setErrorMessage("");
    }
  }, [email]);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="w-[388px]">
        <div className="space-y-4">
          <div className="">
            <h3 className="text-2xl font-semibold">Lupa Password</h3>
            <h4>Masukkan Email Anda</h4>
          </div>

          <div className="space-y-1">
            <InputEmail {...register("email")} placeholder="Email" />
            {errors.email && (
              <span className="text-danger">{errors.email.message}</span>
            )}
          </div>

          <div className="space-y-2 text-center">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primaryColor rounded-md py-2 "
            >
              {loading ? <LoadingSVG /> : "Masuk"}
            </button>
            {errorMessage && <p className="text-danger mt-2">{errorMessage}</p>}
          </div>
        </div>
      </form>
    </>
  );
}

export default ForgetPasswordPage;
