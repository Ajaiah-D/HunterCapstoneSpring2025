import React from 'react';
import { Hourglass } from 'ldrs/react';
import "ldrs/react/Hourglass.css"

type Props = {};

const Loading = (props: Props) => {
  
  return (
    <div className="w-screen h-screen center bg-gradient-to-br from-softviolet via-brightblue to-darkblue">
      <div className="bg-white center gap-10 p-15 rounded-3xl">
        <Hourglass size={60} speed={1.5} color="lightcoral"></Hourglass>
        <h1 className="text-3xl">
          We're running as fast as we can...
        </h1>
      </div>
    </div>
  );

};

export default Loading;