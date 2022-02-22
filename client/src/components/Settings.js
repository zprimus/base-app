// dependencies
import { useState } from 'react';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { Button, Dropdown, ToggleButton } from 'react-bootstrap';
import { BiLogIn, BiLogOut } from 'react-icons/bi';
import { BsGearFill, BsEyeFill } from 'react-icons/bs';
import { FaUserAlt } from 'react-icons/fa';

// components
import ToggleSwitch from './ToggleSwitch.js';

// features
import { changeDarkMode } from '../reducers/client';

// styles
import './Settings.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function Settings(props) {
    const { userExists, handleLogout } = props;
    const [showSettings, setShowSettings] = useState(false);

    const dispatch = useDispatch();

    const { darkMode } = useSelector((state) => state.client.value);

    const toggleShow = () => {
        setShowSettings(!showSettings);
    }

    const toggleDarkMode = () => {
        dispatch(
            changeDarkMode({darkMode: !darkMode})
        );
    }

    return (
        <div className="Settings">
                <Dropdown show={showSettings}>
                    <Dropdown.Toggle variant="primary" id="dropdown-basic"  onClick={() => toggleShow()}>
                        <BsGearFill/>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Header>
                            <div className='custom-dropdown-item'>
                                <label>Client</label>
                            </div>
                        </Dropdown.Header>
                        <Dropdown.Item as="label" active={false}>
                            <div className='custom-dropdown-item'>
                                <label>DarkMode</label>
                                <ToggleSwitch
                                    checked={darkMode}
                                    handleToggle={toggleDarkMode}
                                />
                            </div>
                        </Dropdown.Item>
                        <br/>
                        <Dropdown.Header>
                            <div className='custom-dropdown-item'>
                                <label>User</label>
                            </div>
                        </Dropdown.Header>
                        {
                            userExists &&
                            <Link to="/usersettings" style={{ textDecoration: 'none' }}>
                                <Dropdown.Item as="button" onClick={() => toggleShow()}>
                                    <div className='custom-dropdown-item'>
                                        <label>User Settings</label>
                                        <FaUserAlt/>
                                    </div>
                                </Dropdown.Item>
                            </Link>
                        }
                        {
                            userExists ? (
                                <Link to="/" style={{ textDecoration: 'none' }}>
                                    <Dropdown.Item as="button" onClick={() => handleLogout().then(() => toggleShow())}>
                                        <div className='custom-dropdown-item'>
                                            <label>Logout</label>
                                            <BiLogOut/>
                                        </div>
                                    </Dropdown.Item>
                                </Link>
                            ) : (
                                <Link to="/login" style={{ textDecoration: 'none' }}>
                                    <Dropdown.Item as="button">
                                        <div className='custom-dropdown-item'>
                                            <label>Login / Register</label>
                                            <BiLogIn/>
                                        </div>
                                    </Dropdown.Item>
                                </Link>
                            )
                        }
                    </Dropdown.Menu>
                </Dropdown>
        </div>
    );
}

export default Settings;