"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.Watching = void 0;
var ink_1 = require("ink");
var ink_spinner_1 = __importDefault(require("ink-spinner"));
var prop_types_1 = __importDefault(require("prop-types"));
/**
 * Watch mode indicator
 * @prop {object} options
 * @prop {object} build
 * @return {PropTypes.ReactElementLike}
 */
var Watching = function (_a) {
    var _b;
    var options = _a.options, build = _a.build;
    return (<ink_1.Box flexDirection="row">
    {(options === null || options === void 0 ? void 0 : options.mode) == 'development' &&
        ((_b = build === null || build === void 0 ? void 0 : build.errors) === null || _b === void 0 ? void 0 : _b.length) > 0 ? (<ink_1.Text color="#dc3545">
        <ink_1.Text>
          <ink_spinner_1["default"] type="dots"/>
        </ink_1.Text>
        {' Watching for fixes'}
      </ink_1.Text>) : (build === null || build === void 0 ? void 0 : build.percentage) == 1 ? (<ink_1.Text color="#28a745">
        <ink_1.Text>
          <ink_spinner_1["default"] type="dots"/>
        </ink_1.Text>
        {' Watching for changes'}
      </ink_1.Text>) : ([])}
  </ink_1.Box>);
};
exports.Watching = Watching;
Watching.propTypes = {
    options: prop_types_1["default"].object,
    build: prop_types_1["default"].object
};
