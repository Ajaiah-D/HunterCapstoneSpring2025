import SlideInTransition from "@/components/SlideInTransition";
import useMediaQuery from "@/hooks/useMediaQuery";
import React, { useEffect, useState } from "react";
import useAuth from "@/hooks/useAuth";

type ResponseType = {
  sleep_efficiency: number;
  recommendations?: string[];
};

const Analyze = () => {

  /* when page reloads, start at the beginning of the page */
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [formData, setFormData] = useState({
    age: "",
    gender: "0",
    sleep_duration: "",
    rem_sleep_percentage: "",
    light_sleep_percentage: "",
    awakenings: "",
    caffeine_consumption: "",
    alcohol_consumption: "",
    smoking_status: "0",
    exercise_frequency: "",
  });

  const [response, setResponse] = useState<ResponseType | null>(null);
  const [token, setToken] = useState("");
  const [datares, setDataRes] = useState<Response>();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const { user } = useAuth();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  {/* Analyzing Data and Fetching Recommendations */}
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");
    setResponse(null);

    const formattedData = {
      age: Number(formData.age),
      sleep_duration: Number(formData.sleep_duration),
      rem_sleep_percentage: Number(formData.rem_sleep_percentage),
      light_sleep_percentage: Number(formData.light_sleep_percentage),
      awakenings: Number(formData.awakenings),
      caffeine_consumption: Number(formData.caffeine_consumption),
      alcohol_consumption: Number(formData.alcohol_consumption),
      smoking_status: Number(formData.smoking_status),
      exercise_frequency: Number(formData.exercise_frequency),
    };

    if (!user) {
      setErrorMsg("You must be signed in to analyze your sleep.");
      setLoading(false);
      return;
    } else {
      try {
        setToken(await user.getIdToken());
        const res = await fetch("http://127.0.0.1:8000/predict", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formattedData),
        });
        const data: ResponseType = await res?.json();
        setResponse(data);
        setDataRes(res);
      } catch (error: any) {
        setErrorMsg("Prediction failed: " + error.message);
        throw new Error(`Server returned ${datares?.status}`);
      } finally {
        setLoading(false);
      }
    }
  };

  // responsive elements
  const aboveMediumWidth = useMediaQuery("(min-width: 1060px)");
  const aboveMediumHeight = useMediaQuery("(min-height: 1000px)");
  const columns = aboveMediumWidth || aboveMediumHeight ? "grid-cols-2" : "grid-cols-1";

  return (
    <div
      className={`center min-h-screen bg-gradient-to-br from-[#AF95F2] via-[#4361FE] to-[#2C229E]`}
    >
      <SlideInTransition className="w-full max-w-3xl p-4 m-30">
        <form
          onSubmit={handleSubmit}
          className="space-y-4 bg-white border-2 border-gray-300 shadow-xl rounded-lg p-8"
        >
          <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
            Analyze Your Sleep
          </h1>
          <div className={`grid ${columns} gap-4`}>
            <input
              name="age"
              type="number"
              placeholder="Age"
              required
              onChange={handleChange}
              className="input"
            />
            <select name="gender" onChange={handleChange} className="input">
              <option value="0">Male</option>
              <option value="1">Female</option>
            </select>
            <input
              name="sleep_duration"
              type="number"
              placeholder="Sleep Duration (hours)"
              required
              onChange={handleChange}
              className="input"
            />
            <input
              name="rem_sleep_percentage"
              type="number"
              placeholder="REM Sleep %"
              required
              onChange={handleChange}
              className="input"
            />
            <input
              name="light_sleep_percentage"
              type="number"
              placeholder="Light Sleep %"
              required
              onChange={handleChange}
              className="input"
            />
            <input
              name="awakenings"
              type="number"
              placeholder="Awakenings per night"
              required
              onChange={handleChange}
              className="input"
            />
            <input
              name="caffeine_consumption"
              type="number"
              placeholder="Caffeine (drinks per day)"
              required
              onChange={handleChange}
              className="input"
            />
            <input
              name="alcohol_consumption"
              type="number"
              placeholder="Alcohol (drinks per day)"
              required
              onChange={handleChange}
              className="input"
            />
            <select
              name="smoking_status"
              onChange={handleChange}
              className="input"
            >
              <option value="0">Non-Smoker</option>
              <option value="1">Smoker</option>
            </select>
            <input
              name="exercise_frequency"
              type="number"
              placeholder="Exercise per week (days)"
              required
              onChange={handleChange}
              className="input"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            {loading ? "Analyzing..." : "Predict"}
          </button>

          {errorMsg && (
            <p className="text-red-600 text-center mt-2">{errorMsg}</p>
          )}
        </form>

        {/* printing out the analysis and recommendations from the model */}
        {response && (
          <div className="mt-6 p-4 border rounded bg-white text-center shadow-md">
            <h2 className="text-xl font-semibold text-gray-800">Results:</h2>
            <p className="text-2xl font-bold text-blue-700">
              {response.sleep_efficiency}% Sleep Efficiency
            </p>
            {response.recommendations && (
              <>
                <h3 className="text-lg font-semibold mt-4 text-gray-800">
                  Recommendations:
                </h3>
                <ul className="text-left mx-auto max-w-md text-gray-700">
                  {response.recommendations.length > 0 ? (
                    response.recommendations.map(
                      (rec: string, index: number) => (
                        <li key={index} className="mt-1">
                          ✔ {rec}
                        </li>
                      )
                    )
                  ) : (
                    <p className="text-gray-500 italic">
                      No recommendations needed. Your sleep is good!
                    </p>
                  )}
                </ul>
              </>
            )}
          </div>
        )}

        <p className="text-white text-center p-2">
          The backend has not yet been deployed, so this page is not able to analyze data right now
          unless this project is ran locally. Sorry for the inconvenience and thank you for visiting
          our website.
        </p>

      </SlideInTransition>
    </div>
  );
};

export default Analyze;
