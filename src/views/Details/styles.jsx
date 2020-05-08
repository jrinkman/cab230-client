export default (theme) => ({
  motionWrapper: {
    position: 'absolute',
    display: 'flex',
    flexGrow: '1',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    overflowY: 'auto',
  },
  authRequired: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(5),
  },
  container: {
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(3),
    },
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(5),
    },
    width: '100%',
  },
  grid: {
    marginBottom: theme.spacing(3),
  },
  header: {
    fontSize: 14,
    fontWeight: 600,
  },
});
