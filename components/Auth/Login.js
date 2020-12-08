import Router from 'next/router'

import { Button } from "react-bootstrap";

const Login = () => {
  return (
    <div className="overlay">
      <div className="overlay-content page-main">
        <div className="overlay-heading">
          Welcome to MPQ Champ App!
        </div>
        <div className="overlay-message">Please login to continue</div>
        <div className="overlay-action">
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
    </div>
  );
};

export default Login;
