export default (theme) => ({
  motionWrapper: {
    position: 'absolute',
    display: 'flex',
    flexGrow: '1',
    right: 0,
    left: 0,
    top: 0,
    bottom: 0,
    overflowY: 'auto',
  },
  root: {
    padding: 30,
    display: 'flex',
    height: '100%',
    width: '100vw',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    [theme.breakpoints.up('sm')]: {
      justifyContent: 'center',
    },
  },
  title: {
    fontWeight: 700,
    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing(3),
    },
  },
  subtitle: {
    marginTop: theme.spacing(1),
  },
  imgWrapper: {
    maxWidth: 450,
    marginBottom: theme.spacing(4),
  },
  img: {
    width: '100%',
    height: '100%',
  },
  goButton: {
    minHeight: 42,
    marginBottom: theme.spacing(2),
  },
});
