import { useState, useEffect, useRef } from "react";

const formatTime = (time) => {
    let minutes = Math.floor(time / 60);
    let seconds = Math.floor(time - minutes * 60);

    if (minutes < 10) minutes = '0' + minutes;
    if (seconds < 10) seconds = '0' + seconds;

    return minutes + ':' + seconds;

}

export default function CountDown({ seconds, isInterval, pauseDuration}) {
    const [countdown, setCountdown] = useState(seconds);
    const [ isPaused, setIsPaused] = useState(false);
    const timerId = useRef();

    useEffect(() => {

      if(isPaused) return;

      timerId.current = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timerId.current);
            if(isInterval) {
              setTimeout(() => {
                setCountdown(seconds);
                setIsPaused(true);
              }, pauseDuration * 1000);
            } else {
              alert("Time's up!");
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      
      return () => {
        clearInterval(timerId.current);
      } 
    }, [ isPaused, isInterval, pauseDuration]);

    const handleReset = () => {
      clearInterval(timerId.current);
      setCountdown(seconds);
      setIsPaused(false);
    };

    const togglePaus = () => {
      setIsPaused((prev) => !prev);
    };

    return (
      <div className="countDown__timer">
        <h2>Time left: {formatTime(countdown)}</h2>
        <button onClick={handleReset}>Abort timer and reset</button>
        <button onClick={togglePaus}>{isPaused ? "Resume" : "Pause"}</button>
        {isPaused && <p>Paused. Waiting to resume..</p>}
    </div>
    )
}