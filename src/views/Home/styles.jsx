export default (theme) => ({
  motionWrapper: {
    position: 'absolute',
    display: 'flex',
    flexGrow: '1',
    right: 30,
    left: 30,
    top: 30,
    bottom: 30,
  },
  root: {
    display: 'flex',
    flexGrow: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing(3),
    },
    [theme.breakpoints.up('md')]: {
      marginBottom: theme.spacing(2),
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
});
