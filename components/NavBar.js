import Link from 'next/link';
import styled from 'styled-components';


import { useFetchUser } from '../lib/user';

const NavBar = ({ mobile }) => {
  const { user } = useFetchUser();
  return (
    <Navbar mobile={mobile}>
      <>
        <Link href="/">
          <a className='navbar-link'>HOME</a>
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
    </Navbar>
  );
};

const Navbar = styled.nav`
  background-color: var(--darkBlue);
  display: flex;
  align-items: ${(props) => (props.mobile ? 'flex-start' : 'center')};
  flex-direction: ${(props) => (props.mobile ? 'column' : 'row')};
  justify-content: flex-start;
  margin: 0 auto;
  padding: 1rem;
  top: 0;
  max-width: 100%;
`;

export default NavBar;
