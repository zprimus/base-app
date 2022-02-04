// dependencies
import { useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode'; 
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Form, Button } from 'react-bootstrap';
import { FaEdit } from 'react-icons/fa';

// components

// styles
import './UserSettings.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function UserSettings() {
    const user = useSelector((state) => state.user.value);

    const [newName, setName] = useState('');
    const [newEmail, setEmail] = useState('');
    const [newPhoneNumber, setPhoneNumber] = useState('');
    const [newBirthDate, setBirthDate] = useState('');

    const [changeDisabled, changeSettings] = useState(true);

    const saveChanges = () => {

    }
    
    return (
        <div className="UserSettings">
            <div id="header">
                <h1>User Settings</h1>
            </div>
            <Form onSubmit={saveChanges}>
                <div id="section">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        value={newName}
                        onChange={(e) => setName(e.target.value)}
                        type="text"
                        placeholder={user.name}
                        disabled={changeDisabled}
                    />
                </div>
                <br/>
                <div id="section">
                    <Form.Label>Email</Form.Label>
                    <Form.Control  
                        value={newEmail}
                        onChange={(e) => setEmail(e.target.value)}
                        type="text"
                        placeholder={user.email}
                        disabled={changeDisabled}
                    />
                </div>
                <br/>
                <div id="section">
                    <Form.Label>Phone Number (optional)</Form.Label>
                    <Form.Control  
                        value={newPhoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        type="tel"
                        placeholder={user.phoneNumber}
                        disabled={changeDisabled}
                    />
                </div>
                <br/>
                <div id="section">
                    <Form.Label>Birth Date</Form.Label>
                    {
                        changeDisabled ? (
                            <Form.Control  
                                value={newBirthDate}
                                onChange={(e) => setBirthDate(e.target.value)}
                                type="text"
                                placeholder={user.birthDate}
                                disabled={true}
                            />
                        ): (
                            <Form.Control 
                                value={newBirthDate}
                                onChange={(e) => setBirthDate(e.target.value)}
                                type="date"
                                min="1900-01-01"
                                disabled={false}
                            />
                        )
                    }
                    
                </div>
                <br/>
                <div id="section">
                    <Form.Label>Ethnicity: </Form.Label>
                </div>
                
                <br/> 
                {
                    changeDisabled ? (
                        <Button 
                            id="editButton"
                            onClick={() => changeSettings(false)}
                        >
                            <div>Edit Info</div>
                        </Button>
                    ) : (
                        <div>
                        <Button 
                            id="saveButton"
                            onClick={() => saveChanges()}
                        >
                            <div>Save Changes</div>
                        </Button>
                        
                        <Button 
                            id="cancelButton"
                            onClick={() => changeSettings(true)}
                        >
                            <div>Cancel Changes</div>
                        </Button>
                        </div>
                    )
                }
                <br/>
                <Form.Control 
                    value="Register"
                    type="submit"
                />
            </Form>
        </div>
        
    );
}

export default UserSettings;