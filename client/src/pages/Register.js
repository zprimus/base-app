// login/register template

// dependencies
import { useEffect, useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import { Form } from 'react-bootstrap';

// styles
import './Register.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [ethnicity, setEthnicity] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    
  }, [])

  async function registerUser(event) {
    event.preventDefault();

    if(ethnicity === []) {
      setEthnicity('')
    }

    const response = await fetch(process.env.REACT_APP_REGISTER_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        email,
        password,
        birthDate,
        phoneNumber,
        ethnicity
      })
    })

    const data = await response.json()

    if(data.status === 'ok') {
      navigate('/login')
    } else {
      alert("Error")
    }
  }

  return (
    <div className="Register">
      <div>
        <h1 id="header">Register</h1>
      </div>
      <br/>
      <br/>
      <br/>
      <Form onSubmit={registerUser}>
        <Form.Control 
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="Name"
        />
        <br/>
        <Form.Control  
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="text"
          placeholder="Email"
        />
        <br/>
        <Form.Control 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
        />
        <br/>
        <Form.Control 
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
          type="date"
          min="1900-01-01"
        />
        <br/>
        <Form.Control  
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          type="tel"
          placeholder="Phone Number (optional)"
        />
        <br/>
        <br/>
        <h5>Select from the ethnicities below that you identify with. (optional)</h5>
        <br/>
        <div className="ethnicity">
          <Form.Check 
            id="checkbox"
            type="checkbox" 
            value="American Indian or Alaska Native"
            onChange={(e) => setEthnicity([...ethnicity, e.target.value])}
          />
          <Form.Label>American Indian or Alaska Native</Form.Label>
        </div>
        <br/>
        <div className="ethnicity">
          <Form.Check 
            id="checkbox"
            type="checkbox"
            value="Asian"
            onChange={(e) => setEthnicity([...ethnicity, e.target.value])}
          />
          <Form.Label>Asian</Form.Label>
        </div>
        <br/>
        <div className="ethnicity">
          <Form.Check
            id="checkbox"
            type="checkbox"
            value="Black or African American"
            onChange={(e) => setEthnicity([...ethnicity, e.target.value])}
          />
          <Form.Label>Black or African American</Form.Label>
        </div>
        <br/>
        <div className="ethnicity">
          <Form.Check
            id="checkbox"
            type="checkbox"
            value="Hispanic or Latino"
            onChange={(e) => setEthnicity([...ethnicity, e.target.value])}
          />
          <Form.Label>Hispanic or Latino</Form.Label>
        </div>
        <br/>
        <div className="ethnicity">
          <Form.Check 
            id="checkbox"
            type="checkbox"
            value="Native Hawaiian or Other Pacific Islander"
            onChange={(e) => setEthnicity([...ethnicity, e.target.value])}
          />
          <Form.Label>Native Hawaiian or Other Pacific Islander</Form.Label>
        </div>
        <br/>
        <div className="ethnicity">
          <Form.Check 
            id="checkbox"
            type="checkbox"
            value="White"
            onChange={(e) => setEthnicity([...ethnicity, e.target.value])}
          />
          <Form.Label>White</Form.Label>
        </div>
        <br/>
        <br/>
        <br/>
        <Form.Control 
          value="Register"
          type="submit"
        />
      </Form>
      <br/>
      <br/>
      <br/>
      <div id="login">
        <Link to='/login'>
          Already have an account? Login
        </Link>
      </div>
    </div>
  );
}

export default Register;
