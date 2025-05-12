import React from "react";
import { Link } from "react-router-dom";

type Props = {
  children: React.ReactNode;
  page: string;
  className?: string;
  external?: boolean;
};

const CustomLink = ({ children, page, className, external }: Props) => {
  const style = className ? className : "p-3 text-white active:underline hover:text-[#AF95F2] transition";
  if (!external) {
    return (
      <Link
        to={"/" + page}
        className={style}
      >
        {children}
      </Link>
    );
  }
  else {
    return (
      <Link
        to={page}
        className={style}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </Link>
    );
  }
};

export default CustomLink;
