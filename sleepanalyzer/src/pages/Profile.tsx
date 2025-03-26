import { AuthContext } from '@/components/AuthProvider';
import CustomButton from '@/components/CustomButton';
import React, { useContext } from 'react'
import { useNavigate } from 'react-router';

type Props = {}

const Profile = (props: Props) => {
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();
  const userName = user ? user.displayName : "Guest";

  const handleClick = async() => {
    try {
      await logOut();
      navigate("/login");
      console.log("Logout Success!")
    } catch(error) {
      console.log(error)
    }
  }

  return (
    <div className="container flex flex-col justify-center items-center text-center h-full gap-5">
        <div>
          <h1 className="text-6xl">Profile</h1>
          <h1 className="text-5xl">Hi, {userName}!</h1>
        </div>
        <div>
          <CustomButton onClick={handleClick}>
              Logout
          </CustomButton>
        </div>
    </div>
    
  )
};

export default Profile;