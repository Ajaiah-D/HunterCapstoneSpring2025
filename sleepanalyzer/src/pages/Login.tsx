import React from 'react';
import CustomButtom from '@/components/CustomButtom';

type Props = {};

const Login = (props: Props) => {
  
  return (
    <section
      className="
        gap-16 
        py-10 
        md:h-full 
        md:pb-0 
        text-center 
        text-white
        font-main"
    >
      <div 
        className="
          md:flex 
          mx-auto 
          w-5/6 
          items-center 
          justify-center 
          md:h-5/6">
        <div className="z-10 mt-32 md:basis-3/5">
          <div className="md:-mt-20">
            <div className="">
              <div className="">
                <h1 className="text-6xl font-header">Login</h1>
              </div>
              <div className="mt-8">
                <p>Username</p>
                <input 
                  type="text"
                  placeholder="Username"
                  title="Username"
                >
              </input>
              </div>
            </div>
            
            <div className="mt-8">
              <CustomButtom 
                where="why" 
                color="lightcoral"
                otherCustomization="ml-8">
                Login
              </CustomButtom>
              <CustomButtom 
                where="why" 
                color="lightcoral"
                otherCustomization="ml-8"
              >
                Sign Up
              </CustomButtom>
            </div>
          </div>
        </div>
      </div>
    </section>
  );

};

export default Login;