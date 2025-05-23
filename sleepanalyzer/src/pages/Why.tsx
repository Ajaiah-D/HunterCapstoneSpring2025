import CustomLink from "@/components/CustomLink";
import useMediaQuery from "@/hooks/useMediaQuery";
import { useEffect } from "react";

import login from "@/assets/login.gif";
import heartdisease from "@/assets/heartdisease.jpeg";
import diabetes from "@/assets/diabetes.jpg";
import dementia from "@/assets/dementia.jpg";
import carcrash from "@/assets/carcrash.jpeg";


const Why = () => {

  /* when page reloads, start at the beginning of the page */
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const aboveMediumScreen = useMediaQuery("(min-width: 1060px)");
  const flexDirection = aboveMediumScreen ? "flex-row" : "flex-col";

  const stats = [
    {id: heartdisease, headline: "48% increased risk", text: "of developing heart disease", image: "src/assets/heartdisease.jpeg"},
    {id: diabetes, headline: "3x more likely", text: "to develop Type II Diabetes", image: "src/assets/diabetes.jpg"},
    {id: dementia, headline: "33% increased risk", text: "of dementia", image: "src/assets/dementia.jpg"},
    {id: carcrash, headline: "6000 fatal", text: "car crashes because 1 in 25 people fall asleep behind the wheel", image: "src/assets/carcrash.jpeg"},
  ];

  return (
    <div className={`h-fit overflow-x-hidden text-white`}>
      <div className="center h-[80vh] bgoverlay">
        <h1 className="mt-50 text-6xl">Why Sleep Analzyer?</h1>
        <img
          src={`${login}`}
          className="w-[70vw] max-h-[80vh] rounded-4xl border-4 translate-y-10"
        />
      </div>

      {/* explaining why we need sleep analyzer */}
      <div className="bg-gradient-to-br from-softviolet to-brightblue">
        <div className="center gap-10 p-40 pb-0">
          <h2 className="text-5xl p-4 mt-5">Because It's Necessary</h2>
          <p>
            Sleep is something we all need, but let’s be honest—it doesn’t always come easy. 
            It’s such a big part of our overall health, affecting everything from our mood to 
            our energy levels, but a lot of us still struggle to get enough of it. Whether 
            it’s trouble falling asleep, waking up throughout the night, or dealing with things 
            like insomnia or sleep apnea, sleep issues are more common than you might think.
          </p>
          <p>
            What’s even more eye-opening is how widespread these issues are. Sleep deprivation 
            and disorders are on the rise all over the world, including right here in America. 
            According to the American Academy of Sleep Medicine and HCA Healthcare, more than 
            half of American adults—and 60% of teens—aren’t getting enough sleep.
          </p>
          <p>
            On top of that, nearly 30% of people say they have trouble just falling asleep 
            (National Health and Nutrition Examination Survey, 2017-2020), and about 70 million 
            Americans—that’s one in five—have an actual diagnosed sleep disorder. So, if you’ve 
            been struggling, you’re definitely not alone.
          </p>
          <p>
            What’s surprising, though, is that even though nearly 80% of adults say they want to improve 
            their sleep, only about 40% have talked to a doctor or sought any kind of help (Phillips, 2019). 
            That’s a pretty big gap—and it shows just how important it is to start taking sleep seriously.
          </p>
        </div>

        {/* negative effects of sleep deprivation */}
        <div className="p-10 gap-5 text-black">
          <div className="bg-white p-10 pt-20 pb-20 rounded-3xl center gap-10">
            <h1 className="text-5xl">
              Why should we care about sleep?
            </h1>
            <p className="w-5/6">
              Sleep plays a big role in how we grow and function. When we don’t get enough 
              of it, it can mess with our health, cloud our judgment, and in some cases, 
              even put us in danger.
            </p>

            {/* some numbers to prove why sleep debt is bad */}
            <h3 className="text-4xl pb-4 border-b-2 border-darkblue">
              The Statistics
            </h3>
            <div className={`center gap-5 text-black relative object-contain`}>
              {stats.map((stat) => (
                <div key={stat.id} className={`flex ${flexDirection} items-center justify-center gap-3 p-5 w-[50rem]`}>
                  <img
                    src={`${stat.id}`}
                    className="w-[300px] rounded-full border-4 border-darkblue"
                  />
                  <div className="stat w-1/2">
                    <h1 className="text-4xl">{stat.headline}</h1>
                    <p className="">{stat.text}</p>
                  </div>
                </div>
              ))}
            </div>
            <CustomLink 
              page="https://www.hopkinsmedicine.org/health/wellness-and-prevention/the-effects-of-sleep-deprivation" 
              className="w-full text-right hover:text-brightblue transition"
              external={true}
            >
              Source: John Hopkins
            </CustomLink>
          </div>
        </div>
      </div>

      {/* benefits of sleep analyzer */}
      <div className="center p-30 gap-10 bg-gradient-to-tr from-brightblue to-darkblue">
        <h1 className="text-6xl">What can a sleep analyzer do for you?</h1>
        <p>
          That’s when a sleep analyzer can really help. It tracks your sleep quality and patterns, 
          then offers personalized tips to help you get better rest. And it’s not just a gimmick—
          77% of users say a sleep analyzer has been helpful (AASM, 2023), and 68% have actually 
          improved their sleep habits because of it (AASM, 2023). That kind of impact shows 
          just how effective these tools can be, so if you’ve been struggling with sleep, 
          a sleep analyzer might be the simple first step toward feeling better, thinking clearer, 
          and finally getting the rest you deserve.
        </p>
      </div>

    </div>
  );
};

export default Why;
