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
  root: {},
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
    display: 'flex',
    justifyContent: 'space-between',
  },
  imgWrapper: {
    maxWidth: 450,
    marginBottom: theme.spacing(4),
  },
  img: {
    width: '100%',
    height: '100%',
  },
});
