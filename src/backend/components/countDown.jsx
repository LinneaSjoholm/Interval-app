import { useState, useEffect, useRef } from "react";
import Timer from 'easytimer.js';

const formatTime = (time) => {
    let minutes = Math.floor(time / 60);
    let seconds = Math.floor(time % 60);

    if (minutes < 10) minutes = '0' + minutes;
    if (seconds < 10) seconds = '0' + seconds;

    return `${minutes}:${seconds}`;

}

export default function CountDown({ seconds, isInterval, pauseDuration}) {
    const [countdown, setCountdown] = useState(seconds);
    const [isPaused, setIsPaused] = useState(false);
    const [isReset, setIsReset] = useState(false);
    const [alertShown, setAlertShown] = useState(false);
    const [intervalPaused, setIntervalPaused] = useState(false);
    const timer = useRef(new Timer());

    useEffect(() => {

        const handleTargetAchieved = () => {
          if(!alertShown) {
            alert("Time's up!");
            setAlertShown(true);

            if(isInterval) {
              setIntervalPaused(true);
              setTimeout(() => {
                setIntervalPaused(false);
                setAlertShown(false);
                timer.current.start({ countdown: true, startValues: { seconds: seconds } });
              }, pauseDuration * 1000);
            };
          }
        };

        const handleSecondsUpdated = () => {
          const timesValues = timer.current.getTimeValues();
          const totalRemainingTime = timesValues.minutes * 60 + timesValues.seconds;
          setCountdown(totalRemainingTime);
        };

          timer.current.addEventListener('secondsUpdated', handleSecondsUpdated);
          timer.current.addEventListener('targetAchieved', handleTargetAchieved);
          timer.current.start({countdown: true, startValues: {seconds: seconds }});

            return () => {
              timer.current.removeEventListener('secondsUpdated', handleSecondsUpdated);
              timer.current.removeEventListener('targetAchieved', handleTargetAchieved);
              timer.current.stop();
            };
    }, [ seconds, isPaused, intervalPaused, alertShown, isInterval, pauseDuration ]);

    const handleReset = () => {
      timer.current.stop();
      setCountdown(seconds);
      setIsPaused(false);
      setIntervalPaused(false);
      setAlertShown(false);
      setIsReset(true);
    };

    const handleStart = () => {
      timer.current.start({countdown: true, startValues: {seconds: countdown}});
      setIsReset(false);
      setIsPaused(false);
    }

    const togglePaus = () => {
      if (isPaused) {
        timer.current.start();
        setIsPaused(false);
      } else {
        timer.current.pause();
        setIsPaused(true);
      }
    };

    return (

      <div className="countDown__timer">
        <span>Time left <br>
        </br>{formatTime(countdown)}</span>

        {isReset && (
        <div className={`start__container ${isReset ? 'start__container-visible' : 'start__container-hidden'}`}>
          <button className="countDown__timer-start-btn" onClick={handleStart}>Start timer</button>
        </div>
        )}

        {!isReset && (
          <>
          <button className="countDown__timer-abort-n-reset-btn" onClick={handleReset}>Abort timer and reset</button>
          <button className="countDown__timer-resume-n-pause-btn" onClick={togglePaus}>{isPaused ? "Resume" : "Pause"}</button>
          </>
        )}

        <div className={`pause__container ${isPaused ? 'pause__container-visible' : 'pause__container-hidden'}`}>
          <p>Paused. Waiting to resume..</p>
          </div>
    </div>

    )
}