"use client";

import React, { useEffect, useState } from "react";
import InputPassword from "../components/InputPassword";
import InputEmail from "../components/InputEmail";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import { loginSchema } from "../validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { axiosInstance } from "@/utils/axios";
import { showAlert2 } from "@/lib/sweetalert2";
import { useRouter } from "next/navigation";
import { LoadingSVG } from "@/constants/svgIcons";
import Cookies from "js-cookie";

// Tipe data form values loginSchema
type FormValues = z.infer<typeof loginSchema>;

const LoginPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // Hook form dengan react-hook-form
  const {
    register,
    handleSubmit,
    reset,
    formState,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });

  // cek berdasarkan cookies
  useEffect(() => {
    const accessToken = Cookies.get("accessToken");
    if (accessToken) {
      router.push("/beranda");
    } else {
      Cookies.remove("accessToken");
      Cookies.remove("refreshToken");
      router.push("/login");
    }
  }, [router]);

  /* eslint-disable */
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setLoading(true);
    try {
      const response = await axiosInstance.post("/auth/admin/login", {
        email: data.email,
        password: data.password,
      });
      const result = response.data;
      if (result.status === 200) {
        showAlert2("success", "Berhasil Login.");
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
          router.push("/beranda");
          showAlert2("success", "Berhasil Login.");
        }, 10);
        reset();
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Login gagal. Silakan coba lagi!";
      showAlert2("error", errorMessage);
      console.error("Failed to login:", error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset({ email: "", password: "" });
    }
  }, [formState, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-[388px] space-y-4">
      <div>
        <h3 className="text-2xl font-semibold">Masuk</h3>
        <h4>Silahkan masukkan data kredensial anda</h4>
      </div>
      <div className="space-y-2">
        <div className="space-y-1">
          <InputEmail {...register("email")} placeholder="Email" />
          {errors.email && (
            <span className="text-danger">{errors.email.message}</span>
          )}
        </div>

        <div className="space-y-1">
          <InputPassword {...register("password")} placeholder="Password" />
          {errors.password && (
            <span className="text-danger">{errors.password.message}</span>
          )}
        </div>

        <Link href="/lupa-password" className="inline-block text-sm">
          Lupa Password?
        </Link>
      </div>
      <div className="space-y-2 text-center">
        <button
          type="submit"
          className="w-full bg-primaryColor rounded-md py-2 text-white"
          disabled={loading}
        >
          {loading ? <LoadingSVG /> : "Masuk"}{" "}
        </button>
        {errors.email || errors.password ? (
          <p className="text-danger">
            {errors.email?.message || errors.password?.message}
          </p>
        ) : null}
      </div>
    </form>
  );
};

export default LoginPage;
