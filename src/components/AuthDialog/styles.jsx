export default (theme) => ({
  title: {
    fontWeight: 700,
  },
  tabs: {
    borderBottom: `2px solid ${theme.palette.divider}`,
    marginBottom: theme.spacing(2.5),
  },
  errorCard: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    marginBottom: theme.spacing(2),
    padding: theme.spacing(1),
    backgroundColor: theme.palette.error.main,
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
