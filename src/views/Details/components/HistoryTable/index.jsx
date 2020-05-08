import React from 'react';

// Material UI imports
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles, useTheme } from '@material-ui/core';

// Recharts components
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';

// Component styles
import styles from './styles';

// Create the useStyles function
const useStyles = makeStyles(styles);

const data = [
  {
    name: 'Page A', open: 4000, high: 2400, low: 2400, close: 3000,
  },
  {
    name: 'Page B', open: 3000, high: 1398, low: 2210, close: 0,
  },
  {
    name: 'Page C', open: 2000, high: 9800, low: 2290, close: 3000,
  },
  {
    name: 'Page D', open: 2780, high: 3908, low: 2000, close: 3000,
  },
  {
    name: 'Page E', open: 1890, high: 4800, low: 2181, close: 3000,
  },
  {
    name: 'Page F', open: 2390, high: 3800, low: 2500, close: 3000,
  },
  {
    name: 'Page G', open: 3490, high: 4300, low: 2100, close: 3000,
  },
];

export default function HistoryTable() {
  // Generate class names
  const classes = useStyles();

  // Get our app theme for the chart
  const theme = useTheme();

  // Get our colours
  const {
    info, success, error, warning, text, background,
  } = theme.palette;

  // Render the stocks page
  return (
    <Card className={classes.card}>
      <Grid container padding={2}>
        <Grid item />
      </Grid>
      {true ? (
        <ResponsiveContainer minWidth={550} width="100%" height="100%">
          <LineChart
            data={data}
            margin={{
              left: 10, top: 30, right: 40, bottom: 10,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis tick={{ fill: text.secondary, fontWeight: 500 }} dataKey="name" />
            <YAxis tick={{ fill: text.secondary, fontWeight: 500 }} />
            <Tooltip
              contentStyle={{
                borderRadius: 8,
                backgroundColor: background.default,
                border: 'none',
                boxShadow: '0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)',
              }}
              labelStyle={{ color: text.primary, fontWeight: 700 }}
              itemStyle={{
                textTransform: 'uppercase',
              }}
            />
            <Line type="monotone" dataKey="open" stroke={info.main} strokeWidth={3} />
            <Line type="monotone" dataKey="high" stroke={success.main} strokeWidth={3} />
            <Line type="monotone" dataKey="low" stroke={error.main} strokeWidth={3} />
            <Line type="monotone" dataKey="close" stroke={warning.main} strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <div className={classes.loading}>
          <CircularProgress color="secondary" />
        </div>
      )}
    </Card>
  );
}
