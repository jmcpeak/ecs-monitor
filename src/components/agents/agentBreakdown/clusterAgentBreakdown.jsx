import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Rx from 'rxjs';
import Agent from './agent/agent';
import { containerInstancesStream } from '../../../dataStreams/ec2Streams';
import { tasksStream } from '../../../dataStreams/taskStreams';
import './clusterAgentBreakdown.css';

function filterTasksBasedOnContainerInstanceArn(task) {
  // context 'this' is the containerInstanceArn.
  return task.containerInstanceArn === this;
}

function mapContainerInstanceGroup(containerInstance) {
  // context 'this' is the tasks.
  const tasks = this;
  const relevantTasks = tasks.filter(
    filterTasksBasedOnContainerInstanceArn,
    containerInstance.containerInstanceArn
  );
  return {
    instance: containerInstance,
    tasks: relevantTasks,
  };
}

/**
 * IDEAS:
 * - Monitor the agents as well as the tasks running on them. Each agent will have a status, e.g. Connected or not.
 */

class ClusterAgentBreakdown extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
    };

    //  bind functions
    this.updateState = this.updateState.bind(this);
    this.renderAgentComponent = this.renderAgentComponent.bind(this);
  }

  // eslint-disable-next-line react/sort-comp
  updateState(newState) {
    this.setState({
      data: newState,
    });
  }

  // eslint-disable-next-line react/no-deprecated
  componentWillMount() {
    const { clusterName } = this.props;
    this.tasksDataObservable = Rx.Observable.combineLatest(
      containerInstancesStream(clusterName),
      tasksStream(clusterName),
      (containerInstances, tasks) => {
        return containerInstances.map(mapContainerInstanceGroup, tasks);
      }
    ).subscribe(this.updateState);
  }

  componentWillUnmount() {
    this.tasksDataObservable.unsubscribe();
  }

  renderAgentComponent(entry) {
    /* eslint-disable react/destructuring-assignment */
    return (
      <Agent
        key={entry.instance.ec2InstanceId}
        agentDetails={entry}
        taskDefinitionColours={this.props.taskDefinitionColours}
      />
    );
  }

  render() {
    const activeClass =
      this.props.runningTasksCount < 1 ? 'inactive' : 'active';
    const agents = this.state.data.map(this.renderAgentComponent);
    return (
      <div className={`cluster ${activeClass} count-${this.state.data.length}`}>
        <div className="cluster-info-header">
          <h3 className="header">{this.props.clusterName} cluster</h3>
          <strong className="stats">
            {this.props.agentCount} connected agents | running{' '}
            {this.props.runningTasksCount} tasks
          </strong>
        </div>
        <div className="agents-collection row">{agents}</div>
      </div>
    );
  }
}

ClusterAgentBreakdown.propTypes = {
  clusterName: PropTypes.string.isRequired,
  agentCount: PropTypes.number.isRequired,
  runningTasksCount: PropTypes.number.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  taskDefinitionColours: PropTypes.object.isRequired,
};

export default ClusterAgentBreakdown;
