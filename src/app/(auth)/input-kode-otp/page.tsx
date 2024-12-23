"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import OtpInput from "../components/OtpInput";

function OtpInputPage() {
  const [submittedOtp, setSubmittedOtp] = useState<string | null>(null);

  const otpInputSchema = z.object({
    otp: z.string().length(6, { message: "OTP harus 6 digit" }),
  });

  type OtpFormData = z.infer<typeof otpInputSchema>;

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<OtpFormData>({
    resolver: zodResolver(otpInputSchema),
    defaultValues: {
      otp: "",
    },
  });

  const onSubmit = (data: OtpFormData) => {
    // Simpan OTP yang disubmit
    setSubmittedOtp(data.otp);

    // Lakukan verifikasi OTP
    console.log("OTP Submitted:", data.otp);

    // Reset form
    reset({ otp: "" });
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="w-[338px]">
        <div className="space-y-4">
          <div>
            <h3 className="text-2xl font-semibold">Lupa Password</h3>
            <h4>Masukkan Kode OTP</h4>
          </div>
          <div className="flex flex-col">
            <OtpInput
              control={control}
              name="otp"
              key={submittedOtp ? "reset" : "active"} // Force reset
            />
            {errors.otp && <p className="text-danger">{errors.otp.message}</p>}
          </div>
          <div className="space-y-2 text-center">
            <button
              type="submit"
              className="w-full bg-primaryColor rounded-md py-2"
            >
              Masuk
            </button>
            <p className="text-danger">{errors.otp?.message}</p>
          </div>
        </div>
      </form>
    </div>
  );
}

export default OtpInputPage;
