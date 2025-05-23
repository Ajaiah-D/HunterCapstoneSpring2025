import { AuthContext } from "@/components/AuthProvider";
import CustomButton from "@/components/CustomButton";
import { LuPencil } from "react-icons/lu";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import CustomInput from "@/components/CustomInput";
import { User } from "firebase/auth";

import logo from "@/assets/logo.png";

type Props = {
  user: User;
}

const Profile = ({ user }: Props) => {
  const [displayName, setDisplayName] = useState("");
  const [loading, setLoading] = useState(false);
  const { logOut, updateUsername } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    /* when page reloads, start at the beginning of the page */
    window.scrollTo(0, 0);
    
    if (user.displayName) {
      setDisplayName(user.displayName)
    }
    else if (user.email) {
      setDisplayName(user.email)
    }
  }, [user]);

  const handleUpdate = async () => {
    try {
      if(user) {
        setLoading(false);
        await updateUsername(user, displayName);
        console.log("Updated username: ", user.displayName);
      }
    } catch(error) {
      console.log(error);
    }
    setLoading(true);
  }

  const handleClick = async () => {
    try {
      await logOut();
      setTimeout(() => {
        navigate("/login");
      }, 200); // short delay
    } catch (error) {
      console.log("Logout failed:", error);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#AF95F2] via-[#4361FE] to-[#2C229E] font-main center p-10 gap-10 text-center text-white overflow-x-hidden">
      <div className="bg-darkblue/50 center p-5 mt-20 w-full">
        {/* Avatar */}
      <div>
        <img
          src={`${logo}`} 
          alt="Avatar Image"
          className="w-[100px] h-[100px] border-2 border-white rounded-[50%] grid m-auto"
        />
      </div>

      {/* Greeting */}
      <div className="center w-full">
        <div className="center w-full">
          <h1 className="text-3xl font-bold mb-2">
            Welcome, 
           </h1>
          <div className="flex flex-row justify-center items-center">
            <CustomInput 
            original={true} 
            customization="p-0 w-[50%] text-3xl font-bold text-center" 
            placeholder={displayName} 
            type="string" 
            onChange={(e) => setDisplayName(e.target.value)} 
            />
            <CustomButton
            noOriginalStyle={true}
            onClick={handleUpdate}
            disabled={loading}
            >
            <LuPencil />
          </CustomButton>
          </div>
        </div>

        <p className="text-xl">Here’s your sleep dashboard.</p>
      </div>
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
