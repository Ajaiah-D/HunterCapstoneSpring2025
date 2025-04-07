import useMediaQuery from "@/hooks/useMediaQuery";
import React from "react";

type Props = {};

const Why = (props: Props) => {
  const aboveMediumScreen = useMediaQuery("(min-width: 1060px)");
  const flexDirection = aboveMediumScreen ? "flex-row" : "flex-col";
  const heightLength = aboveMediumScreen ? "h-screen" : "h-fit";

  return (
    <section
      className={`center bg-gradient-to-br from-[#AF95F2] via-[#4361FE] to-[#2C229E] ${heightLength} w-screen text-white gap-8`}
    >
      <div className="grid gap-8 p-5 sm:mt-15">
        <h1 className="text-6xl">Why Sleep Analzyer?</h1>

        {/* explaining why we need sleep analyzer */}
        <div className="text-center grid gap-5">
          <h2 className="text-5xl">The Need</h2>
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
        <div className="text-center grid gap-10">
          <h1 className="text-6xl">Why is sleep debt a bad thing?</h1>
          <p className="w-4/6 m-auto grid">
            Sleep is critical to our development. Lack of sleep can lead to
            health problems, negatively affect your life, affect your judgement
            and even possibly endanger your life.
          </p>

          {/* some numbers to prove why sleep debt is bad */}
          {/* TO DO: NEED TO CHANGE PICTURES FOR EACH BULLET */}
          <h3 className="text-4xl">The Statistics</h3>
          <div className={`flex ${flexDirection} gap-5`}>
            <div className="center gap-3 flex-1">
              <img
                src="https://media.istockphoto.com/id/1330603241/vector/man-with-heart-attack-pain-touching-chest-heart-treatment-health-care-and-disease-diagnostic.jpg?s=612x612&w=0&k=20&c=Z0JUqeFLODFlqePkacQAPPMi1Xrh56ujjlHPFO1ehs0="
                className="h-[100px] rounded-4xl"
              />
              <p>48% increased risk of developing heart disease</p>
            </div>
            <div className="center gap-3 flex-1">
              <img
                src="https://media.istockphoto.com/id/1330603241/vector/man-with-heart-attack-pain-touching-chest-heart-treatment-health-care-and-disease-diagnostic.jpg?s=612x612&w=0&k=20&c=Z0JUqeFLODFlqePkacQAPPMi1Xrh56ujjlHPFO1ehs0="
                className="h-[100px] rounded-4xl"
              />
              <p>3x more likely to develop Type II Diabetes</p>
            </div>
            <div className="center gap-3 flex-1">
              <img
                src="https://media.istockphoto.com/id/1330603241/vector/man-with-heart-attack-pain-touching-chest-heart-treatment-health-care-and-disease-diagnostic.jpg?s=612x612&w=0&k=20&c=Z0JUqeFLODFlqePkacQAPPMi1Xrh56ujjlHPFO1ehs0="
                className="h-[100px] rounded-4xl"
              />
              <p>33% increased risk of dementia</p>
            </div>
            <div className="center gap-3 flex-1">
              <img
                src="https://media.istockphoto.com/id/1330603241/vector/man-with-heart-attack-pain-touching-chest-heart-treatment-health-care-and-disease-diagnostic.jpg?s=612x612&w=0&k=20&c=Z0JUqeFLODFlqePkacQAPPMi1Xrh56ujjlHPFO1ehs0="
                className="h-[100px] rounded-4xl"
              />
              <p>
                Sleep debt have also caused lead to 6000 fatal car crashes
                because 1 in 25 people fall asleep behind the wheel.
              </p>
            </div>
          </div>

        </div>
        
      </div>
    </section>
  );
};

export default Why;
