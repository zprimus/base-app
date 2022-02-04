const getUserData = async () => {
    const response = await fetch(process.env.REACT_APP_LOGIN_GET_USERDATA, {
        headers: {
            'x-access-token' : localStorage.getItem('token')
        }
    })

    const data = await response.json();

    return data;
}

export default getUserData;