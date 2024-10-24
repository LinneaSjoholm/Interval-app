import React from 'react';
import { motion } from 'framer-motion';

export default function ResetView({ onSetNewTimer}) {
    return (
        <motion.div 
        className="pause__container"
        initial={{ opacity: 0 }}
        animate={{ opacity: onSetNewTimer ? 1 : 0, y: onSetNewTimer ? 0 : -20 }}
        transition={{ duration: 0.5 }}
        >
        <div className="reset-view">
                <p className="reset-p">Timer reset</p>
            <div className="reset-view-buttons">
                <button onClick={onSetNewTimer}>Set New Timer</button>
            </div>
        </div>
        </motion.div>
    );
}
