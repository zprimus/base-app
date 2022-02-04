const login = async (email, password) => {
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
    
    const data = await response.json();
    
    return data;
}

export default login;