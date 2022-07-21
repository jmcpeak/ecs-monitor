import PropTypes from 'prop-types';
import React, { Component } from 'react';
import MetricStat from '../../metrics/metricStatComponent';
import { metricStatStream$ } from '../../../dataStreams/metricStreams';
import './metricStatsGroupComponent.css';

function isOver80PercentAlertPredicate(value) {
  return value >= 80;
}

function isOver80PercentAlertHandler(clusterName, title) {
  return () => {
    window.Materialize.toast(`${clusterName} :: ${title} is over 80%`, 10000);
  };
}

class MetricStatGroup extends Component {
  // eslint-disable-next-line class-methods-use-this
  clusterNameToMetricStatComponent(clusterName, i) {
    const dimensions = [{ Name: 'ClusterName', Value: clusterName }];
    const cpuTitle = 'CPU Utilization';
    const memoryTitle = 'Memory Utilization';
    const cpuStream$ = metricStatStream$(dimensions, 'CPUUtilization', 5000);
    const memoryStream$ = metricStatStream$(
      dimensions,
      'MemoryUtilization',
      5000
    );
    return (
      <div key={`${clusterName}-metric-${i}`} className="metric-stat-wrapper">
        <p className="clustername">{clusterName}</p>
        <div className="cpu inline">
          <small className="title">{cpuTitle}</small>
          <MetricStat
            _key={`${clusterName}-${cpuTitle}`}
            alertHandler={isOver80PercentAlertHandler(clusterName, cpuTitle)}
            alertPredicate={isOver80PercentAlertPredicate}
            stream={cpuStream$}
          />
        </div>
        <div className="memory inline">
          <small className="title">{memoryTitle}</small>
          <MetricStat
            _key={`${clusterName}-${memoryTitle}`}
            alertHandler={isOver80PercentAlertHandler(clusterName, memoryTitle)}
            alertPredicate={isOver80PercentAlertPredicate}
            stream={memoryStream$}
          />
        </div>
      </div>
    );
  }

  render() {
    // eslint-disable-next-line react/destructuring-assignment
    const body = this.props.clusters.map(
      this.clusterNameToMetricStatComponent,
      this
    );
    return <div className="metric-stat-group">{body}</div>;
  }
}

MetricStatGroup.propTypes = {
  // eslint-disable-next-line react/require-default-props
  clusters: PropTypes.arrayOf(PropTypes.string),
};

export default MetricStatGroup;
