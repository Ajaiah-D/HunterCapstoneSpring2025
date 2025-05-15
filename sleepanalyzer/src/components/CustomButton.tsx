import React from "react";
import { Link } from "react-router-dom";

type Props = {
  children: React.ReactNode;
  page?: string;
  customization?: string;
  noOriginalStyle?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
};

const CustomButton = ({
  children,
  page,
  customization,
  noOriginalStyle,
  onClick,
  disabled,
}: Props) => {
  const style = noOriginalStyle
    ? customization
    : "rounded-md px-10 py-2 bg-lightcoral hover:bg-transparent hover: border-2 hover: text-white hover: border-lightcoral transition" +
      customization;
  const button = onClick ? true : false;

  if (!button) {
    return (
      <Link to={"/" + page} className={`${style}`}>
        {children}
      </Link>
    );
  } else {
    return (
      <button className={`${style}`} onClick={onClick} disabled={disabled}>
        {children}
      </button>
    );
  }
};

export default CustomButton;
