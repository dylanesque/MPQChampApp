import styled from 'styled-components';
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
    <nav>
      <MobileMenu>
        <IconButton
          id="icon"
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

          <NavBar mobile={true} />
        </Drawer>
      </MobileMenu>
      <div className="main-nav">
        <NavBar />
      </div>
    </nav>
  );
};

const MobileMenu = styled.div`
  background-color: var(--darkBlue);
  display: flex;
  @media (min-width: 600px) {
    display: none;
  }
`;

export default Header;
