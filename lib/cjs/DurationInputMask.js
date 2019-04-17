"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _stringPrototype = require("string.prototype.matchall");

var _stringPrototype2 = _interopRequireDefault(_stringPrototype);

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _wrapRegExp(re, groups) { _wrapRegExp = function _wrapRegExp(re, groups) { return new BabelRegExp(re, groups); }; var _RegExp = _wrapNativeSuper(RegExp); var _super = RegExp.prototype; var _groups = new WeakMap(); function BabelRegExp(re, groups) { var _this = _RegExp.call(this, re); _groups.set(_this, groups); return _this; } _inherits(BabelRegExp, _RegExp); BabelRegExp.prototype.exec = function (str) { var result = _super.exec.call(this, str); if (result) result.groups = buildGroups(result, this); return result; }; BabelRegExp.prototype[Symbol.replace] = function (str, substitution) { if (typeof substitution === "string") { var groups = _groups.get(this); return _super[Symbol.replace].call(this, str, substitution.replace(/\$<([^>]+)>/g, function (_, name) { return "$" + groups[name]; })); } else if (typeof substitution === "function") { var _this = this; return _super[Symbol.replace].call(this, str, function () { var args = []; args.push.apply(args, arguments); if (_typeof(args[args.length - 1]) !== "object") { args.push(buildGroups(args, _this)); } return substitution.apply(this, args); }); } else { return _super[Symbol.replace].call(this, str, substitution); } }; function buildGroups(result, re) { var g = _groups.get(re); return Object.keys(g).reduce(function (groups, name) { groups[name] = result[g[name]]; return groups; }, Object.create(null)); } return _wrapRegExp.apply(this, arguments); }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _construct(Parent, args, Class) { if (isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

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

_stringPrototype2.default.shim();

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

        if ((0, _utils.isFunction)(onBlur)) {
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

        if ((0, _utils.isFunction)(onChange)) {
          onChange(event, value);
        }
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onKeyDown", function (event) {
      var value = event.target.value;
      var onKeyDown = _this.props.onKeyDown;

      if ((0, _utils.isFunction)(onKeyDown)) {
        onKeyDown(event, value);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onKeyUp", function (event) {
      var value = event.target.value;
      var onKeyUp = _this.props.onKeyUp;

      if ((0, _utils.isFunction)(onKeyUp)) {
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