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

export default function Stocks() {
  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={variants.page}
      transition={variants.transition}
      style={{ position: 'absolute' }}
    >
      <Typography variant="h3" style={{ fontWeight: 600 }}>Stocks</Typography>
      <Typography variant="h5" color="textSecondary">Let&apos;s have a look at some stocks.</Typography>
      <Button component={Link} to="/" variant="contained" color="primary">home</Button>
    </motion.div>
  );
}
