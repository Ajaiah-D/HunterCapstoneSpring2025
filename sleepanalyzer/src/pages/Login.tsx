import React, { useContext, useState } from 'react';
// import { LockClosedIcon, EnvelopeIcon } from '@heroicons/react/24/outline';
import { RiGoogleLine } from "react-icons/ri";

import useMediaQuery from '@/hooks/useMediaQuery';
import CustomInput from '@/components/CustomInput';
import { AuthContext } from '@/components/AuthProvider';
import { useNavigate } from 'react-router';
import { UserLogin, UserSignup } from '@/types/interface';
import { Link } from 'react-router-dom';
import CustomButton from '@/components/CustomButton';
import { auth } from '@/firebaseConfig';

type Props = {};

const userLoggingIn: UserLogin = {
  email: "",
  password: "",
};

const newUser: UserSignup = {
  email: "",
  password: "",
  confirmPassword: "",
  displayName: "",
};

const Login = (props: Props) => {

    /* change flex direction of section if screen size is too small */
    const aboveMediumScreen = useMediaQuery("(min-width: 1060px)");
    const flexDirection = aboveMediumScreen ? "flex-row" : "flex-col"
    const [loading, setLoading] = useState(false);
    const [userLoginInfo, setUserLoginInfo] = useState(userLoggingIn);
    const [userSignupInfo, setUserSignupInfo] = useState(newUser);
    const [error, setError] = useState("");
    const [onLogin, setOnLogin] = useState(true);

    const {googleSignIn, logIn, signUp, updateUsername, user} = useContext(AuthContext);

    const navigate = useNavigate();

    // google login and sign up
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

    // logging in user
    const handleLoginSubmit = async(e: React.MouseEvent<HTMLElement>) => {
          e.preventDefault();
          setLoading(true);
          try {
              console.log("Signing In.")
              await logIn(userLoginInfo);
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

    // creating a new user
    const handleSignupSubmit = async(e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (userSignupInfo.password !== userSignupInfo.confirmPassword) {
                setLoading(false);
                return setError("Passwords MUST match. Please confirm your password again.")
            }
            setLoading(true);
            await signUp(userSignupInfo);
            if(user != null) {
                updateUsername(user, userSignupInfo.displayName); 
                console.log(auth.currentUser);
                navigate("/profile");
            }
        } catch(error) {
            if (typeof error === "object" && 
              error && "message" in error &&
              typeof error.message === "string"
            ) {
                // message gets narrowed to string!
                setError(error.message);
            };
        }
        setLoading(false);
    }
        
    console.log("Login page rendered!");

    return (
        <section className={`h-screen
          flex
          ${flexDirection}
          justify-center
          items-center
          text-center
          font-main
          text-header
          p-15
          bg-[url(/src/assets/starfall.gif)]
          bg-cover`}

        >
            <div className="border-2 flex rounded-2xl w-[50rem] h-5/6 text-[#fff]">
                <div className="flex-1">
                    {/* leading you to sign up page from login part */}
                    <div className="flex flex-col justify-center items-center gap-5 h-full" hidden={!onLogin}>
                        <h1 className="text-6xl font-header font-semibold">Welcome</h1>
                        <h2 className="text-3xl"> Let's get you back in </h2>
                        <p>
                            Don't have an account?
                        </p>
                        <CustomButton customization="w-4/6" onClick={(e) => setOnLogin(false)}>
                            Sign Up
                        </CustomButton>
                    </div>
                    {/* signup part */}
                    <form 
                        className="flex flex-col justify-center items-center gap-3 h-full"
                        hidden={onLogin}
                    >
                        <h1 className="text-3xl"> 
                            Signup 
                        </h1>
                        <div className="w-full">
                            <CustomInput  
                              type="string" 
                              placeholder="Name"
                              value={userSignupInfo.displayName} 
                              title="name" 
                              onChange={(e) => 
                                  setUserSignupInfo({ ...userSignupInfo, displayName: e.target.value})
                              }
                            />
                        </div>
                        <div className="w-full">
                            <CustomInput  
                              type="email" 
                              placeholder="Email"
                              value={userSignupInfo.email} 
                              title="Email" 
                              onChange={(e) => 
                                  setUserSignupInfo({ ...userSignupInfo, email: e.target.value})
                              }
                            />
                            {/* <EnvelopeIcon className="w-6 text-white absolute right-25 top-1/3 translate-y-2 translate-3" /> */}
                        </div>
                        <div className="w-full">
                            <CustomInput  
                              type="password" 
                              value={userSignupInfo.password} 
                              placeholder="Password" 
                              title="password" 
                              onChange={(e) => 
                                setUserSignupInfo({ ...userSignupInfo, password: e.target.value})
                              }
                            />
                            {/* <LockClosedIcon className=" w-6 text-white absolute right-22 bottom-1/2 translate-y-2"/> */}
                        </div>
                        <div className="w-full">
                            <CustomInput  
                              type="password" 
                              value={userSignupInfo.confirmPassword}
                              placeholder="Confirm Password" 
                              title="password" 
                              onChange={(e) => 
                                  setUserSignupInfo({ ...userSignupInfo, confirmPassword: e.target.value})
                              }
                            />
                            {/* <LockClosedIcon className=" w-6 text-white absolute right-22 bottom-1/2 translate-y-20"/> */}
                        </div>
                        <CustomButton 
                          onClick={handleSignupSubmit}
                          customization="w-4/6"
                          disabled={loading}
                        >
                            Sign Up
                        </CustomButton>
                        {/* printing the error if an error is returned */}
                        {
                          error &&
                          <div className="error text-zinc-900">
                            {error}
                          </div>
                        }
                    </form>
                </div>
                <div className="p-5 flex-1">
                    {/* Directing you to login page from the signup page */}
                    <div className="flex flex-col justify-center items-center gap-5 h-full" hidden={onLogin}>
                        <h1 className="text-6xl font-header font-semibold">Hi, there!</h1>
                        <h2 className="text-3xl"> Let's start your journey with us! </h2>
                        <p>
                            Already have an account?
                        </p>
                        <CustomButton customization="w-4/6" onClick={(e) => setOnLogin(true)}>
                            Login
                        </CustomButton>
                        <div className="gap-5 flex flex-col">
                        <hr/>
                        <div className="social-icons">
                            <button className="border-2 border-white rounded-xl p-2 w-full flex gap-2" onClick={handleGoogleSignin} disabled={loading}>
                                <RiGoogleLine className="translate-y-1"/> <p>Login with Google</p>
                            </button>
                        </div>
                    </div>
                    </div>      
                  {/* Login Part       */}
                  <form className="flex flex-col justify-center items-center gap-3 h-full" hidden={!onLogin}>
                    <h1 className="text-5xl"> Login </h1>
                    <div className="w-full">
                      <CustomInput  type="email" 
                                    value={userLoginInfo.email}
                                    placeholder="Email" 
                                    title="Email" 
                                    onChange={(e) => 
                                      setUserLoginInfo({ ...userLoginInfo, email: e.target.value})
                                    }
                                    />
                      {/* <EnvelopeIcon className="w-6 text-white absolute right-25 top-1/4 translate-y-9 translate-3" /> */}
                    </div>
                    <div className="w-full">
                      <CustomInput  type="password" 
                                    value={userLoginInfo.password}
                                    placeholder="Password" 
                                    title="password"
                                    onChange={(e) => 
                                      setUserLoginInfo({ ...userLoginInfo, password: e.target.value})
                                    } 
                                    />
                      {/* <LockClosedIcon className=" w-6 text-white absolute right-22 bottom-1/2"/> */}
                    </div>
                    <div className="w-4/6 flex justify-between">
                        <div>
                            <input type="checkbox" className="mr-2"/>
                            <label htmlFor="" className="">
                                Remember Me
                            </label> 
                        </div>          
                        <Link 
                          to=""
                          className="hover:underline w-fit"
                        >
                            <p className="mr-2 w-full">
                                Forgot Password?
                            </p>
                        </Link>                
                    </div>
                    <CustomButton onClick={handleLoginSubmit}
                                  customization="w-4/6">
                      Sign In
                    </CustomButton>
                    <hr/>
                    {
                      error &&
                      <div className="error text-zinc-900">
                        {error}
                      </div>
                    }
                    <div className="social-icons">
                        <button className="border-2 border-white rounded-xl p-2 flex gap-2" onClick={handleGoogleSignin} disabled={loading}>
                            <RiGoogleLine className="translate-y-1"/> Login with Google
                        </button>
                    </div>
                  </form>
                </div>
            </div>
        </section>
    );

};

export default Login;