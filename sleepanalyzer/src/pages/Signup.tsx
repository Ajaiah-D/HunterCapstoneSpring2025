import React from 'react';
import { UserCircleIcon, LockClosedIcon, EnvelopeIcon } from '@heroicons/react/24/outline';

import useMediaQuery from '@/hooks/useMediaQuery';
import CustomButtom from '@/components/CustomButtom';
import CustomInput from '@/components/CustomInput';

type Props = {};

const Signup = (props: Props) => {

  /* change flex direction of section if screen size is too small */
  const aboveMediumScreen = useMediaQuery("(min-width: 1060px)");
  const flexDirection = aboveMediumScreen ? "flex-row" : "flex-col"
  
  return (
    <section className={`h-screen
                         flex
                         ${flexDirection}
                         justify-center
                         items-center
                         text-center
                         font-main
                         text-white
                         p-15`}
             id="login"
      >
      <div className="border-2 
                    border-white 
                    p-5 
                    w-[30rem] 
                    backdrop-blur-xl 
                    bg-transparent
                    rounded-3xl">
        <form className="flex flex-col justify-center items-center gap-3 p-5">
          <h1 className="text-5xl"> Signup </h1>
          <h2 className="text-3xl"> Hi there! Let's start your journey with us. </h2>
          <div className="w-full">
            <CustomInput  type="email" 
                          placeholder="Email" 
                          title="Email" 
                          customization=""/>
            <EnvelopeIcon className="w-6 text-white absolute right-25 top-1/3 translate-y-16 translate-3" />
          </div>
          <div className="w-full">
            <CustomInput  type="password" 
                          placeholder="Password" 
                          title="password" 
                          customization=""/>
            <LockClosedIcon className=" w-6 text-white absolute right-22 bottom-1/3 translate-y-6"/>
          </div>
          <CustomButtom page="login" 
                        customization="w-5/6">
            Sign Up
          </CustomButtom>
        </form>
      </div>
    </section>
  );

};

export default Signup;