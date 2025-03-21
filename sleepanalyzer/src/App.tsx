import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router'
import './App.css'

import Navbar from '@/components/Navbar'
import Analyze from '@/pages/Analyze'
import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Mental from '@/pages/Mental'
import Why from '@/pages/Why'

function App() {
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
      <BrowserRouter>
        <Navbar 
          isTopOfPage={isTopOfPage}
        />
        <Routes>
            <Route path="/" element={<Home />} />
            {/* Forces page to go to homepage if path does not exist */}
            <Route path="*" element={<Navigate to='/' />} />
            <Route path="Why" element={<Why />} />
            <Route path="Analyze" element={<Analyze />} />
            <Route path="Mental" element={<Mental />} />
            <Route path="Login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
