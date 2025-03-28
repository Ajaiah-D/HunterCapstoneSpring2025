import React from "react";
import useMediaQuery from "@/hooks/useMediaQuery";
import { ParallaxProvider } from 'react-scroll-parallax';
import ParallaxScroll from '@/components/ParallaxScroll';
import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
import { TypeAnimation } from 'react-type-animation';

type Props = {};

const Home = (props: Props) => {
    // const aboveMediumScreen = useMediaQuery("(min-width: 1060px)");

    return (
        <section className="font-main text-white">
            <ParallaxProvider>
                <ParallaxScroll backimage="/src/assets/nightsky.jpg">
                    <div className="md: flex flex-col items-center justify-center">
                        <div className="min-h-[3.5/6]">
                            <TypeAnimation
                                sequence={[
                                  "Sleep Stressfree",
                                  3000,
                                  "Sleep Better",
                                  3000,
                                  "Sleep More",
                                  3000
                                ]}
                                repeat={Infinity}
                                speed={{type: "keyStrokeDelayInMs", value: 100}}
                                className="text-4xl uppercase sm:text-7xl md:text-8xl lg:text-9xl"
                          />
                        </div>
                        <p className="mt-8 text-2xl">The only way to understand sleep</p>
                        
                        <div className="mt-8">
                          <CustomButton 
                            page="why" 
                          >
                            Learn More
                          </CustomButton>
                        </div>
                    </div>
                </ParallaxScroll>
                <div id="why" className="p-10 h-screen w-screen bg-black grid place-items-center">
                    <div className="w-5/6 gap-3 p-5 flex flex-col justify-center items-center">
                        <h1 className="font-header text-5xl mb-10">Why Sleep Analyzer?</h1>
                        <p className="text-3xl"> Sleep is critical to our development, health and everyday life.</p>
                        <p> Lack of sleep can lead to: </p>
                        <ul className="list-disc w-fit grid m-auto">
                          <li>Daytime sleepiness and less energy</li>
                          <li>Greater risk in getting severe diseases</li>
                        </ul>
                    </div>
                </div>
                <div id="what" className="p-10 text-black bg-white h-screen grid place-items-center">
                    <div className="w-5/6 flex flex-col justify-center items-center">
                        <h1 className="font-header text-5xl mb-10">What do we do?</h1>
                        <h2 className="font-header text-5xl mb-10">Analyze</h2>
                        <h2 className="font-header text-5xl mb-10">Recommend</h2>
                        <h2 className="font-header text-5xl mb-10">Track</h2>
                    </div>
                </div>
                <div id="contacts" className="p-10 text-black bg-lightcoral h-screen grid place-items-center">
                    <div className="w-full gap-3 p-5 flex flex-col justify-center items-center">
                        <h1 className="font-header text-5xl mb-10">Need help? Contact us</h1>
                        <CustomInput placeholder="Name" type="string" title="Name">
                        </CustomInput>
                        <CustomInput placeholder="Email" type="email" title="Email">
                        </CustomInput>
                        <CustomInput placeholder="Message" type="string" title="Message" customization="h-[200px] text-wrap">
                        </CustomInput>
                    </div>
                </div>
            </ParallaxProvider>
        </section>
    );

};

export default Home;