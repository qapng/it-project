import { useContext } from 'react';
import { Redirect } from 'react-router-dom';

import LoginForm from '../components/auth/LoginForm';
import RegisterForm from '../components/auth/RegisterForm';
import { AuthContext } from '../contexts/AuthContext';
import Loader from '../components/ui/Loader';

const Auth = ({ authRoute }) => {
  const {
    authState: { authLoading, isAuthenticated },
  } = useContext(AuthContext);

  let body;

  if (authLoading) {
    body = <Loader />;
  } else if (isAuthenticated) {
    return <Redirect to='/' />;
  } else {
    body = (
      <>
        {authRoute === 'login' && <LoginForm />}
        {authRoute === 'register' && <RegisterForm />}
      </>
    );
  }

  return <div>{body}</div>;
};

export default Auth;
