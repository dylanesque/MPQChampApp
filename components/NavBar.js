import Link from 'next/link';
import styled from 'styled-components';

import { useFetchUser } from '../lib/user';


const NavBar = ({ mobile }) => {
  const { user } = useFetchUser();
  return (
    <Navbar mobile={mobile}>
      <>
        <Link href="/">
          <NavbarLink className="navbar-link">HOME</NavbarLink>
        </Link>
      </>
      <>
        {user && (
          <Link href="/report">
            <NavbarLink className="navbar-link">ROSTER REPORT</NavbarLink>
          </Link>
        )}

        <Link href="/about">
          <NavbarLink className="navbar-link">ABOUT</NavbarLink>
        </Link>

        <Link href="/faqs">
          <NavbarLink className="navbar-link">FAQS</NavbarLink>
        </Link>

        <Link href="/contact">
          <NavbarLink className="navbar-link">CONTACT US</NavbarLink>
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

const NavbarLink = styled.a`
    color: white;
    font-size: 1rem;
    padding: 0 1.4rem 0 0;
    text-decoration: none;
    cursor: pointer;

  &:hover {
    color: var(--lightBlue);
  }
`;

export default NavBar;
