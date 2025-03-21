import React from 'react'

type Props = {
    placeholder: string,
    type: string;
    title: string;
    customization: string;
}

const CustomInput = ({ placeholder, type, title, customization }: Props) => {
    return (
        <input 
            placeholder={placeholder}
            type={type}
            title={title}
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
                w-5/6
            `}
        />
    )
}

export default CustomInput;