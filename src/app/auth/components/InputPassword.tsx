"use client";

import { useState } from "react";
import LockIcon from "../icon/LockIcon";
import VisibleIcon from "../icon/VisibleIcon";
import InvisibleIcon from "../icon/InvisibleIcon";

type InputPasswordProps = {
  placeholder: string;
};

const InputPassword: React.FC<InputPasswordProps> = ({
  placeholder,
  ...props
}) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

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
        {...props}
      />

      <button
        type="button"
        onClick={toggleVisibility}
        className="w-6 h-6 absolute bottom-2 right-2"
      >
        {isVisible ? <VisibleIcon /> : <InvisibleIcon />}
      </button>
    </div>
  );
};

export default InputPassword;
