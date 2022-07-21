import PropTypes from 'prop-types';
import TableCell from '@mui/material/TableCell';
import MuiTableRow from '@mui/material/TableRow';
import MetricStat from '../../../../metrics/metricStatComponent';
import { metricStatStream$ } from '../../../../../dataStreams/metricStreams';
import { nameFromAwsArn } from '../../../../../utils/stringFormatting';
import './serviceTaskOverviewComponent.css';
import TableCellServiceName from './TableCellServiceName';

const TableRow = ({ clusterArn, desiredCount, runningCount, serviceName }) => {
  const dimensions = [
    { Name: 'ClusterName', Value: nameFromAwsArn(clusterArn) },
    { Name: 'ServiceName', Value: serviceName },
  ];
  const cpuStream$ = metricStatStream$(dimensions, 'CPUUtilization', 5000);
  const memoryStream$ = metricStatStream$(
    dimensions,
    'MemoryUtilization',
    5000
  );

  return (
    <MuiTableRow className="service-overview-entry" hover>
      <TableCellServiceName
        desiredCount={desiredCount}
        runningCount={runningCount}
        serviceName={serviceName}
      />
      <TableCell align="right">{desiredCount}</TableCell>
      <TableCell align="right">{runningCount}</TableCell>
      <TableCell align="right">
        <MetricStat
          _key={`servicestat-${serviceName}-cpu`}
          stream={cpuStream$}
        />
      </TableCell>
      <TableCell align="right">
        <MetricStat
          _key={`servicestat-${serviceName}-memory`}
          stream={memoryStream$}
        />
      </TableCell>
    </MuiTableRow>
  );
};

TableRow.propTypes = {
  clusterArn: PropTypes.string.isRequired,
  desiredCount: PropTypes.number.isRequired,
  runningCount: PropTypes.number.isRequired,
  serviceName: PropTypes.string.isRequired,
};

export default TableRow;
