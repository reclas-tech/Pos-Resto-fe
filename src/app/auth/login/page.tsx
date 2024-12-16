"use client";
import React from "react";
import InputPassword from "../components/InputPassword";
import InputEmail from "../components/InputEmail";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";

function LoginPage() {
  const schemaLogin = z.object({
    email: z.string().email("Email tidak valid"),
    password: z
      .string({ message: "Kata sandi tidak boleh kosong!" })
      .min(6, { message: "Kata sandi minimal 6 karakter" })
      .max(32, { message: "Kata sandi maksimal 32 karakter" }),
  });
  type FormValues = z.infer<typeof schemaLogin>;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schemaLogin),
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="w-[388px]">
        <div className="space-y-4">
          <div className="">
            <h3 className="text-2xl font-semibold">Masuk</h3>
            <h4>Silahkan masukkan data kredensial anda</h4>
          </div>
          <div className="space-y-2">
            <InputEmail
              placeholder="Email"
              error={errors.email}
              {...register("email")}
            />
            <InputPassword
              placeholder="Password"
              error={errors.password}
              {...register("password")}
            />
            <Link href="/auth/lupa-password" className="inline-block text-sm">
              Lupa Password?
            </Link>
          </div>
          <div className="space-y-2 text-center">
            <button
              type="submit"
              className="w-full bg-primaryColor rounded-md py-2 "
            >
              Masuk
            </button>

            <p className="text-danger">Masukkan Email Anda</p>
          </div>
        </div>
      </form>
    </>
  );
}

export default LoginPage;
function zodResolver(
  schema: any
):
  | import("react-hook-form").Resolver<{ email: string; password: string }, any>
  | undefined {
  throw new Error("Function not implemented.");
}
