// dependencies
import { useEffect, useState } from 'react';
import validate from '../app/validation';
import { useDispatch, useSelector } from 'react-redux';

// api
import api_updateUserData from '../api/updateUserData';
import api_getUserData from '../api/getUserData';

// features
import { edit } from '../reducers/user';

// custom hooks
import useDate from '../hooks/useDate';

const useFormUserSettings = () => {
    const user = useSelector((state) => state.user.value);
    const { formattedDate } = useDate(user.birthDate, 'date', '-');
    const [values, setValues] = useState({
        name: user.name,
        email: user.email,
        phoneNumber: user.phoneNumber,
        birthDate: formattedDate,
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    
    const dispatch = useDispatch();
    
    useEffect(() => {
        if(Object.keys(errors).length === 0 && isSubmitting) {
            updateUser();
        };
    }, [errors]);

    const handleChange = (e) => {
        e.preventDefault();

        const { name, value } = e.target;
        let valuesBuffer = {...values, [name]: value }
        
        setValues(valuesBuffer);
    };

    const handleCancel = () => {
        setValues({
            name: user.name,
            email: user.email,
            phoneNumber: user.phoneNumber,
            birthDate: formattedDate,
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(values)
        setErrors(validate(values));

        setIsSubmitting(true);
    }
    
    const updateUser = async () => {
        let response = await api_updateUserData(values);

        if(response.status === 'ok') {
            // replace token
            localStorage.setItem('token', response.user);

            // get new data from db
            let newUserData = await api_getUserData();

            // send data to redux store
            dispatch(
                edit({
                    name: newUserData.name,
                    email: newUserData.email,
                    phoneNumber: newUserData.phoneNumber,
                    birthDate: newUserData.birthDate,
                })
            );  
            setIsSubmitted(true);
        } else {
            setIsSubmitting(false);
            setIsSubmitted(false);
            alert(response.error)
        }
    }

    return { handleSubmit, handleChange, handleCancel, values, errors, isSubmitted };
};

export default useFormUserSettings;