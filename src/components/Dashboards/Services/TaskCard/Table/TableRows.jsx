import PropTypes from 'prop-types';
import TableBody from '@mui/material/TableBody';
import TableBusy from '../../../TableBusy.jsx';
import TableRow from './TableRow.jsx';
import { useServices } from '../../../../../hooks';

const TableRows = ({ compareFn }) => {
  const services = useServices(compareFn);

  return (
    <TableBody>
      {services.length !== 0 ? (
        services.map(({ serviceArn, ...props }, index) => (
          <TableRow key={`${serviceArn}-${index}`} {...props} />
        ))
      ) : (
        <TableBusy colSpan={5} />
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
