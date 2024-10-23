import react from 'react';
import { useNavigate } from 'react-router-dom';

export default function endView() {
    const navigate = useNavigate();

    const handleReset = () => {
        navigate('/set-timer');
    };

    return (
        <div className="pauseView">
            <h1>Times up! Good job</h1>
            <button onClick={handleReset}>Set new timer</button>
        </div>
    )
}