// src/App.js
import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import useTimer from './backend/components/useTimer'; // Importera hooken

import './App.css';
import './frontend/setTimer.css';
import './frontend/digitalTimer.css';
import './frontend/endView.css';
import './frontend/menu.css';
import './frontend/resetView.css';
import './frontend/startPage.css';
import img from './img/logotyp.png';

import StartPage from './backend/components/startPage';
import SetTimer from './backend/components/setTimer';
import DigitalTimer from './backend/components/digitalTimer';
import AnalogTimer from './backend/components/analogTimer';
import EndView from './backend/components/endView';

function App() {
  const {
    timerProps,
    countdown,
    isPaused,
    handleStartTimer,
    handlePauseResume,
    handleReset,
  } = useTimer(); // Använd hooken

  return (
    <Router>
      <div className="View">
        <div className="View__iphone">
          <div className="View__iphone-screen">
            <div className="View__iphone-top"></div>

            <Routes>
              <Route path="/" element={<StartPage img={img} />} />
              <Route path="/set-timer" element={<SetTimer onStart={handleStartTimer} />} />
              <Route
                path="/digital-timer"
                element={
                  <DigitalTimer
                    countdown={countdown}
                    isPaused={isPaused}
                    onPauseResume={handlePauseResume}
                    onReset={handleReset}
                  />
                }
              />
              <Route
                path="/analog-timer"
                element={
                  <AnalogTimer
                    countdown={countdown}
                    isPaused={isPaused}
                    onPauseResume={handlePauseResume}
                    onReset={handleReset}
                  />
                }
              />
              <Route path="/end" element={<EndView />} />
            </Routes>

            <div className="View__iphone-bottom"></div>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
