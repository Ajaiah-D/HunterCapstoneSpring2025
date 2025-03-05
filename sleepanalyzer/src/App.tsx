import { useState } from 'react'
import './App.css'

import Navbar from './components/navbar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      Sleep Analyzer
      <Navbar />
    </>
  )
}

export default App
