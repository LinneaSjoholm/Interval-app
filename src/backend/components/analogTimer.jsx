import { useState, useEffect, useRef } from "react";
import Timer from 'easytimer.js';

export default function AnalogTimer({ seconds }) {
    const [countdown, setCountdown] = useState(seconds);
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
        const secondsAngle = (totalSeconds % 60) * 6; // 360/60 = 6 degrees per second
        return { secondsAngle };
    };

    const { secondsAngle } = calculateRotation(countdown);

    return (
        <div className="analog-timer">
            <svg width="200" height="200" viewBox="0 0 200 200">
                {/* Circle for clock face */}
                <circle cx="100" cy="100" r="90" stroke="black" strokeWidth="3" fill="white" />

                {/* Second Hand */}
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
            <div>
                <span>{`Time left: ${Math.floor(countdown / 60)}:${countdown % 60 < 10 ? '0' : ''}${countdown % 60}`}</span>
            </div>
        </div>
    );
};
