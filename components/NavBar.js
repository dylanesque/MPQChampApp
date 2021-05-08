import Link from 'next/link';
import styled from '@emotion/styled';

import { useFetchUser } from '../lib/user';

const NavBar = () => {
  const { user } = useFetchUser();
  return (
    <Navbar>
      <>
        <Link href="/">
          <StyledLink>HOME</StyledLink>
        </Link>
      </>
      <>
        {user && (
          <Link href="/report">
            <StyledLink>ROSTER REPORT</StyledLink>
          </Link>
        )}

        <Link href="/about">
          <StyledLink>ABOUT</StyledLink>
        </Link>

        <Link href="/faqs">
          <StyledLink>FAQS</StyledLink>
        </Link>

        <Link href="/contact">
          <StyledLink>CONTACT US</StyledLink>
        </Link>
      </>
    </Navbar>
  );
};

const Navbar = styled.div`
  display: flex;
  flex-direction: column;

  @media (min-width: 600px) {
    flex-direction: row;
  }
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
