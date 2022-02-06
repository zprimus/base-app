const register = async (registerData) => {
    const response = await fetch(process.env.REACT_APP_REGISTER_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(registerData)
    })

    const data = await response.json()

    return data;
}

export default register;