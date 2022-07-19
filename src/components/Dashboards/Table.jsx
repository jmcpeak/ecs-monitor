import PropTypes from 'prop-types';
import { startTransition, useState } from 'react';
import MuiTable from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import TableHead from './TableHead.jsx';
import {
  ASC,
  dateCompareFn,
  DESC,
  numberCompareFn,
  stringCompareFn,
} from './consts';

const Table = ({
  TableHeadDisabled,
  TableRows,
  defaultCompareFn,
  defaultOrder,
  defaultOrderBy,
  headCells,
  ...props
}) => {
  const [compareFn, setCompareFn] = useState(defaultCompareFn);
  const [order, setOrder] = useState(defaultOrder);
  const [orderBy, setOrderBy] = useState(defaultOrderBy);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === ASC;

    startTransition(() => {
      setCompareFn(() =>
        property === 'serviceName' || property === 'taskDefinition'
          ? stringCompareFn(order, property)
          : property === 'createdAt'
          ? dateCompareFn(order, property)
          : numberCompareFn(order, property)
      );
      setOrder(isAsc ? DESC : ASC);
      setOrderBy(property);
    });
  };

  return (
    <TableContainer {...props}>
      <MuiTable stickyHeader>
        <TableHead
          disabled={TableHeadDisabled}
          headCells={headCells}
          onRequestSort={handleRequestSort}
          order={order}
          orderBy={orderBy}
        />
        <TableRows compareFn={compareFn} />
      </MuiTable>
    </TableContainer>
  );
};

Table.propTypes = {
  TableHeadDisabled: PropTypes.bool.isRequired,
  TableRows: PropTypes.func.isRequired,
  defaultCompareFn: PropTypes.func.isRequired,
  defaultOrder: PropTypes.string.isRequired,
  defaultOrderBy: PropTypes.string.isRequired,
};

export default Table;
