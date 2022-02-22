// components
import FormRegister from '../components/forms/FormRegister.js';
import FormSuccess from '../components/forms/FormSuccess.js';

// custom hooks
import useForm from '../hooks/useFormRegister';

// styles
import './Register.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function Register() {
  const { handleSubmit, handleChange, values, errors, isSubmitted } = useForm();
  
  return (
    <div className='Register'>
      <div id='art'>
      </div>
      <div id='form'>
        <div id='header'>
          <br/>
          <br/>
          <br/>
          <h1>Register</h1>
          <br/>
          <br/>
        </div>
        <div id='body'>
        {
          !isSubmitted ? (
            <FormRegister
              handleSubmit={handleSubmit}
              handleChange={handleChange}
              values={values}
              errors={errors}
            />
          ) : (
            <FormSuccess/>
          )
        }
        <br/>
        <br/>
        <br/>
        </div>
      </div>
    </div>
  );
}

export default Register;
