// dependencies
import { useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode'; 
import { useNavigate } from 'react-router-dom';

// components

// styles

const Home = () => {
    const [userExists, setUserExists] = useState(false);
    const [postData, setPostData] = useState('');
    const [getData, setGetData] = useState('');

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

    return (
        <div>
            <h1>Home Page</h1>
            {getData}
        </div>
    );
}

export default Home;