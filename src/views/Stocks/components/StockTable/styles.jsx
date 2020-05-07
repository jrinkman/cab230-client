export default (theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
  },
  table: {
    minWidth: 750,
  },
  container: {
    height: 'calc(100vh - 330px)',
    [theme.breakpoints.down('sm')]: {
      height: 'calc(100vh - 380px)',
    },
  },
  tableRow: {
    '&:hover': {
      cursor: 'pointer',
    },
  },
  tableFooter: {
    width: '100%',
  },
  pagination: {
    flexGrow: 1,
    width: '100%',
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
  empty: {
    display: 'flex',
    flexGrow: 1,
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: theme.spacing(2.5),
  },
  emptyMessage: {
    fontWeight: 500,
    marginBottom: theme.spacing(4),
  },
  imgWrapper: {
    maxWidth: 450,
  },
  img: {
    width: '100%',
    height: '100%',
  },
});
