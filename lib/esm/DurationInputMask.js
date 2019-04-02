import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isFunction, omit } from './utils';
var propTypes = {
  autoFocus: PropTypes.bool,
  component: PropTypes.node,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onKeyDown: PropTypes.func,
  onKeyUp: PropTypes.func,
  value: PropTypes.string
};

var DurationInputMask =
/*#__PURE__*/
function (_Component) {
  _inherits(DurationInputMask, _Component);

  function DurationInputMask(props) {
    var _this;

    _classCallCheck(this, DurationInputMask);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(DurationInputMask).call(this));

    _defineProperty(_assertThisInitialized(_this), "onBlur", function (ev) {
      var value = _this.state.value;
      var onBlur = _this.props.onBlur;

      if (isFunction(onBlur)) {
        onBlur(ev, value);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onChange", function (ev) {
      var value = ev.target.value;

      _this.setState({
        value: value
      }, function () {
        var onChange = _this.props.onChange;

        if (isFunction(onChange)) {
          onChange(value);
        }
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onKeyDown", function (ev) {
      var value = ev.target.value;
      var onKeyDown = _this.props.onKeyDown;

      if (isFunction(onKeyDown)) {
        onKeyDown(ev, value);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onKeyUp", function (ev) {
      var value = ev.target.value;
      var onKeyUp = _this.props.onKeyUp;

      if (isFunction(onKeyUp)) {
        onKeyUp(ev, value);
      }
    });

    _this.state = {
      value: props.value
    };
    _this.ref = null;
    return _this;
  }

  _createClass(DurationInputMask, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      if (this.props.autoFocus && this.ref) {
        this.ref.focus();
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var value = this.props.value;

      if (prevProps.value !== value) {
        this.setState({
          value: value
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var value = this.state.value;

      var _this$props = this.props,
          Component = _this$props.component,
          props = _objectWithoutProperties(_this$props, ["component"]);

      return React.createElement(Component, _extends({}, omit(props, Object.keys(propTypes)), {
        onBlur: this.onBlur,
        onChange: this.onChange,
        onKeyDown: this.onKeyDown,
        onKeyUp: this.onKeyUp,
        ref: function ref(_ref) {
          _this2.ref = _ref;
        },
        value: value
      }));
    }
  }]);

  return DurationInputMask;
}(Component);

_defineProperty(DurationInputMask, "defaultProps", {
  autoFocus: false,
  component: 'input',
  onBlur: null,
  onChange: null,
  onKeyDown: null,
  onKeyUp: null,
  value: ''
});

export default DurationInputMask;