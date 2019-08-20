import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import matchAll from 'string.prototype.matchall';

// Utils
import { isFunction, isNumber, omit } from './utils';

// Polyfill
import './polyfills/trimStart';

matchAll.shim();

const propTypes = {
  autoFocus: PropTypes.bool,
  component: PropTypes.node,
  defaultValue: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  maskDelay: PropTypes.number,
  handleBlur: PropTypes.func,
  handleChange: PropTypes.func,
  onKeyDown: PropTypes.func,
  onKeyUp: PropTypes.func,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

class DurationInputMask extends PureComponent {
  static propTypes = propTypes;

  static defaultProps = {
    autoFocus: false,
    component: 'input',
    defaultValue: '',
    maskDelay: null,
    handleBlur: null,
    handleChange: null,
    onKeyDown: null,
    onKeyUp: null,
    value: '',
  };

  minute = 60;

  hour = 60 * this.minute;

  day = 24 * this.hour;

  timer = null;

  constructor(props) {
    super();

    this.state = {
      value: this.mask(props.value, props),
    };

    this.ref = null;
  }

  componentDidMount() {
    const { autoFocus } = this.props;

    if (autoFocus && this.ref) {
      this.ref.focus();
    }

    this.timer = null;
  }

  componentDidUpdate(prevProps) {
    const { value } = this.props;

    if (prevProps.value !== value) {
      this.setState({ value: this.mask(value) });
    }
  }

  handleBlur = () => {
    if (this.timer) {
      clearTimeout(this.timer);
    }

    const { value } = this.state;
    const { handleBlur } = this.props;
    const nextValue = this.mask(value);

    this.setState({ value: nextValue }, () => {
      if (isFunction(handleBlur)) {
        handleBlur(this.convertToInteger(value), nextValue, value);
      }
    });
  };

  handleChange = (event) => {
    const { handleChange, maskDelay } = this.props;
    let { value = '' } = event.target;
    const nextValue = this.mask(value);
    const hasOnChangeFunction = isFunction(handleChange);
    const hasMaskDelay = isNumber(maskDelay) && maskDelay >= 0;

    if (this.timer) {
      clearTimeout(this.timer);
    }

    // Mask immediately
    if (maskDelay === 0) {
      value = nextValue;
    }

    this.setState({ value }, () => {
      if (hasOnChangeFunction && !hasMaskDelay) {
        handleChange(this.convertToInteger(value), nextValue, value);
      }

      if (hasMaskDelay) {
        this.timer = setTimeout(() => this.handleMaskDelay(
          value,
          nextValue,
          hasOnChangeFunction,
        ), maskDelay);
      }
    });
  };

  handleMaskDelay = (value, nextValue, hasOnChangeFunction) => {
    const { handleChange } = this.props;

    this.setState({ value: nextValue }, () => {
      if (hasOnChangeFunction) {
        handleChange(this.convertToInteger(value), nextValue, value);
      }
    });
  };

  onKeyDown = (event) => {
    const { onKeyDown } = this.props;

    if (isFunction(onKeyDown)) {
      onKeyDown(event);
    }
  };

  onKeyUp = (event) => {
    const { onKeyUp } = this.props;

    if (isFunction(onKeyUp)) {
      onKeyUp(event);
    }
  };

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

    // Ensure subsequent matches of same unit are filtered out, e.g. ['2d', '1d'] => ['2d']
    const uniqueMatches = [...match].reduce((prev, item, index) => {
      if (Object.keys(prev).find(prevKey => prev[prevKey][2] === item[2])) {
        return prev;
      }

      return { ...prev, [index]: item };
    }, {});

    return Object.keys(uniqueMatches).reduce((prev, key) => {
      const unit = uniqueMatches[key][2];

      return unit.length && volumes[unit] ? prev + (volumes[unit] * uniqueMatches[key][1]) : prev;
    }, 0);
  }

  mask(value, props = this.props) {
    const { defaultValue } = props;
    const intValue = this.convertToInteger(value);

    const hours = intValue % this.day;
    const minutes = intValue % this.hour;
    const seconds = intValue % this.minute;

    const duration = {
      d: intValue >= this.day ? Math.floor(intValue / this.day) : 0,
      h: hours > 0 ? Math.floor(hours / this.hour) : 0,
      m: minutes > 0 ? Math.floor(minutes / this.minute) : 0,
      s: seconds,
    };

    const nextValue = Object.keys(duration)
      .reduce((prev, key) => {
        const durationValue = duration[key];
        return durationValue ? `${prev} ${durationValue}${key}` : prev;
      }, '')
      .trimStart();

    return nextValue || defaultValue;
  }

  render() {
    const { value } = this.state;
    const { component: ComponentProp } = this.props;

    return (
      <ComponentProp
        {...omit(this.props, Object.keys(propTypes))}
        onBlur={this.handleBlur}
        onChange={this.handleChange}
        onKeyDown={this.onKeyDown}
        onKeyUp={this.onKeyUp}
        ref={(ref) => { this.ref = ref; }}
        value={value}
      />
    );
  }
}

export default DurationInputMask;
