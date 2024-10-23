import react from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';


export default function EndView() {
    const navigate = useNavigate();

    const handleReset = () => {
        navigate('/set-timer');
    };

    return (
        <div className="endView">
            <FontAwesomeIcon icon={faBell} />
            <h1>Times up! Good job</h1>
            <button onClick={handleReset}>Set new timer</button>
        </div>
    )
}