import React from 'react';

// Material UI imports
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

// Material UI icons
import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/HomeRounded';
import ChartIcon from '@material-ui/icons/TimelineRounded';
import DarkModeIcon from '@material-ui/icons/Brightness2Rounded';
import LightModeIcon from '@material-ui/icons/Brightness5Rounded';

// React router nav link and location hook
import { NavLink, useLocation } from 'react-router-dom';

// Authentication dialogs
import AuthDialog from '../AuthDialog';

// Authentication content
import authContext from '../../auth/context';

// Define a set drawer width
const drawerWidth = 200;

// Function for getting header text
/**
 * @param {String} route
 */
function getHeaderText(route) {
  const parts = route.split('/');
  const segments = parts.slice(1, parts.length);

  // Account for the dynamic stock routes
  if (segments.length > 1) {
    if (segments[0] !== 'stocks') {
      return 'Not Found';
    }
    return `Stocks (${segments[1]})`;
  }

  // Else, switch through the default routes
  switch (segments[0]) {
    default: return 'Not Found';
    case '': return 'Home';
    case 'stocks': return 'Stocks';
  }
}

// Define the layout styles
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexGrow: 1,
    height: '100%',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  barPrefix: {
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: {
    [theme.breakpoints.up('sm')]: {
      ...theme.mixins.toolbar,
    },
  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    overflowX: 'hidden',
    overflowY: 'hidden',
    flexGrow: 1,
  },
  listItemActive: {
    backgroundColor: theme.palette.action.selected,
    '& .MuiListItemIcon-root': {
      color: theme.palette.primary,
    },
  },
  darkModeToggle: {
    marginRight: theme.spacing(1),
  },
}));

// Export the layout component
export default function Layout(props) {
  // Destructure the props
  const {
    children, theme, toggleDarkMode,
  } = props;

  // Generate class name
  const classes = useStyles();

  // Get our router location
  const location = useLocation();

  // Grab our auth context
  const auth = React.useContext(authContext);

  // Create an open-close boolean state
  const [mobileOpen, setMobileOpen] = React.useState(false);

  // Create an open-close login dialog state
  const [authOpen, setAuthOpen] = React.useState(false);

  // Create a handler for toggling the sidebar open state
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // Create a handler for opening the sidebar
  const handleAuthOpen = () => {
    setAuthOpen(true);
  };

  // Create a handler for opening the sidebar
  const handleAuthClose = () => {
    setAuthOpen(false);
  };

  // Small component for navbar items
  function NavListItem(navProps) {
    return (
      <ListItem
        button
        component={NavLink}
        onClick={() => {
          setMobileOpen(false);
        }}
        activeClassName={classes.listItemActive}
        {...navProps}
      />
    );
  }

  // Abstract the drawer component
  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <List>
        <NavListItem exact to="/">
          <ListItemIcon><HomeIcon /></ListItemIcon>
          <ListItemText primary="Home" primaryTypographyProps={{ style: { fontWeight: 500 } }} />
        </NavListItem>
        <NavListItem to="/stocks">
          <ListItemIcon><ChartIcon /></ListItemIcon>
          <ListItemText primary="Stocks" primaryTypographyProps={{ style: { fontWeight: 500 } }} />
        </NavListItem>
      </List>
    </div>
  );

  // Render the app's layout
  return (
    <>
      <AuthDialog auth={auth} open={authOpen} onClose={handleAuthClose} />
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
              <b className={classes.barPrefix}>Stock Analytics | </b>
              {getHeaderText(location.pathname)}
            </Typography>
            <div style={{ marginLeft: 'auto' }}>
              <IconButton
                color="inherit"
                className={classes.darkModeToggle}
                onClick={toggleDarkMode}
              >
                {theme === 'light' ? <LightModeIcon /> : <DarkModeIcon />}
              </IconButton>
              {auth.logged_in ? (
                <Button
                  variant="outlined"
                  color="inherit"
                  onClick={() => {
                    auth.api.logout();
                  }}
                >
                  Logout
                </Button>
              ) : (
                <Button
                  variant="outlined"
                  color="inherit"
                  onClick={handleAuthOpen}
                >
                  Login
                </Button>
              )}
            </div>
          </Toolbar>
        </AppBar>
        <nav className={classes.drawer} aria-label="mailbox folders">
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Hidden smUp implementation="css">
            <Drawer
              variant="temporary"
              open={mobileOpen}
              onClose={handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper,
              }}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation="css">
            <Drawer
              classes={{
                paper: classes.drawerPaper,
              }}
              variant="permanent"
              open
            >
              {drawer}
            </Drawer>
          </Hidden>
        </nav>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {React.Children.toArray(children)}
        </main>
      </div>
    </>
  );
}
