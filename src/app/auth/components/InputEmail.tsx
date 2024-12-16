"use client";
import { FieldError } from "react-hook-form";
import UserIcon from "../icon/UserIcon";

type InputEmailProps = {
  placeholder: string;
  error: any;
};

const InputEmail: React.FC<InputEmailProps> = ({
  placeholder,

  error,
}) => {
  return (
    <div className="relative">
      <div className="absolute bottom-2 left-1 w-6 h-6">
        <UserIcon />
      </div>
      <input
        placeholder={placeholder}
        type="email"
        className="border border-grayDark focus:outline-grayDark placeholder:text-grayDark rounded-md pl-8 py-2 w-full"
      />
      {error && <span className="text-danger text-sm">{error.message}</span>}
    </div>
  );
};

export default InputEmail;
