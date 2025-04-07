import React from "react";
import { Link } from "react-router-dom";

type Props = {
  children: React.ReactNode;
  page: string;
  textColor: string;
};

const CustomLink = ({ children, page, textColor }: Props) => {
  return (
    <Link
      to={"/" + page}
      className={`
            text-${textColor}
            p-3
            active:underline
        `}
    >
      {children}
    </Link>
  );
};

export default CustomLink;
