import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

export default function Menu() {
    
    return (
        <div className="menu-container">
            <button className="menu-btn">
                <FontAwesomeIcon icon={faBars} />
            </button>

            <div className="menu-content">
                <ul>
                    <li><Link to="/digital-timer">Digital Timer</Link></li>
                    <li><Link to="/analog-timer">Analog Timer</Link></li>
                </ul>
            </div>
        </div>
    )
}