import Router from 'next/router';

import { Button } from 'react-bootstrap';

const Login = () => {
  return (
    <div className="login-page index-background">
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

    </div>
  );
};

export default Login;
