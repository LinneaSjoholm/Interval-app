import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import timer from 'easytimer.js';

export default function SetTimer( { onStart }) {
    const timeRef = useRef(new timer());
    const navigate = useNavigate();

    const [minutes, setMinutes] = useState(0);
    const [isInterval, setIsInterval] = useState(false);
    const [pauseDuration, setPauseDuration] = useState(0);

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

    if(isNaN(parsedMinutes) || parsedMinutes <= 0) {
        alert('Minutes must be a positive number');
        return;
    }

    if(isInterval && (isNaN(parsedPauseDuration) || parsedPauseDuration <= 0)) {
        alert('Pause duration must be a positive number');
        return;
    }

    const totalSeconds = parsedMinutes * 60;

    timeRef.current.start({countdown: true, startValues: {seconds: totalSeconds}});

    if(isInterval) {
        setTimeout(() => {
            timeRef.current.pause();
            setTimeout(() => {
                timeRef.current.start();
            }, parsedPauseDuration * 1000); 
        }, totalSeconds * 1000);
    };
    
    onStart(totalSeconds, isInterval, parsedPauseDuration);
    navigate('/countdown');

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
}

    return (
        <form onSubmit= {handleSubmit}>
            <div className="input__container">
            <label htmlFor="minutes">
                <span className="input__container-minutes">Minutes</span><br></br>
                <button type="button" onClick={decreaseMinutes}>
                    <FontAwesomeIcon icon={faChevronLeft} />
                </button>
                <span>{minutes}</span>
                <button type="button" onClick={increaseMinutes}>
                    <FontAwesomeIcon icon={faChevronRight} />
                </button>
            </label>
            </div>

            <div className="input__container">
            <label htmlFor="interval">
                <span className="input__container-interval">Interval</span><br></br>
                <input 
                type="checkbox" 
                checked={isInterval} 
                onChange={() => setIsInterval(!isInterval)} 
                className="custom-checkbox"
                />
            </label>
            </div>

                <div className={`input__container ${isInterval ? 'input__container-visible' : 'input__container-hidden'}`}>
                <label htmlFor="pause">
                    <span className="input__container-pause">Pause duration</span><br></br>
                    <button type="button" onClick={decreasePauseDuration}>
                        <FontAwesomeIcon icon={faChevronLeft} />
                    </button>
                    <span>{pauseDuration}</span>
                    <button type="button" onClick={increasePauseDuration}>
                        <FontAwesomeIcon icon={faChevronRight} />
                    </button>
                </label>
                </div>
            <div className="button__container">
            <button className="input__container-submitbtn" type="submit">Start</button>
            </div>
        </form>
    );
};