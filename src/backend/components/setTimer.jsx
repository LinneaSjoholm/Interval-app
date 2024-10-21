import { useState } from 'react';

export default function SetTimer( { onStart }) {
    const [minutes, setMinutes] = useState(25);
    const [isInterval, setIsInterval] = useState(false);
    const [pauseDuration, setPauseDuration] = useState(5);

    const handleSubmit = (e) => {
        e.preventDefault();
        onStart(minutes * 60, isInterval, pauseDuration);
    };

    return (
        <form onSubmit= {handleSubmit} >
            <label>
                <span>Minutes:</span>
                <input type="number" value={minutes} onChange={(e) => setMinutes(e.target.value)} />
            </label>
            <label>
                <span>Interval:</span>
                <input type="checkbox" checked={isInterval} onChange={() => setIsInterval(!isInterval)} />
            </label>

            {isInterval && (
                <label>
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