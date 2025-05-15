import React from "react";

type Props = {
  placeholder?: string;
  value?: string;
  type: string;
  title?: string;
  customization?: string;
  original?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  [key: string]: any;
};

const CustomInput = ({
  placeholder,
  value,
  type,
  title,
  customization,
  original,
  onChange,
  ...rest
}: Props) => {
  const style = original ? customization : customization + " rounded-3xl px-5 py-2 border-2 border-white m-2 w-4/6 bg-white/20 text-black";
  return (
    <input
      placeholder={placeholder}
      value={value}
      type={type}
      title={title}
      onChange={onChange}
      required
      className={`${style}`}
      {...rest}
    />
  );
};

export default CustomInput;
