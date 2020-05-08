export default (theme) => ({
  card: {
    display: 'flex',
    height: 450,
    [theme.breakpoints.down('sm')]: {
      overflowX: 'auto',
    },
    marginBottom: theme.spacing(4),
  },
  loading: {
    display: 'flex',
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
