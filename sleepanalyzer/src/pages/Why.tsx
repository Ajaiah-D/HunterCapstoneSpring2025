import SlideInTransition from "@/components/SlideInTransition";
import useMediaQuery from "@/hooks/useMediaQuery";
import { FaHeartCrack } from "react-icons/fa6";
import { PiBrainBold } from "react-icons/pi";

type Props = {};

const Why = (props: Props) => {
  const aboveMediumScreen = useMediaQuery("(min-width: 1060px)");
  const flexDirection = aboveMediumScreen ? "flex-row" : "flex-col";

  const stats = [
    {id: "heartdisease", headline: "48% increased risk", text: "of developing heart disease", image: "src/assets/heartdisease.jpg"},
    {id: "diabetes", headline: "3x more likely", text: "to develop Type II Diabetes", image: "src/assets/diabetes.jpg"},
    {id: "dementia", headline: "33% increased risk", text: "of dementia", image: "src/assets/dementia.jpg"},
    {id: "carcrash", headline: "6000 fatal", text: "car crashes because 1 in 25 people fall asleep behind the wheel", image: "https://img.freepik.com/free-vector/car-crash-concept-illustration_114360-7980.jpg?t=st=1746773191~exp=1746776791~hmac=8bf5ead449ed8fc1b295762f03e2231b6a8569fb6c3b923e28f5f38ce9af467e&w=2000"},
  ];

  return (
    <div className={`h-fit overflow-x-hidden text-white`}>
      <div className="center h-[80vh] bgoverlay">
        <h1 className="mt-50 text-6xl">Why Sleep Analzyer?</h1>
        <img
          src="src/assets/home.gif"
          className="h-[80vh] rounded-4xl border-4 translate-y-10"
        />
      </div>

      {/* explaining why we need sleep analyzer */}
      <div className="bg-gradient-to-br from-[#AF95F2] to-[#4361FE] opacity-70">
        <div className="center gap-10 p-40 pb-0">
          <h2 className="text-5xl p-4 mt-5">Because It's Necessary</h2>
          <p>
            Sleep is an essential part of our lives, and it plays a crucial role
            in our overall health and well-being. However, many people struggle
            with sleep-related issues, such as insomnia, sleep apnea, and
            restless leg syndrome. These problems can lead to a range of
            negative consequences, including fatigue, irritability, and
            difficulty concentrating. A sleep analyzer can help identify these
            issues and provide valuable insights into your sleep patterns.
          </p>
          <p>
            Sleep deprivation and disorder is becoming increasingly prevalent
            throughtout the world, including the US. According to the American
            Academy of Sleep Medicine and HCA Healthcare, 54% of Americans and
            60% of adolescents experience sleep deprivation. Almost 30% have
            trouble falling asleep (National Health and Nutrition Examination
            Survey, 2017-2020) and 70 million (about 1/5) of Americans have a
            sleeping disorder. Due to this, almost 80% of adults want to improve
            their sleep but only 40% of them have sought medical help (Phillips,
            2019).
          </p>
        </div>

        {/* negative effects of sleep deprivation */}
        <div className="p-20 gap-5 text-black">
          <div className="bg-white p-20 rounded-3xl center gap-10">
            <h1 className="text-5xl">
              Why is not getting enough sleep a bad thing?
            </h1>
            <p className="w-5/6">
              Sleep is critical to our development. Lack of sleep can lead to
              health problems, negatively affect your life, affect your
              judgement and even possibly endanger your life.
            </p>

            {/* some numbers to prove why sleep debt is bad */}
            <h3 className="text-4xl pb-4 border-b-2 border-[#2C229E]">
              The Statistics
            </h3>
            <div className={`center gap-5 text-black relative object-contain`}>
              {stats.map((stat) => (
                <div key={stat.id} className={`flex ${flexDirection} items-center justify-between gap-3 p-5 w-[50rem]`}>
                  <img
                    src={stat.image}
                    className="max-w-2/5"
                  />
                  <div className="stat max-w-1/2">
                    <h1 className="text-4xl">{stat.headline}</h1>
                    <p className="">{stat.text}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="w-full text-right">Source: John Hopkins</p>
          </div>
        </div>
      </div>

      {/* benefits of sleep analyzer */}
      <div className="center p-30 gap-10 bg-gradient-to-tr from-[#4361FE] to-[#2C229E]">
        <h1 className="text-6xl">What can a sleep analyzer do for you?</h1>
        <p>
          A sleep analyzer can help met the needs of everyone experiencing sleep
          problems by tracking your sleep quality and patterns and ways on how
          you can improve your sleep. As of right now, 77% of users have
          reported sleep analyzers were helpful (AASM, 2023) and 68% of users
          have improved their behavior and sleeping habits because of it (AASM,
          2023). This shows sleep analyzers are really effective.
        </p>
      </div>

    </div>
  );
};

export default Why;
