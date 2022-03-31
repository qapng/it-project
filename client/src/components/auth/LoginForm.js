import { Form, Button, FormControl, FormGroup, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import classes from './AuthForm.module.css';
import { useState, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import AlertMessage from '../ui/AlertMessage';

function LoginForm() {
  // Context
  const { loginUser } = useContext(AuthContext);

  // Local state
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
  });

  // Alert
  const [alert, setAlert] = useState(null);

  const onChangeLoginForm = (event) =>
    setLoginForm({
      ...loginForm,
      [event.target.name]: event.target.value,
    });

  const { email, password } = loginForm;

  const login = async (event) => {
    event.preventDefault();

    try {
      const loginData = await loginUser(loginForm);
      if (!loginData.success) {
        setAlert({ type: 'danger', message: loginData.message });
        setTimeout(() => setAlert(null), 5000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <AlertMessage info={alert} />
      <Form className={classes.loginBox} onSubmit={login}>
        <legend className={classes.title}>Login</legend>
        <FormGroup className={classes.userBox}>
          <FormControl
            type='text'
            name='email'
            placeholder='email'
            required
            value={email}
            onChange={onChangeLoginForm}
          ></FormControl>
        </FormGroup>
        <FormGroup className={classes.userBox}>
          <FormControl
            type='password'
            name='password'
            placeholder='Password'
            required
            value={password}
            onChange={onChangeLoginForm}
          ></FormControl>
        </FormGroup>
        <Button type='submit' className={classes.mainbtn}>
          Login
        </Button>
        <Link to='/register' className={classes.link}>
          Register
        </Link>
      </Form>
    </>
  );
}

export default LoginForm;
