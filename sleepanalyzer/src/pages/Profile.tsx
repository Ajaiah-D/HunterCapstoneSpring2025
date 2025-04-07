import { AuthContext } from "@/components/AuthProvider";
import CustomButton from "@/components/CustomButton";
import React, { useContext } from "react";
import { useNavigate } from "react-router";

type Props = {};

const Profile = (props: Props) => {
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();
  const userName = user ? user.email : "Guest";

  const handleClick = async () => {
    try {
      await logOut();
      navigate("/login");
      console.log("Logout Success!");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#AF95F2] via-[#4361FE] to-[#2C229E] text-gray-900 font-main flex flex-col items-center justify-center p-10 gap-10 text-center">
      
      {/* Greeting */}
      <div>
        <h1 className="text-5xl font-bold mb-2">Welcome, {userName}!</h1>
        <p className="text-xl text-white">Here’s your sleep dashboard.</p>
      </div>

      {/* Navigation Buttons */}
      <div className="flex gap-4">
        <CustomButton onClick={() => navigate("/analyze")}>
          Analyze New Sleep
        </CustomButton>
        <CustomButton onClick={() => navigate("/history")}>
          View Sleep History
        </CustomButton>
      </div>

      {/* Chart Placeholder */}
      <div className="text-gray-400 w-full max-w-2xl bg-gray-800 rounded-lg p-6 mt-6">
        <div className="">📊</div>
        <h2 className="text-2xl font-semibold mb-4">Sleep Quality Overview</h2>
        <p>
          Charts coming soon! You’ll be able to see trends in your sleep quality
          once data is saved.
        </p>
      </div>

      {/* Logout */}
      <div className="mt-8">
        <CustomButton onClick={handleClick}>Logout</CustomButton>
      </div>
    </div>
  );
};

export default Profile;
