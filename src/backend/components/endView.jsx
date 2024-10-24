import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';

export default function EndView() {
    const navigate = useNavigate();

    const handleReset = () => {
        navigate('/set-timer');
    };

    return (
        <motion.div 
        className="endView"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}>

        <motion.div 
            animate={{ rotate: [0, 10, 0, -10, 0] }} 
            transition={{ repeat: Infinity, duration: 1 }}>
            <FontAwesomeIcon 
            icon={faBell}
            className="fa-bell" />
        </motion.div>
        <p className="endView-p">Times up!</p><br />
        <motion.button 
            onClick={handleReset}>
            Set new timer
        </motion.button>
        </motion.div>
    )
}
