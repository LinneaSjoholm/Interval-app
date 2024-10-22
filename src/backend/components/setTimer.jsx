import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SetTimer( { onStart }) {

    const navigate = useNavigate();

    const [minutes, setMinutes] = useState(25);
    const [isInterval, setIsInterval] = useState(false);
    const [pauseDuration, setPauseDuration] = useState(5);

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

    onStart(parsedMinutes * 60, isInterval, parsedPauseDuration);
    navigate('/countdown');

};

    return (
        <form onSubmit= {handleSubmit} >
            <label htmlFor="minutes">
                <span>Minutes:</span>
                <input type="number" value={minutes} onChange={(e) => setMinutes(e.target.value)} />
            </label>
            <label htmlFor="interval">
                <span>Interval:</span>
                <input type="checkbox" checked={isInterval} onChange={() => setIsInterval(!isInterval)} />
            </label>

            {isInterval && (
                <label htmlFor="pause">
                    <span>Pause duration:</span>
                    <input type="number" value={pauseDuration} onChange={(e) => setPauseDuration(e.target.value)} 
                    min="1"
                    />
                </label>
            )};

            <button type="submit">Start</button>
        </form>
    )
}