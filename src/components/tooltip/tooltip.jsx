import PropTypes from 'prop-types';
import React, { Component } from 'react';
import tippy from 'tippy.js';
import './tooltip.css';

class Tooltip extends Component {
  // eslint-disable-next-line react/sort-comp
  get defaultSettings() {
    return {
      trigger: 'mouseenter',
      arrow: true,
      // eslint-disable-next-line react/destructuring-assignment
      html: `#${this.props.tooltipId}`,
    };
  }

  componentDidMount() {
    tippy(
      // eslint-disable-next-line react/destructuring-assignment
      this.props.triggerId,
      // eslint-disable-next-line react/destructuring-assignment
      this.props.tippySettings || this.defaultSettings
    );
  }

  render() {
    return (
      // eslint-disable-next-line react/destructuring-assignment
      <div className="tooltip" id={this.props.tooltipId}>
        {/* eslint-disable-next-line react/destructuring-assignment,react/prop-types */}
        {this.props.children || this.props.title}
      </div>
    );
  }
}

Tooltip.propTypes = {
  tooltipId: PropTypes.string.isRequired,
  triggerId: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  tippySettings: PropTypes.object,
  // eslint-disable-next-line react/require-default-props
  title: PropTypes.string,
};

Tooltip.defaultProps = {
  tippySettings: null,
};

export default Tooltip;
