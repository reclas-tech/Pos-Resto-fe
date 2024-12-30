"use client";
import React, { useState } from "react";
import InputEmail from "../components/InputEmail";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { forgotPasswordSchema } from "../validation";
import { z } from "zod";
import { axiosInstance } from "@/utils/axios";
import Cookies from "js-cookie";
import { showAlert2 } from "@/lib/sweetalert2";
import { useRouter } from "next/navigation";
import { LoadingSVG } from "@/constants/svgIcons";

function ForgetPasswordPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  type FormValues = z.infer<typeof forgotPasswordSchema>;

  const {
    register,
    handleSubmit,
    reset,
    formState,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      email: "",
    },
    resolver: zodResolver(forgotPasswordSchema),
  });

  /* eslint-disable */
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setLoading(true);
    try {
      const response = await axiosInstance.post("/auth/admin/forget-password", {
        email: data.email,
      });
      const result = response.data;
      if (result.status === 200) {
        Cookies.set("token", result?.data?.token, {
          expires: 1,
          secure: true,
          httpOnly: false,
        });
        Cookies.set("exp", result?.data?.refresh_token, {
          expires: 7,
          secure: true,
          httpOnly: false,
        });
        setTimeout(() => {
          router.push("/input-kode-otp");
          showAlert2("success", "Berhasil Cek OTP Di Email.");
        }, 10);
        reset();
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Login gagal. Silakan coba lagi!";
      showAlert2("error", errorMessage);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset({ email: "" });
    }
  }, [formState, reset]);
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

            <p className="text-danger">{errors.email?.message}</p>
          </div>
        </div>
      </form>
    </>
  );
}

export default ForgetPasswordPage;
