import { useState, useEffect, useRef } from "react";
import Timer from 'easytimer.js';
import { useNavigate } from "react-router-dom";

// Funktion för att konvertera sekunder till ord
const secondsToWords = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    let minuteText = '';
    let secondText = '';

    // Konvertera minuter till ord
    if (minutes > 0) {
        minuteText = `${convertToWords(minutes)} minut${minutes > 1 ? 'er' : ''}`;
    }

    // Konvertera sekunder till ord
    if (seconds > 0) {
        secondText = `${convertToWords(seconds)} sekund${seconds > 1 ? 'er' : ''}`;
    }

    // Kombinera texterna
    if (minuteText && secondText) {
        return `${minuteText} och ${secondText}`;
    } else if (minuteText) {
        return minuteText;
    } else if (secondText) {
        return secondText;
    } else {
        return 'Inga sekunder kvar';
    }
};

// Funktion för att konvertera siffror till ord (0-59)
const convertToWords = (num) => {
    const words = [
        'noll', 'ett', 'två', 'tre', 'fyra', 'fem', 'sex', 'sju', 'åtta', 'nio',
        'tio', 'elva', 'tolv', 'tretton', 'fjorton', 'femton', 'sexton', 'sjutton', 
        'arton', 'nitton', 'tjugo', 'tjugoett', 'tjugotvå', 'tjugotre', 'tjugofyra',
        'tjugofem', 'tjugosex', 'tjugosju', 'tioåtta', 'tjugonio', 'trettio',
        'trettioett', 'trettiotvå', 'trettiotre', 'trettiofyra', 'trettiofem',
        'trettiosex', 'trettiosju', 'fyrtio', 'fyrtioett', 'fyrtiotvå', 'fyrtiotre',
        'fyrtiofyra', 'fyrtiofem', 'fyrtiosex', 'fyrtiosju', 'femtio', 'femtioett',
        'femtio två', 'femtio tre', 'femtiofyra', 'femtiofem', 'femtiosex',
        'femtiosju', 'sextio'
    ];

    return words[num] || ''; // Returnerar ordet eller en tom sträng om utanför gränserna
};

export default function TextTimer({ seconds, isInterval, pauseDuration }) {
    const [countdown, setCountdown] = useState(seconds);
    const [isPaused, setIsPaused] = useState(false);
    const [isReset, setIsReset] = useState(false);
    const [alertShown, setAlertShown] = useState(false);
    const timer = useRef(new Timer());
    const navigate = useNavigate();

    useEffect(() => {
        const handleTargetAchieved = () => {
            if (!alertShown) {
                if (isInterval) {
                    navigate('/pause');
                } else {
                    navigate('/end');
                }
                setAlertShown(true);
            }
        };

        const handleSecondsUpdated = () => {
            const timesValues = timer.current.getTimeValues();
            const totalRemainingTime = timesValues.minutes * 60 + timesValues.seconds;
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
    }, [seconds, isInterval, navigate, alertShown]);

    const handleReset = () => {
        timer.current.stop();
        setCountdown(seconds);
        setIsPaused(false);
        setAlertShown(false);
        setIsReset(true);
    };

    const handleStart = () => {
        timer.current.start({ countdown: true, startValues: { seconds: countdown } });
        setIsReset(false);
        setIsPaused(false);
    };

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
        <div className="text-timer">
            <span>Tid kvar: {secondsToWords(countdown)}</span>

            {isReset && (
                <div className={`start__container ${isReset ? 'start__container-visible' : 'start__container-hidden'}`}>
                    <button className="text-timer-start-btn" onClick={handleStart}>Start timer</button>
                </div>
            )}

            {!isReset && (
                <>
                    <button className="text-timer-abort-n-reset-btn" onClick={handleReset}>Abort timer and reset</button>
                    <button className="text-timer-resume-n-pause-btn" onClick={togglePause}>{isPaused ? "Resume" : "Pause"}</button>
                </>
            )}

            <div className={`pause__container ${isPaused ? 'pause__container-visible' : 'pause__container-hidden'}`}>
                <p>Paused. Waiting to resume..</p>
            </div>
        </div>
    );
}
