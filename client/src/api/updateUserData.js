const updateUserData = async (userData) => {
    const { name, email, phoneNumber, birthDate } = userData;

    const response = await fetch(process.env.REACT_APP_UPDATE_USERDATA, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-access-token' : localStorage.getItem('token')
            
        },
        body: JSON.stringify({
            name,
            email,
            phoneNumber,
            birthDate,
        })
    })
    
    const data = await response.json();

    console.log(data)

    return data;
}

export default updateUserData;