import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import Chart from 'chart.js';
import { Observable } from 'rxjs';

function dataPointToMaximum(point) {
  return point.Maximum;
}

function dataPointTimestamp(point) {
  return moment(point.Timestamp).format('HH:mm');
}

class Graph extends Component {
  // eslint-disable-next-line react/sort-comp
  updateChart(datapoints) {
    this.chart.data.labels = datapoints[0].map(dataPointTimestamp);
    this.chart.data.datasets[0].data = datapoints[0].map(dataPointToMaximum);
    this.chart.data.labels = datapoints[1].map(dataPointTimestamp);
    this.chart.data.datasets[1].data = datapoints[1].map(dataPointToMaximum);
    this.chart.update(1500, false);
  }

  componentDidMount() {
    /* eslint-disable react/destructuring-assignment */
    const streamObservables = Observable.zip(
      this.props.memoryStream,
      this.props.cpuStream
    );
    // eslint-disable-next-line react/no-find-dom-node
    const thisNode = ReactDOM.findDOMNode(this);

    this.chart = new Chart(thisNode, {
      type: 'line',
      data: {
        labels: [],
        datasets: [
          {
            label: 'Memory Utilization',
            data: [],
            backgroundColor: 'rgba(75,192,192,0.4)',
            lineTension: 0.1,
          },
          {
            label: 'CPU Utilization',
            data: [],
            backgroundColor: 'rgba(255,152,0,1)',
            lineTension: 0.1,
          },
        ],
      },
      options: {
        responsive: false,
        title: {
          display: true,
          text: this.props.label,
        },
        scales: {
          xAxes: [
            {
              ticks: {
                autoSkipPadding: 10,
              },
            },
          ],
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
                max: 100,
              },
            },
          ],
        },
      },
    });

    this.streams = streamObservables.subscribe(this.updateChart.bind(this));
  }

  componentWillUnmount() {
    this.streams.unsubscribe();
  }

  render() {
    return (
      <canvas
        className="graph"
        height="400"
        id={`${this.props.label}-graph`}
        width="400"
      />
    );
  }
}

Graph.propTypes = {
  label: PropTypes.string.isRequired,
  memoryStream: PropTypes.instanceOf(Observable).isRequired,
  cpuStream: PropTypes.instanceOf(Observable).isRequired,
};

export default Graph;
