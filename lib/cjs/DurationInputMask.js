"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var propTypes = {
  autoFocus: _propTypes2.default.bool,
  component: _propTypes2.default.node,
  onBlur: _propTypes2.default.func,
  onChange: _propTypes2.default.func,
  onKeyDown: _propTypes2.default.func,
  onKeyUp: _propTypes2.default.func,
  value: _propTypes2.default.string
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

      if ((0, _utils.isFunction)(onBlur)) {
        onBlur(ev, value);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onChange", function (ev) {
      var value = ev.target.value;

      _this.setState({
        value: value
      }, function () {
        var onChange = _this.props.onChange;

        if ((0, _utils.isFunction)(onChange)) {
          onChange(value);
        }
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onKeyDown", function (ev) {
      var value = ev.target.value;
      var onKeyDown = _this.props.onKeyDown;

      if ((0, _utils.isFunction)(onKeyDown)) {
        onKeyDown(ev, value);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onKeyUp", function (ev) {
      var value = ev.target.value;
      var onKeyUp = _this.props.onKeyUp;

      if ((0, _utils.isFunction)(onKeyUp)) {
        onKeyUp(ev, value);
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
          value: value
        });
      }
    }
  }, {
    key: "mask",
    value: function mask() {
      var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.state;
      var minute = 60;
      var hour = 60 * minute;
      var day = 24 * hour;
      var hours = value % day;
      var minutes = value % hour;
      var seconds = value % minute;
      var mask = {
        d: value > day ? Math.floor(value / day) : 0,
        h: hours > 0 ? Math.floor(hours / hour) : 0,
        m: minutes > 0 ? Math.floor(minutes / minute) : 0,
        s: seconds
      };
      console.log('mask', mask);
      return Object.keys(mask).reduce(function (prev, key) {
        var value = mask[key];
        return value ? "".concat(prev, " ").concat(value).concat(key) : prev;
      }, '');
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var value = this.state.value;

      var _this$props = this.props,
          Component = _this$props.component,
          props = _objectWithoutProperties(_this$props, ["component"]);

      return _react2.default.createElement(Component, _extends({}, (0, _utils.omit)(props, Object.keys(propTypes)), {
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
}(_react.Component);

_defineProperty(DurationInputMask, "defaultProps", {
  autoFocus: false,
  component: 'input',
  onBlur: null,
  onChange: null,
  onKeyDown: null,
  onKeyUp: null,
  value: ''
});

exports.default = DurationInputMask;