import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

// pages that we can navigate to
import Navbar from "@/components/Navbar";
import Analyze from "@/pages/Analyze";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Why from "@/pages/Why";
import Profile from "@/pages/Profile";
import ForgotPassword from "@/pages/ForgotPassword";
import PageNotFound from "@/pages/404";

// components to protect or determine what pages show
import AuthProvider from "@/components/AuthProvider";
import ProtectedRoutes from "@/components/ProtectedRoutes";
import useAuth from "./hooks/useAuth";
import Footnote from "./components/Footnote";


function App() {
  const { user } = useAuth();

  // creates a background for navbar if we scroll, so we can see nav bar
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

  // end of create background for navbar

  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Navbar isTopOfPage={isTopOfPage} currentUser={user}/>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/index" element={<Home />} />
            <Route path="Why" element={<Why />} />
            <Route path="Analyze" element={<Analyze />} />
            <Route path="ForgotPassword" element={<ForgotPassword />} />
            
            {/* Links that appear based on status of user */}
            {user ? (<><Route element={<ProtectedRoutes />}>
              <Route path="Profile" element={<Profile user={user} />}/>
            </Route></>) : (<><Route path="Login" element={<Login />}/></>)}

            {/* Paths that do not exist go to 404 page */}
            <Route path="*" element={<PageNotFound />}/>
            
          </Routes>
          <Footnote />
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
