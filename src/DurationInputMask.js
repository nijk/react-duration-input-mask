import React, { Component } from 'react';
import PropTypes from 'prop-types';
import matchAll from 'string.prototype.matchall';

import { isFunction, omit } from './utils';

const propTypes = {
  autoFocus: PropTypes.bool,
  component: PropTypes.node,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onKeyDown: PropTypes.func,
  onKeyUp: PropTypes.func,
  value: PropTypes.string,
};

matchAll.shim();

class DurationInputMask extends Component {
  static propTypes = propTypes;

  static defaultProps = {
    autoFocus: false,
    component: 'input',
    onBlur: null,
    onChange: null,
    onKeyDown: null,
    onKeyUp: null,
    value: '',
  };

  minute = 60;
  hour = 60 * this.minute;
  day = 24 * this.hour;

  constructor(props) {
    super();

    this.state = {
      value: this.mask(props.value),
    };

    this.ref = null;
  }

  componentDidMount() {
    if (this.props.autoFocus && this.ref) {
      this.ref.focus();
    }
  }

  componentDidUpdate(prevProps) {
    const { value } = this.props;

    if (prevProps.value !== value) {
      this.setState({ value: this.mask(value) });
    }
  }

  convertToInteger(value = '') {
    if (typeof value === 'number' || /^[0-9 ]+$/.test(value)) {
      return parseInt(value || 0, 10);
    }

    const match = value.matchAll(/(?<value>\d*)(?<unit>\w)/gi);

    const volumes = {
      m: this.minute,
      h: this.hour,
      d: this.day,
      s: 1,
    };

    return [...match].reduce((prev, curr) => {
      const unit = curr[2];

      return unit.length && volumes[unit] ? prev + volumes[unit] * curr[1] : prev;
    }, 0);
  }

  mask(value = this.state) {
    const intValue = this.convertToInteger(value);

    const hours = intValue % this.day;
    const minutes = intValue % this.hour;
    const seconds = intValue % this.minute;

    const duration = {
      d: intValue > this.day ? Math.floor(intValue / this.day) : 0,
      h: hours > 0 ? Math.floor(hours / this.hour) : 0,
      m: minutes > 0 ? Math.floor(minutes / this.minute) : 0,
      s: seconds,
    };

    return Object.keys(duration)
      .reduce((prev, key) => {
        const durationValue = duration[key];
        return durationValue ? `${prev} ${durationValue}${key}` : prev;
      }, '')
      .trimStart();
  }

  onBlur = event => {
    const { value } = this.state;
    const nextValue = this.mask(value);

    this.setState({ value: nextValue }, () => {
      const { onBlur } = this.props;

      if (isFunction(onBlur)) {
        onBlur(event, nextValue);
      }
    });
  };

  onChange = event => {
    const { value } = event.target;

    this.setState({ value }, () => {
      const { onChange } = this.props;

      if (isFunction(onChange)) {
        onChange(event, value);
      }
    });
  };

  onKeyDown = event => {
    const { value } = event.target;
    const { onKeyDown } = this.props;

    if (isFunction(onKeyDown)) {
      onKeyDown(event, value);
    }
  };

  onKeyUp = event => {
    const { value } = event.target;
    const { onKeyUp } = this.props;

    if (isFunction(onKeyUp)) {
      onKeyUp(event, value);
    }
  };

  render() {
    const { value } = this.state;
    const { component: Component, ...props } = this.props;

    return (
      <Component
        {...omit(props, Object.keys(propTypes))}
        onBlur={this.onBlur}
        onChange={this.onChange}
        onKeyDown={this.onKeyDown}
        onKeyUp={this.onKeyUp}
        ref={ref => {
          this.ref = ref;
        }}
        value={value}
      />
    );
  }
}

export default DurationInputMask;
