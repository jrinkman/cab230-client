export default (theme) => ({
  tilt: {
    '&:hover': {
      cursor: 'default',
    },
  },
  root: {
    height: '100%',
  },
  content: {
    alignItems: 'center',
    display: 'flex',
  },
  title: {
    fontWeight: 700,
    fontSize: 13,
  },
  avatar: {
    height: 40,
    width: 40,
  },
  icon: {
    height: 23,
    width: 23,
  },
  difference: {
    marginTop: theme.spacing(2),
    display: 'flex',
    alignItems: 'center',
  },
});
