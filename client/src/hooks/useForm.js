// dependencies
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

    
    useEffect(() => {
        if(Object.keys(errors).length === 0 && isSubmitting) {
            registerUser();
        };
    }, [errors]);
    

    const handleChange = (e) => {
        e.preventDefault();

        const { name, value } = e.target;
        let valuesBuffer = {...values, [name]: value }
        
        setValues(valuesBuffer);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        setErrors(validate(values));

        setIsSubmitting(true);
        
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