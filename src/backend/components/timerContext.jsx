import React, { createContext, useState, useRef } from 'react';
import Timer from 'easytimer.js';

export const TimerContext = createContext();

export const TimerProvider = ({ children }) => { // Ändrat här
    const timer = useRef(new Timer());
    const [countdown, setCountdown] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    const startTimer = (seconds) => {
        timer.current.start({ countdown: true, startValues: { seconds } });
        setIsPaused(false);
        timer.current.addEventListener('secondsUpdated', updateCountdown);
    };

    const updateCountdown = () => {
        const timeValues = timer.current.getTimeValues();
        const totalRemainingTime = timeValues.minutes * 60 + timeValues.seconds;
        setCountdown(totalRemainingTime);
    };

    const pauseTimer = () => {
        timer.current.pause();
        setIsPaused(true);
    };

    const resumeTimer = () => {
        timer.current.start({ countdown: true, startValues: { seconds: countdown } });
        setIsPaused(false);
    };

    const resetTimer = (seconds) => {
        timer.current.stop();
        setCountdown(seconds);
        setIsPaused(true);
    };

    return (
        <TimerContext.Provider value={{ countdown, isPaused, startTimer, pauseTimer, resumeTimer, resetTimer }}>
            {children}
        </TimerContext.Provider>
    );
};
