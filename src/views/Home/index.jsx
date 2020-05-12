import React from 'react';

// Material UI imports
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core';

// React router imports
import { useHistory } from 'react-router-dom';

// Framer Motion div
import { motion } from 'framer-motion';

// Page animations
import { splash } from '../../motion';

// Toolbar padding
import ToolbarPadding from '../../components/ToolbarPadding';

// Component styles
import styles from './styles';

// Create the useStyles function
const useStyles = makeStyles(styles);

export default function Home() {
  // Generate class names
  const classes = useStyles();

  // Grab the history from the hook
  const history = useHistory();

  // Create a "let's go" button click handler
  const handleNavClick = () => {
    history.push('/stocks');
  };

  // Render the home page
  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={splash.variants}
      transition={splash.transition}
      className={classes.motionWrapper}
    >
      <div className={classes.root}>
        <ToolbarPadding />
        <Typography variant="h2" className={classes.title}>Hey there!</Typography>
        <Typography variant="h6" color="textSecondary" className={classes.subtitle}>Your simple solution to market analysis is here.</Typography>
        <div className={classes.imgWrapper}>
          <img className={classes.img} src="images/welcome.png" alt="" />
        </div>
        <Button
          className={classes.goButton}
          onClick={handleNavClick}
          variant="contained"
          color="secondary"
          size="large"
        >
          Let&apos;s go
        </Button>
      </div>
    </motion.div>
  );
}
