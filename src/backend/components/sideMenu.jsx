import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { useNavigate} from 'react-router-dom';
import { useNav } from './navContext';

export default function SideMenu() {
    const { menuOpen, toggleMenu } = useNav();
    const navigate = useNavigate();

    const handleNavigate = (path) => {
        navigate(path);
            toggleMenu();
};

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
                <li onClick={() => handleNavigate ('/digital-timer')}>Digital timer</li>
                <li onClick={() => handleNavigate ('/analog-timer')}>Analog timer</li>
                <li onClick={() => handleNavigate ('/text-timer')}>Text timer</li>
            </ul>
        </div>
    )}
   </> 
)
};