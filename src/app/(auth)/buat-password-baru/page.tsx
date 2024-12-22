"use client";
import React from "react";
import InputPassword from "../components/InputPassword";
import { useForm, SubmitHandler } from "react-hook-form";
import { newPasswordSchema } from "../validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

function CreateNewPasswordPage() {
  type FormValues = z.infer<typeof newPasswordSchema>;

  const {
    register,
    handleSubmit,
    reset,
    formState,
    formState: { errors, isSubmitSuccessful },
  } = useForm<FormValues>({
    defaultValues: {
      newPassword: "",
      confirmNewPassword: "",
    },
    resolver: zodResolver(newPasswordSchema),
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log("Data yang diterima:", data);
  };

  React.useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset({ newPassword: "", confirmNewPassword: "" });
    }
  }, [formState, reset]);
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
          >
            Masuk
          </button>

          {errors.newPassword || errors.confirmNewPassword ? (
            <p className="text-danger">
              {errors.newPassword?.message ||
                errors.confirmNewPassword?.message}
            </p>
          ) : null}
        </div>
      </div>
    </form>
  );
}

export default CreateNewPasswordPage;
