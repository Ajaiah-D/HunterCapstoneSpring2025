import { useState } from 'react'
import './App.css'

import Navbar from '@/components/navbar'
import { BrowserRouter, Routes, Route } from 'react-router'
import Analyze from '@/pages/analyze'
import Login from '@/pages/login'
import Mental from '@/pages/mental'
import Why from '@/pages/why'

function App() {

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
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
