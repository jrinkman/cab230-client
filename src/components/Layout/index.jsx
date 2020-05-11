import React from 'react';
import clsx from 'clsx';

// Material UI imports
import Button from '@material-ui/core/Button';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';

// Material UI icons
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import HomeIcon from '@material-ui/icons/HomeRounded';
import ChartIcon from '@material-ui/icons/TimelineRounded';
import DarkModeIcon from '@material-ui/icons/Brightness2Rounded';
import LightModeIcon from '@material-ui/icons/Brightness5Rounded';

// React router nav link
import { NavLink, useLocation } from 'react-router-dom';

// Authentication dialogs
import AuthDialog from '../AuthDialog';

// Authentication content
import authContext from '../../auth/context';

// Define a set drawer width
const drawerWidth = 240;

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

// Generate the layout styles
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexGrow: 1,
    height: '100%',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
  },
  title: {
    flexGrow: 1,
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
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
  // Grab our children from the props
  const { children, theme, toggleDarkMode } = props;

  // Grab our auth context
  const auth = React.useContext(authContext);

  // Generate class name
  const classes = useStyles();

  // Get our location
  const location = useLocation();

  // Create an open-close boolean state
  const [open, setOpen] = React.useState(false);

  // Create an open-close login dialog state
  const [authOpen, setAuthOpen] = React.useState(false);

  function NavListItem(navProps) {
    return (
      <ListItem
        button
        component={NavLink}
        activeClassName={classes.listItemActive}
        {...navProps}
      />
    );
  }

  // Create a handler for opening the sidebar
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  // Create a handler for closing the sidebar
  const handleDrawerClose = () => {
    setOpen(false);
  };

  // Create a handler for opening the sidebar
  const handleAuthOpen = () => {
    setAuthOpen(true);
  };

  // Create a handler for opening the sidebar
  const handleAuthClose = () => {
    setAuthOpen(false);
  };

  return (
    <>
      <AuthDialog auth={auth} open={authOpen} onClose={handleAuthClose} />
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, {
                [classes.hide]: open,
              })}
            >
              <MenuIcon />
            </IconButton>
            <Typography className={classes.title} variant="h6" noWrap>
              {getHeaderText(location.pathname)}
            </Typography>
            <div>
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
        <Drawer
          variant="permanent"
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open,
            }),
          }}
        >
          <div className={classes.toolbar}>
            <IconButton onClick={handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <List>
            <NavListItem exact to="/">
              <ListItemIcon><HomeIcon /></ListItemIcon>
              <ListItemText primary="Home" />
            </NavListItem>
            <NavListItem to="/stocks">
              <ListItemIcon><ChartIcon /></ListItemIcon>
              <ListItemText primary="Stocks" />
            </NavListItem>
          </List>
        </Drawer>
        <main className={classes.content}>
          {React.Children.toArray(children)}
        </main>
      </div>
    </>
  );
}
