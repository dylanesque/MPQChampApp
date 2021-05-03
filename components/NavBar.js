import Link from 'next/link';
import IconButton from '@material-ui/core/IconButton';
import styled from '@emotion/styled'

import { useFetchUser } from '../lib/user';

const NavBar = () => {
  const { user } = useFetchUser();
  return (
    <Nav>
      <>
        <StyledLink href="/">
          <a>HOME</a>
        </StyledLink>
      </>
      <>
        {user && (
          <StyledLink href="/report">
            <a>ROSTER REPORT</a>
          </StyledLink>
        )}

        <StyledLink href="/about">
          <a>ABOUT</a>
        </StyledLink>

        <StyledLink href="/faqs">
          <a>FAQS</a>
        </StyledLink>

        <StyledLink href="/contact">
          <a>CONTACT US</a>
        </StyledLink>
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

  & :hover {
    color: var(--lightBlue);
  }
`;

export default NavBar;
