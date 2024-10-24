import { useState, useEffect, useRef } from "react";
import Timer from 'easytimer.js';
import { Navigate } from "react-router-dom";
import Menu from "./menu";
import { motion } from "framer-motion";
import ResetView from "./resetView";

export default function AnalogTimer({ seconds }) {
    const [countdown, setCountdown] = useState(seconds);
    const [isPaused, setIsPaused] = useState(false);
    const [isReset, setIsReset] = useState(false);
    const [setNewTimer, setSetNewTimer] = useState(false);
    const [navigating, setNavigating] = useState(false);
    const [showResetView, setShowResetView] = useState(false);
    const timer = useRef(new Timer());

    useEffect(() => {
        // Hantera uppdatering av sekunder
        const handleSecondsUpdated = () => {
            const timeValues = timer.current.getTimeValues();
            const totalRemainingTime = timeValues.minutes * 60 + timeValues.seconds;
            setCountdown(totalRemainingTime);
        };

        // Hantera måltid nådd
        const handleTargetAchieved = () => {
            setNavigating(true);
        };

        // Lägg till event listeners
        timer.current.addEventListener('secondsUpdated', handleSecondsUpdated);
        timer.current.addEventListener('targetAchieved', handleTargetAchieved);
        
        // Starta timern
        timer.current.start({ countdown: true, startValues: { seconds } });

        // Rensa event listeners vid komponentens avmontering
        return () => {
            timer.current.removeEventListener('secondsUpdated', handleSecondsUpdated);
            timer.current.removeEventListener('targetAchieved', handleTargetAchieved);
            timer.current.stop();
        };
    }, [seconds]);

    // Beräkna rotationsvinkeln för sekundvisaren
    const calculateRotation = (totalSeconds) => {
        return (totalSeconds % 60) * 6; // Varje sekund motsvarar 6 grader
    };

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
        setShowResetView(true);
    };

    const handleSetNewTimer = () => {
        setSetNewTimer(true);
    };

    // Navigera till slutvyn
    if (navigating) {
        return <Navigate to="/end" />;
    }

    // Navigera för att ställa in en ny timer
    if (setNewTimer) {
        return <Navigate to="/set-timer" />;
    }

    // Beräkna vinkeln för sekundvisaren
    const secondsAngle = calculateRotation(countdown);

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
                    <span>{`${Math.floor(countdown / 60)}:${countdown % 60 < 10 ? '0' : ''}${countdown % 60}`}</span>
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
                    {isReset ? (
                        // Visa ResetView med animation
                        <motion.div 
                            initial={{ opacity: 0, x: 0 }} 
                            animate={{ opacity: 1, x: 0 }} 
                            exit={{ opacity: 0, x: 50 }} 
                            transition={{ duration: 0.5 }}
                        >
                            <ResetView
                                time={`${Math.floor(countdown / 60)}:${countdown % 60 < 10 ? '0' : ''}${countdown % 60}`} 
                                countdown={() => setCountdown(countdown)}
                                onSetNewTimer={handleSetNewTimer} 
                            />
                        </motion.div>
                    ) : (
                        <>
                            <button className="countDown__timer-abort-n-reset-btn" onClick={handleReset}>Abort Timer and Reset</button>
                            <button className="countDown__timer-resume-n-pause-btn" onClick={togglePause}>{isPaused ? "Resume" : "Pause"}</button>
                        </>
                    )}
                </div>
            </motion.div>
        </div>
    );
}
