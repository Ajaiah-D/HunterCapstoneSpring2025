import React from 'react';
import CustomButtom from '@/components/CustomButtom';

type Props = {};

const Analyze = (props: Props) => {

  return (
    <section
      className="
        gap-16 
        py-10 
        md:h-full 
        md:pb-0 
        text-white
        font-main"
    >
      <div 
        className="
          container
          mx-auto 
          px-4
          py-8">
        <h1 className="text-3xl font-bold mb-8 mt-8">
            Sleep Analysis
        </h1>
        <div className="grid gap-8 md: grid-cols-2">
          <div>
            <h2 className="text-xl font-semibold"> Log Sleep Data </h2>
            <form className="flex flex-col">
              <label className="mb-2 ml-1 mt-4"> 
                Date 
              </label>
              <input 
                type="date"
                id="date"
                className="border-2 
                         border-white 
                           rounded-md 
                           w-60 
                           py-2 
                           px-2"
                required
              />
              <label className="mb-2 ml-1 mt-4"> 
                Bed Time 
              </label>
              <input 
                type="time"
                id="bedtime"
                className="border-2 
                         border-white 
                           rounded-md 
                           w-60 
                           py-2 
                           px-2"
                required
              />
              <label className="mb-2 ml-1 mt-4"> 
                Wake Time 
              </label>
              <input 
                type="time"
                id="waketime"
                className="border-2 
                         border-white 
                           rounded-md 
                           w-60 
                           py-2 
                           px-2"
                required
              />
              <label className="mb-2 ml-1 mt-4"> 
                Hours Slept
              </label>
              <input 
                type="number"
                className="border-2 
                         border-white 
                           rounded-md 
                           w-60 
                           py-2 
                           px-2"
                readOnly
              />
              <button type="submit"
                      className="rounded-md 
                                  px-10 
                                  py-2 
                                  mt-4
                                  w-50
                                bg-lightcoral
                                  hover:bg-transparent
                                  hover: border-2
                                  hover: text-white
                                  hover: border-lightcoral"
              >
                Save Sleep Data
              </button>

            </form>
          </div>
        </div>
      </div>
    </section>
  );

};

export default Analyze;