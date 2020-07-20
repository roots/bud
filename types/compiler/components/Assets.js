"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.Assets = void 0;
var react_1 = __importStar(require("react"));
var ink_1 = require("ink");
var prop_types_1 = __importDefault(require("prop-types"));
/**
 * Indicator
 *
 * @prop {boolean} emitted
 * @return {PropTypes.ReactComponentLike}
 */
var Indicator = function (_a) {
    var emitted = _a.emitted;
    return (<ink_1.Text color={emitted ? '#545DD7' : '#6C758F'}>⦿ </ink_1.Text>);
};
Indicator.propTypes = {
    emitted: prop_types_1["default"].bool
};
/**
 * Asset
 *
 * @prop {object} asset
 * @return {PropTypes.ReactComponentLike}
 */
var Asset = function (_a) {
    var asset = _a.asset;
    var display = asset.name.split('.').pop() == 'css' ||
        asset.name.split('.').pop() == 'js';
    return !display ? ([]) : (<ink_1.Box flexDirection="row" justifyContent="space-between">
      <ink_1.Box>
        <Indicator emitted={asset.emitted}/>
        <ink_1.Text color={asset.emitted ? 'white' : 'gray'}>
          {asset.name}
        </ink_1.Text>
      </ink_1.Box>
      <ink_1.Spacer />
      <ink_1.Box>
        <ink_1.Text dimColor="white">{asset.size / 1000}kb</ink_1.Text>
      </ink_1.Box>
    </ink_1.Box>);
};
Asset.propTypes = {
    asset: prop_types_1["default"].object
};
/**
 * Assets
 *
 * @prop {object} build
 * @prop {object} actions
 * @prop {number} width
 * @return {PropTypes.ReactComponentLike}
 */
var Assets = function (_a) {
    var _b, _c;
    var build = _a.build, actions = _a.actions;
    var isFocused = ink_1.useFocus({ autoFocus: true }).isFocused;
    react_1.useEffect(function () {
        actions.setFocus({ assets: isFocused });
    }, [isFocused]);
    return (<ink_1.Box display={isFocused ? 'flex' : 'none'} flexDirection="column">
      {(_b = build === null || build === void 0 ? void 0 : build.assets) === null || _b === void 0 ? void 0 : _b.map(function (asset, id) { return (<Asset key={id} asset={asset}/>); })}
      {((_c = build === null || build === void 0 ? void 0 : build.assets) === null || _c === void 0 ? void 0 : _c.length) == 0 && <ink_1.Text>Loading</ink_1.Text>}
    </ink_1.Box>);
};
exports.Assets = Assets;
Assets.propTypes = {
    build: prop_types_1["default"].object,
    actions: prop_types_1["default"].object,
    width: prop_types_1["default"].number
};
