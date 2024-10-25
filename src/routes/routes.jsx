import { Route, Routes, useNavigate } from 'react-router-dom';
import useTimer from '../backend/components/useTimer';
import StartPage from '../backend/components/startPage';
import SetTimer from '../backend/components/setTimer';
import DigitalTimer from '../backend/components/digitalTimer';
import AnalogTimer from '../backend/components/analogTimer';
import EndView from '../backend/components/endView';
import ResetView from '../backend/components/resetView';
import React, { useState } from 'react';
import img from '../img/logotyp.png';

const RoutesComponent = () => {
  const [showResetView, setShowResetView] = useState(false);
  const navigate = useNavigate();
  
  const {
    timerProps,
    countdown,
    isPaused,
    handleStartTimer,
    handlePauseResume,
    handleReset,
  } = useTimer();

  const handleAbortAndReset = () => {
    handleReset();
    setShowResetView(true);
    navigate('/reset');
  };

  const handleSetNewTimer = () => {
    setShowResetView(false);
    navigate('/set-timer');
  };

  return (
    <>
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
              onReset={handleAbortAndReset}
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
              onReset={handleAbortAndReset}
            />
          }
        />
        <Route path="/end" element={<EndView />} />
        <Route path="/reset" element={<ResetView onSetNewTimer={handleSetNewTimer} />} /> {/* New Route for Reset */}
      </Routes>
    </>
  );
};

export default RoutesComponent;
