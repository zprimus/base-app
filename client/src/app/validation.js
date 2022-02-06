export default function validation(values) {
    let errors = {}

    // Name
    if(!values.name.trim()) {
        errors.name = "Name required"
    }

    // Email
    if(!values.email.trim()) {
        errors.email = "Email required"
    } else if(!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(values.email)) {
        errors.email = "Email address is invalid"
    }

    // Password
    if(!values.password) {
        errors.password = "Password is required";
    } else if(values.password.length < 6) {
        errors.password = "Password needs to be 6 characters or more";
    }

    // Password 2
    if(!values.password2) {
        errors.password2 = "Password is required";
    } else if(values.password2 !== values.password) {
        errors.password2 = "Passwords do not match";
    }

    // Phone Number
    if(values.phoneNumber) {
        if(!/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(values.phoneNumber)) {
            errors.phoneNumber = "Phone Number is is invalid";
        }
    }

    return errors;
}