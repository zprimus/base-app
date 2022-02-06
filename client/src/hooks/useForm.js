import { useEffect, useState } from 'react';
import validate from '../app/validation';

// api
import api_register from '../api/register';

const useForm = () => {
    const [values, setValues] = useState({
        name: '',
        email: '',
        phoneNumber: '',
        password: '',
        password2: '',
        birthDate: '',
    });
    const [errors, setErrors] = useState({});
    const [isChanged, setIsChanged] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    /*
    useEffect(() => {
        
    }, [errors]);
    */

    const handleChange = (e) => {
        const {name, value} = e.target;
        const valuesBuffer = values;

        valuesBuffer[name] = value;

        setValues(valuesBuffer);
        setErrors(validate(valuesBuffer));

        setIsChanged(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        setIsSubmitting(true);
        if(Object.keys(errors).length === 0 && isChanged && isSubmitting) {
            registerUser();
        };
    }

    const registerUser = async () => {
        let register_response = await api_register(values);
            
        if(register_response.status === 'ok') {
            setIsSubmitted(true);
        } else {
            alert(register_response.error)
        }
    }
        

    return { handleSubmit, handleChange, values, errors, isSubmitted };
};

export default useForm;