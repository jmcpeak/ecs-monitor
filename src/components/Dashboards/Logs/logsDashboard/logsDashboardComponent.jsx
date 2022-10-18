import React, { Component } from 'react';
import LogViewer from '../logViewer/logViewerComponent';
import { getLogs, getLogEvents } from '../../../../dataRequests/logRequests';
import { Event, progressBarEvent$ } from '../../../../pubsub/eventStreams';
import './logsDashboardComponent.css';

class LogsDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logs: [],
      logStreamResponse: undefined,
      activeLogStreamName: '',
    };

    // bind functions
    this.updateLogsState = this.updateLogsState.bind(this);
    this.updateLogResponseState = this.updateLogResponseState.bind(this);
    this.handleGetRecentStreamsClick =
      this.handleGetRecentStreamsClick.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.renderLogEntry = this.renderLogEntry.bind(this);
    this.renderLogViewer = this.renderLogViewer.bind(this);
  }

  // eslint-disable-next-line react/sort-comp
  updateLogsState(logsResponse) {
    progressBarEvent$.next(new Event(this, 'done'));
    // eslint-disable-next-line react/no-access-state-in-setstate
    this.setState({ ...this.state, logs: logsResponse.logStreams });
  }

  updateLogResponseState(logStreamResponse) {
    progressBarEvent$.next(new Event(this, 'done'));
    // eslint-disable-next-line react/no-access-state-in-setstate
    this.setState({ ...this.state, logStreamResponse });
  }

  handleGetRecentStreamsClick() {
    progressBarEvent$.next(new Event(this, 'start'));
    getLogs().then(this.updateLogsState);
  }

  handleSearch(e) {
    e.preventDefault();

    // eslint-disable-next-line react/no-string-refs
    const fieldValue = this.refs.logSearch.value;
    if (!fieldValue) return;

    progressBarEvent$.next(new Event(this, 'start'));
    // eslint-disable-next-line react/no-string-refs
    getLogs(this.refs.logSearch.value).then(this.updateLogsState);
  }

  handleLogClick(log, e) {
    e.preventDefault();
    progressBarEvent$.next(new Event(this, 'start'));
    // eslint-disable-next-line react/no-access-state-in-setstate
    this.setState({ ...this.state, activeLogStreamName: log.logStreamName });
    getLogEvents(log.logStreamName).then(this.updateLogResponseState);
  }

  renderLogEntry(log) {
    return (
      <li key={log.arn}>
        <a
          className="log-stream-entry"
          href="src/components/Dashboards/Logs/logsDashboard/logsDashboardComponent.jsx"
          onClick={this.handleLogClick.bind(this, log)}
        >
          {log.logStreamName}
        </a>
      </li>
    );
  }

  renderLogViewer() {
    /* eslint-disable react/destructuring-assignment */
    return (
      <LogViewer
        logStream={this.state.logStreamResponse}
        logStreamName={this.state.activeLogStreamName}
      />
    );
  }

  render() {
    /* eslint-disable react/no-string-refs */
    const list = this.state.logs.map(this.renderLogEntry);
    return (
      <div className="logs-dashboard-container">
        <header>
          <button
            className="waves-effect waves-light btn"
            onClick={this.handleGetRecentStreamsClick}
            type="button"
          >
            <i className="material-icons left">view_list</i>
            Recent 50 streams
          </button>
          <form onSubmit={this.handleSearch}>
            <div className="input-field">
              <input
                ref="logSearch"
                className="log-search-input validate"
                id="logSearch"
                name="logSearch"
                type="text"
              />
              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
              <label htmlFor="logSearch">Search</label>
            </div>
          </form>
        </header>
        <div className="results row">
          <ul className="col s3">{list}</ul>
          <section className="log-viewer-container col s9">
            {this.state.logStreamResponse ? this.renderLogViewer() : null}
          </section>
        </div>
      </div>
    );
  }
}

export default LogsDashboard;
