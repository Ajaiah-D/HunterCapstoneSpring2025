import { useContext, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

// pages that we can navigate to
import Navbar from "@/components/Navbar";
import Analyze from "@/pages/Analyze";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
// import Mental from "@/pages/Mental";
import Why from "@/pages/Why";
import Profile from "@/pages/Profile";
import Error from "@/pages/Error";
import ForgotPassword from "@/pages/ForgotPassword";

// components to protect or determine what pages show
import AuthProvider, { AuthContext } from "@/components/AuthProvider";
import ProtectedRoutes from "@/components/ProtectedRoutes";
import { getAuth } from "firebase/auth";
import { auth } from "./firebaseConfig";


function App() {
  const user = auth.currentUser;
  console.log("login: ", user);
  //creates a background for navbar if we scroll
  const [isTopOfPage, setIsTopOfPage] = useState<boolean>(true);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY === 0) {
        setIsTopOfPage(true);
      }
      if (window.scrollY !== 0) setIsTopOfPage(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Navbar isTopOfPage={isTopOfPage} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="Why" element={<Why />} />
            <Route path="Analyze" element={<Analyze />} />
            {/* <Route path="Mental" element={<Mental />} /> */}
            {user ? (<><Route element={<ProtectedRoutes />}>
              <Route path="Profile" element={<Profile />}/>
            </Route></>) : (<><Route path="Profile" element={<Profile />}/></>)}
            <Route path="ForgotPassword" element={<ForgotPassword />} />

            <Route path="*" element={<Error />}/>
            
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;