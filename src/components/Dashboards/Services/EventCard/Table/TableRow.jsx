import moment from 'moment/moment';
import PropTypes from 'prop-types';
import TableCell from '@mui/material/TableCell';
import MuiTableRow from '@mui/material/TableRow';
import './serviceTaskOverviewComponent.css';

const TableRow = ({ createdAt, message }) => {
  return (
    <MuiTableRow hover>
      <TableCell align="left">{moment(createdAt).fromNow()}</TableCell>
      <TableCell align="left">{message}</TableCell>
    </MuiTableRow>
  );
};

TableRow.propTypes = {
  createdAt: PropTypes.instanceOf(Date).isRequired,
  message: PropTypes.string.isRequired,
};

export default TableRow;
