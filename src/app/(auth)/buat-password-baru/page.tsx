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
      new_password: "",
      new_password_confirmation: "",
    },
    resolver: zodResolver(newPasswordSchema),
  });

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      router.push("/buat-password-baru");
    } else {
      Cookies.remove("token");
      router.push("/login");
    }
  }, [router]);

  /* eslint-disable */
  const onSubmit: SubmitHandler<NewPasswordValues> = async (data) => {
    setLoading(true);
    setErrorMessage("");

    try {
      const token = Cookies.get("token");
      const response = await axiosInstance.post("/auth/admin/new-password", {
        token,
        new_password: data.new_password,
        new_password_confirmation: data.new_password_confirmation,
      });
      const result = response.data;
      if (result.statusCode === 200) {
        showAlert2("success", "Berhasil.");
        setTimeout(() => {
          Cookies.remove("token");
          router.push("/login");
          showAlert2("success", "Berhasil.");
        }, 10);
        reset();
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Gagal. Silakan coba lagi!";
      console.log(errorMessage);
      setErrorMessage(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // set error messege
  const newPassword = watch("new_password");
  const confirmNewPassword = watch("new_password_confirmation");
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
              {...register("new_password")}
              placeholder="Password"
            />
            {errors.new_password && (
              <span className="text-danger">{errors.new_password.message}</span>
            )}
          </div>
          <div className="space-y-1">
            <InputPassword
              {...register("new_password_confirmation")}
              placeholder="Konfirmasi Password"
            />
            {errors.new_password_confirmation && (
              <span className="text-danger">
                {errors.new_password_confirmation.message}
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
