import React from 'react';
import { useState } from 'react';
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid"
import { Link } from 'react-router-dom'
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
  const navbarBackground = isTopOfPage ? "" : "bg-blue-100 drop-shadow";

  return (
    <nav>
      <div
        className={`${navbarBackground} ${flexBetween} fixed top-0 z-30 w-full py-6`}
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
                <div>
                    <Link to="/home"> Sleep </Link>
                </div>
                
                {/* LEFT SIDE OF NAVBAR */}
                {/* determines how the navbar will appear on the screen depending on the screen size */}

                { aboveMediumScreen ? (
                  <div className={`${flexBetween} gap-8 text-sm`}>
                    <Link to="/why">Why Sleep Analyzer?</Link>
                    <Link to="/analyze">Analyze</Link>
                    <Link to="/mental">Mental Health</Link>
                    <Link to="/login">Login</Link>
                  </div> ) 
                : (
                  // create hamburger menu if screen size is not large
                  <button
                    className="rounded-full bg-blue-100 p-2"
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
                               z-40 
                               w-[300px]
                               h-screen
                               bg-blue-300 
                               drop-shadow-xl">
                    <div className="flex justify-end p-12">
                      <button 
                        onClick={() => setIsMenuToggled(!isMenuToggled)}>
                        <XMarkIcon className="h-6 w-g text-pink-300" />
                      </button>
                    </div>

                    <div className='ml-[33%] flex flex-col gap-10 text-2xl'>
                      <Link to="/"> Home </Link>
                      <Link to="/why">Why Sleep Analyzer?</Link>
                      <Link to="/analyze">Analyze</Link>
                      <Link to="/mental">Mental Health</Link>
                      <Link to="/login">Login</Link>
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