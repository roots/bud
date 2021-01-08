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
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.options = exports.when = exports.make = exports.api = void 0;
const react_refresh_webpack_plugin_1 = __importDefault(require("@pmmmwh/react-refresh-webpack-plugin"));
/**
 * Adds bud.reactRefresh() config handler.
 */
exports.api = __importStar(require("./api"));
/**
 * @pmmmwh/react-refresh-webpack-plugin implementation
 */
const make = opts => new react_refresh_webpack_plugin_1.default(opts.all());
exports.make = make;
/**
 * @pmmmwh/react-refresh-webpack-plugin conditions
 */
const when = ({ mode }) => mode.is('development');
exports.when = when;
/**
 * @pmmmwh/react-refresh-webpack-plugin options
 */
exports.options = {
    overlay: false,
};
//# sourceMappingURL=index.js.map