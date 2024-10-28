import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';

export default function EndView({ onSetNewTimer }) {
    return (
        <motion.div 
            className="endView"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}>

        <motion.div 
                animate={{ rotate: [0, 20, 0, -20, 0] }} 
                transition={{ repeat: Infinity, duration: 1 }}>
                
                <FontAwesomeIcon 
                    icon={faBell}
                    className="fa-bell" />
            </motion.div>

        <motion.div
            className="circle1"
            initial={{ scale: 0 }}
            animate={{ scale: [0, 2.2, 1], opacity: [0.2, 0, 0.2] }}
            transition={{ repeat: Infinity, duration: 3 }}
            />

        <motion.div
            className="circle2"
            initial={{ scale: 0 }}
            animate={{ scale: [0, 2, 1], opacity: [0.2, 0, 0.2] }}
            transition={{ repeat: Infinity, duration: 3 }}
            />
            
            <p className="endView-p">Times up!</p><br />
            
            <motion.button 
                onClick={onSetNewTimer}
                aria-label="Set new timer">
                Set new timer
            </motion.button>
        </motion.div>
    );
}
