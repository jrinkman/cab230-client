import React from 'react';

// Material UI components
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import { makeStyles } from '@material-ui/core/styles';

// Fix header styles for sticky header
const useStyles = makeStyles((theme) => ({
  cell: {
    backgroundColor: theme.palette.background.paper,
    '&:first-child': {
      borderTopLeftRadius: 8,
    },
    '&:last-child': {
      borderTopRightRadius: 8,
    },
  },
}));

// Define the header cell names
const headCells = [
  {
    id: 'symbol', numeric: false, label: 'Symbol',
  },
  {
    id: 'name', numeric: false, label: 'Name',
  },
  {
    id: 'industry', numeric: false, label: 'Industry',
  },
];

export default function StockTableHead(props) {
  const {
    classes, loading, order, orderBy, onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  // Generate style class names
  const classNames = useStyles();

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            className={classNames.cell}
            key={headCell.id}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              disabled={loading}
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
