import styled from '@emotion/styled';
import { IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

import NavBar from './NavBar';

const Header = () => {
  return (
    <Nav>
      <MobileMenu>
        <Hamburger />
   </MobileMenu>
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
  width: 100%;
`;


const MobileMenu = styled(IconButton)`
  @media (min-width: 600px) {
    display: none !important;
  }
`;

const Hamburger = styled(MenuIcon)`
  @media (min-width: 600px) {
    display: none !important;
  }
`;

export default Header;
