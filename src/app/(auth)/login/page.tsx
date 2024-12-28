"use client";

import React from "react";
import InputPassword from "../components/InputPassword";
import InputEmail from "../components/InputEmail";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import { loginSchema } from "../validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const LoginPage = () => {
  type FormValues = z.infer<typeof loginSchema>;

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

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log("Data yang diterima:", data);
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

        <Link href="/auth/lupa-password" className="inline-block text-sm">
          Lupa Password?
        </Link>
      </div>
      <div className="space-y-2 text-center">
        <button
          type="submit"
          className="w-full bg-primaryColor rounded-md py-2 text-white"
        >
          Masuk
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
