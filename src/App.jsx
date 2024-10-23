import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import './App.css'
import './frontend/setTimer.css'
import './frontend/digitalTimer.css'
import './frontend/analogTimer.css'
import './frontend/pauseView.css'
import './frontend/endView.css'
import img from './img/logotyp.png'

import StartPage from './backend/components/startPage'
import SetTimer from './backend/components/setTimer'
import DigitalTimer from './backend/components/digitalTimer'
import PauseView from './backend/components/pauseView'
import EndView from './backend/components/endView'


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

      <Routes>
        <Route path="/" element={<StartPage img={img} />} />
        <Route path="/set-timer" element={<SetTimer onStart={handleStartTimer} />} />
        <Route path="/digital-timer" element={<DigitalTimer {...timerProps} />} />
        <Route path="/pause" element={<PauseView />} />
        <Route path="/end" element={<EndView />} />
      </Routes>

      <div className="View__iphone-bottom"></div>
      </div>
      </div>
    </div>

    </Router>
  )
};

export default App
