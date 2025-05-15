import React, { useContext } from 'react';
import { RxHamburgerMenu } from "react-icons/rx";
import { FaXmark } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import CustomLink from './CustomLink';
import useMediaQuery from '@/hooks/useMediaQuery';
import { AuthContext } from './AuthProvider';
import CustomButton from './CustomButton';

type Props = {
  isTopOfPage: boolean;
};

const Navbar = ({ isTopOfPage }: Props) => {
  const flexBetween = "flex items-center justify-between";

  // changes navbar dependinng on screen size
  const aboveMediumScreen = useMediaQuery("(min-width: 1060px)");
  const [isMenuToggled, setIsMenuToggled] = useState<boolean>(false);

  // scrolling will add a navbar background
  const navbarBackground = isTopOfPage ? "" : "bg-brightblue drop-shadow";

  const { user, logOut } = useContext(AuthContext);
  console.log("nav: ", user);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <nav>
      <div
        className={`
          ${navbarBackground} 
          ${flexBetween} 
          fixed 
          top-0 
          z-1000 
          w-full 
          font-main 
          text-2xl
        `}
        >
        <div
          className={`${flexBetween} mx-auto w-5/6`}
          >
          <div 
            className={`${flexBetween} w-full gap-16`}
            >
            <div 
              className={`${flexBetween} w-full gap-16`}
              >
                <div className="font-header">
                  <CustomLink page="" className="flex items-center gap-2 text-white"> 
                    <img src="src/assets/logo.png" alt="logo" className="h-32 w-32" />
                  </CustomLink>
                </div>
                
                {/* LEFT SIDE OF NAVBAR */}
                {/* determines how the navbar will appear on the screen depending on the screen size */}

                { aboveMediumScreen ? (
                  <div className={`${flexBetween} gap-8`}>
                    <CustomLink page="">Home</CustomLink>
                    <CustomLink page="why">Why?</CustomLink>
                    <CustomLink page="analyze">Analyze</CustomLink>
                    {/* <CustomLink page="mental">Mental Health</CustomLink> */}
                    {user ? (<><CustomLink page="profile">Hello, {user.displayName || user.email}</CustomLink>
                      <CustomButton onClick={handleLogout} noOriginalStyle={true} customization="text-white underline hover:text-lightcoral transition">Log Out</CustomButton></>) : 
                    (<CustomLink page="login">Login</CustomLink>)}
                  </div> ) 
                : (
                  // create hamburger menu if screen size is not large
                  <button
                    className="rounded-full bg-lightcoral p-2"
                    onClick={() => setIsMenuToggled(!isMenuToggled)}
                  >
                    <RxHamburgerMenu className="h-6 w-6 text-white" />
                  </button>
                )}

              {/* MOBILE MENU */}
              {!aboveMediumScreen && isMenuToggled && (
                <div
                  className="absolute
                             right-0 
                             top-0
                             z-100 
                             w-[2/5]
                             h-screen
                           bg-brightblue
                             drop-shadow-xl"
                >
                  <div className="flex justify-end p-12">
                    <button onClick={() => setIsMenuToggled(!isMenuToggled)}>
                      <FaXmark className="h-6 w-g text-pink-300" />
                    </button>
                  </div>
                  <div className='center gap-10 text-2xl bg-brightblue p-10'>
                    <CustomLink page="">Home</CustomLink>
                    <CustomLink page="why">Why?</CustomLink>
                    <CustomLink page="analyze">Analyze</CustomLink>
                    {/* <CustomLink page="mental">Mental Health</CustomLink> */}
                    {user ? (<><CustomLink page="profile">Hello, {user.displayName || user.email}</CustomLink>
                      <CustomButton onClick={handleLogout} noOriginalStyle={true} customization="text-white underline hover:text-lightcoral transition">Log Out</CustomButton></>) : 
                    (<CustomLink page="login">Login</CustomLink>)}
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
