import React from 'react';

// Material UI imports
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

// React router imports
import { Link } from 'react-router-dom';

// Framer Motion div
import { motion } from 'framer-motion';

// Page animations
import variants from '../../motion';

export default function Home() {
  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={variants.page}
      transition={variants.transition}
      style={{ position: 'absolute' }}
    >
      <Typography variant="h3" style={{ fontWeight: 600 }}>Welcome to StockAnalytics!</Typography>
      <Typography variant="h5" color="textSecondary">Your solution to intuitive stock analytics is here.</Typography>
      <Button component={Link} to="/stocks" variant="contained" color="primary">to stocks</Button>
    </motion.div>
  );
}
