import { useState } from 'react'

import './App.css'
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
      {currentView === 'loadingScreen' && <LoadingScreen onLogoClick={handleLogoClick} />}
      {currentView === 'setTimer' && <SetTimer onStart={handleStartTimer} />}
      {currentView === 'countDown' && <CountDown {...timerProps} />}
      <div className="View__iphone-bottom"></div>
      </div>
      </div>
    </div>
  )
}

export default App
