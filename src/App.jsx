import { useState } from 'react'

import './App.css'
import img from './img/logotyp.png'

import SetTimer from './backend/components/setTimer'
import LoadingScreen from './backend/components/loadingScreen'
import CountDown from './backend/components/CountDown'

function App() {

  const [ currentView, setCurrentView ] = useState('loadingScreen');
  const [ timerProps, setTimerProps ] = useState({});

  const handleLogoClick = () => {
    setCurrentView('setTimer');
  };

  const handleStartTimer = (seconds, isInterval, pauseDuration) => {
    setTimerProps({ seconds, isInterval, pauseDuration });
    setCurrentView('countDown');
  };

  return (
    <div className="View">
      <div className="View__iphone">
        <div className="View__iphone-screen">
          <div className="View__iphone-top"></div>
          <div className="Background__circle1"></div>
          <div className="Background__circle2"></div>
          <div className="Background__circle3"></div>
          <div className="Background__circle4"></div>
      {currentView === 'loadingScreen' && <LoadingScreen img={img} onLogoClick={handleLogoClick} />}
      {currentView === 'setTimer' && <SetTimer onStart={handleStartTimer} />}
      {currentView === 'countDown' && <CountDown {...timerProps} />}
      <div className="View__iphone-bottom"></div>
      </div>
      </div>
    </div>
  )
}

export default App
