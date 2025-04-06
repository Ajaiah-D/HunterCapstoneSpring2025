import React from 'react';
import { useState } from 'react';
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid"
import CustomLink from './CustomLink';
import useMediaQuery from '@/hooks/useMediaQuery';

type Props = {
  isTopOfPage: boolean;
};

const Navbar = ({ isTopOfPage }: Props) => {
  const flexBetween = "flex items-center justify-between";

  // changes navbar dependinng on screen size
  const aboveMediumScreen = useMediaQuery("(min-width: 1060px)");
  const [isMenuToggled, setIsMenuToggled] = useState<boolean>(false);

  // scrolling will add a navbar background
  const navbarBackground = isTopOfPage ? "" : "bg-[#33a7fa] drop-shadow";

  return (
    <nav>
      <div
        className={`
          ${navbarBackground} 
          ${flexBetween} 
          fixed 
          top-0 
          z-30 
          w-full 
          py-6 
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
                  <CustomLink page="" textColor="white"> 
                    Sleep 
                  </CustomLink>
                </div>
                
                {/* LEFT SIDE OF NAVBAR */}
                {/* determines how the navbar will appear on the screen depending on the screen size */}

                { aboveMediumScreen ? (
                  <div className={`${flexBetween} gap-8`}>
                    <CustomLink page="" textColor="white">Home</CustomLink>
                    <CustomLink page="why" textColor="white">Why Sleep Analyzer?</CustomLink>
                    <CustomLink page="analyze" textColor="white">Analyze</CustomLink>
                    {/* <CustomLink page="mental" textColor="white">Mental Health</CustomLink> */}
                    <CustomLink page="login" textColor="white">Login</CustomLink>
                  </div> ) 
                : (
                  // create hamburger menu if screen size is not large
                  <button
                    className="rounded-full bg-lightcoral p-2"
                    onClick={() => setIsMenuToggled(!isMenuToggled)}
                  >
                    <Bars3Icon className="h-6 w-6 text-white" />
                  </button>
                )}

                {/* MOBILE MENU */}
                { !aboveMediumScreen && isMenuToggled && (
                  <div 
                    className="fixed
                               right-0 
                               bottom-0 
                               z-100 
                               w-[300px]
                               h-full
                              bg-[#33a7fa]
                               drop-shadow-xl">
                    <div className="flex justify-end p-12">
                      <button 
                        onClick={() => setIsMenuToggled(!isMenuToggled)}>
                        <XMarkIcon className="h-6 w-g text-pink-300" />
                      </button>
                    </div>

                    <div className='center gap-10 text-2xl bg-[#33a7fa] p-10'>
                      <CustomLink page="" textColor="white">Home</CustomLink>
                      <CustomLink page="why" textColor="white">Why Sleep Analyzer?</CustomLink>
                      <CustomLink page="analyze" textColor="white">Analyze</CustomLink>
                      <CustomLink page="mental" textColor="white">Mental Health</CustomLink>
                      <CustomLink page="login" textColor="white">Login</CustomLink>
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
