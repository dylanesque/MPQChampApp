import Router from 'next/router';

import { Button } from 'react-bootstrap';

import { LoginPage } from '../LoginPage';

const Login = () => {
  return (
    <LoginPage className="index-background">
      <h1>Welcome to MPQ Hall Of Champions!</h1>
      <h2>Please login to continue</h2>
      <div>
        <Button
          id="qsLoginBtn"
          variant="primary"
          className="btn-margin loginBtn"
          onClick={() => {
            Router.push('/api/login');
          }}
        >
          Log In
        </Button>
      </div>
    </LoginPage>
  );
};

export default Login;
