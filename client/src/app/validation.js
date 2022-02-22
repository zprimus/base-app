export default function validation(values) {
    let errors = {}

    const passwordMin = 6;
    const passwordMax = 128;    

    // Name
    if(values.name !== undefined) {
        if(values.name.trim() === '') {
            errors.name = "Name required"
        }
    }

    // Email
    if(values.email !== undefined) {
        if(values.email.trim() === '') {
            errors.email = "Email required"
        } else if(!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(values.email)) {
            errors.email = "Email address is invalid"
        }
    }

    // Password
    if(values.password !== undefined) {
        if(values.password === '') {
            errors.password = "Password is required";
        } else if(values.password.length < passwordMin) {
            errors.password = "Password needs to be " + passwordMin + " characters or more";
        } else if(values.password.length > passwordMax) {
            errors.password = "Password needs to be " + passwordMax + " characters or less";
        }
    }

    // Password 2
    if(values.password2 !== undefined) {
        if(values.password2 !== values.password) {
            errors.password2 = "Passwords do not match";
        }
    }

    // Phone Number
    if(values.phoneNumber !== undefined) {
        if(values.phoneNumber) {
            if(!/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(values.phoneNumber)) {
                errors.phoneNumber = "Phone Number is invalid";
            }
        }
    }
    
    // Birth Date
    if(values.birthDate !== undefined) {
        if(values.birthDate === '') {
            errors.birthDate = "Birthdate is required";
        } else if(!/^\d{4}[./-]\d{2}[./-]\d{2}$/.test(values.birthDate)) {
            errors.birthDate = "Birthdate is invalid";
        }
    }

    return errors;
}