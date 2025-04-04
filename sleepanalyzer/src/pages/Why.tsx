import { section } from 'framer-motion/client';
import React from 'react';

type Props = {};

const Why = (props: Props) => {
  
  return (
    <section className="center bg-[#080044] h-screen w-screen text-white flex flex-col justify-center items-center gap-8">
      <div className="text-center grid gap-10">
        <h1 className="text-6xl">
          Why Sleep Analzyer?
        </h1>
        <p className="w-4/6 m-auto grid">
          Sleep is critical to our development. Lack of sleep can lead to health problems, 
          negatively affect your life, affect your judgement and even possibly endanger your life. 
        </p>
        <h3 className="text-4xl">
          The Statistics
        </h3>
      </div>
      <div className="text-center w-4/6 grid gap-5">
        <h2 className="text-5xl">
          The Need
        </h2>
        <p> Sleep deprivation is and disorder is becoming increasingly prevanlent throughtout the world. </p>
      </div>
    </section>
  );

};

export default Why;