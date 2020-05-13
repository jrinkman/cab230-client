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

// Framer Motion div
import { motion } from 'framer-motion';

// Table imports
import StockTable from './components/StockTable';

// Toolbar & error message padding import
import ToolbarPadding from '../../components/ToolbarPadding';
import ErrorMessage from '../../components/ErrorMessage';

// Page animations
import { page } from '../../motion';

// Error message handler
import getErrorMessage from '../../helpers/getErrorMessage';

// Authentication content
import authContext from '../../auth/context';

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

  // Grab our auth context
  const auth = React.useContext(authContext);

  // Create a state to store search
  const [search, setSearch] = React.useState('');

  // Create a loading, error & rows state
  const [loading, setLoading] = React.useState(true);
  const [rows, setRows] = React.useState([]);
  const [error, setError] = React.useState(null);

  // Since our page state has to be managed here, create it
  const [currentPage, setPage] = React.useState(0);

  // Create an effect hook for the stock symbols
  React.useEffect(() => {
    // Create a cancelled flag
    let cancelled = false;

    async function getStockSymbols() {
      try {
        // Reset the error the state
        setError(null);

        // Reset the page
        setPage(0);

        // Ensure the loading animation is active
        setLoading(true);

        // Retrieve the stock symbols
        const symbols = await auth.api.getStockSymbols(search || null);

        // If our component is still mounted, update the state
        if (!cancelled) {
          // Disable the loading animation
          setLoading(false);

          // Update the symbols in the table props
          setRows(symbols);
        }
      } catch (reqError) {
        // Update the error state if we're still mounted
        if (!cancelled) {
          setError(getErrorMessage(reqError));
        }
      }
    }

    // Trigger the async function
    getStockSymbols();

    // Return a callback to enable the cancelled flag
    // when we unmount
    return () => { cancelled = true; };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

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
      <Container className={classes.container} maxWidth="lg">
        <ToolbarPadding />
        <Grid className={classes.grid} container spacing={2} alignItems="center">
          <Grid item xs={12} sm="auto" style={{ flexGrow: 1 }}>
            <Typography variant="h4" style={{ fontWeight: 700 }}>Stocks</Typography>
            <Typography variant="h6" color="textSecondary">View available stocks</Typography>
          </Grid>
          <Grid item xs={12} sm={5} md={4} lg={3}>
            <Autocomplete
              freeSolo
              fullWidth
              id="free-solo-2-demo"
              options={sectors}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Industry Search (Press Enter)"
                  margin="normal"
                  variant="outlined"
                  placeholder="E.G. Health Care"
                  onKeyDown={(e) => {
                    if (e.keyCode === 13) {
                      setSearch(e.target.value);
                    }
                  }}
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
        {/* eslint-disable-next-line no-nested-ternary */}
        {error ? error === 'Industry sector not found' ? <ErrorMessage title="Sector not found" message="Please try a different search term" image="empty" />
          : <ErrorMessage message={error} helper="Try reloading the page to try again" />
          : (
            <StockTable
              loading={loading}
              page={currentPage}
              setPage={setPage}
              rows={rows}
              style={{ flexGrow: 1 }}
            />
          )}
      </Container>
    </motion.div>
  );
}
