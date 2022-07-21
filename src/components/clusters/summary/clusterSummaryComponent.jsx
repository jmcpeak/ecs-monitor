import React, { Component } from 'react';
import { loadingBar } from '../../loading';
import { clusterStream$ } from '../../../dataStreams/clusterStreams';
import './clusterSummaryComponent.css';

function mapClusterSummaryEntryToDOM(entry) {
  return (
    <tr key={entry.clusterArn} className="cluster-entry">
      {/* {entry.status} */}
      {/* {entry.clusterArn} */}
      <td className="cluster-name">{entry.clusterName}</td>
      <td className="number">{entry.activeServicesCount}</td>
      <td className="number">{entry.registeredContainerInstancesCount}</td>
      <td className="number">{entry.runningTasksCount}</td>
    </tr>
  );
}

class ClusterSummary extends Component {
  constructor(props) {
    super(props);
    this.initialRender = true;
    this.state = {
      clusters: [],
    };
  }

  // eslint-disable-next-line react/sort-comp
  updateState(clusters) {
    this.initialRender = false;
    if (!clusters || clusters.length === 0) {
      return;
    }
    this.setState({
      clusters,
    });
  }

  // eslint-disable-next-line react/no-deprecated
  componentWillMount() {
    this.clusterStreamObserver = clusterStream$.subscribe(
      this.updateState.bind(this)
    );
  }

  componentWillUnmount() {
    this.clusterStreamObserver.unsubscribe();
  }

  // eslint-disable-next-line class-methods-use-this
  renderNoClusters() {
    return <p>There are no clusters</p>;
  }

  renderTable() {
    // eslint-disable-next-line react/destructuring-assignment
    const tableBody = this.state.clusters.map(mapClusterSummaryEntryToDOM);
    return (
      <table>
        <thead>
          <tr>
            <th>Cluster Name</th>
            <th># Active Services</th>
            <th># Instances</th>
            <th>Running Tasks</th>
          </tr>
        </thead>
        <tbody>{tableBody}</tbody>
      </table>
    );
  }

  render() {
    let content;
    if (this.initialRender) {
      content = loadingBar();
      // eslint-disable-next-line react/destructuring-assignment
    } else if (this.state.clusters.length === 0) {
      content = this.renderNoClusters();
    } else {
      content = this.renderTable();
    }

    return (
      <section className="cluster-summary component-panel">
        <div className="card-panel">
          <strong className="card-header">Summary</strong>
          <div className="divider" />
          {content}
        </div>
      </section>
    );
  }
}

export default ClusterSummary;
