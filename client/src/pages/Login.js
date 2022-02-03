// login/register template

// dependencies
import { useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import { Form } from 'react-bootstrap';

// styles
import './Login.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  async function loginUser(e) {
    e.preventDefault();

    const response = await fetch(process.env.REACT_APP_LOGIN_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password
      })
    })

    const data = await response.json()

    if(data.user) {
      localStorage.setItem('token', data.user)
      alert('Login successful')
      navigate('/')
    } else {
      alert('Please check your username and password')
    }
  }

  return (
    <div className="Login">
      <div id="header">
        <h1>Login</h1>
      </div>
      <br/>
      <br/>
      <br/>
      <Form onSubmit={loginUser}>
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
        <br/>
        <br/>
        <Form.Control
          value="Login"
          type="submit"
        />
      </Form>
      <br/>
      <br/>
      <br/>
      <div id="register">
        <Link to='/register'>
          Don't have an account? Register
        </Link>
      </div>
    </div>
  );
}

export default Login;
