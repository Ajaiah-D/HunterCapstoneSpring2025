import React from 'react';
import { useState } from 'react';
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid"
import { Link } from 'react-router-dom'

type Props = {};

const Navbar = (props: Props) => {
  const flexBetween = "flex items-center justify-between";
  
  return (
    <nav>
      <div
        className={`${flexBetween} fixed top-0 z-30 w-full py-6`}
        >
        <div
          className={`${flexBetween} mx-auto w-5/6`}
          >
          <div 
            className={`${flexBetween} w-full gap-16`}
            >
            <div 
              className={`${flexBetween} w-full`}
              >
                <div>
                    <Link to="/home"> Sleep </Link>
                </div>
                {/* The left side of navbar */}
                <div className={`${flexBetween} gap-8 text-sm`}>
                    <Link to="/why">Why Sleep Analyzer?</Link>
                    <Link to="/analyze">Analyze</Link>
                    <Link to="/mental">Mental Health</Link>
                    <Link to="/login">Login</Link>
                </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;