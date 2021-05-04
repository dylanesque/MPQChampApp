import Link from 'next/link';
import styled from '@emotion/styled';

import { useFetchUser } from '../lib/user';

const NavBar = () => {
  const { user } = useFetchUser();
  return (
    <Nav>
      <>
        <Link className="link" href="/">
          <StyledLink>HOME</StyledLink>
        </Link>
      </>
      <>
        {user && (
          <Link className="link" href="/report">
            <StyledLink>ROSTER REPORT</StyledLink>
          </Link>
        )}

        <Link className="link" href="/about">
          <StyledLink>ABOUT</StyledLink>
        </Link>

        <Link className="link" href="/faqs">
          <StyledLink>FAQS</StyledLink>
        </Link>

        <Link className="link" href="/contact">
          <StyledLink>CONTACT US</StyledLink>
        </Link>
      </>
    </Nav>
  );
};

const Nav = styled.nav`
  background-color: var(--darkBlue);
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: flex-start;
  margin: 0 auto;
  padding: 1rem;
  top: 0;
  width: 100vw;
`;

const StyledLink = styled.a`
  color: white;
  font-size: 1rem;
  padding: 0 1.4rem 0 0;
  text-decoration: none;

  &:hover {
    color: var(--lightBlue);
  }
`;

export default NavBar;
