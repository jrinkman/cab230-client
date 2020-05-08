import React from 'react';

// Material UI imports
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles, useTheme } from '@material-ui/core';

// Material UI pickers
import { MobileDatePicker } from '@material-ui/pickers';

// Luxon DateTime
import { DateTime } from 'luxon';

// Recharts components
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';

// Authentication content
import authContext from '../../../../auth/context';

// Error message handler & component
import ErrorMessage from '../../../../components/ErrorMessage';
import getErrorMessage from '../../../../helpers/getErrorMessage';

// Component styles
import styles from './styles';

// Create the useStyles function
const useStyles = makeStyles(styles);

export default function HistoryTable(props) {
  // Get the current stock symbol from the props
  const { symbol } = props;

  // Generate class names
  const classes = useStyles();

  // Get our app theme for the chart
  const theme = useTheme();

  // Get the current date
  const now = DateTime.local();

  // Grab our auth context
  const auth = React.useContext(authContext);

  // Create a stock history state
  const [history, setHistory] = React.useState([]);

  // Create states for startDate and endDate
  const [startDate, setStartDate] = React.useState(now.minus({ months: 4 }));
  const [endDate, setEndDate] = React.useState(now);

  // Create loading & error states
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  // Create a history side effect
  React.useEffect(() => {
    async function getStockAuthed() {
      try {
        // Reset the error the state
        setError(null);

        // Ensure the loading animation is active
        setLoading(true);

        // Retrieve the stock symbols
        const data = await auth.api.getStockAuthed(
          symbol,
          startDate.toISODate(),
          endDate.toISODate(),
        );

        // Disable the loading animation
        setLoading(false);

        // Update the stock history data
        setHistory(data.reverse().map(({
          timestamp, open, high, low, close,
        }) => ({
          name: DateTime.fromISO(timestamp).toFormat('dd LLL yyyy'),
          open,
          high,
          low,
          close,
        })));
      } catch (reqError) {
        // Update the error state
        setError(getErrorMessage(reqError));
      }
    }

    getStockAuthed();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startDate, endDate]);

  // Get our colours
  const {
    info: infoPalette,
    success: successPalette,
    error: errorPalette,
    warning: warningPalette,
    text: textPalette,
    background: backgroundPalette,
  } = theme.palette;

  // Render the stocks page
  return (
    <Card className={classes.card}>
      <Grid container padding={2}>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6} style={{ padding: '16px' }}>
          <MobileDatePicker
            inputFormat="dd/MM/yyyy"
            disabled={loading && !error}
            label="Start Date"
            renderInput={(inputProps) => <TextField variant="filled" fullWidth {...inputProps} />}
            value={startDate}
            onChange={(date) => setStartDate(date)}
            minDate={DateTime.fromObject({ year: 1990 })}
            maxDate={startDate}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6} style={{ padding: '16px' }}>
          <MobileDatePicker
            inputFormat="dd/MM/yyyy"
            disabled={loading && !error}
            label="End Date"
            renderInput={(inputProps) => <TextField variant="filled" fullWidth {...inputProps} />}
            value={endDate}
            onChange={(date) => setEndDate(date)}
            minDate={startDate}
            disableFuture
          />
        </Grid>
        { /* eslint-disable-next-line no-nested-ternary */ }
        {!loading && !error ? (
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <ResponsiveContainer minWidth={550} width="100%" height="100%">
              <LineChart
                data={history}
                margin={{
                  left: 10, top: 30, right: 70, bottom: 10,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis tick={{ fill: textPalette.secondary, fontWeight: 500 }} dataKey="name" />
                <YAxis tick={{ fill: textPalette.secondary, fontWeight: 500 }} />
                <Tooltip
                  contentStyle={{
                    borderRadius: 8,
                    backgroundColor: backgroundPalette.default,
                    border: 'none',
                    boxShadow: '0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)',
                  }}
                  labelStyle={{ color: textPalette.primary, fontWeight: 700 }}
                  itemStyle={{
                    textTransform: 'uppercase',
                  }}
                />
                <Line type="monotone" dataKey="open" stroke={infoPalette.main} strokeWidth={3} />
                <Line type="monotone" dataKey="high" stroke={successPalette.main} strokeWidth={3} />
                <Line type="monotone" dataKey="low" stroke={errorPalette.main} strokeWidth={3} />
                <Line type="monotone" dataKey="close" stroke={warningPalette.main} strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </Grid>
        ) : (loading && !error
          ? (
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <div className={classes.loading}>
                <CircularProgress color="secondary" />
              </div>
            </Grid>
          ) : <ErrorMessage small image="empty" title="No stock data found" message={error} />
        )}
      </Grid>
    </Card>
  );
}
