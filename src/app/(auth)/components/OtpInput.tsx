import React, { useState, KeyboardEvent, ChangeEvent, useEffect } from "react";
import { Control, Controller } from "react-hook-form";

interface OtpInputProps {
  length?: number;
  control: Control<any>;
  name: string;
  disabled?: boolean;
}

const OtpInput: React.FC<OtpInputProps> = ({
  length = 6,
  control,
  name,
  disabled = false,
}) => {
  const [otp, setOtp] = useState<string[]>(Array(length).fill(""));
  const inputRefs = React.useRef<(HTMLInputElement | null)[]>(
    Array(length).fill(null)
  );

  // Reset OTP saat komponen berubah
  useEffect(() => {
    setOtp(Array(length).fill(""));
  }, [length]);

  const handleChange = (
    event: ChangeEvent<HTMLInputElement>,
    index: number,
    onChange: (value: string) => void
  ) => {
    const { value } = event.target;

    // Hanya izinkan input digit
    if (value.match(/^\d?$/)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Gabungkan digit OTP
      const combinedOtp = newOtp.join("");
      onChange(combinedOtp);

      // Pindahkan fokus ke input berikutnya jika digit dimasukkan
      if (value && index < length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (
    event: KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (event.key === "Backspace") {
      // Hapus input saat ini atau pindah ke input sebelumnya
      if (otp[index] === "") {
        if (index > 0) {
          inputRefs.current[index - 1]?.focus();
        }
      } else {
        // Hapus input saat ini jika tidak kosong
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
      }
    }
  };

  return (
    <div className="flex space-x-2">
      {otp.map((_, index) => (
        <Controller
          key={index}
          name={name}
          control={control}
          render={({ field: { onChange, value } }) => (
            <input
              type="text"
              inputMode="numeric"
              maxLength={1}
              pattern="\d*"
              value={otp[index]}
              onChange={(e) => handleChange(e, index, onChange)}
              onKeyDown={(e: KeyboardEvent<HTMLInputElement>) =>
                handleKeyDown(e, index)
              }
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              disabled={disabled}
              className="w-10 h-10 text-center text-lg border border-grayDark rounded"
              aria-label={`OTP digit ${index + 1}`}
            />
          )}
        />
      ))}
    </div>
  );
};

export default OtpInput;
