import Link from 'next/link';


import { useFetchUser } from '../lib/user';

const NavBar = () => {
  const { user } = useFetchUser();
  return (
    <div className="navbar">
      <>
        <Link href="/">
          <a className="navbar-link">HOME</a>
        </Link>
      </>
      <>
        {user && (
          <Link href="/report">
            <a className="navbar-link">ROSTER REPORT</a>
          </Link>
        )}

        <Link href="/about">
          <a className="navbar-link">ABOUT</a>
        </Link>

        <Link href="/faqs">
          <a className="navbar-link">FAQS</a>
        </Link>

        <Link href="/contact">
          <a className="navbar-link">CONTACT US</a>
        </Link>
      </>
    </div>
  );
};

export default NavBar;
