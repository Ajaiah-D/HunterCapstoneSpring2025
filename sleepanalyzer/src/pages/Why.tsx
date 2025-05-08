import SlideInTransition from "@/components/SlideInTransition";
import useMediaQuery from "@/hooks/useMediaQuery";

type Props = {};

const Why = (props: Props) => {
  const aboveMediumScreen = useMediaQuery("(min-width: 1060px)");

  return (
    <div 
      className={`w-screen text-white`}>
        <div className="center h-[80vh] bg-gradient-to-br from-[#2C229E] bg-[#4361FE]">
          <h1 className="mt-50 text-6xl">Why Sleep Analzyer?</h1>
          <img src="src/assets/home.gif" className="h-[80vh] rounded-4xl border-4 translate-y-10"/>
        </div>

        {/* explaining why we need sleep analyzer */}
        <div className="center p-40 bg-gradient-to-br from-[#4361FE] bg-[#2C229E]">
          <h2 className="text-5xl p-10">Because It's Necessary</h2>
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
        <div className="center p-20 gap-5 bg-gradient-to-br from-[#4361FE] bg-[#2C229E]">
          <h1 className="text-6xl">Why is not getting enough sleep a bad thing?</h1>
          <p className="w-4/6 m-auto grid">
            Sleep is critical to our development. Lack of sleep can lead to
            health problems, negatively affect your life, affect your judgement
            and even possibly endanger your life.
          </p>

          {/* some numbers to prove why sleep debt is bad */}
          {/* TO DO: NEED TO CHANGE PICTURES FOR EACH BULLET */}
          <h3 className="text-4xl">The Statistics</h3>
          <div className={`center gap-5 text-black`}>
            <div className="flex items-center justify-between gap-3 p-5 w-[50rem] border-2 border-white rounded-4xl bg-white">
              <img
                src="https://media.istockphoto.com/id/1330603241/vector/man-with-heart-attack-pain-touching-chest-heart-treatment-health-care-and-disease-diagnostic.jpg?s=612x612&w=0&k=20&c=Z0JUqeFLODFlqePkacQAPPMi1Xrh56ujjlHPFO1ehs0="
                className="h-[100px] rounded-4xl"
              />
              <p className="p-5">
                48% increased risk of developing heart disease
              </p>
            </div>
            <div className="flex items-center justify-between gap-3 p-5 w-[50rem] border-2 border-white rounded-4xl bg-white">
              <img
                src="https://media.istockphoto.com/id/1330603241/vector/man-with-heart-attack-pain-touching-chest-heart-treatment-health-care-and-disease-diagnostic.jpg?s=612x612&w=0&k=20&c=Z0JUqeFLODFlqePkacQAPPMi1Xrh56ujjlHPFO1ehs0="
                className="h-[100px] rounded-4xl"
              />
              <p className="p-5">3
                x more likely to develop Type II Diabetes
              </p>
            </div>
            <div className="flex items-center justify-between gap-3 p-5 w-[50rem] border-2 border-white rounded-4xl bg-white">
              <img
                src="https://media.istockphoto.com/id/1330603241/vector/man-with-heart-attack-pain-touching-chest-heart-treatment-health-care-and-disease-diagnostic.jpg?s=612x612&w=0&k=20&c=Z0JUqeFLODFlqePkacQAPPMi1Xrh56ujjlHPFO1ehs0="
                className="h-[100px] rounded-4xl"
              />
              <p className="p-5">
                33% increased risk of dementia
              </p>
            </div>
            <div className="text-right flex items-center justify-between gap-3 p-5 w-[50rem] border-2 border-white rounded-4xl bg-white">
              <img
                src="https://media.istockphoto.com/id/1330603241/vector/man-with-heart-attack-pain-touching-chest-heart-treatment-health-care-and-disease-diagnostic.jpg?s=612x612&w=0&k=20&c=Z0JUqeFLODFlqePkacQAPPMi1Xrh56ujjlHPFO1ehs0="
                className="h-[100px] rounded-4xl"
              />
              <p className="p-5">
                Sleep debt have also caused lead to 6000 fatal car crashes
                because 1 in 25 people fall asleep behind the wheel.
              </p>
            </div>
            <p className="text-white text-right w-[45rem]">
              Source: John Hopkins
            </p>
          </div>

        </div>

        {/* benefits of sleep analyzer */}
        <div className="center p-30 gap-10 bg-gradient-to-br from-[#4361FE] bg-[#2C229E]">
          <h1 className="text-6xl">What can a sleep analyzer do for you?</h1>
          <p>
            A sleep analyzer can help met the needs of everyone experiencing sleep problems
            by tracking your sleep quality and patterns and ways on how you can improve your sleep.
            As of right now, 77% of users have reported sleep analyzers were helpful (AASM, 2023) 
            and 68% of users have improved their behavior and sleeping habits because of it (AASM, 2023).
            This shows sleep analyzers are really effective.
          </p>

        </div>
        
    </div>
  );
};

export default Why;
