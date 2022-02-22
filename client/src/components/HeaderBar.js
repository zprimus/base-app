// login/register template

// dependencies
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import jwtDecode from 'jwt-decode';
import { Button, Dropdown } from 'react-bootstrap';
import { FaUserAlt } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';

// components
import Settings from './Settings.js';

// features
import { logout } from '../reducers/user';

// styles
import './HeaderBar.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { color, size } from '../style.js';

function HeaderBar() {
    const [userExists, setUserExists] = useState(false);

    const { darkMode } = useSelector((state) => state.client.value);

    const dispatch = useDispatch();

    useEffect(() => {
        const token = localStorage.getItem('token')
        if(token) {
            const user = jwtDecode(token)
            if(!user) {
                localStorage.removeItem('token')
                setUserExists(false)
            } else {
                setUserExists(true)
            }
        }
    }, [])

    function handleLogout() {
        localStorage.removeItem('token');
        setUserExists(false);
        dispatch(logout());
    }

    return (
        <div className="HeaderBar" 
            style={{
                background: (darkMode ? color.dark_mode_2 : color.light_mode_2),
                height: size.headerbar_height,
            }}
        >
            <div className="HeaderBar-left">
                <Link to='/'>
                    <div>LOGO HERE</div>
                </Link>
            </div>
            <div className="HeaderBar-middle" style={{color: (darkMode ? color.light_mode_1 : color.dark_mode_1)}}>
                <div>Middle of Header</div>
            </div>
            <div className="HeaderBar-right" style={{color: (darkMode ? color.light_mode_1 : color.dark_mode_1)}}>
                <Settings
                    userExists={userExists}
                    handleLogout={handleLogout}
                />
            </div>
        </div>
    );
}

export default HeaderBar;