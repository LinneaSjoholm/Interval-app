// src/backend/components/useTimer.js
import { useState, useEffect, useRef } from 'react';
import Timer from 'easytimer.js';

export default function useTimer() {
  const [timerProps, setTimerProps] = useState({});
  const [countdown, setCountdown] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [hasEnded, setHasEnded] = useState(false);
  const timer = useRef(new Timer());

  const handleStartTimer = (seconds, isInterval, pauseDuration) => {
    setTimerProps({ seconds, isInterval, pauseDuration });
    timer.current.start({ countdown: true, startValues: { seconds } });
    setCountdown(seconds);
    setIsPaused(false);
    setHasEnded(false);
  };

  useEffect(() => {
    const handleSecondsUpdated = () => {
      const timeValues = timer.current.getTimeValues();
      const totalRemainingTime = timeValues.minutes * 60 + timeValues.seconds;
      setCountdown(totalRemainingTime);
      
     
      if (totalRemainingTime <= 0) {
        setHasEnded(true);
        timer.current.stop();
      }
    };

    timer.current.addEventListener('secondsUpdated', handleSecondsUpdated);

    return () => {
      timer.current.removeEventListener('secondsUpdated', handleSecondsUpdated);
    };
  }, []);

  const handlePauseResume = () => {
    if (isPaused) {
      timer.current.start();
    } else {
      timer.current.pause();
    }
    setIsPaused(!isPaused);
  };

  const handleReset = () => {
    timer.current.stop();
    setCountdown(timerProps.seconds);
    setHasEnded(false);
  };

  return {
    timerProps,
    countdown,
    isPaused,
    hasEnded,
    handleStartTimer,
    handlePauseResume,
    handleReset,
  };
}
