import React from 'react';

// Material UI components
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import { makeStyles } from '@material-ui/core/styles';

// Material UI Lab components
import Skeleton from '@material-ui/lab/Skeleton';

// Table toolbar & header components
import StockTableHead from '../StockTableHead';

// Import table helper functions
import { getComparator, stableSort } from './helpers';

// Component styles
import styles from './styles';

// Generate the component styles
const useStyles = makeStyles(styles);

export default function StockTable(props) {
  // Check whether we're loading
  const {
    loading, rows, page, setPage,
  } = props;

  // Generate our style class names
  const classes = useStyles();

  // Create hook states for ordering, pagination, etc
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('symbol');
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  // Create a handler for sorting
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  // Create a handler for page change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Create a handler for pagination number change
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        {rows.length === 0 && !loading ? (
          <div className={classes.empty}>
            <div className={classes.imgWrapper}>
              <img className={classes.img} src="images/empty.png" alt="" />
            </div>
            <Typography color="textSecondary" className={classes.emptyMessage}>
              Looks like nothing came up, try a broader search
            </Typography>
          </div>
        ) : (
          <>
            <TableContainer className={classes.container}>
              <Table
                stickyHeader
                className={classes.table}
                aria-labelledby="tableTitle"
                aria-label="stock table"
              >
                <colgroup>
                  <col width="30%" />
                  <col width="40%" />
                  <col width="30%" />
                </colgroup>
                <StockTableHead
                  loading={loading}
                  classes={classes}
                  order={order}
                  orderBy={orderBy}
                  onRequestSort={handleRequestSort}
                  rowCount={rows.length}
                />
                <TableBody>
                  {loading && [...Array.from(Array(rowsPerPage).keys())].map((key) => (
                    <TableRow key={key}>
                      {[...Array.from(Array(3).keys())].map((innerKey) => (
                        <TableCell key={innerKey}>
                          <Skeleton width="100%" height={20} />
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                  {!loading && stableSort(rows, getComparator(order, orderBy))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => {
                      const labelId = `stock-table-checkbox-${index}`;

                      return (
                        <TableRow
                          hover
                          className={classes.tableRow}
                          role="button"
                          onClick={(event) => { console.log(event.target); }}
                          tabIndex={-1}
                          key={row.symbol}
                        >
                          <TableCell component="th" id={labelId} scope="row">
                            <Chip
                              label={row.symbol}
                              color="secondary"
                              size="small"
                              style={{ fontWeight: 700 }}
                            />
                          </TableCell>
                          <TableCell>{row.name}</TableCell>
                          <TableCell>{row.industry}</TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              className={classes.pagination}
              rowsPerPageOptions={[5, 10, 15]}
              component="div"
              count={loading ? 0 : rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
          </>
        )}
      </Paper>
    </div>
  );
}
