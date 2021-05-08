import styled from '@emotion/styled';

import NavBar from './NavBar';

const Header = () => {
  return (
    <Nav>
      <NavBar />
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
  max-width: 100%;
`;

export default Header;
