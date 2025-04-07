import React from "react";

type Props = {
  placeholder: string;
  value?: string;
  type: string;
  title: string;
  customization?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
};

const CustomInput = ({
  placeholder,
  value,
  type,
  title,
  customization,
  onChange,
}: Props) => {
  return (
    <input
      placeholder={placeholder}
      value={value}
      type={type}
      title={title}
      onChange={onChange}
      required
      className={`
                ${customization}
                rounded-3xl 
                px-5 
                py-2 
                border-2
                border-white
                m-2
                bg-transparent
                w-4/6
            `}
    />
  );
};

export default CustomInput;
