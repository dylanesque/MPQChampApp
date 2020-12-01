import React from 'react';
import Link from 'next/link';
import AppBar from '@material-ui/core/AppBar';

const Layout = ({ children }) => {
  return (
    <>
      <AppBar position="static" className="nav-bar">
        <Link href="/">
          <a>HOME</a>
        </Link>
        <Link href="/about">
          <a>ABOUT</a>
        </Link>

        <Link href="/faqs">
          <a>FAQS</a>
        </Link>

        <Link href="/contact">
          <a>CONTACT US</a>
        </Link>
      </AppBar>

      {children}
    </>
  );
};

export default Layout;
