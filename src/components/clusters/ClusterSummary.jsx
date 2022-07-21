import Graph from './graph/graphComponent';
import MetricStatGroup from './metricStats/metricStatsGroupComponent';
import { metricsStream$ } from '../../dataStreams/metricStreams';
import ClusterSummaryComponent from './summary/clusterSummaryComponent';
import { useClusters } from '../../hooks';

const inlineBlock = {
  display: 'inline-block',
};

const mapToClusterName = (cluster) => cluster?.clusterName ?? 'name';

const mapClusterToMetrics = (cluster, i) => {
  const { clusterName } = cluster;
  const dimensions = [{ Name: 'ClusterName', Value: clusterName }];
  const cpuDataStream$ = metricsStream$(dimensions, 'CPUUtilization');
  const memoryDataStream$ = metricsStream$(dimensions, 'MemoryUtilization');

  return (
    <li key={`${clusterName}-graphMetric${i}`} style={inlineBlock}>
      <Graph
        cpuStream={cpuDataStream$}
        label={clusterName}
        memoryStream={memoryDataStream$}
      />
    </li>
  );
};

const ClusterSummary = () => {
  const clusters = useClusters();

  const clusterNames = clusters.map(mapToClusterName);
  const graphBody = clusters.map(mapClusterToMetrics);

  return (
    <div className={`cluster-summary count-${clusters.length}`}>
      <div className="row">
        <div className="col s6">
          <ClusterSummaryComponent />
        </div>
        <div className="col s6">
          <MetricStatGroup clusters={clusterNames} />
        </div>
      </div>
      <div className="row">
        <div className="col s12">
          <ul>{graphBody}</ul>
        </div>
      </div>
    </div>
  );
};

export default ClusterSummary;
