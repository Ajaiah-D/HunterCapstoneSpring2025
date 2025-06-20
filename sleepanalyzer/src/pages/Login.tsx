import { useContext, useState, useEffect } from "react";
import { RiGoogleLine } from "react-icons/ri";

import useMediaQuery from "@/hooks/useMediaQuery";
import CustomInput from "@/components/CustomInput";
import CustomButton from "@/components/CustomButton";
import { AuthContext } from "@/components/AuthProvider";
import { useNavigate } from "react-router";
import { UserLogin, UserSignup } from "@/types/interface";
import { motion } from "framer-motion";
import getFirebaseErrorMessage from "@/hooks/getFirebaseErrorMessage";

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

const Login = () => {

  /* when page reloads, start at the beginning of the page */
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  /* change flex direction of section if screen size is too small */
  const aboveMediumScreen = useMediaQuery("(min-width: 1060px)");
  const flexDirection = aboveMediumScreen ? "flex-row" : "flex-col";
  const messageVisible = aboveMediumScreen ? "visible" : "hidden";
  const aboveSmallScreen = useMediaQuery("(min-width: 600px)");
  const heightLength = aboveSmallScreen ? "h-screen" : "h-fit";
  
  // determines if the button should be disabled on not, prevents double checking 
  const [loading, setLoading] = useState(false);

  // determines whether we should be on the signup or login page
  const [onLogin, setOnLogin] = useState(true);

  const [userLoginInfo, setUserLoginInfo] = useState(userLoggingIn);
  const [userSignupInfo, setUserSignupInfo] = useState(newUser);
  const [error, setError] = useState<String | null>(null);


  const { googleSignIn, logIn, signUp, user } = useContext(AuthContext);
        

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
        navigate("/profile");
    }
  }, [user]);


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
        "code" in error &&
        typeof error.code === "string"
      ) {
        // message gets narrowed to string!
        setError(getFirebaseErrorMessage(error.code));
        console.log(error);
      }
    }
  };

  // logging in user
  const handleLoginSubmit = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      await logIn(userLoginInfo);
      navigate("/profile");
    } catch (error) {
      if (
        typeof error === "object" &&
        error &&
        "code" in error &&
        typeof error.code === "string"
      ) {
        setLoading(false);
        // message gets narrowed to string!
        setError(getFirebaseErrorMessage(error.code));
        console.log(error);
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
    } catch (error) {
      if (
        typeof error === "object" &&
        error &&
        "code" in error &&
        typeof error.code === "string" 
      ) {
        setLoading(false);
        // message gets narrowed to string!
        setError(getFirebaseErrorMessage(error.code));
        console.log(error);
      }
    }
    setLoading(false);
  };

  // login motion
  // TO DO: add motion when changing between login and sign up pages

  return (
    <section
      className={`h-screen
                center
                text-header
                p-15
                w-full
            `}
      id="login"
    >
      <div
        className={`flex ${flexDirection} rounded-2xl w-5/6 ${heightLength} mt-15 text-white border-4 border-white`}
      >
        <div className="flex-1">

          {/* the welcome message on the login page */}

          <motion.div
            className="center gap-5 h-full p-2 bg-white"
            hidden={!onLogin}
          >
            <h1 className="text-6xl font-header font-semibold bg-[url(@/assets/starfall.gif)] bg-cover bg-clip-text text-transparent p-2">
              Welcome, Friend!
            </h1>
            <h2 className={`text-5xl bg-[url(@/assets/starfall.gif)] bg-cover bg-clip-text bg-left-top text-transparent ${messageVisible}`}>
              Let's get you back in
            </h2>
          </motion.div>

          {/* signup part */}
          <form className="center gap-3 p-5 h-full" hidden={onLogin}>
            <h1 className="text-3xl">Signup</h1>
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
                customization="underline hover:text-black ml-1"
                onClick={() => {
                  setOnLogin(true);
                  setError("");
                }}
              >
                Login
              </CustomButton>
            </p>

          </form>
        </div>

        <div className="flex-1">

          {/* Welcome message to user on signup page  */}
          <div className="center gap-5 p-2 h-full bg-white" hidden={onLogin}>
            <h1 className="text-6xl font-header font-semibold bg-[url(@/assets/starfall.gif)] bg-cover bg-clip-text text-transparent p-2">
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
          <form name = "login" className="center gap-3 h-full pt-5 pb-5" hidden={!onLogin}>
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
              <div></div>

              <CustomButton
                noOriginalStyle={true}
                customization="underline hover:text-black ml-5"
                page="ForgotPassword"
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
                customization="underline hover:text-black ml-1"
                onClick={() => {
                  setOnLogin(false);
                  setError("");
                }}
              >
                Sign Up
              </CustomButton>
            </p>

            {/* Leads to login page when clicked */}
            <div className="social-icons">
              <button
                className="border-2 border-white rounded-xl p-2 flex gap-2 bg-[url(@/assets/starfall.gif)] bg-cover hover:bg-bottom"
                onClick={handleGoogleSignin}
                disabled={loading}
              >
                <RiGoogleLine className="translate-y-1" /> Login with Google
              </button>
            </div>
          </form>
        </div>
        
      </div>

      {/* Error message if there is an error */}
      {error && 
          <div 
            className="fixed bg-red-400 text-white p-5 right-3 bottom-3 rounded-md drop-shadow-xl">
            {error}
          </div>
      }

    </section>
  );
};

export default Login;
