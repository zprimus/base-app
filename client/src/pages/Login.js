// login/register template

// dependencies
import { useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import { Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';

// features
import { login } from '../reducers/user';

// api
import api_login from '../api/login';
import api_getUserData from '../api/getUserData';

// styles
import './Login.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function loginUser(e) {
    e.preventDefault();

    const data_login = await api_login(email, password);

    if(data_login.user && (data_login.status === 'ok')) {

      // store token in client browser
      localStorage.setItem('token', data_login.user);

      // get user data from db
      const data_getUserData = await api_getUserData();

      // send data to redux store
      dispatch(
        login({
          name: data_getUserData.name,
          email: data_getUserData.email,
          phoneNumber: data_getUserData.phoneNumber,
          birthDate: data_getUserData.birthDate,
          ethnicity: data_getUserData.ethnicity,
        })
      );      

      alert('Login successful')
      navigate('/')
    } else {
      alert(data_login.error + 'Please check your username and password')
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
