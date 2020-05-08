import React from 'react';

// Material UI components
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

// Router location hook
import {
  useLocation,
} from 'react-router-dom';

// Component styles
import styles from './styles';

// Generate the component styles
const useStyles = makeStyles(styles);

export default function ErrorMessage(props) {
  // Grab our message and helper text from the props
  const {
    title, message, helper, image,
  } = props;

  // Use the location hook
  const location = useLocation();

  // Calculate image path depth
  const pathnameDepth = location.pathname.split('/').length;
  let depth = '';

  for (let deep = 0; deep < pathnameDepth; deep += 1) {
    depth += '../';
  }

  // Generate our style class names
  const classes = useStyles();

  // Render the error message
  return (
    <div className={classes.empty}>
      <div className={classes.imgWrapper}>
        <img className={classes.img} src={`${depth}images/${image || 'error'}.png`} alt="" />
      </div>
      <Typography variant="h5" className={classes.emptyHeader}>
        {title || 'Woah, looks like someting went wrong'}
      </Typography>
      <Typography color="textSecondary" className={classes.emptyMessage}>
        {message}
      </Typography>
      <Typography color="textSecondary">
        {helper}
      </Typography>
    </div>
  );
}
