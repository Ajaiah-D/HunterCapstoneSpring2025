import React, { useContext, useState } from 'react';
import { LockClosedIcon, EnvelopeIcon } from '@heroicons/react/24/outline';
import { RiGoogleLine } from "react-icons/ri";

import useMediaQuery from '@/hooks/useMediaQuery';
import CustomButtom from '@/components/CustomButtom';
import CustomInput from '@/components/CustomInput';
import { AuthContext } from '@/components/AuthProvider';
import { useNavigate } from 'react-router';
import { UserLogin } from '@/types/interface';

type Props = {};

const userLoggingIn: UserLogin = {
  email: "",
  password: "",
};

const Login = (props: Props) => {

  /* change flex direction of section if screen size is too small */
  // const aboveMediumScreen = useMediaQuery("(min-width: 1060px)");
  // const flexDirection = aboveMediumScreen ? "flex-row" : "flex-col"
  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState(userLoggingIn);
  const [error, setError] = useState("");

  const {googleSignIn, logIn} = useContext(AuthContext);
   const navigate = useNavigate();

  const handleGoogleSignin = async(e: React.MouseEvent<HTMLElement>) => {
      e.preventDefault();
      try {
          setLoading(true);
          await googleSignIn();
          navigate("/profile");
      } catch(error) {
          if (typeof error === "object" && 
              error && "message" in error &&
              typeof error.message === "string"
          ) {
            // message gets narrowed to string!
            setError(error.message)
            console.log(error);
          };
      }
  }

  const handleSubmit = async(e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        try {
            console.log("Signing In.")
            await logIn(userInfo);
            navigate("/profile");
        } catch(error) {
          if (typeof error === "object" && 
            error && "message" in error &&
            typeof error.message === "string"
          ) {
            setLoading(false);
            // message gets narrowed to string!
            return setError(error.message);
          };
        }
    }
  
  return (
    <section className={`h-screen
                         flex
                         justify-center
                         items-center
                         text-center
                         font-main
                         text-white
                         p-15`}
             id="login"
      >
      {/* <div className="border-2 border-amber-950 
                      p-5 
                      flex 
                      flex-col 
                      justify-center 
                      items-center 
                      h-[20rem]
                      w-[30rem]
                      gap-3">
        <h1 className="text-3xl md:font-bold">
          Hi, there!
        </h1>
        <p>
          Don't have an account? Begin your journey with us!
        </p>
        <CustomButtom page="#" customization="w-1/2">
            Sign Up
        </CustomButtom>
      </div> */}
      <div className="border-2 
                    border-white 
                    p-5 
                    w-[30rem] 
                    backdrop-blur-xl 
                    bg-transparent
                    rounded-3xl">
        <form className="flex flex-col justify-center items-center gap-3 p-5" onSubmit={handleSubmit}>
          <h1 className="text-5xl"> Login </h1>
          <h2 className="text-3xl"> Let's get you back in </h2>
          <div className="w-full">
            <CustomInput  type="email" 
                          value={userInfo.email}
                          placeholder="Email" 
                          title="Email" 
                          onChange={(e) => 
                            setUserInfo({ ...userInfo, email: e.target.value})
                          }
                          />
            <EnvelopeIcon className="w-6 text-white absolute right-25 top-1/4 translate-y-9 translate-3" />
          </div>
          <div className="w-full">
            <CustomInput  type="password" 
                          value={userInfo.password}
                          placeholder="Password" 
                          title="password"
                          onChange={(e) => 
                            setUserInfo({ ...userInfo, password: e.target.value})
                          } 
                          />
            <LockClosedIcon className=" w-6 text-white absolute right-22 bottom-1/2"/>
          </div>
          <button>
            Sign In
          </button>
          <CustomButtom page="signup" 
                        customization="w-5/6">
            Sign Up
          </CustomButtom>
          {
            error &&
            <div className="error text-zinc-900">
              {error}
            </div>
          }
          <div className="gap-5 flex flex-col">
              <div>
                <hr className="border-t-2 border-white"/>
                <p> OR </p>
                <hr className="border-t-2 border-white"/>
              </div>
              <div className="social-icons">
                <button className="border-2 border-white rounded-xl p-2" onClick={handleGoogleSignin} disabled={loading}>
                  <RiGoogleLine/>
                </button>
              </div>
          </div>
        </form>
      </div>
    </section>
  );

};

export default Login;