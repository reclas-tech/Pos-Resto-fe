"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import clear from "@assets/clearIcon.png";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { DialogDescription } from "@radix-ui/react-dialog";

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
}

const pinSchema = z.object({
  pin: z.string().length(6, "Pin harus 6 digit"),
});
type PinFormData = z.infer<typeof pinSchema>;

const DeleteModal: React.FC<DeleteModalProps> = ({
  isOpen,
  onClose,
  onDelete,
}) => {
  const [pinValue, setPinValue] = useState<string>("");

  const {
    handleSubmit,
    formState: { errors },
    setValue,
    trigger,
    reset,
  } = useForm<PinFormData>({
    resolver: zodResolver(pinSchema),
    defaultValues: {
      pin: "",
    },
  });

  const onSubmit = (data: PinFormData) => {
    console.log("Form submitted:", data);
    setPinValue("");
    reset();
    onDelete();
    onClose();
  };

  const handleButtonClick = (num: number) => {
    if (pinValue.length < 6) {
      const newValue = pinValue + num;
      setPinValue(newValue);
      setValue("pin", newValue);
      trigger("pin");
    }
  };

  const handleDeleteNumber = () => {
    const newValue = pinValue.slice(0, -1);
    setPinValue(newValue);
    setValue("pin", newValue);
    trigger("pin");
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="bg-white rounded-lg w-[280px] sm:w-[300px] md:w-[320px] h-[380px] sm:h-[405px] md:h-[430px] p-8">
          <DialogHeader>
            <DialogTitle className="text-center text-[#334155] text-lg sm:text-lg md:text-xl font-semibold">
              Kode Pin
            </DialogTitle>
          </DialogHeader>
          <>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-4 sm:space-y-5 md:space-y-6"
            >
              <div className="flex justify-center space-x-2 relative">
                {Array.from({ length: 6 }).map((_, index) => (
                  <div
                    key={index}
                    className="w-5 sm:w-5 md:w-6 h-7 sm:h-7 md:h-8 border-b-[3px] bg-[#E2E8F0] border-primaryColor rounded-t-md flex items-center text-[#334155] justify-center"
                  >
                    {pinValue[index] ? "•" : ""}
                  </div>
                ))}
                {errors.pin && (
                  <p className="text-red-500 text-xs sm:text-xs md:text-sm text-center absolute top-[105%] left-[30%]">
                    {errors.pin.message}
                  </p>
                )}
              </div>

              <div className="space-y-4 sm:space-y-5 md:space-y-6">
                <div className="grid grid-cols-3 gap-2 sm:gap-2 md:gap-3">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => handleButtonClick(num)}
                      className="w-full h-9 sm:h-9 md:h-10 font-semibold text-[#334155] rounded-md bg-[#E2E8F0] hover:bg-[#dae1e9] flex items-center justify-center text-sm sm:text-sm md:text-base"
                    >
                      {num}
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-3 gap-2 sm:gap-2 md:gap-3">
                  <button
                    type="button"
                    onClick={handleDeleteNumber}
                    className="w-full h-9 sm:h-9 md:h-10 font-semibold text-[#334155] rounded-md bg-[#E2E8F0] hover:bg-[#dae1e9] flex items-center justify-center"
                  >
                    <Image
                      src={clear}
                      alt="clear"
                      className="w-5 sm:w-5 md:w-6"
                      unoptimized
                    />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleButtonClick(0)}
                    className="col-span-2 h-9 sm:h-9 md:h-10 font-semibold text-[#334155] rounded-md bg-[#E2E8F0] hover:bg-[#dae1e9] flex items-center justify-center text-sm sm:text-sm md:text-base"
                  >
                    0
                  </button>
                </div>

                <button
                  type="submit"
                  className="w-full h-9 sm:h-9 md:h-10 rounded-md bg-[#114F44] hover:bg-[#104239] text-white font-medium text-sm sm:text-sm md:text-base"
                >
                  Kirim
                </button>
              </div>
            </form>
          </>
          <DialogDescription className="hidden"></DialogDescription>
          <DialogFooter></DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DeleteModal;
