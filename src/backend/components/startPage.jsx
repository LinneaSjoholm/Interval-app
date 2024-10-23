import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function StartPage({ img }) {

    const navigate = useNavigate();

    const onLogoClick = () => {
        navigate('/set-timer');
    };

    return (
        <div className="startPage" onClick={ onLogoClick }>
            <img src={img} alt="logo" className="startPage-logo" />
            </div>
    );
};