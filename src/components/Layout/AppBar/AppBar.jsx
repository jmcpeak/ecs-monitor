import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Navigation from './Navigation';
import Title from './Title';

const AppBar = () => {
  return (
    <MuiAppBar position="sticky">
      <Toolbar>
        <Grid alignItems="center" container spacing={2}>
          <Grid item>
            <IconButton
              aria-label="menu"
              color="inherit"
              edge="start"
              size="large"
            >
              <MenuIcon />
            </IconButton>
          </Grid>
          <Grid item xs>
            <Title />
          </Grid>
          <Grid item>
            <Navigation />
          </Grid>
        </Grid>
      </Toolbar>
    </MuiAppBar>
  );
};

export default AppBar;
