// import useMediaQuery from "@/hooks/useMediaQuery";
import { BsFillClipboard2DataFill } from "react-icons/bs";
import { MdDataExploration } from "react-icons/md";
import { MdSelfImprovement } from "react-icons/md";
import { FaCircleArrowRight } from "react-icons/fa6";

import { ParallaxProvider } from "react-scroll-parallax";
import { TypeAnimation } from "react-type-animation";
import ParallaxScroll from "@/components/ParallaxScroll";
import CustomButton from "@/components/CustomButton";
import SlideInTransition from "@/components/SlideInTransition";

const Home = () => {
  // const aboveMediumScreen = useMediaQuery("(min-width: 1060px)");
  const why = [
    {id: 1, text: "Greater risk in getting severe diseases"},
    {id: 2, text: "Daytime sleepiness and less energy"},
    {id: 3, text: "Poor sleep quality which has been linked to higher risk of heart disease"},
  ];

  const what = [
    {id: 1, icon: <BsFillClipboard2DataFill />, header: "Analyze", text: "Analyze sleep data to help you better understand your sleep"},
    {id: 2, icon: <MdSelfImprovement />, header: "Improve", text: "Recommend ways on how you can improve your sleep quality"},
    {id: 3, icon: <MdDataExploration/> , header: "Track", text: "Save and track your sleep data so you can see how it has changed and improved."},
  ];

  return (
    <section className="text-white">
      <ParallaxProvider>

        {/* welcome section */}
        <ParallaxScroll
          backimage="/src/assets/starfall.gif"
          foreimage="/src/assets/rock.png"
          height="min-h-screen"
        >
          <div className="center text-white">
            <div className="min-h-[3.5/6]">
              <TypeAnimation
                sequence={[
                  "Sleep Stressfree",
                  3000,
                  "Sleep Better",
                  3000,
                  "Sleep More",
                  3000,
                ]}
                repeat={Infinity}
                speed={{ type: "keyStrokeDelayInMs", value: 100 }}
                className="uppercase sm:text-7xl md:text-8xl lg:text-9xl text-3xl [text-shadow:_0_10px_0_rgb(55_70_176_/_40%)]"
              />
            </div>
            <p className="mt-8 text-4xl">The only way to understand sleep</p>

          </div>
        </ParallaxScroll>

        {/* why sleep analyzer section */}
        <div
          id="why"
          className="p-10 pt-15 h-fit w-screen bg-linear-to-b from-[#080044] to-darkblue grid place-items-center overflow-y-hidden"
        >
          <SlideInTransition
            className="center w-fit gap-5 text-3xl"
            repeat={true}
          >
            <h1 className="text-5xl">Why Sleep Analyzer?</h1>
            <img src="src/assets/insomnia.png" alt="Insomnia" />
            <div className="center">
              <p className="text-4xl w-3/4">
                Lack of sleep can lead to:
              </p>
              {why.map((item) => (
                <div key={item.id} className="flex gap-3 mt-5 text-left w-full bg-white rounded-2xl">
                  <p
                    className="text-black w-full p-5"
                  >
                    {item.text}
                  </p>
                </div>
              ))}
              <div className="text-2xl mt-5 flex gap-2">
                Learn More 
                <CustomButton
                  page="why"
                  customization="translate-y-1"
                  noOriginalStyle={true}
                >
                  <FaCircleArrowRight className="hover:fill-brightblue" />
                </CustomButton>
              </div>
            </div>
          </SlideInTransition>
        </div>

        {/* what we do section */}
        <div
          id="what"
          className="text-white bg-linear-to-b from-darkblue via-brightblue to-softviolet h-fit w-screen grid place-items-center overflow-y-hidden pb-5"
        >
          <SlideInTransition
            className="center w-screen gap-5"
            repeat={true}
          >
          <div className="center gap-5 w-screen">
            <h1 className="text-5xl mt-10"> What do we do? </h1>
            {what.map((item) => (
              <div key={item.id} className="flex flex-col gap-3 mt-5 p-5 text-left w-[90%] text-black bg-white border-2 border-skyblue rounded-lg">
                <div className="text-5xl flex gap-5 border-b-2 border-skyblue">
                  {item.icon}
                  <h2 className="text-4xl mb-10">{item.header}</h2>
                </div>
                <div>
                  <p>{item.text}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-2xl mt-5 flex gap-2">
            Try It Out Now! 
            <CustomButton
                  page="why"
                  customization="translate-y-1"
                  noOriginalStyle={true}
            >
              <FaCircleArrowRight className="hover:fill-brightblue" />
            </CustomButton>
          </div>
          </SlideInTransition>
        </div>
                
      </ParallaxProvider>
    </section>
  );
};

export default Home;
