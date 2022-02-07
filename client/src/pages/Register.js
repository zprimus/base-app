// components
import FormRegister from '../components/forms/FormRegister';
import FormSuccess from '../components/forms/FormSuccess';

// custom hooks
import useForm from '../hooks/useForm';

// styles
import './Register.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function Register() {
  const { handleSubmit, handleChange, values, errors, isSubmitted } = useForm();
  //console.log(values)  
  return (
    <div className='Register'>
      <div id='art'>
        
      </div>
      <div id='form'>
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
      </div>
    </div>
  );
}

export default Register;
