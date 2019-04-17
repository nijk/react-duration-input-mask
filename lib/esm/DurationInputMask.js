import _typeof from "@babel/runtime/helpers/typeof";
import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
import _toConsumableArray from "@babel/runtime/helpers/toConsumableArray";
import _wrapNativeSuper from "@babel/runtime/helpers/wrapNativeSuper";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";

function _wrapRegExp(re, groups) { _wrapRegExp = function _wrapRegExp(re, groups) { return new BabelRegExp(re, groups); }; var _RegExp = _wrapNativeSuper(RegExp); var _super = RegExp.prototype; var _groups = new WeakMap(); function BabelRegExp(re, groups) { var _this = _RegExp.call(this, re); _groups.set(_this, groups); return _this; } _inherits(BabelRegExp, _RegExp); BabelRegExp.prototype.exec = function (str) { var result = _super.exec.call(this, str); if (result) result.groups = buildGroups(result, this); return result; }; BabelRegExp.prototype[Symbol.replace] = function (str, substitution) { if (typeof substitution === "string") { var groups = _groups.get(this); return _super[Symbol.replace].call(this, str, substitution.replace(/\$<([^>]+)>/g, function (_, name) { return "$" + groups[name]; })); } else if (typeof substitution === "function") { var _this = this; return _super[Symbol.replace].call(this, str, function () { var args = []; args.push.apply(args, arguments); if (_typeof(args[args.length - 1]) !== "object") { args.push(buildGroups(args, _this)); } return substitution.apply(this, args); }); } else { return _super[Symbol.replace].call(this, str, substitution); } }; function buildGroups(result, re) { var g = _groups.get(re); return Object.keys(g).reduce(function (groups, name) { groups[name] = result[g[name]]; return groups; }, Object.create(null)); } return _wrapRegExp.apply(this, arguments); }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import matchAll from 'string.prototype.matchall';
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
matchAll.shim();

var DurationInputMask =
/*#__PURE__*/
function (_Component) {
  _inherits(DurationInputMask, _Component);

  function DurationInputMask(props) {
    var _this;

    _classCallCheck(this, DurationInputMask);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(DurationInputMask).call(this));

    _defineProperty(_assertThisInitialized(_this), "minute", 60);

    _defineProperty(_assertThisInitialized(_this), "hour", 60 * _this.minute);

    _defineProperty(_assertThisInitialized(_this), "day", 24 * _this.hour);

    _defineProperty(_assertThisInitialized(_this), "onBlur", function (event) {
      var value = _this.state.value;

      var nextValue = _this.mask(value);

      _this.setState({
        value: nextValue
      }, function () {
        var onBlur = _this.props.onBlur;

        if (isFunction(onBlur)) {
          onBlur(event, nextValue);
        }
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onChange", function (event) {
      var value = event.target.value;

      _this.setState({
        value: value
      }, function () {
        var onChange = _this.props.onChange;

        if (isFunction(onChange)) {
          onChange(event, value);
        }
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onKeyDown", function (event) {
      var value = event.target.value;
      var onKeyDown = _this.props.onKeyDown;

      if (isFunction(onKeyDown)) {
        onKeyDown(event, value);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onKeyUp", function (event) {
      var value = event.target.value;
      var onKeyUp = _this.props.onKeyUp;

      if (isFunction(onKeyUp)) {
        onKeyUp(event, value);
      }
    });

    _this.state = {
      value: _this.mask(props.value)
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
          value: this.mask(value)
        });
      }
    }
  }, {
    key: "convertToInteger",
    value: function convertToInteger() {
      var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

      if (typeof value === 'number' || /^[0-9 ]+$/.test(value)) {
        return parseInt(value || 0, 10);
      }

      var match = value.matchAll(_wrapRegExp(/(\d*)(\w)/gi, {
        value: 1,
        unit: 2
      }));
      var volumes = {
        m: this.minute,
        h: this.hour,
        d: this.day,
        s: 1
      };
      return _toConsumableArray(match).reduce(function (prev, curr) {
        var unit = curr[2];
        return unit.length && volumes[unit] ? prev + volumes[unit] * curr[1] : prev;
      }, 0);
    }
  }, {
    key: "mask",
    value: function mask() {
      var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.state;
      var intValue = this.convertToInteger(value);
      var hours = intValue % this.day;
      var minutes = intValue % this.hour;
      var seconds = intValue % this.minute;
      var duration = {
        d: intValue > this.day ? Math.floor(intValue / this.day) : 0,
        h: hours > 0 ? Math.floor(hours / this.hour) : 0,
        m: minutes > 0 ? Math.floor(minutes / this.minute) : 0,
        s: seconds
      };
      return Object.keys(duration).reduce(function (prev, key) {
        var durationValue = duration[key];
        return durationValue ? "".concat(prev, " ").concat(durationValue).concat(key) : prev;
      }, '').trimStart();
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