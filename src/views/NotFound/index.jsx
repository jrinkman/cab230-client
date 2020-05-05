import React from 'react';

// Material UI imports
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core';

// React router imports
import { Link } from 'react-router-dom';

// Framer Motion div
import { motion } from 'framer-motion';

// Page animations
import { notFound } from '../../motion';

// Component styles
import styles from './styles';

// Create the useStyles function
const useStyles = makeStyles(styles);

export default function NotFound() {
  // Generate class names
  const classes = useStyles();

  // Render the home page
  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={notFound.variants}
      transition={notFound.transition}
      className={classes.motionWrapper}
    >
      <div className={classes.root}>
        <Typography variant="h1" style={{ fontWeight: 600 }}>404 :(</Typography>
        <Typography variant="h5" color="textSecondary" className={classes.subtitle}>We can&apos;t find the page you&apos;re after</Typography>
        <div className={classes.imgWrapper}>
          <img className={classes.img} src="images/not-found.png" alt="" />
        </div>
        <Button component={Link} to="/" variant="contained" color="primary" size="large">take me home</Button>
      </div>
    </motion.div>
  );
}
