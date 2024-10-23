import { useState, useEffect, useRef } from "react";
import Timer from 'easytimer.js';
import { Navigate } from "react-router-dom";

const formatTime = (time) => {
    let minutes = Math.floor(time / 60);
    let seconds = Math.floor(time % 60);

    if (minutes < 10) minutes = '0' + minutes;
    if (seconds < 10) seconds = '0' + seconds;

    return `${minutes}:${seconds}`;
}

export default function CountDown({ seconds, isInterval, pauseDuration }) {
    const [countdown, setCountdown] = useState(seconds);
    const [isPaused, setIsPaused] = useState(false);
    const [alertShown, setAlertShown] = useState(false);
    const [isReset, setIsReset] = useState(false);
    const [intervalPaused, setIntervalPaused] = useState(false);
    const [navigating, setNavigating] = useState(false); // Ny state för navigering
    const timer = useRef(new Timer());

    useEffect(() => {
        const handleTargetAchieved = () => {
            if (!alertShown) {
                setAlertShown(true);
                setNavigating(true); // Sätt navigating till true för navigering
                if (isInterval) {
                    setIntervalPaused(true);
                    setTimeout(() => {
                        setIntervalPaused(false);
                        setAlertShown(false);
                        timer.current.start({ countdown: true, startValues: { seconds: seconds } });
                    }, pauseDuration * 1000);
                }
            }
        };

        const handleSecondsUpdated = () => {
            const timeValues = timer.current.getTimeValues();
            const totalRemainingTime = timeValues.minutes * 60 + timeValues.seconds;
            setCountdown(totalRemainingTime);
        };

        timer.current.addEventListener('secondsUpdated', handleSecondsUpdated);
        timer.current.addEventListener('targetAchieved', handleTargetAchieved);
        timer.current.start({ countdown: true, startValues: { seconds: seconds } });

        return () => {
            timer.current.removeEventListener('secondsUpdated', handleSecondsUpdated);
            timer.current.removeEventListener('targetAchieved', handleTargetAchieved);
            timer.current.stop();
        };
    }, [seconds, isPaused, intervalPaused, alertShown, isInterval, pauseDuration]);

    const handleReset = () => {
        timer.current.stop();
        setCountdown(seconds);
        setIsPaused(false);
        setIntervalPaused(false);
        setAlertShown(false);
        setIsReset(true);
        setNavigating(false); // Återställ navigating state
    };

    const togglePaus = () => {
        if (isPaused) {
            timer.current.start();
            setIsPaused(false);
        } else {
            timer.current.pause();
            setIsPaused(true);
        }
    };

    const handleStart = () => {
        timer.current.start({ countdown: true, startValues: { seconds: countdown } });
        setIsReset(false);
        setIsPaused(false);
    };

    // Villkorlig renderering för navigering
    if (navigating) {
        return <Navigate to="/end" />;
    }

    return (
        <div className="countDown__timer">
            <span>Time left <br />{formatTime(countdown)}</span>

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
    );
}
