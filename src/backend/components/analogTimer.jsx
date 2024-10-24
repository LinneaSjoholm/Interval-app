import { useState, useEffect, useRef } from "react";
import Timer from 'easytimer.js';
import { Navigate } from "react-router-dom";

export default function AnalogTimer({ seconds }) {
    const [countdown, setCountdown] = useState(seconds);
    const [isPaused, setIsPaused] = useState(false);
    const [isReset, setIsReset] = useState(false);
    const [setNewTimer, setSetNewTimer] = useState(false);
    const [navigating, setNavigating] = useState(false);
    const timer = useRef(new Timer());

    useEffect(() => {
        const handleSecondsUpdated = () => {
            const timeValues = timer.current.getTimeValues();
            const totalRemainingTime = timeValues.minutes * 60 + timeValues.seconds;
            setCountdown(totalRemainingTime);
        };

        timer.current.addEventListener('secondsUpdated', handleSecondsUpdated);
        timer.current.start({ countdown: true, startValues: { seconds: seconds } });

        return () => {
            timer.current.removeEventListener('secondsUpdated', handleSecondsUpdated);
            timer.current.stop();
        };
    }, [seconds]);

    const calculateRotation = (totalSeconds) => {
        const secondsAngle = (totalSeconds % 60) * 6;
        return { secondsAngle };
    };

    const { secondsAngle } = calculateRotation(countdown);

    const handleStart = () => {
        timer.current.start({ countdown: true, startValues: { seconds: countdown } });
        setIsPaused(false);
        setIsReset(false);
    };

    const togglePause = () => {
        if (isPaused) {
            timer.current.start({ countdown: true, startValues: { seconds: countdown } });
            setIsPaused(false);
        } else {
            timer.current.pause();
            setIsPaused(true);
        }
    };

    const handleReset = () => {
        timer.current.stop();
        setCountdown(seconds);
        setIsPaused(false);
        setIsReset(true);
    };

    const handleSetNewTimer = () => {
        setSetNewTimer(true);
    };

    if (navigating) {
        return <Navigate to="/end" />;
    }

    if (setNewTimer) {
        return <Navigate to="/set-timer" />;
    }

    return (
        <div className="countDown__timer">
            <div className="countDown__time">
                <span>{`${Math.floor(countdown / 60)}:${countdown % 60 < 10 ? '0' : ''}${countdown % 60}`}</span>
            </div>

            <svg width="200" height="200" viewBox="0 0 200 200">
                <circle cx="100" cy="100" r="90" stroke="transparent" strokeWidth="3" fill="transparent" />
                <line 
                    x1="100" 
                    y1="100" 
                    x2="100" 
                    y2="10" 
                    stroke="red" 
                    strokeWidth="2" 
                    style={{ transform: `rotate(${secondsAngle}deg)`, transformOrigin: '100px 100px' }} 
                />
            </svg>

            <div className={`pause__container ${isPaused ? 'pause__container-visible' : ''}`}>
                <p>Paused. Waiting to resume..</p>
            </div>

            <div className="button__group">
                {isReset ? (
                    <>
                        <button className="countDown__timer-start-btn" onClick={handleStart}>Start Timer</button>
                        <button className="countDown__timer-set-new-timer-btn" onClick={handleSetNewTimer}>Set New Timer</button>
                    </>
                ) : (
                    <>
                        <button className="countDown__timer-abort-n-reset-btn" onClick={handleReset}>Abort Timer and Reset</button>
                        <button className="countDown__timer-resume-n-pause-btn" onClick={togglePause}>{isPaused ? "Resume" : "Pause"}</button>
                    </>
                )}
            </div>
        </div>
    );
}
