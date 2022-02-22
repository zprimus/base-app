// dependencies
//import { useState, useEffect } from 'react';
//import jwtDecode from 'jwt-decode';
import { useSelector } from 'react-redux';

// components

// styles
import './Home.css';
import { color, size } from '../style.js';

const Home = () => {
    //const [userExists, setUserExists] = useState(false);
    //const [postData, setPostData] = useState('');
    //const [getData, setGetData] = useState('');

    /*
    async function postSomething(e) {
        e.preventDefault();

        const req = await fetch(process.env.REACT_APP_LOGIN_API, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token' : localStorage.getItem('token')
            },
            body: JSON.stringify({
                quote: postData
            }),
        })

        const data = await req.json()
        if(data.status === 'ok') {
            setPostData(postData)
        } else {
            alert(data.error)
        }
    }
    

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

    */
   
    const { darkMode } = useSelector((state) => state.client.value);

    return (
        <div 
            className="Home" 
            style={{
                background: (darkMode ? color.dark_mode_1 : color.light_mode_1),
                minHeight: ('calc(100vh - ' + size.headerbar_height + ')'),
            }}
        >
            <h1>Home Page</h1>
        </div>
    );
}

export default Home;