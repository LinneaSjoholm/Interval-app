import Menu from './menu';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function DigitalTimer({ countdown, isPaused, onPauseResume, onReset }) {
  const [secondsAngle, setSecondsAngle] = useState(0);

  useEffect(() => {
    const totalSeconds = countdown;
    const secondsPassed = totalSeconds % 60;
    const angle = (secondsPassed / 60) * 360;
    setSecondsAngle(angle);
  }, [countdown]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60).toString().padStart(2, '0');
    const seconds = Math.floor(time % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  return (
    <div className="countDown__timer">
      <Menu />
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 50 }}
        transition={{ duration: 0.5 }}
      >

        <div className="countDown__time">
          <span>{formatTime(countdown)}</span>
        </div>

        <svg width="200" height="200" viewBox="0 0 200 200">
          <circle cx="100" cy="100" r="90" stroke="#50B2C0" opacity={0.3} strokeWidth="3" fill="transparent" />
          <line 
            x1="100" 
            y1="100" 
            x2="100" 
            y2="30" 
            stroke="red" 
            strokeWidth="2"
            style={{ 
              transformOrigin: '100px 100px',
              transform: `rotate(${secondsAngle}deg)`
            }} 
          />
        </svg>

        <motion.div 
          className="pause__container"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: isPaused ? 1 : 0, y: isPaused ? 0 : -20 }}
          transition={{ duration: 0.5 }}
        >
          <p>Paused. Waiting to resume..</p>
        </motion.div>

        <div className="button__group">
          
          <button className="countDown__timer-abort-n-reset-btn" onClick={onReset}>Abort Timer and Reset</button>
          <button className="countDown__timer-resume-n-pause-btn" onClick={onPauseResume}>
            {isPaused ? "Resume" : "Pause"}
          </button>
          
        </div>

      </motion.div>
    </div>
  );
}
