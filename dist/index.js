"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
};
exports.__esModule = true;
exports.configs = exports.bud = void 0;
__exportStar(require("./bud/api/types"), exports);
var bud_1 = require("./bud");
/**
 * ## Bud - asset management framework.
 *
 * @const {Bud} bud
 */
var bud = new bud_1.bootstrap().framework;
exports.bud = bud;
var configs = {
    eslint: require.resolve('../preset/eslint'),
    postcss: require.resolve('../preset/postcss'),
    stylelint: require.resolve('../preset/stylelint')
};
exports.configs = configs;
//# sourceMappingURL=index.js.map