import { useEffect, useState } from "react";
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

// components to protect or determine what pages show
import AuthProvider from "@/components/AuthProvider";
import ProtectedRoutes from "@/components/ProtectedRoutes";

function App() {

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
            {/* Forces page to go to homepage if path does not exist */}
            <Route path="*" element={<Navigate to="/" />} />
            <Route path="Why" element={<Why />} />
            <Route path="Analyze" element={<Analyze />} />
            {/* <Route path="Mental" element={<Mental />} /> */}
            <Route path="Login" element={<Login />} />

            {/* can only access after logging in */}
            <Route element={<ProtectedRoutes />}>
              <Route path="Profile" element={<Profile />} />
            </Route>

            <Route path="*" element={<Login />}/>
            
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
