import CustomButton from '@/components/CustomButton';
import React from 'react';

type Props = {};

const Error = (props: Props) => {
  
  return (
    <div className="w-screen h-screen center bg-gradient-to-br from-softviolet to-brightblue">
      <div className="bg-white center gap-10 p-15 rounded-3xl">
        <h1 className="text-5xl">
          Nothing to see here!
        </h1>
        <p className="text-3xl">
          Uh-oh. We lost you somewhere along the way.
        </p>
        <CustomButton page="home" customization="hover:bg-lightcoral/50 transition border-2 border-lightcoral p-5 rounded-3xl bg-lightcoral text-white" noOriginalStyle={true}>
          Let's get you back on track!
        </CustomButton>
      </div>
    </div>
  );

};

export default Error;