// login/register template

// dependencies
import { useState, useEffect } from 'react';
import { useNavigate, Link } from "react-router-dom";
import jwtDecode from 'jwt-decode';
import { Button, Dropdown } from 'react-bootstrap';
import { FaUserAlt } from 'react-icons/fa';
import { useDispatch } from 'react-redux';

// features
import { logout } from '../reducers/user';

// styles
import './HeaderBar.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function HeaderBar() {
    const [userExists, setUserExists] = useState(false);

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
        <div className="HeaderBar">
            <div className="HeaderBar-left">
                <div>LOGO HERE</div>
            </div>
            <div className="HeaderBar-middle">
                <div>Middle of Header</div>
            </div>
            <div className="HeaderBar-right">
                {
                    userExists ? (
                        <Dropdown>
                            <Dropdown.Toggle variant="primary" id="dropdown-basic">
                                <FaUserAlt/>
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item>DarkMode: </Dropdown.Item>
                                <Link to="/usersettings">
                                    <Dropdown.Item as="button">User Settings</Dropdown.Item>
                                </Link>
                                <Dropdown.Item as="button" onClick={() => handleLogout()}>Logout</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    ) : (
                        <div id="auth">
                            <Link to="/login">
                                <Button>Login</Button>
                            </Link>
                            <Link to="/register">
                                <Button>Register</Button>
                            </Link>
                        </div>
                    )
                }
            </div>
        </div>
    );
}

export default HeaderBar;