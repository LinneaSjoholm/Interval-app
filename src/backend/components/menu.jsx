import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

export default function Menu() {
    const [isOpen, setIsOpen] = useState(false); // Hantera menyns öppning

    const toggleMenu = () => {
        setIsOpen(!isOpen); // Växla mellan öppen/stängd
    };

    return (
        <div className="menu-container">
            <button className="menu-button" onClick={toggleMenu}>
                <FontAwesomeIcon 
                icon={isOpen ? faTimes : faBars} 
                size="lg"
                className="menu-icon" />
            </button>
            <div className={`menu-content ${isOpen ? 'show' : ''}`}>
                <ul>
                    <li><Link to="/digital-timer">Digital Timer</Link></li>
                    <li><Link to="/analog-timer">Analog Timer</Link></li>
                </ul>
            </div>
        </div>
    );
}
