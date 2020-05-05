import React from 'react';
import { makeStyles } from '@material-ui/core';

// Generate the toolbar padding styles
const useStyles = makeStyles((theme) => ({
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
}));

// Export the toolbar padding component
export default function ToolbarPadding() {
  // Generate the class names
  const classes = useStyles();

  // Return the toolbar
  return <div className={classes.toolbar} />;
}
