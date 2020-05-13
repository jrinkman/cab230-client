import React from 'react';

// Material UI imports
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { makeStyles, useTheme } from '@material-ui/core';

// Material UI Lab components
import Skeleton from '@material-ui/lab/Skeleton';

// Reacr router hooks
import { useParams } from 'react-router-dom';

// Framer Motion div
import { motion } from 'framer-motion';

// Toolbar & error message padding import
import ToolbarPadding from '../../components/ToolbarPadding';
import ErrorMessage from '../../components/ErrorMessage';

// Stat card componets
import generateStatCards from './generateStatCards';
import StatCard from './components/StatCard';

// Table component
import HistoryTable from './components/HistoryTable';

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

export default function Details() {
  // Generate class names
  const classes = useStyles();

  // Use the theme hook for icon colors
  const theme = useTheme();

  // Get our router params
  const { symbol } = useParams();

  // Grab our auth context
  const auth = React.useContext(authContext);

  // Create a state to store the latest stock data
  const [latest, setLatest] = React.useState(null);

  // Create a loading & error state
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  // Create an effect hook for the stock symbols
  React.useEffect(() => {
    // Create a cancelled flag
    let cancelled = false;

    async function getStockLatest() {
      try {
        // Reset the error the state
        setError(null);

        // Ensure the loading animation is active
        setLoading(true);

        // Retrieve the stock symbols
        const latestStock = await auth.api.getStockLatest(symbol);

        // If our component is still mounted, update the state
        if (!cancelled) {
          // Update the state with the latest stock data
          setLatest(latestStock);

          // Disable the loading animation
          setLoading(false);
        }
      } catch (reqError) {
        // Ensure we're mounted before updating the error state
        if (!cancelled) {
          // Update the error state
          setError(getErrorMessage(reqError));
        }
      }
    }

    getStockLatest();

    // Return a callback to enable the cancelled flag
    // when we unmount
    return () => { cancelled = true; };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [symbol]);

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
        {(() => {
          // If an error occured, display it
          if (error) return <ErrorMessage message={error} helper="Please reload the page / try a different stock" />;

          // If we're loading, show the loading display
          if (loading) {
            // Generate a base dummy figure
            const figure = {
              header: '',
              value: '',
            };

            // Render loading cards
            return (
              <>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Skeleton height={35} style={{ marginBottom: 12 }} width="40%" />
                    <Skeleton height={28} width="25%" />
                  </Grid>
                  {[0, 1].map((key) => (
                    <Grid key={key} item xs={12} sm={6} md={6} lg={6} xl={6}>
                      <StatCard figure={figure} loading />
                    </Grid>
                  ))}
                  {[0, 1, 2, 3].map((key) => (
                    <Grid key={key} item xs={12} sm={6} md={3} lg={3} xl={3}>
                      <StatCard figure={{ ...figure, Icon: '' }} loading />
                    </Grid>
                  ))}
                </Grid>
              </>
            );
          }

          // Otherwise, render the stats cards
          return (
            <Grid className={classes.grid} container spacing={2}>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <Typography variant="h4" style={{ fontWeight: 700 }}>
                  {latest.name}
                  {' '}
                  (
                  {latest.symbol}
                  )
                </Typography>
                <Typography variant="h6" color="textSecondary">{latest.industry}</Typography>
              </Grid>
              {generateStatCards(theme, latest).map((figure) => (figure.Icon ? (
                <Grid key={figure.header} item xs={12} sm={6} md={3} lg={3} xl={3}>
                  <StatCard figure={figure} />
                </Grid>
              ) : (
                <Grid key={figure.header} item xs={12} sm={6} md={6} lg={6} xl={6}>
                  <StatCard figure={figure} />
                </Grid>
              )))}
            </Grid>
          );
        })()}
        {(() => {
          // Make sure an error hasn't occured before trying to render the graph
          if (!error && !loading) {
            // If we're logged in, show the graph
            if (auth.logged_in) {
              return (
                <HistoryTable
                  symbol={latest.symbol}
                />
              );
            }

            // If not, show an authentication error
            return (
              <div className={classes.authRequired}>
                <ErrorMessage
                  image="auth"
                  title="Authentication Required"
                  message="You must be logged in (top-right) to view historical stock prices!"
                />
              </div>
            );
          }

          return null;
        })()}
      </Container>
    </motion.div>
  );
}
