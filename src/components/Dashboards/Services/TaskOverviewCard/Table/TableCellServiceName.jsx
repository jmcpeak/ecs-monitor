import Grid from '@mui/material/Grid';
import PropTypes from 'prop-types';
import TableCell from '@mui/material/TableCell';
import WarningAmber from '@mui/icons-material/WarningAmber';

const TableCellServiceName = ({ desiredCount, runningCount, serviceName }) => {
  return (
    <TableCell align="left" padding="none">
      <Grid container spacing={1}>
        <Grid item>{serviceName}</Grid>
        {runningCount !== desiredCount && (
          <Grid item>
            <WarningAmber color="warning" fontSize="small" />
          </Grid>
        )}
      </Grid>
    </TableCell>
  );
};

TableCellServiceName.propTypes = {
  desiredCount: PropTypes.number.isRequired,
  runningCount: PropTypes.number.isRequired,
  serviceName: PropTypes.string.isRequired,
};

export default TableCellServiceName;
