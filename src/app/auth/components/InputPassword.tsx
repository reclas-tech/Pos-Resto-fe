"use client";

import { useState } from "react";
import LockIcon from "../icon/LockIcon";
import VisibleIcon from "../icon/VisibleIcon";
import { FieldError } from "react-hook-form";

type InputPasswordProps = {
  placeholder: string;

  error: any;
};

const InputPassword: React.FC<InputPasswordProps> = ({
  placeholder,

  error,
}) => {
  const [isVisible, setIsVisible] = useState<boolean>(true);

  const toggleVisibility = () => {
    setIsVisible((prev) => !prev);
  };

  return (
    <div className="relative">
      <div className="absolute bottom-2 left-1">
        <LockIcon />
      </div>
      <input
        placeholder={placeholder}
        type={isVisible ? "text" : "password"}
        className="border border-grayDark focus:outline-grayDark placeholder:text-grayDark rounded-md pl-8 py-2 w-full"
      />
      {error && <span className="text-danger text-sm">{error.message}</span>}
      <button
        type="button"
        onClick={toggleVisibility}
        className="w-6 h-6 absolute bottom-2 right-2"
      >
        <VisibleIcon />
      </button>
    </div>
  );
};

export default InputPassword;
