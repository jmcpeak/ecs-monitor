import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { nameFromAwsArn } from '../../../../utils/stringFormatting';
import Tooltip from '../../../tooltip/tooltip';
import './agent.css';

function filterForInstanceType(attributes) {
  return attributes.name === 'ecs.instance-type';
}

class Agent extends Component {
  get instanceId() {
    // eslint-disable-next-line react/destructuring-assignment
    return this.props.agentDetails.instance.ec2InstanceId;
  }

  get tooltipSettings() {
    return {
      trigger: 'mouseenter',
      arrow: true,
      html: `#tooltip-${this.instanceId}`,
    };
  }

  getColour(taskDefinitionArn) {
    // eslint-disable-next-line react/destructuring-assignment
    return this.props.taskDefinitionColours[taskDefinitionArn];
  }

  renderTaskListEntry(task) {
    const style = {
      backgroundColor: this.getColour(task.taskDefinitionArn),
    };
    const lastStatus = task.lastStatus.toLowerCase();
    return (
      <li
        key={task.taskArn}
        className={`task card-panel ${lastStatus}`}
        style={style}
      >
        <i className="status-icon" />
        <p className="task-definition">
          {nameFromAwsArn(task.taskDefinitionArn)}
        </p>
      </li>
    );
  }

  render() {
    // eslint-disable-next-line react/destructuring-assignment
    const details = this.props.agentDetails;
    const taskListItems = details.tasks.map(this.renderTaskListEntry, this);
    const instanceType = details.instance.attributes.find(
      filterForInstanceType
    );
    return (
      <div className="agent col" id={`agent-${this.instanceId}`}>
        <Tooltip
          tippySettings={this.tooltipSettings}
          tooltipId={`tooltip-${this.instanceId}`}
          triggerId={`#agent-${this.instanceId} .agent-icon`}
        >
          <ul className="tooltip-details-list">
            <li>Status: {details.instance.status}</li>
            <li>Instance type: {instanceType.value}</li>
            <li>
              Registered CPU:{' '}
              {details.instance.registeredResources[0].integerValue} units
            </li>
            <li>
              Remaining CPU:{' '}
              {details.instance.remainingResources[0].integerValue} units
            </li>
            <li>
              Registered Memory:{' '}
              {details.instance.registeredResources[1].integerValue} mb
            </li>
            <li>
              Remaining Memory:{' '}
              {details.instance.remainingResources[1].integerValue} mb
            </li>
          </ul>
        </Tooltip>
        <div className="agent-info">
          <i className="agent-icon small material-icons">perm_identity</i>
          <strong className="instanceid">{this.instanceId}</strong>
        </div>
        <em className="task-count">{details.tasks.length} tasks</em>
        <hr />
        <ul>{taskListItems}</ul>
      </div>
    );
  }
}

Agent.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  agentDetails: PropTypes.object.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  taskDefinitionColours: PropTypes.object.isRequired,
};

export default Agent;
