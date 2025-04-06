import React, { useContext, useState } from "react";
// import { LockClosedIcon, EnvelopeIcon } from '@heroicons/react/24/outline';
import { RiGoogleLine } from "react-icons/ri";

import useMediaQuery from "@/hooks/useMediaQuery";
import CustomInput from "@/components/CustomInput";
import CustomButton from "@/components/CustomButton";
import { AuthContext } from "@/components/AuthProvider";
import { useNavigate } from "react-router";
import { UserLogin, UserSignup } from "@/types/interface";
import { auth } from "@/firebaseConfig";
import { motion } from "framer-motion";

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
    const flexDirection = aboveMediumScreen ? "flex-row" : "flex-col";
    const heightLength = aboveMediumScreen ? "h-screen" : "h-fit";

    const [loading, setLoading] = useState(false);
    const [userLoginInfo, setUserLoginInfo] = useState(userLoggingIn);
    const [userSignupInfo, setUserSignupInfo] = useState(newUser);
    const [error, setError] = useState("");
    const [onLogin, setOnLogin] = useState(true);

    const { googleSignIn, logIn, signUp, updateUsername, user } =
        useContext(AuthContext);

    const navigate = useNavigate();

    // google login and sign up
    const handleGoogleSignin = async (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        try {
            setLoading(true);
            await googleSignIn();
            navigate("/profile");
        } catch (error) {
            if (
                typeof error === "object" &&
                error &&
                "message" in error &&
                typeof error.message === "string"
            ) {
                // message gets narrowed to string!
                setError(error.message);
                console.log(error);
            }
        }
    };

    // logging in user
    const handleLoginSubmit = async (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        setLoading(true);
        try {
            console.log("Signing In.");
            await logIn(userLoginInfo);
            navigate("/profile");
        } catch (error) {
            if (
                typeof error === "object" &&
                error &&
                "message" in error &&
                typeof error.message === "string"
            ) {
                setLoading(false);
                // message gets narrowed to string!
                return setError(error.message);
            }
        }
    };

    // creating a new user
    const handleSignupSubmit = async (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (userSignupInfo.password !== userSignupInfo.confirmPassword) {
                setLoading(false);
                return setError(
                    "Passwords MUST match. Please confirm your password again."
                );
            }
            setLoading(true);
            await signUp(userSignupInfo);
            if (user != null) {
                updateUsername(user, userSignupInfo.displayName);
                console.log(auth.currentUser);
                navigate("/profile");
            }
        } catch (error) {
            if (
                typeof error === "object" &&
                error &&
                "message" in error &&
                typeof error.message === "string"
            ) {
                // message gets narrowed to string!
                setError(error.message);
            }
        }
        setLoading(false);
    };

    // login motion 
    // need to add motion when changing between login and sign up pages


    console.log("Login page rendered!");

    return (
        <section
            className={`${heightLength}
                center
                font-main
                text-header
                p-15
            `}
            id="login"
        >
            <div className={`flex ${flexDirection} rounded-2xl w-5/6 h-full mt-10 text-white border-4 border-white`}>
                <div className="flex-1">
                    {/* the welcome message on the login page */}
                    <motion.div
                        className="center gap-5 h-full pb-3 bg-white"
                        hidden={!onLogin}
                    >
                        <h1 className="text-6xl font-header font-semibold bg-[url(@/assets/starfall.gif)] bg-cover bg-clip-text text-transparent">
                            Welcome, Friend!
                        </h1>
                        <h2 className="text-5xl bg-[url(@/assets/starfall.gif)] bg-cover bg-clip-text bg-left-top text-transparent">
                            Let's get you back in
                        </h2>
                    </motion.div>
                    {/* signup part */}
                    <form
                        className="center gap-3 pt-5 h-full"
                        hidden={onLogin}
                    >
                        <h1 className="text-3xl">Signup</h1>
                        <div className="w-full">
                            <CustomInput
                                type="string"
                                placeholder="Name"
                                value={userSignupInfo.displayName}
                                title="name"
                                onChange={(e) =>
                                    setUserSignupInfo({
                                        ...userSignupInfo,
                                        displayName: e.target.value,
                                    })
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
                                    setUserSignupInfo({
                                        ...userSignupInfo,
                                        email: e.target.value,
                                    })
                                }
                            />
                        </div>
                        <div className="w-full">
                            <CustomInput
                                type="password"
                                value={userSignupInfo.password}
                                placeholder="Password"
                                title="password"
                                onChange={(e) =>
                                    setUserSignupInfo({
                                        ...userSignupInfo,
                                        password: e.target.value,
                                    })
                                }
                            />
                        </div>
                        <div className="w-full">
                            <CustomInput
                                type="password"
                                value={userSignupInfo.confirmPassword}
                                placeholder="Confirm Password"
                                title="password"
                                onChange={(e) =>
                                    setUserSignupInfo({
                                        ...userSignupInfo,
                                        confirmPassword: e.target.value,
                                    })
                                }
                            />
                        </div>
                        <CustomButton
                            onClick={handleSignupSubmit}
                            customization="w-4/6"
                            disabled={loading}
                        >
                            Sign Up
                        </CustomButton>
                        {/* Clicking the button will switch to the signup page */}
                        <p>
                            Already have an account?
                            <CustomButton
                                noOriginalStyle={true}
                                customization="underline hover:text-lightcoral ml-1"
                                onClick={(e) => {
                                    setOnLogin(true);
                                    setError("");
                                }}
                            >
                                Login
                            </CustomButton>
                        </p>
                        {/* printing the error if an error is returned */}
                        {error && <div className="error text-white">{error}</div>}
                    </form>
                </div>
                <div className="flex-1">
                    {/* Welcome message to user on signup page  */}
                    <div
                        className="center gap-5 pt-5 h-full bg-white"
                        hidden={onLogin}
                    >
                        <h1 className="text-6xl font-header font-semibold bg-[url(@/assets/starfall.gif)] bg-cover bg-clip-text text-transparent">
                            Hi, there!
                        </h1>
                        <h2 className="text-3xl bg-[url(@/assets/starfall.gif)] bg-cover bg-clip-text text-transparent">
                            Let's start your journey with us!
                        </h2>
                        <div className="gap-5 flex flex-col">
                            <div className="social-icons">
                                <button
                                    className="border-2 border-lightcoral bg-[url(@/assets/starfall.gif)] bg-cover rounded-xl p-2 w-full flex gap-2 hover:bg-bottom"
                                    onClick={handleGoogleSignin}
                                    disabled={loading}
                                >
                                    <RiGoogleLine className="translate-y-1" />
                                    <p className="">Login with Google</p>
                                </button>
                            </div>
                        </div>
                    </div>
                    {/* Login Part */}
                    <form
                        className="center gap-3 h-full pt-5 pb-5"
                        hidden={!onLogin}
                    >
                        <h1 className="text-5xl">Login</h1>
                        <div className="w-full">
                            <CustomInput
                                type="email"
                                value={userLoginInfo.email}
                                placeholder="Email"
                                title="Email"
                                onChange={(e) =>
                                    setUserLoginInfo({ ...userLoginInfo, email: e.target.value })
                                }
                            />
                        </div>
                        <div className="w-full">
                            <CustomInput
                                type="password"
                                value={userLoginInfo.password}
                                placeholder="Password"
                                title="password"
                                onChange={(e) =>
                                    setUserLoginInfo({
                                        ...userLoginInfo,
                                        password: e.target.value,
                                    })
                                }
                            />
                        </div>
                        <div className="w-4/6 flex justify-between">
                            <div>
                                <input type="checkbox" className="mr-2" />
                                <label htmlFor="" className="">
                                    Remember Me
                                </label>
                            </div>
                            <CustomButton
                                noOriginalStyle={true}
                                customization="underline hover:text-lightcoral ml-5"
                            >
                                Forgot Password
                            </CustomButton>
                        </div>
                        <CustomButton onClick={handleLoginSubmit} customization="w-4/6">
                            Sign In
                        </CustomButton>
                        <p>
                            Don't have an account?
                            <CustomButton
                                noOriginalStyle={true}
                                customization="underline hover:text-lightcoral ml-1"
                                onClick={(e) => {
                                    setOnLogin(false);
                                    setError("");
                                }}
                            >
                                Sign Up
                            </CustomButton>
                        </p>
                        {error && <div className="error text-white">{error}</div>}
                        {/* Leads to login page when clicked */}
                        <div className="social-icons">
                            <button
                                className="border-2 border-white rounded-xl p-2 flex gap-2"
                                onClick={handleGoogleSignin}
                                disabled={loading}
                            >
                                <RiGoogleLine className="translate-y-1" /> Login with Google
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Login;
