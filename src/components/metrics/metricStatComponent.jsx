import PropTypes from 'prop-types';
import React, { Component } from 'react';
import CountUp from 'countup.js';
import { Observable } from 'rxjs';
import './metricStatComponent.css';

// value in percent
const LOWER_VALUE_LIMIT = 30;
const UPPER_VALUE_LIMIT = 80;

function statusClassName(value) {
  if (value >= UPPER_VALUE_LIMIT) {
    return 'danger';
  }
  if (value <= LOWER_VALUE_LIMIT) {
    return 'optimal';
  }
  return 'centric';
}

class MetricStat extends Component {
  constructor(props) {
    super(props);
    // eslint-disable-next-line no-underscore-dangle,react/destructuring-assignment
    this.elementId = `${this.props._key}-metric`;
    this.state = {
      value: 0,
    };
  }

  // eslint-disable-next-line react/sort-comp
  updateValue(value) {
    if (!value) {
      return;
    }

    const actualValue = value.Maximum;
    // eslint-disable-next-line react/destructuring-assignment,no-restricted-globals
    if (isNaN(actualValue) || actualValue === this.state.value) {
      // no changes, just return
      return;
    }

    this.setState({
      value: actualValue,
    });
    this.countUp.update(actualValue);

    if (
      // eslint-disable-next-line react/destructuring-assignment
      typeof this.props.alertPredicate === 'function' &&
      // eslint-disable-next-line react/destructuring-assignment
      this.props.alertPredicate(actualValue) &&
      // eslint-disable-next-line react/destructuring-assignment
      typeof this.props.alertHandler === 'function'
    ) {
      // eslint-disable-next-line react/destructuring-assignment
      this.props.alertHandler(actualValue);
    }
  }

  componentWillUnmount() {
    this.stream.unsubscribe();
  }

  componentDidMount() {
    const countUpOptions = {
      useEasing: true,
      useGrouping: true,
      separator: ',',
      decimal: '.',
      prefix: '',
      suffix: '%',
    };
    this.countUp = new CountUp(this.elementId, 0, 0, 2, 3, countUpOptions);
    this.countUp.start();
    // eslint-disable-next-line react/destructuring-assignment
    this.stream = this.props.stream.subscribe(this.updateValue.bind(this));
  }

  render() {
    // eslint-disable-next-line react/destructuring-assignment
    const numberClassName = `number ${statusClassName(this.state.value)}`;

    return (
      <div className="metricstat">
        <strong className={numberClassName} id={this.elementId} />
      </div>
    );
  }
}

MetricStat.propTypes = {
  _key: PropTypes.string.isRequired,
  stream: PropTypes.instanceOf(Observable).isRequired,
  // eslint-disable-next-line react/require-default-props
  alertPredicate: PropTypes.func,
  // eslint-disable-next-line react/require-default-props
  alertHandler: PropTypes.func,
};

export default MetricStat;
