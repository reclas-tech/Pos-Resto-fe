"use client";
import React from "react";
import InputEmail from "../components/InputEmail";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { forgotPasswordSchema } from "../validation";
import { z } from "zod";

function ForgetPasswordPage() {
  type FormValues = z.infer<typeof forgotPasswordSchema>;

  const {
    register,
    handleSubmit,
    reset,
    formState,
    formState: { errors, isSubmitSuccessful },
  } = useForm<FormValues>({
    defaultValues: {
      email: "",
    },
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log("Data yang diterima:", data);
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
            <InputEmail
              {...register("email")}
              placeholder="Email"
            />
            {errors.email && (
              <span className="text-danger">{errors.email.message}</span>
            )}
          </div>

          <div className="space-y-2 text-center">
            <button
              type="submit"
              className="w-full bg-primaryColor rounded-md py-2 "
            >
              Masuk
            </button>

            <p className="text-danger">{errors.email?.message}</p>
          </div>
        </div>
      </form>
    </>
  );
}

export default ForgetPasswordPage;
