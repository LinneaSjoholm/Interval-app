import { useState, useEffect, useRef } from "react";
import Timer from 'easytimer.js';

const formatTime = (time) => {
    let minutes = Math.floor(time / 60);
    let seconds = Math.floor(time - minutes * 60);

    if (minutes < 10) minutes = '0' + minutes;
    if (seconds < 10) seconds = '0' + seconds;

    return `${minutes}:${seconds}`;

}

export default function CountDown({ seconds, isInterval, pauseDuration}) {
    const [countdown, setCountdown] = useState(seconds);
    const [isPaused, setIsPaused] = useState(false);
    const [alertShown, setAlertShown] = useState(false);
    const timer = new Timer();

    useEffect(() => {

        const handleTargetAchieved = () => {
          if(!alertShown) {
            alert("Time's up!");
            setAlertShown(true);
          }
        }
            if(isInterval) {
              setTimeout(() => {
               timer.start({countdown: true, startValues: {seconds: seconds} });
               setIsPaused(true);
              }, pauseDuration * 1000);
            }
            timer.addEventListener('targetAchieved', handleTargetAchieved);
            timer.start({countdown: true, startValues: {seconds: countdown}});

            const intervalId = setInterval(() => {
              setCountdown(timer.getTimeValues().seconds);
            }, 1000);

            return () => {
              clearInterval(intervalId);
              timer.stop();
              timer.removeEventListener('targetAchieved', handleTargetAchieved);
            };
    }, [countdown, isInterval, pauseDuration, alertShown, timer]);

    const handleReset = () => {
      timer.stop();
      timer.reset();
      setCountdown(seconds);
      setIsPaused(false);
      setAlertShown(false);
    };

    const togglePaus = () => {
      if (isPaused) {
        timer.start();
      } else {
        timer.pause();
      }

      setIsPaused(!isPaused);
    };

    return (
      <div className="countDown__timer">
        <span>Time left <br>
        </br>{formatTime(countdown)}</span>
        <button className="countDown__timer-abort-n-reset-btn" onClick={handleReset}>Abort timer and reset</button>
        <button className="countDown__timer-resume-n-pause-btn" onClick={togglePaus}>{isPaused ? "Resume" : "Pause"}</button>
        <div className={`pause__container ${isPaused ? 'pause__container-visible' : 'pause__container-hidden'}`}>
          <p>Paused. Waiting to resume..</p>
          </div>
    </div>
    )
}