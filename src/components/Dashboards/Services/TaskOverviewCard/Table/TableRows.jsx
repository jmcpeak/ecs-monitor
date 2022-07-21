import PropTypes from 'prop-types';
import TableBody from '@mui/material/TableBody';
import TableBusy from '../../../TableBusy';
import TableRow from './TableRow';
import { useServices } from '../../../../../hooks';

const TableRows = ({ compareFn }) => {
  const services = useServices('TableRows', compareFn);

  return (
    <TableBody>
      {services.length !== 0 ? (
        services.map(({ serviceArn, ...props }, index) => (
          // eslint-disable-next-line react/no-array-index-key
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
