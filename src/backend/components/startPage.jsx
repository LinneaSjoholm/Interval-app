import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function StartPage({ img }) {
    const [ isClicked, setIsClicked ] = useState(false);
    const navigate = useNavigate();

    const onLogoClick = () => {
        setIsClicked(true);
        setTimeout(() => {
        navigate('/set-timer');
        }, 500);
    };

    return (

        <motion.div 
        className="startPage"
        onClick={ onLogoClick }
        initial={{ opacity: 1, scale: 1}}
        animate={ isClicked ? { opacity: 0, scale: 0.8 } : {} }
        transition={{ duration: 0.5 }}
        >

        <motion.img
        src={img}
        alt="logo"
        className="startPage__logo"
        initial= {{ opacity: 1 }}
        animate= { isClicked ? { opacity: 0 } : {} }
        transition={{ duration: 0.5 }}
        />

        </motion.div>
    );
};