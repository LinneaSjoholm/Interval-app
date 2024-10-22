import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom'

import './App.css'
import './frontend/setTimer.css'
import './frontend/countDown.css'
import img from './img/logotyp.png'

import SetTimer from './backend/components/setTimer'
import LoadingScreen from './backend/components/loadingScreen'
import CountDown from './backend/components/CountDown'

function App() {
  const [ timerProps, setTimerProps ] = useState({});

  const handleStartTimer = (seconds, isInterval, pauseDuration) => {
    setTimerProps({ seconds, isInterval, pauseDuration });
  };

  return (
    <Router>
    <div className="View">
      <div className="View__iphone">
        <div className="View__iphone-screen">
          <div className="View__iphone-top"></div>
          <div className="Background__circle1"></div>
          <div className="Background__circle2"></div>
          <div className="Background__circle3"></div>
          <div className="Background__circle4"></div>

      <Routes>
        <Route path="/" element={<LoadingScreen img={img} />} />
        <Route path="/set-timer" element={<SetTimer onStart={handleStartTimer} />} />
        <Route path="/countdown" element={<CountDown {...timerProps} />} />
      </Routes>

      <div className="View__iphone-bottom"></div>
      </div>
      </div>
    </div>
    
    </Router>
  )
}

export default App
