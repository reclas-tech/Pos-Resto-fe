"use client";

import UserIcon from "../icon/UserIcon";

type InputEmailProps = {
  placeholder: string;
};

const InputEmail: React.FC<InputEmailProps> = ({ placeholder, ...props }) => {
  return (
    <div className="relative">
      <div className="absolute bottom-2 left-1 w-6 h-6">
        <UserIcon />
      </div>
      <input
        {...props}
        formNoValidate
        placeholder={placeholder}
        type="email"
        className="border border-grayDark focus:outline-grayDark placeholder:text-grayDark rounded-md pl-8 py-2 w-full"
      />
    </div>
  );
};

export default InputEmail;
