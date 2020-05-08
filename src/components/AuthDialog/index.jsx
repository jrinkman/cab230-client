import React from 'react';

// Material UI imports
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import CircularProgress from '@material-ui/core/CircularProgress';
import Card from '@material-ui/core/Card';
import Grow from '@material-ui/core/Grow';
import Collapse from '@material-ui/core/Collapse';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme, makeStyles } from '@material-ui/core/styles';


// Component styles
import styles from './styles';

// Error message handler
import getErrorMessage from '../../helpers/getErrorMessage';

// Create the useStyles function
const useStyles = makeStyles(styles);

// Create a transition component
const Transition = React.forwardRef((props, ref) => <Grow ref={ref} {...props} />);

// Create a tab panel component
function TabPanel(props) {
  const {
    children, value, index, ...other
  } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          {children}
        </Box>
      )}
    </div>
  );
}

// Prop generation function
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function AuthDialog(props) {
  // Destructure our props
  const { auth, open, onClose } = props;

  // Create a tab value state
  const [tab, setTab] = React.useState(0);

  // Create a login form state
  const [formLogin, setFormLogin] = React.useState({
    error: null,
    values: {
      email: '',
      password: '',
    },
  });

  // Create a register form state
  const [formRegister, setFormRegister] = React.useState({
    error: null,
    values: {
      email: '',
      password: '',
    },
  });

  // Create a state for whether we're processing a login
  const [isProcessing, setIsProcessing] = React.useState(false);

  // Create a tab change handler
  const handleChange = (event, newValue) => {
    setTab(newValue);
  };

  // Create a login form change handler
  const handleLoginChange = (event) => {
    setFormLogin({
      ...formLogin,
      values: {
        ...formLogin.values,
        [event.target.name]: event.target.value,
      },
    });
  };

  // Create a login form change handler
  const handleRegisterChange = (event) => {
    setFormRegister({
      ...formRegister,
      values: {
        ...formRegister.values,
        [event.target.name]: event.target.value,
      },
    });
  };

  // Create a login callback function
  const handleLogin = React.useCallback(async () => {
    // Don't allow logins while we're processing
    if (isProcessing
      || formLogin.values.email.length < 1
      || formLogin.values.password.length < 1) return;

    // Update the processing flag
    setIsProcessing(true);

    // Update the login error status (if needed)
    if (formLogin.error) {
      setFormLogin({
        ...formLogin,
        error: null,
      });
    }

    try {
      // Make the login request
      await auth.api.login(formLogin.values);

      // Close the dialog
      onClose();
    } catch (error) {
      // Update the login form state with the error
      setFormLogin({
        ...formLogin,
        error: getErrorMessage(error),
      });
    }

    // once the request is sent, update state again
    setIsProcessing(false);
  }, [isProcessing, formLogin, auth.api, onClose]);

  // Create a register callback function
  const handleRegister = React.useCallback(async () => {
    // Don't allow registrations while we're processing
    if (isProcessing
      || formRegister.values.email.length < 1
      || formRegister.values.password.length < 1) return;

    // Update the processing flag
    setIsProcessing(true);

    // Update the login error status (if needed)
    if (formRegister.error) {
      setFormRegister({
        ...formRegister,
        error: null,
      });
    }

    try {
      // Make the registration request
      await auth.api.register(formRegister.values);

      // Try and login
      await auth.api.login(formRegister.values);

      // Disable the processing flag
      setIsProcessing(false);

      // Close the dialog
      onClose();

      // Update the login values
    } catch (error) {
      // Update the login form state with the error
      setFormRegister({
        ...formRegister,
        error: getErrorMessage(error),
      });

      // Disable the processing flag
      setIsProcessing(false);
    }
  }, [isProcessing, formRegister, auth.api, onClose]);

  // Grab the theme provider
  const theme = useTheme();

  // Generate our style class names
  const classes = useStyles();

  // Determine whether the screen is small enough for
  // a full screen dialog
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  // Render the dialog
  // testing-user@mail.com
  // 1234
  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={isProcessing ? () => {} : onClose}
      aria-labelledby="auth-dialog-title"
      TransitionComponent={Transition}
    >
      <Tabs
        variant="fullWidth"
        value={tab}
        onChange={handleChange}
        aria-label="login and register tabs"
      >
        <Tab disabled={isProcessing} label="Login" {...a11yProps(0)} />
        <Tab disabled={isProcessing} label="Register" {...a11yProps(1)} />
      </Tabs>
      <Collapse
        in={Boolean(tab === 0 && formLogin.error)
        || Boolean(tab === 1 && formRegister.error)}
      >
        <Card variant="outlined" className={classes.errorCard}>
          <Typography className={classes.errorCardText}>
            {tab === 0 ? formLogin.error : formRegister.error}
          </Typography>
        </Card>
      </Collapse>
      <div className={classes.header}>
        <Typography variant="h4" className={classes.title}>
          {tab === 0 ? 'Login' : 'Register'}
        </Typography>
        <Grow in={isProcessing}>
          <CircularProgress className={classes.progress} size={32} />
        </Grow>
      </div>
      <DialogContent>
        <TabPanel value={tab} index={0}>
          <DialogContentText>
            Please enter in your details below
          </DialogContentText>
          <form onSubmit={handleLogin}>
            <TextField
              disabled={isProcessing}
              autoFocus
              color="secondary"
              variant="outlined"
              margin="dense"
              name="email"
              label="Email"
              type="email"
              value={formLogin.email}
              onChange={handleLoginChange}
              fullWidth
            />
            <TextField
              disabled={isProcessing}
              color="secondary"
              variant="outlined"
              margin="dense"
              name="password"
              label="Password"
              type="password"
              value={formLogin.password}
              onChange={handleLoginChange}
              fullWidth
            />
          </form>
        </TabPanel>
        <TabPanel value={tab} index={1}>
          <DialogContentText>
            We&apos;ll log you in right after
          </DialogContentText>
          <form onSubmit={handleRegister}>
            <TextField
              disabled={isProcessing}
              autoFocus
              color="secondary"
              variant="outlined"
              margin="dense"
              name="email"
              label="Email"
              type="email"
              value={formRegister.email}
              onChange={handleRegisterChange}
              fullWidth
            />
            <TextField
              disabled={isProcessing}
              color="secondary"
              variant="outlined"
              margin="dense"
              name="password"
              label="Password"
              type="password"
              value={formRegister.password}
              onChange={handleRegisterChange}
              fullWidth
            />
          </form>
        </TabPanel>
      </DialogContent>
      <DialogActions>
        {fullScreen && (
          <Button onClick={onClose} color="primary">
            Close
          </Button>
        )}
        {tab === 0
          ? (
            <Button
              disabled={isProcessing
                || formLogin.values.email.length < 1
                || formLogin.values.password.length < 1}
              onClick={handleLogin}
              color="secondary"
            >
              Login
            </Button>
          )
          : (
            <Button
              disabled={isProcessing
                || formRegister.values.email.length < 1
                || formRegister.values.password.length < 1}
              onClick={handleRegister}
              color="secondary"
            >
              Register
            </Button>
          )}
      </DialogActions>
    </Dialog>
  );
}
