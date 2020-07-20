"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.Loading = void 0;
var react_1 = __importDefault(require("react"));
var ink_1 = require("ink");
var ink_progress_bar_1 = __importDefault(require("ink-progress-bar"));
var prop_types_1 = __importDefault(require("prop-types"));
/**
 * Loading (Progress Plugin)
 */
var Loading = function (_a) {
    var _b;
    var build = _a.build, width = _a.width;
    return (build === null || build === void 0 ? void 0 : build.percentage) > 0 && (build === null || build === void 0 ? void 0 : build.percentage) < 1 ? (<ink_1.Box maxWidth={width} textWrap="truncate" flexDirection="row">
      <ink_1.Text bgcolor={'#171c56'}>
        <ink_1.Text width={6}>
          {Math.round((build === null || build === void 0 ? void 0 : build.percentage) * 100)}%
          {(build === null || build === void 0 ? void 0 : build.percentage) < 1 ? '  ' : ' '}
        </ink_1.Text>
      </ink_1.Text>

      <ink_1.Text color={'#545DD7'}>
        <ink_progress_bar_1["default"] character="█" percent={(_b = build === null || build === void 0 ? void 0 : build.percentage) !== null && _b !== void 0 ? _b : 0.01}/>
      </ink_1.Text>
    </ink_1.Box>) : ([]);
};
exports.Loading = Loading;
Loading.propTypes = {
    build: prop_types_1["default"].object,
    width: prop_types_1["default"].number
};
