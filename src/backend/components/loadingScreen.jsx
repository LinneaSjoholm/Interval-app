import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoadingScreen({ img }) {

    const navigate = useNavigate();

    const onLogoClick = () => {
        navigate('/set-timer');
    };

    return (
        <div className="loading__screen" onClick={ onLogoClick }>
            <img src={img} alt="logo" className="loading__screen-logo" />
            </div>
    );
};