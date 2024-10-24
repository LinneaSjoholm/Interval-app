import { useState, useEffect, useRef } from "react";
import Timer from 'easytimer.js';
import { Navigate } from "react-router-dom";
import ResetView from "./resetView";

const formatTime = (time) => {
    let minutes = Math.floor(time / 60);
    let seconds = Math.floor(time % 60);

    if (minutes < 10) minutes = '0' + minutes;
    if (seconds < 10) seconds = '0' + seconds;

    return `${minutes}:${seconds}`;
};

export default function CountDown({ seconds, isInterval, pauseDuration }) {
    const [countdown, setCountdown] = useState(seconds);
    const [isPaused, setIsPaused] = useState(false);
    const [alertShown, setAlertShown] = useState(false);
    const [isReset, setIsReset] = useState(false);
    const [intervalPaused, setIntervalPaused] = useState(false);
    const [navigating, setNavigating] = useState(false);
    const [showSetNewTimer, setShowSetNewTimer] = useState(false);
    const [setNewTimer, setSetNewTimer] = useState(false);
    const timer = useRef(new Timer());

    useEffect(() => {
        const handleTargetAchieved = () => {
            if (!alertShown) {
                setAlertShown(true);
                setNavigating(true);
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
    }, [seconds, isInterval, pauseDuration]);

    const handleReset = () => {
        timer.current.stop();
        setCountdown(seconds);
        setIsPaused(false);
        setIntervalPaused(false);
        setAlertShown(false);
        setIsReset(true);
        setNavigating(false);
        setShowSetNewTimer(true);
    };

    const togglePaus = () => {
        if (isPaused) {
            timer.current.start({ countdown: true, startValues: { seconds: countdown } });
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
        setShowSetNewTimer(false);
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
            <div className="countDown__time">{formatTime(countdown)}</div>

            {isReset ? ( 
                <ResetView
                    time={formatTime(countdown)} 
                    countdown = {() => setCountdown(countdown)}
                    onSetNewTimer={() => setSetNewTimer(true)} 
                />
            ) : (
                <>
                    <div className={`pause__container ${isPaused ? 'pause__container-visible' : ''}`}>
                        <p>Paused. Waiting to resume..</p>
                    </div>

                    <div className="button__group">
                        <button className="countDown__timer-abort-n-reset-btn" onClick={handleReset}>Abort timer and reset</button>
                        <button className="countDown__timer-resume-n-pause-btn" onClick={togglePaus}>{isPaused ? "Resume" : "Pause"}</button>
                    </div>


                </>
            )}
        </div>
    );
}
