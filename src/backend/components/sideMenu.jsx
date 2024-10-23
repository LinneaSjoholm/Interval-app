import {useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

export default function (sideMenu) {

    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();

    const toggleMenu = () => {
        setMenuOpen(prevState => !prevState);
    };

    const handleNavigate = (path) => {
        navigate(path);
        setMenuOpen(false);
    }

return (
   <>

    <button onClick={toggleMenu} className="menu-toggle-btn">
        <FontAwesomeIcon icon={faBars} />
    </button>

    {menuOpen && (
        <div className="sideMenu">
            <ul>
                <li onClick={() => handleNavigate ('/')}>Startpage</li>
                <li onClick={() => handleNavigate ('/set-timer')}>Set timer</li>
                <li onClick={() => handleNavigate ('/countdown')}>Digital timer</li>
                <li onClick={() => handleNavigate ('/analog')}>Analog timer</li>
                <li onClick={() => handleNavigate ('/text-timer')}>Text timer</li>
            </ul>
        </div>
    )}
   </> 
)
};