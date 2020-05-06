import React from 'react';

// Material UI imports
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Zoom from '@material-ui/core/Zoom';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme, makeStyles } from '@material-ui/core/styles';


// Component styles
import styles from './styles';

// Create the useStyles function
const useStyles = makeStyles(styles);

// Create a transition component
const Transition = React.forwardRef((props, ref) => <Zoom ref={ref} {...props} />);

export default function AuthDialog(props) {
  // Destructure our props
  const { open, onClose } = props;

  // Grab the theme provider
  const theme = useTheme();

  // Generate our style class names
  const classes = useStyles();

  // Determine whether the screen is small enough for
  // a full screen dialog
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  // Render the dialog
  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={onClose}
      aria-labelledby="login-dialog-title"
      TransitionComponent={Transition}
    >
      <DialogTitle id="login-dialog-title" className={classes.title} disableTypography>
        <Typography variant="h4" className={classes.titleText}>Login</Typography>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please enter in your login details below
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="email"
          label="Email"
          type="email"
          fullWidth
        />
        <TextField
          autoFocus
          margin="dense"
          id="password"
          label="Password"
          type="password"
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={onClose} color="primary">
          Disagree
        </Button>
        <Button onClick={onClose} color="primary" autoFocus>
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  );
}
