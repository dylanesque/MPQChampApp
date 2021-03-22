import Link from 'next/link';

import { useFetchUser } from '../lib/user';

const NavBar = () => {
  const { user } = useFetchUser();
  return (
    <nav className="navbar">
      <>
        <Link href="/">
          <a>HOME</a>
        </Link>
      </>
      <div>
        {user && (
          <Link href="/report">
            <a>ROSTER REPORT</a>
          </Link>
        )}

        <Link href="/about">
          <a>ABOUT</a>
        </Link>

        <Link href="/faqs">
          <a>FAQS</a>
        </Link>

        <Link href="/contact">
          <a>CONTACT US</a>
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
