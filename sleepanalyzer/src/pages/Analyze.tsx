import useMediaQuery from "@/hooks/useMediaQuery";
import React, { useState } from "react";

const Analyze = () => {
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

  const [response, setResponse] = useState(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formattedData = {
      age: Number(formData.age),
      gender: Number(formData.gender),
      sleep_duration: Number(formData.sleep_duration),
      rem_sleep_percentage: Number(formData.rem_sleep_percentage),
      light_sleep_percentage: Number(formData.light_sleep_percentage),
      awakenings: Number(formData.awakenings),
      caffeine_consumption: Number(formData.caffeine_consumption),
      alcohol_consumption: Number(formData.alcohol_consumption),
      smoking_status: Number(formData.smoking_status),
      exercise_frequency: Number(formData.exercise_frequency),
    };

    try {
      const res = await fetch("http://127.0.0.1:8000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formattedData),
      });

      const data = await res.json();
      setResponse(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // responsive height
  const aboveMediumScreen = useMediaQuery("(min-width: 1060px)");
  const height = !response || aboveMediumScreen ? "h-screen" : "h-fit";
  const columns = aboveMediumScreen ? "grid-cols-2" : "grid-cols-1";

  return (
    <div className={`center ${height} bg-gradient-to-br from-[#AF95F2] via-[#4361FE] to-[#2C229E]`}>
      <div className="h-[90px]"></div>
      <div className="w-full max-w-3xl p-4">

        {/* form to put in sleep data */}
        <form onSubmit={handleSubmit} className="space-y-4 bg-white border-2 border-gray-300 shadow-xl rounded-lg p-8">
          <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
            Analyze Your Sleep
          </h1>
          <div className={`grid ${columns} gap-4`}>
            <input
              className="border p-2 rounded bg-gray-100 text-gray-800"
              name="age"
              type="number"
              placeholder="Age"
              onChange={handleChange}
              required
            />
            <select
              className="border p-2 rounded bg-gray-100 text-gray-800"
              name="gender"
              onChange={handleChange}
            >
              <option value="0">Male</option>
              <option value="1">Female</option>
            </select>
            <input
              className="border p-2 rounded bg-gray-100 text-gray-800"
              name="sleep_duration"
              type="number"
              placeholder="Sleep Duration (hours)"
              onChange={handleChange}
              required
            />
            <input
              className="border p-2 rounded bg-gray-100 text-gray-800"
              name="rem_sleep_percentage"
              type="number"
              placeholder="REM Sleep %"
              onChange={handleChange}
              required
            />
            <input
              className="border p-2 rounded bg-gray-100 text-gray-800"
              name="light_sleep_percentage"
              type="number"
              placeholder="Light Sleep %"
              onChange={handleChange}
              required
            />
            <input
              className="border p-2 rounded bg-gray-100 text-gray-800"
              name="awakenings"
              type="number"
              placeholder="Awakenings"
              onChange={handleChange}
              required
            />
            <input
              className="border p-2 rounded bg-gray-100 text-gray-800"
              name="caffeine_consumption"
              type="number"
              placeholder="Caffeine Consumption"
              onChange={handleChange}
              required
            />
            <input
              className="border p-2 rounded bg-gray-100 text-gray-800"
              name="alcohol_consumption"
              type="number"
              placeholder="Alcohol Consumption"
              onChange={handleChange}
              required
            />
            <select
              className="border p-2 rounded bg-gray-100 text-gray-800"
              name="smoking_status"
              onChange={handleChange}
            >
              <option value="0">Non-Smoker</option>
              <option value="1">Smoker</option>
            </select>
            <input
              className="border p-2 rounded bg-gray-100 text-gray-800"
              name="exercise_frequency"
              type="number"
              placeholder="Exercise Frequency"
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Predict
          </button>
        </form>

        {response && (
          <div className="mt-6 p-4 border rounded bg-white text-center shadow-md">
            <h2 className="text-xl font-semibold text-gray-800">Results:</h2>
            <p className="text-2xl font-bold text-blue-700">
              {response.sleep_efficiency}% Sleep Efficiency
            </p>

            <h3 className="text-lg font-semibold mt-4 text-gray-800">
              Recommendations:
            </h3>
            <ul className="text-left mx-auto max-w-md text-gray-700">
              {response.recommendations.length > 0 ? (
                response.recommendations.map((rec: string, index: number) => (
                  <li key={index} className="mt-1">
                    ✔ {rec}
                  </li>
                ))
              ) : (
                <p className="text-gray-500 italic">
                  No recommendations needed. Your sleep is good!
                </p>
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Analyze;
