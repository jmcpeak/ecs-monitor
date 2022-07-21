import PropTypes from 'prop-types';
import TableBody from '@mui/material/TableBody';
import TableBusy from '../../../TableBusy';
import TableRow from './TableRow';
import { useDeployments } from '../../../../../hooks';

const TableRows = ({ compareFn }) => {
  const deployments = useDeployments(compareFn);

  return (
    <TableBody>
      {deployments.length !== 0 ? (
        deployments.map(({ id, ...props }) => <TableRow key={id} {...props} />)
      ) : (
        <TableBusy colSpan={4} />
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
