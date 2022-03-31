import { Form, Button, FormControl, FormGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import classes from './AuthForm.module.css';
import AlertMessage from '../ui/AlertMessage';
import { useContext, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';

function RegisterForm() {
  // Context
  const { registerUser } = useContext(AuthContext);

  // Local state
  const [registerForm, setRegisterForm] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    email: '',
  });

  // Alert
  const [alert, setAlert] = useState(null);

  const onChangeRegisterForm = (event) =>
    setRegisterForm({
      ...registerForm,
      [event.target.name]: event.target.value,
    });

  const { username, password, confirmPassword, email } = registerForm;

  const register = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setAlert({ type: 'danger', message: 'Passwords do not match' });
      setTimeout(() => setAlert(null), 5000);
      return;
    }

    try {
      const registerData = await registerUser(registerForm);
      if (!registerData.success) {
        setAlert({ type: 'danger', message: registerData.message });
        setTimeout(() => setAlert(null), 5000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <AlertMessage info={alert} />
      <Form className={classes.loginBox} onSubmit={register}>
        <legend className={classes.title}>Register</legend>
        <FormGroup className={classes.userBox}>
          <FormControl
            type='text'
            name='username'
            placeholder='Username'
            required
            value={username}
            onChange={onChangeRegisterForm}
          ></FormControl>
        </FormGroup>
        <FormGroup className={classes.userBox}>
          <FormControl
            type='password'
            name='password'
            placeholder='Password'
            required
            value={password}
            onChange={onChangeRegisterForm}
          ></FormControl>
        </FormGroup>
        <FormGroup className={classes.userBox}>
          <FormControl
            type='password'
            name='confirmPassword'
            placeholder='Confirm Password'
            required
            value={confirmPassword}
            onChange={onChangeRegisterForm}
          ></FormControl>
        </FormGroup>
        <FormGroup className={classes.userBox}>
          <FormControl
            type='text'
            name='email'
            placeholder='Email'
            required
            value={email}
            onChange={onChangeRegisterForm}
          ></FormControl>
        </FormGroup>
        <Button type='submit' className={classes.mainbtn}>
          Register
        </Button>
        <Link to='/login' className={classes.link}>
          Login
        </Link>
      </Form>
    </>
  );
}

export default RegisterForm;
