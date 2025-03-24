import { AuthContext } from '@/components/AuthProvider';
import CustomButtom from '@/components/CustomButtom';
import React, { useContext } from 'react'
import { useNavigate } from 'react-router';

type Props = {}

const Profile = (props: Props) => {
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();
  const userExists = user ? true : false
  const userName = userExists ? user?.email : "Guest" 

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
          <button onClick={handleClick}>
              Sign Out
          </button>
        </div>
    </div>
    
  )
};

export default Profile;