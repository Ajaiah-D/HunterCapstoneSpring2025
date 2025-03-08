import React from "react";
import useMediaQuery from "@/hooks/useMediaQuery";
import nightsky from "@/assets/nightsky.jpg";

type Props = {};

const Home = (props: Props) => {
  const aboveMediumScreen = useMediaQuery("(min-width: 1060px)");

  return (
    <section
      id="home"
      className="gap-16 bg-blue-500 py-10 md:h-full md:pb-0 text-center"
    >
      <div id="cover" className="md:flex mx-auto w-5/6 items-center justify-center md:h-5/6">
        <div className="z-10 mt-32 md:basis-3/5">
          <div className="md:-mt-20">
            {/* <div className="relative">
              <div className="before:absolute before:-top-20">
              </div>
            </div> */}
            <h1 className="text-6xl font-header">The better way to understand sleep</h1>
            <button>Start Now</button>
          </div>
        </div>
      </div>
    </section>
  );

};

export default Home;