export default (theme) => ({
  title: {
    fontWeight: 700,
    marginTop: theme.spacing(2.5),
  },
  errorCard: {
    padding: theme.spacing(1),
    backgroundColor: theme.palette.error.main,
    borderRadius: 0,
  },
  errorCardText: {
    color: theme.palette.error.contrastText,
    fontSize: 14,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    padding: '16px 24px',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
