import React, { createContext, useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';

const NavContext = createContext();

export const useNav = () => useContext(NavContext);
export const NavProvider = ({ children }) => {
    const location = useLocation();
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => setMenuOpen(prev => !prev);

    return (
        <NavContext.Provider value={{ location, menuOpen, toggleMenu }}>
            {children}
        </NavContext.Provider>
    )
}