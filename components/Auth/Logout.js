import React from 'react';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Router from 'next/router';

const useStyles = makeStyles({
  button: {
    bottom: '0',
    display: 'flex',
    justifyContent: 'center',
    marginTop: '1rem'
  },
});

const LogoutBtn = ({ logoutHandler }) => {
  const classes = useStyles();
  return (
    <div className={classes.button}>
      <Button
        id="qsLogoutBtn"
        color="primary"
        variant="contained"
        onClick={() => Router.push('/api/logout')}
      >
        Log Out
      </Button>
    </div>
  );
};

export default LogoutBtn;
