import React, { Component } from 'react';
import PropTypes from 'prop-types';

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

  constructor(props) {
    super();

    this.state = {
      value: props.value,
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
      this.setState({ value });
    }
  }

  onBlur = ev => {
    const { value } = this.state;
    const { onBlur } = this.props;

    if (isFunction(onBlur)) {
      onBlur(ev, value);
    }
  };

  onChange = ev => {
    const { value } = ev.target;

    this.setState({ value }, () => {
      const { onChange } = this.props;

      if (isFunction(onChange)) {
        onChange(value);
      }
    });
  };

  onKeyDown = ev => {
    const { value } = ev.target;
    const { onKeyDown } = this.props;

    if (isFunction(onKeyDown)) {
      onKeyDown(ev, value);
    }
  };

  onKeyUp = ev => {
    const { value } = ev.target;
    const { onKeyUp } = this.props;

    if (isFunction(onKeyUp)) {
      onKeyUp(ev, value);
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
