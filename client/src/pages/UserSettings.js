// dependencies
import { useSelector } from 'react-redux';

// components
import FormUserSettings from '../components/forms/FormUserSettings.js';

// custom hooks
import useForm from '../hooks/useFormUserSettings';

// styles
import './UserSettings.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { color, size } from '../style.js';

function UserSettings() {
    const { handleSubmit, handleChange, handleCancel, values, errors, isSubmitted } = useForm();
    const { darkMode } = useSelector((state) => state.client.value);

    return (
        <div className="UserSettings" 
            style={{
                background: (darkMode ? color.dark_mode_1 : color.light_mode_1),
                minHeight: ('calc(100vh - ' + size.headerbar_height + ')'),
            }}
        >
            <div id='form'>
                <div id='header'>
                    <br/>
                    <br/>
                    <br/>
                    <h1>User Settings</h1>
                    <br/>
                    <br/>
                </div>
                <div id='body'>
                    {
                        <FormUserSettings
                            handleSubmit={handleSubmit}
                            handleChange={handleChange}
                            handleCancel={handleCancel}
                            values={values}
                            errors={errors}
                            isSubmitted={isSubmitted}
                        />
                    }
                </div>
            </div>
        </div>
    );
}

export default UserSettings;