import React from 'react';
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
            <p className="endView-p">Times up!</p><br /> 
            <button onClick={handleReset}>Set new timer</button>
        </div>
    )
}
