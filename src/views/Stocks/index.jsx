import React from 'react';

// Material UI imports
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import InputAdornment from '@material-ui/core/InputAdornment';
import { makeStyles } from '@material-ui/core';

// Material UI Lab imports
import Autocomplete from '@material-ui/lab/Autocomplete';

// Material UI Icon imports
import SearchIcon from '@material-ui/icons/SearchRounded';

// Suggestion highlighting
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';

// React router imports
// import { Link } from 'react-router-dom';

// Framer Motion div
import { motion } from 'framer-motion';

// Toolbar padding import
import ToolbarPadding from '../../components/ToolbarPadding';

// Page animations
import { page } from '../../motion';

// Component styles
import styles from './styles';

// Create the useStyles function
const useStyles = makeStyles(styles);

// Define a string array of industry sectors
const sectors = [
  'Health Care',
  'Industrials',
  'Consumer Discretionary',
  'Information Technology',
  'Consumer Staples',
  'Utilities',
  'Financials',
  'Real Estate',
  'Materials',
  'Energy',
  'Telecommunication Services',
];

export default function Stocks() {
  // Generate class names
  const classes = useStyles();

  // Render the stocks page
  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={page.variants}
      transition={page.transition}
      className={classes.motionWrapper}
    >
      <div className={classes.root}>
        <Container maxWidth="lg">
          <ToolbarPadding />
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm="auto" style={{ flexGrow: 1 }}>
              <Typography variant="h4" style={{ fontWeight: 600 }}>Stocks</Typography>
              <Typography variant="h6" color="textSecondary">View available stocks</Typography>
            </Grid>
            <Grid item xs={12} sm={5} md={4} lg={3}>
              <Autocomplete
                freeSolo
                fullWidth
                id="free-solo-2-demo"
                disableClearable
                options={sectors}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Search"
                    margin="normal"
                    variant="outlined"
                    InputProps={{
                      ...params.InputProps,
                      type: 'search',
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
                renderOption={(option, { inputValue }) => {
                  // Find the parts where the input string matches the option
                  const matched = match(option, inputValue);

                  // Parse the matched areas into parts
                  const parts = parse(option, matched);

                  // Render the autocomplete option
                  return (
                    <div>
                      {parts.map((part, index) => (
                        // eslint-disable-next-line react/no-array-index-key
                        <span key={index} style={{ fontWeight: part.highlight ? 700 : 400 }}>
                          {part.text}
                        </span>
                      ))}
                    </div>
                  );
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </div>
    </motion.div>
  );
}
