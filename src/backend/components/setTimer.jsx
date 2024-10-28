import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import Timer from 'easytimer.js';
import { motion } from 'framer-motion';

export default function SetTimer({ onStart }) {
    const timeRef = useRef(new Timer());
    const navigate = useNavigate();

    const [minutes, setMinutes] = useState(0);
    const [isInterval, setIsInterval] = useState(false);
    const [pauseDuration, setPauseDuration] = useState(1);
    const [timerType, setTimerType] = useState('digital');

    useEffect(() => {
        const timer = timeRef.current;
        timer.addEventListener('secondsUpdated', () => {
            console.log(timer.getTimeValues().toString());
        });

        return () => {
            timer.stop();
        };
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        const parsedMinutes = parseInt(minutes, 10);
        const parsedPauseDuration = parseInt(pauseDuration, 10);

        if (isNaN(parsedMinutes) || parsedMinutes <= 0) {
            alert('Minutes must be a positive number');
            return;
        }

        if (isInterval && (isNaN(parsedPauseDuration) || parsedPauseDuration <= 0)) {
            alert('Pause duration must be a positive number');
            return;
        }

        const totalSeconds = parsedMinutes * 60;

        timeRef.current.start({ countdown: true, startValues: { seconds: totalSeconds } });

        if (isInterval) {
            setTimeout(() => {
                timeRef.current.pause();
                setTimeout(() => {
                    timeRef.current.start();
                }, parsedPauseDuration * 1000); 
            }, totalSeconds * 1000);
        }

        onStart(totalSeconds, isInterval, parsedPauseDuration);
        
        navigate('/digital-timer');
    }; 

    const increaseMinutes = () => {
        setMinutes((prev) => prev + 1);
    };

    const decreaseMinutes = () => {
        setMinutes((prev) => prev > 1 ? prev - 1 : 1);
    };

    const increasePauseDuration = () => {
        setPauseDuration((prev) => prev + 1);
    };

    const decreasePauseDuration = () => {
        setPauseDuration((prev) => prev > 1 ? prev - 1 : 1);
    };

    return (
        <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.5 }}
        >
        <form onSubmit={handleSubmit}>
            <div className="input__container">
                
                <label htmlFor="minutes">
                    <div className="icon-container">
                        <button type="button" onClick={decreaseMinutes}>
                            <FontAwesomeIcon icon={faChevronLeft} />
                        </button>
                        
                        <span className="display__minutes">{minutes}</span>
                        <button type="button" onClick={increaseMinutes}>
                            <FontAwesomeIcon icon={faChevronRight} />
                        </button>
                        </div>
                        <br />
                        
                    <span className="input__container-minutes">Minutes</span>
                </label>

                <div className="button__container">
                <button className="input__container-submitbtn" type="submit">Start timer</button>
                </div>
                
            </div>
        </form>
        </motion.div>
    );
};
