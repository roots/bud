"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.BuildInfo = void 0;
/** Modules */
var react_1 = __importDefault(require("react"));
var ink_1 = require("ink");
var prop_types_1 = __importDefault(require("prop-types"));
/** Application components */
var Loading_1 = require("./Loading");
var Watching_1 = require("./Watching");
/**
 * Build Info
 */
var BuildInfo = function (_a) {
    var _b;
    var build = _a.build, config = _a.config, width = _a.width;
    return (<ink_1.Box flexDirection="column" paddingTop={1}>
    {(build === null || build === void 0 ? void 0 : build.percentage) == 1 && (build === null || build === void 0 ? void 0 : build.hash) && (<ink_1.Text color="#6C758F" marginTop={1}>
        Build {build === null || build === void 0 ? void 0 : build.hash}. Finished in{' '}
        {(build === null || build === void 0 ? void 0 : build.time) / 1000}s.
      </ink_1.Text>)}

    <Loading_1.Loading build={build} width={width}/>
    {((_b = config === null || config === void 0 ? void 0 : config.features) === null || _b === void 0 ? void 0 : _b.watching) && (<Watching_1.Watching config={config} build={build}/>)}
  </ink_1.Box>);
};
exports.BuildInfo = BuildInfo;
BuildInfo.propTypes = {
    build: prop_types_1["default"].object,
    config: prop_types_1["default"].object,
    width: prop_types_1["default"].number
};
