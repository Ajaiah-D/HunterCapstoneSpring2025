import React from 'react'
import { Link } from 'react-router-dom'

type Props = {
    children: React.ReactNode;
    where: string;
    color: string;
    otherCustomization: string;
}

const CustomButtom = ({ children, where, color, otherCustomization }: Props) => {
  return (
    <Link 
        to= {"/" + where}
        className={`
            rounded-md 
            px-10 
            py-2 
            bg-${color}
            ${otherCustomization}
            hover:bg-transparent
            hover: border-2
            hover:text-white
            hover: border-${color}
        `}
    >
        { children }
    </Link>
  )
}

export default CustomButtom;