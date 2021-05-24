import styled from '@emotion/styled';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';

import NavBar from './NavBar';

const Header = () => {
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  return (
    <Nav>
      <div className="mobile-menu">
        <IconButton
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
        >
          <MenuIcon />
        </IconButton>
        <Drawer variant="persistent" anchor="left" open={open} classes={{}}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </Drawer>
      </div>
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
