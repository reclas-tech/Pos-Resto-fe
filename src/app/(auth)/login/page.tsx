"use client";

import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Link from "next/link";
import { LoginValues, loginSchema } from "@/validations";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { axiosInstance } from "@/utils/axios";
import { useRouter } from "next/navigation";
import { showAlert2 } from "@/lib/sweetalert2";
import { LoadingSVG } from "@/constants/svgIcons";
import InputEmail from "@/components/ui/auth/InputEmail";
import InputPassword from "@/components/ui/auth/InputPassword";

const LoginPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  // Hook form dengan react-hook-form
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<LoginValues>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });

  // cek berdasarkan cookies
  // useEffect(() => {
  //   const access_token = Cookies.get("access_token");
  //   if (access_token) {
  //     router.push("/beranda");
  //   } else {
  //     Cookies.remove("access_token");
  //     Cookies.remove("refresh_token");
  //     router.push("/login");
  //   }
  // }, [router]);

  /* eslint-disable */
  const onSubmit: SubmitHandler<LoginValues> = async (data) => {
    setLoading(true);
    setErrorMessage("");

    try {
      const response = await axiosInstance.post("/auth/admin/login", {
        email: data.email,
        password: data.password,
      });
      router.push("/beranda");
      const result = response.data;
      if (result.statusCode === 200) {
        showAlert2("success", "Berhasil Login.");
        Cookies.set("access_token", result?.data?.access_token, {
          expires: 1,
        });
        Cookies.set("refresh_token", result?.data?.refresh_token, {
          expires: 7,
        });
        setTimeout(() => {
          router.push("/beranda");
          showAlert2("success", "Berhasil Login.");
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
  const password = watch("password");
  useEffect(() => {
    if (errorMessage) {
      setErrorMessage("");
    }
  }, [email, password]);

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
          {loading ? <LoadingSVG /> : "Masuk"}
        </button>
        {errorMessage && <p className="text-danger mt-2">{errorMessage}</p>}
      </div>
    </form>
  );
};

export default LoginPage;
