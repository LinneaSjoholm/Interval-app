import { useState, useEffect, useRef } from "react";
import Timer from 'easytimer.js';
import { useNavigate } from "react-router-dom";

const formatTime = (time) => {
    let minutes = Math.floor(time / 60);
    let seconds = Math.floor(time % 60);

    if (minutes < 10) minutes = '0' + minutes;
    if (seconds < 10) seconds = '0' + seconds;

    return `${minutes}:${seconds}`;

}

export default function digitalTimer({ seconds, isInterval, pauseDuration}) {
    const [digitalTimer, setDigitalTimer] = useState(seconds);
    const [isPaused, setIsPaused] = useState(false);
    const [isReset, setIsReset] = useState(false);
    const [alertShown, setAlertShown] = useState(false);
    const [intervalPaused, setIntervalPaused] = useState(false);
    const timer = useRef(new Timer());

    const navigate = useNavigate();

    useEffect(() => {

        const handleTargetAchieved = () => {
          if(!alertShown) {

            if(isInterval) {
              navigate('/pause');
              setIntervalPaused(true);
              setTimeout(() => {
                setIntervalPaused(false);
                setAlertShown(false);
                timer.current.start({ digitalTimer: true, startValues: { seconds: seconds } });
              }, pauseDuration * 1000);
            } else {
              navigate('/end');
            }

            setAlertShown(true);

          }
        };

        const handleSecondsUpdated = () => {
          const timesValues = timer.current.getTimeValues();
          const totalRemainingTime = timesValues.minutes * 60 + timesValues.seconds;
          setDigitalTimer(totalRemainingTime);
        };

          timer.current.addEventListener('secondsUpdated', handleSecondsUpdated);
          timer.current.addEventListener('targetAchieved', handleTargetAchieved);
          timer.current.start({digitalTimer: true, startValues: {seconds: seconds }});

            return () => {
              timer.current.removeEventListener('secondsUpdated', handleSecondsUpdated);
              timer.current.removeEventListener('targetAchieved', handleTargetAchieved);
              timer.current.stop();
            };
    }, [ seconds, isInterval, pauseDuration, alertShown, navigate ]);

    const handleReset = () => {
      timer.current.stop();
      setDigitalTimer(seconds);
      setIsPaused(false);
      setIntervalPaused(false);
      setAlertShown(false);
      setIsReset(true);
    };

    const handleStart = () => {
      timer.current.start({digitalTimer: true, startValues: {seconds: digitalTimer}});
      setIsReset(false);
      setIsPaused(false);
    }

    const togglePause = () => {
      if (isPaused) {
        timer.current.start();
        setIsPaused(false);
      } else {
        timer.current.pause();
        setIsPaused(true);
      }
    };

    return (

      <div className="digital__timer">
        <span>Time left <br>
        </br>{formatTime(digitalTimer)}</span>

        {isReset && (
        <div className={`start__container ${isReset ? 'start__container-visible' : 'start__container-hidden'}`}>
          <button className="digital__timer-start-btn" onClick={handleStart}>Start timer</button>
        </div>
        )}

        {!isReset && (
          <>
          <button className="digital__timer-abort-n-reset-btn" onClick={handleReset}>Abort timer and reset</button>
          <button className="digital__timer-resume-n-pause-btn" onClick={togglePause}>{isPaused ? "Resume" : "Pause"}</button>
          </>
        )}

        <div className={`pause__container ${isPaused ? 'pause__container-visible' : 'pause__container-hidden'}`}>
          <p>Paused. Waiting to resume..</p>
          </div>
    </div>

    )
}