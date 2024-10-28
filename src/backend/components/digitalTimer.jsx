import Menu from './menu';
import { motion } from 'framer-motion';

export default function DigitalTimer({ countdown, isPaused, onPauseResume, onReset }) {
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
        <div className="countDown__time">{formatTime(countdown)}</div>

        <motion.div 
          className="pause__container"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: isPaused ? 1 : 0, y: isPaused ? 0 : -20 }}
          transition={{ duration: 0.5 }}
        >
          <p>Paused. Waiting to resume..</p>
        </motion.div>

        <div className="button__group">

          <button className="countDown__timer-abort-n-reset-btn" onClick={onReset}>
            Abort timer and reset
          </button>
          <button className="countDown__timer-resume-n-pause-btn" onClick={onPauseResume}>
            {isPaused ? 'Resume' : 'Pause'}
          </button>

        </div>
      </motion.div>
    </div>
  );
}
