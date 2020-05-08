import React from 'react';

// Material UI imports
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core';

// Tilt effect
import Tilt from 'react-tilt';

// Material UI Lab components
import Skeleton from '@material-ui/lab/Skeleton';

// Component styles
import styles from './styles';

// Create the useStyles function
const useStyles = makeStyles(styles);

export default function StatCard(props) {
  // Grab details from the props
  const { loading, figure } = props;
  const {
    header, value, colour, Icon,
  } = figure;
  // Generate class names
  const classes = useStyles();

  // Render the stocks page
  return (
    <Tilt
      className={classes.tilt}
      options={{
        max: Icon ? 25 : 15,
        scale: Icon ? 1.05 : 1.025,
      }}
    >
      <Card
        className={classes.root}
        elevation={2}
      >
        <CardContent style={{ paddingBottom: Icon ? 24 : 16 }}>
          <Grid
            container
            justify="space-between"
          >
            <Grid item style={{ flexGrow: 1 }}>
              {loading ? (
                <>
                  <Skeleton height={18} width="50%" />
                  <Skeleton height={41} width="75%" />
                </>
              ) : (
                <>
                  <Typography
                    className={classes.title}
                    color="textSecondary"
                    gutterBottom
                    variant="body2"
                  >
                    {header || ''}
                  </Typography>
                  {Icon ? (
                    <Typography variant="h4">
                      {Math.round(value * 100) / 100}
                    </Typography>
                  ) : (
                    <Typography>
                      {value}
                    </Typography>
                  )}
                </>
              )}
            </Grid>
            {Icon && (
            <Grid item>
              {loading ? <Skeleton variant="circle" className={classes.avatar} /> : (
                <Avatar className={classes.avatar} style={{ backgroundColor: colour, color: 'white' }}>
                  <Icon className={classes.icon} />
                </Avatar>
              )}
            </Grid>
            )}
          </Grid>
        </CardContent>
      </Card>
    </Tilt>
  );
}
