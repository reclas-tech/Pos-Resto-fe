"use client";

import Image from "next/image";
import img from "@assets/bgLoginKasir.png";
import logo from "@assets/splashScreen.png";
import clear from "@assets/clearIcon.png";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { DarkModeComponents } from "@/components/ui/darkModeButton";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRupiah } from "@/hooks/useRupiah";
import { Label } from "@/components/ui/label";
import { UserIcon } from "@/components/ui/icons/UserIcon";

const otpSchema = z.object({
  otp: z.string().length(6, "PIN harus 6 digit"),
});

const cashSchema = z.object({
  cash: z.string().min(1, "Cash On Hand Tidak Boleh Kosong"),
});

type OtpFormData = z.infer<typeof otpSchema>;
type CashFormData = z.infer<typeof cashSchema>;

const LoginKasirPage = () => {
  const [otpValue, setOtpValue] = useState<string>("");
  const [isModal, setIsModal] = useState<boolean>(false);
  const rupiahInput = useRupiah();

  const {
    handleSubmit,
    formState: { errors },
    setValue,
    trigger,
    reset,
  } = useForm<OtpFormData>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: "",
    },
  });

  const {
    control,
    handleSubmit: handleCashOnHandSubmit,
    formState: { errors: errorCashOnHand },
    reset: resetCashOnHand,
  } = useForm<CashFormData>({
    resolver: zodResolver(cashSchema),
  });

  const handleButtonClick = (num: number) => {
    if (otpValue.length < 6) {
      const newValue = otpValue + num;
      setOtpValue(newValue);
      setValue("otp", newValue);
      trigger("otp");
    }
  };

  const handleDelete = () => {
    const newValue = otpValue.slice(0, -1);
    setOtpValue(newValue);
    setValue("otp", newValue);
    trigger("otp");
  };

  const onSubmit = (data: OtpFormData) => {
    console.log("Form submitted:", data);
    setOtpValue("");
    reset();
    setIsModal(true);
  };

  const onCashSubmit = (data: CashFormData) => {
    console.log("Form Submitted: ", data);
    resetCashOnHand();
    setIsModal(false);
  };

  return (
    <div className="w-full h-screen flex">
      <div className="w-1/2 h-full">
        <div className="w-full h-full bg-primaryColor relative flex justify-center items-center overflow-hidden">
          <div className="absolute w-[600px] h-[600px] bg-gradient-to-br from-5% from-white opacity-20 rounded-full top-[-300px] right-[-300px] z-0" />
          <div className="absolute w-[700px] h-[700px] bg-gradient-to-br from-5% from-white opacity-20 rounded-full bottom-[-250px] left-[-350px] z-0" />
          <div className="space-y-14 z-10">
            <div className="space-y-6 text-center text-white">
              <p className="text-4xl font-bold leading-10">Login Kasir</p>
              <p className="text-2xl leading-8">Waroeng Aceh Garuda</p>
            </div>
            <div className="bg-white rounded-lg w-[320px] h-[430px] p-6 space-y-4">
              <p className="text-center text-[#334155] text-xl font-semibold">
                Kode Pin
              </p>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* OTP Display */}
                <div className="flex justify-center space-x-2 relative">
                  {Array.from({ length: 6 }).map((_, index) => (
                    <div
                      key={index}
                      className="w-6 h-8 border-b-[3px] bg-[#E2E8F0] border-primaryColor rounded-t-md flex items-center justify-center"
                    >
                      {otpValue[index] ? "•" : ""}
                    </div>
                  ))}
                  {errors.otp && (
                    <p className="text-red-500 text-sm text-center absolute top-[105%] left--4">
                      {errors.otp.message}
                    </p>
                  )}
                </div>

                {/* Numpad Container */}
                <div className="space-y-6">
                  {/* Numpad Grid */}
                  <div className="grid grid-cols-3 gap-3">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => handleButtonClick(num)}
                        className="w-full h-10 font-semibold text-[#334155] rounded-md bg-[#E2E8F0] hover:bg-[#dae1e9] flex items-center justify-center text-base "
                      >
                        {num}
                      </button>
                    ))}
                  </div>

                  {/* Bottom Row with Delete, 0, and Clear */}
                  <div className="grid grid-cols-3 gap-3">
                    <button
                      type="button"
                      onClick={handleDelete}
                      className="w-full h-10 font-semibold text-[#334155] rounded-md bg-[#E2E8F0] hover:bg-[#dae1e9] flex items-center justify-center text-base"
                    >
                      {/* <Delete className="w-6 h-6" /> */}
                      <Image
                        src={clear}
                        alt="clear"
                        className="w-6"
                        unoptimized
                      />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleButtonClick(0)}
                      className="col-span-2 h-10 font-semibold text-[#334155] rounded-md bg-[#E2E8F0] hover:bg-[#dae1e9] flex items-center justify-center text-base"
                    >
                      0
                    </button>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full h-10 rounded-md bg-[#114F44] hover:bg-[#104239] text-white font-medium text-base"
                  >
                    Kirim
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="w-1/2 h-full">
        <div className="w-full h-full flex justify-center items-center relative bg-gray-700">
          <Image
            unoptimized
            src={img}
            alt="bg"
            className="w-full h-full object-cover absolute mix-blend-overlay"
          />
          <Image
            unoptimized
            src={logo}
            alt="logo"
            className="w-[300px] absolute"
          />
        </div>
      </div>

      {/* Cash On Hand Modal */}

      <Dialog open={isModal} onOpenChange={() => setIsModal(false)}>
        <DialogContent className="sm:max-w-[470px]">
          <form
            onSubmit={handleCashOnHandSubmit(onCashSubmit)}
            className="space-y-5"
          >
            <DialogHeader className="relative p-4  rounded-lg border-b">
              <DialogTitle className="font-semibold  text-black  dark:text-white">
                Kas di Tangan
              </DialogTitle>
            </DialogHeader>
            <div className="w-full flex flex-col items-center px-4 space-y-4">
              <div className="flex space-x-4 items-center">
                <div
                  id="user"
                  className="bg-[#D9D9D9] w-20 h-20 rounded-full flex items-center justify-center"
                >
                  <span className="text-black w-14 h-14">
                    <UserIcon />
                  </span>
                </div>

                <div className="space-y-0">
                  <p className="text-2xl font-medium">John Doe</p>
                  <p className="text-lg font-light">Cashier</p>
                </div>
              </div>
              <div className="space-y-1 w-full">
                <Label htmlFor="cash"> Masukkan Uang Tunai di Tangan</Label>
                <Controller
                  name="cash"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <Input
                      id="cash"
                      type="text"
                      placeholder="Rp.0"
                      className="w-full"
                      value={rupiahInput.value}
                      onChange={(e) => {
                        rupiahInput.onChange(e);
                        field.onChange(e);
                      }}
                    />
                  )}
                />
                {errorCashOnHand.cash && (
                  <span className="text-sm text-red-500">
                    {errorCashOnHand.cash.message}
                  </span>
                )}
              </div>
            </div>
            <DialogDescription className="hidden"></DialogDescription>
            <DialogFooter className="w-full p-4 pt-3 flex gap-2">
              <Button type="submit" className="w-full" variant="default">
                Ok
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      <DarkModeComponents />
    </div>
  );
};

export default LoginKasirPage;
