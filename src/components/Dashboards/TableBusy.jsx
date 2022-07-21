import LinearProgress from '@mui/material/LinearProgress';
import PropTypes from 'prop-types';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { busySX } from './consts';

const TableBusy = ({ colSpan }) => {
  return (
    <TableRow>
      <TableCell colSpan={colSpan}>
        <LinearProgress sx={busySX} variant="indeterminate" />
      </TableCell>
    </TableRow>
  );
};

TableBusy.propTypes = {
  colSpan: PropTypes.number.isRequired,
};

export default TableBusy;
