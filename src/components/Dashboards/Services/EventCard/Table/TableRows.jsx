import PropTypes from 'prop-types';
import TableBody from '@mui/material/TableBody';
import TableBusy from '../../../TableBusy';
import TableRow from './TableRow';
import { useEvents } from '../../../../../hooks';

const TableRows = ({ compareFn }) => {
  const events = useEvents(compareFn);

  return (
    <TableBody>
      {events.length !== 0 ? (
        events.map(({ id, ...props }) => <TableRow key={id} {...props} />)
      ) : (
        <TableBusy colSpan={2} />
      )}
    </TableBody>
  );
};

TableRows.propTypes = {
  compareFn: PropTypes.func,
};

TableRows.defaultProps = {
  compareFn: null,
};

export default TableRows;
