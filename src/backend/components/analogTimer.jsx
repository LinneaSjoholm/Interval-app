import React, { useEffect, useRef, useState } from 'react';
import Timer from 'easytimer.js';
import { useNavigate } from 'react-router-dom';

export default function AnalogTimer({ seconds, isInterval, pauseDuration}) {
    const [secondsLeft, setSecondsLeft] = useState(0);
    const timer = useRef(new Timer());
    const navigate = useNavigate();

    useEffect(() => {
        timer.current.start({countdown: true, startValues: {seconds: seconds}});

        timer.current.addEventListener('secondsUpdated', () => {
            const timeValues = timer.current.getTimeValues();
            setSecondsLeft(timeValues.seconds + timeValues.minutes * 60 + timeValues.hours * 3600);
    });

    const handleTargetAchieved = () => {
        if(isInterval) {
            navigate('/pause');
        } else {
            navigate('/end');
        }
    };

    timer.current.addEventListener('targetAchieved', handleTargetAchieved);

    return () => {
        timer.current.stop();
        timer.current.removeEventListener('secondsUpdated');
        timer.current.removeEventListener('targetAchieved');
    };
}, [seconds, isInterval, pauseDuration, navigate]);

const secondDegree = (secondsLeft / 60) * 360;

return (
    <div className="analog-clock">
        <div className="clock-face">
            <div className="second-hand" style={{transform: `rotate(${secondDegree}deg)`}}></div>
        </div>
    </div>
);

};
