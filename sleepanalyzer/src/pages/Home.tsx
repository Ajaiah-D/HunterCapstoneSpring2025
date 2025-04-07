import React from "react";
import useMediaQuery from "@/hooks/useMediaQuery";
import { ParallaxProvider } from 'react-scroll-parallax';
import { TypeAnimation } from 'react-type-animation';
import ParallaxScroll from '@/components/ParallaxScroll';
import CustomButton from "@/components/CustomButton";
// import CustomInput from "@/components/CustomInput";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";

type Props = {};

const Home = (props: Props) => {
    // const aboveMediumScreen = useMediaQuery("(min-width: 1060px)");

    return (
        <section className="font-main text-white">
            <ParallaxProvider>
                <ParallaxScroll backimage="/src/assets/starfall.gif" foreimage="/src/assets/rock.png" height="h-screen">
                    <div className="center text-white">
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
                                className="uppercase sm:text-7xl md:text-8xl lg:text-9xl text-3xl [text-shadow:_0_10px_0_rgb(55_70_176_/_40%)]"
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
                <div id="why" className="p-10 h-screen w-screen bg-[#080044] grid place-items-center"
                >
                    <motion.div className="center w-4/6 gap-3 p-5"
                        variants={{
                            hidden: {opacity: 0, y: 75},
                            visible: {opacity: 1, y: 0}
                        }}
                        initial="hidden"
                        transition={{ duration: 0.5, delay: 0.25 }}
                        whileInView={"visible"}
                    >
                            <h1 className="font-header text-5xl mb-10">Why Sleep Analyzer?</h1>
                            <p className="text-3xl"> Sleep is critical to our development, health and everyday life.</p>
                            <p> Lack of sleep can lead to: </p>
                            <ul className="list-disc w-fit grid m-auto">
                            <li>Daytime sleepiness and less energy</li>
                            <li>Greater risk in getting severe diseases</li>
                            </ul>
                    </motion.div>
                </div>
                <div id="what" className="p-10 text-white bg-linear-to-b from-[#080044] to-[#33A7FA] h-screen grid place-items-center">
                    <motion.div className="center w-5/6 gap-5"
                        variants={{
                            hidden: {opacity: 0, y: 75},
                            visible: {opacity: 1, y: 0}
                        }}
                        initial="hidden"
                        transition={{ duration: 0.5, delay: 0.25 }}
                        whileInView={"visible"}
                    >
                        <h1 className="font-header text-5xl mb-10">What do we do?</h1>
                        <div className="gap-10 center">
                            <div className="flex-1">
                                <h2 className="font-header text-5xl mb-10">Analyze</h2>
                                <h3> Analzye sleep data to help you better understand your sleep </h3>
                            </div>
                            <div className="flex-1">
                                <h2 className="font-header text-5xl mb-10">Recommend</h2>
                                <h3> Recommend ways on how you can improve your sleep quality </h3>
                            </div>
                            <div className="flex-1">
                                <h2 className="font-header text-5xl mb-10">Track</h2>
                                <h3> Save and track your sleep data so you can see how it has changed and improved. </h3>
                            </div>
                        </div>
                        <CustomButton page="analyze" customization="center mt-10 gap-2" noOriginalStyle={true}>
                            <FaArrowRight/>
                            Try It Now!
                        </CustomButton>
                    </motion.div>
                </div>
                {/* <div id="contacts" className="p-10 text-black bg-lightcoral h-screen grid place-items-center">
                    <div className="w-full gap-3 p-5 center">
                        <h1 className="font-header text-5xl mb-10">Need help? Contact us</h1>
                        <CustomInput placeholder="Name" type="string" title="Name">
                        </CustomInput>
                        <CustomInput placeholder="Email" type="email" title="Email">
                        </CustomInput>
                        <CustomInput placeholder="Message" type="string" title="Message" customization="h-[200px] text-wrap">
                        </CustomInput>
                    </div>
                </div> */}
            </ParallaxProvider>
        </section>
    );

};

export default Home;