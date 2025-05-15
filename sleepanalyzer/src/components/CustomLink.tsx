import React from "react";
import { NavLink, Link } from "react-router-dom";

type Props = {
  children: React.ReactNode;
  page: string;
  className?: string;
  external?: boolean;
  pic?: boolean;
};

const CustomLink = ({ children, page, className, external, pic }: Props) => {
  const style = className ? className : "p-3 text-white hover:text-softviolet transition";
  if (!external) {
    return (
      <NavLink
        to={"/" + page}
        className={({isActive}) => {
          return isActive && !pic ? style + " border-b-[3px] border-white hover:border-softviolet" : style;
        }}
      >
        {children}
      </NavLink>
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
