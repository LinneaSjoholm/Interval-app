import react from 'react';
import { useNavigate } from 'react-router-dom';

export default function pauseView() {
    const navigate = useNavigate();

    const handleResume = () => {
        navigate('/countdown');
    };

    return (
        <div className="pauseView">
            <h1>Paused, time for a break!</h1>
            <button onClick={handleResume}>Resume</button>
        </div>
    )
}