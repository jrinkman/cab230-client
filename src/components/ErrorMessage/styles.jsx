export default (theme) => ({
  empty: {
    display: 'flex',
    flexGrow: 1,
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
  },
  emptyHeader: {
    fontWeight: 700,
  },
  emptyMessage: {
    marginTop: theme.spacing(1),
  },
  imgWrapper: {
    maxWidth: 450,
    minWidth: 250,
  },
  img: {
    width: '100%',
    height: '100%',
  },
});
