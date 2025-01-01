"use client";

import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { NewPasswordValues, newPasswordSchema } from "@/validations";
import { useRouter } from "next/navigation";
import { axiosInstance } from "@/utils/axios";
import { showAlert2 } from "@/lib/sweetalert2";
import { LoadingSVG } from "@/constants/svgIcons";
import InputPassword from "@/components/ui/auth/InputPassword";

function CreateNewPasswordPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<NewPasswordValues>({
    defaultValues: {
      newPassword: "",
      confirmNewPassword: "",
    },
    resolver: zodResolver(newPasswordSchema),
  });

  /* eslint-disable */
  const onSubmit: SubmitHandler<NewPasswordValues> = async (data) => {
    setLoading(true);
    setErrorMessage("");

    try {
      const response = await axiosInstance.post("/auth/admin/new-password", {
        newPassword: data.newPassword,
        confirmNewPassword: data.confirmNewPassword,
      });
      const result = response.data;
      if (result.status === 200) {
        showAlert2("success", "Berhasil.");
        Cookies.set("accessToken", result?.data?.access_token, {
          expires: 1,
          secure: true,
          httpOnly: false,
        });
        Cookies.set("refreshToken", result?.data?.refresh_token, {
          expires: 7,
          secure: true,
          httpOnly: false,
        });
        setTimeout(() => {
          router.push("/login");
          showAlert2("success", "Berhasil.");
        }, 10);
        reset();
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Gagal. Silakan coba lagi!";
      setErrorMessage(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // set error messege
  const newPassword = watch("newPassword");
  const confirmNewPassword = watch("confirmNewPassword");
  useEffect(() => {
    if (errorMessage) {
      setErrorMessage("");
    }
  }, [newPassword, confirmNewPassword]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-[388px]">
      <div className="space-y-4">
        <div className="">
          <h3 className="text-2xl font-semibold">Buat Kata Sandi Baru</h3>
          <h4>Silahkan masukkan kata sandi baru</h4>
        </div>
        <div className="space-y-2">
          <div className="space-y-1">
            <InputPassword
              {...register("newPassword")}
              placeholder="Password"
            />
            {errors.newPassword && (
              <span className="text-danger">{errors.newPassword.message}</span>
            )}
          </div>
          <div className="space-y-1">
            <InputPassword
              {...register("confirmNewPassword")}
              placeholder="Konfirmasi Password"
            />
            {errors.confirmNewPassword && (
              <span className="text-danger">
                {errors.confirmNewPassword.message}
              </span>
            )}
          </div>
        </div>
        <div className="space-y-2 text-center">
          <button
            type="submit"
            className="w-full bg-primaryColor rounded-md py-2 "
            disabled={loading}
          >
            {loading ? <LoadingSVG /> : "Masuk"}
          </button>
          {errorMessage && <p className="text-danger mt-2">{errorMessage}</p>}
        </div>
      </div>
    </form>
  );
}

export default CreateNewPasswordPage;
