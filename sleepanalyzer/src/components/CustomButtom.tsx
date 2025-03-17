import React from 'react'
import { Link } from 'react-router-dom'

type Props = {
    children: React.ReactNode;
    page: string;
    customization: string;
}

const CustomButtom = ({ children, page, customization }: Props) => {
  return (
    <Link 
        to= {"/" + page}
        className={`
            ${customization}
            rounded-md 
            px-10 
            py-2 
            bg-lightcoral
            hover:bg-transparent
            hover: border-2
            hover: text-white
            hover: border-lightcoral
        `}
    >
        { children }
    </Link>
  )
}

export default CustomButtom;