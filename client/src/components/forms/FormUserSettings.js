// dependencies
import { useState } from 'react';
import { Form, Button, Col, InputGroup } from 'react-bootstrap';
import { Alert } from 'react-bootstrap';

// styles
import './FormUserSettings.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const FormUserSettings = (props) => {
    const { handleSubmit, handleChange, handleCancel, values, errors, isSubmitted } = props;
    const [ isEditting, setIsEditting ] = useState(false);

    const toggleEditting = () => {
        setIsEditting(!isEditting);
    }

    const handleSaveButton = (e) => {
        e.preventDefault();

        handleSubmit(e).then(console.log('hi'));
        if(isSubmitted) {
            toggleEditting();
        }
    }

    const handleCancelButton = () => {
        handleCancel();

        toggleEditting();
    }

    return(
        <div className='FormUserSettings'>
            <Form onSubmit={ handleSaveButton }>
                <Form.Label>Name</Form.Label>
                <Form.Control
                    name='name'
                    type='text'
                    value={values.name}
                    onChange={handleChange}
                    disabled={!isEditting}
                />
                {
                    errors.name &&
                    <p className='error'>{errors.name}</p>
                }
                <br/>
                <Form.Label>Email</Form.Label>
                <Form.Control
                    name='email'
                    type='text'
                    value={values.email}
                    onChange={handleChange}
                    disabled={!isEditting}
                />
                {
                    errors.email &&
                    <p className='error'>{errors.email}</p>
                }
                <br/>
                <Form.Label>Phone Number (optional)</Form.Label>
                <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon1">+1</InputGroup.Text>
                    <Form.Control
                        name='phoneNumber'
                        type="tel"
                        value={values.phoneNumber}
                        onChange={handleChange}
                        disabled={!isEditting}
                    />
                </InputGroup>
                {
                    errors.phoneNumber &&
                    <p className='error'>{errors.phoneNumber}</p>
                }
                <br/>
                <Form.Label>Birthdate</Form.Label>
                <Form.Control
                    name='birthDate'
                    type='date'
                    value={values.birthDate}
                    onChange={handleChange}
                    disabled={!isEditting}
                />
                {
                    errors.birthDate &&
                    <p className='error'>{errors.birthDate}</p>
                }
                <br/>
                <br/>
                {
                    isEditting ? (
                        <div id='buttons-editting'>
                            <Col>
                                <div id='button-save'>
                                    <Form.Control
                                        className="w-50"
                                        value="Save Changes"
                                        type="submit"
                                    />
                                </div>
                            </Col>
                            <Col className='button'>
                                <div id='button-cancel'>
                                    <Button onClick={handleCancelButton}>Cancel Changes</Button>
                                </div>
                            </Col>
                        </div>
                    ) : (
                        <div id='button-edit'>
                            <Button onClick={toggleEditting}>Edit User Info</Button>
                        </div>
                    )
                }
            </Form>
            {
                isSubmitted &&
                <Alert variant='success'>
                    Changes have been saved!
                </Alert>
            }
        </div>
    )
}

export default FormUserSettings;