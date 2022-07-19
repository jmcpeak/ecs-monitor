import moment from 'moment';
import PropTypes from 'prop-types';
import TableCell from '@mui/material/TableCell';
import MuiTableRow from '@mui/material/TableRow';
import { nameFromAwsArn } from '../../../../../utils/stringFormatting';

const sx = { whiteSpace: 'nowrap' };

const TableRow = ({
  createdAt,
  desiredCount,
  pendingCount,
  taskDefinition,
}) => {
  return (
    <MuiTableRow hover>
      <TableCell align="left" padding="none" sx={sx}>
        {moment(createdAt).fromNow()}
      </TableCell>
      <TableCell align="right">{desiredCount}</TableCell>
      <TableCell align="right">{pendingCount}</TableCell>
      <TableCell align="left" sx={sx}>
        {nameFromAwsArn(taskDefinition)}
      </TableCell>
    </MuiTableRow>
  );
};

TableRow.propTypes = {
  createdAt: PropTypes.instanceOf(Date).isRequired,
  desiredCount: PropTypes.number.isRequired,
  pendingCount: PropTypes.number.isRequired,
  taskDefinition: PropTypes.string.isRequired,
};

export default TableRow;
