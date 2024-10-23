import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom'
import { NavProvider } from './backend/components/navContext'

import './App.css'
import './frontend/setTimer.css'
import './frontend/digitalTimer.css'
import './frontend/analogTimer.css'
import './frontend/sideMenu.css'
import './frontend/pauseView.css'
import './frontend/endView.css'
import img from './img/logotyp.png'

import StartPage from './backend/components/startPage'
import SideMenu from './backend/components/sideMenu'
import SetTimer from './backend/components/setTimer'
import DigitalTimer from './backend/components/digitalTimer'
import AnalogTimer from './backend/components/analogTimer'
import TextTimer from './backend/components/textTimer'
import PauseView from './backend/components/pauseView'
import EndView from './backend/components/endView'


function App() {
  const [ timerProps, setTimerProps ] = useState({});

  const handleStartTimer = (seconds, isInterval, pauseDuration) => {
    setTimerProps({ seconds, isInterval, pauseDuration });
  };

  return (
    <Router>
    <NavProvider>
    <div className="View">
      <div className="View__iphone">
        <div className="View__iphone-screen">
          <div className="View__iphone-top"></div>

          <SideMenu />

      <Routes>
        <Route path="/" element={<StartPage img={img} />} />
        <Route path="/set-timer" element={<SetTimer onStart={handleStartTimer} />} />
        <Route path="/digital-timer" element={<DigitalTimer {...timerProps} />} />
        <Route path="/analog-timer" element={<AnalogTimer {...timerProps} />} />
        <Route path="/text-timer" element={<TextTimer seconds={214} isInterval={false} pauseDuration={0} />} />
        <Route path="/pause" element={<PauseView />} />
        <Route path="/end" element={<EndView />} />
      </Routes>

      <div className="View__iphone-bottom"></div>
      </div>
      </div>
    </div>
    
    
    </NavProvider>
    </Router>
  )
};

export default App
