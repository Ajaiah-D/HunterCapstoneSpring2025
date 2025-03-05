import React from 'react';
import { useState } from 'react';

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
              <div 
                className={`${flexBetween} gap-8 text-sm`}
                >
                <p>Home</p>
                <p>Analyze Sleep</p>
                <p>Mental Health</p>
                <p>Why Sleep Analyzer?</p>
              </div>
              <div>
                <p>Sign In</p>
                <p>Sign Up</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;