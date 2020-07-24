"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.bud = void 0;
var api_1 = require("./api");
var hooks_1 = require("./hooks");
var util_1 = require("./util");
var plugin_1 = require("./plugin");
var state_1 = require("./state");
var mode_1 = require("./mode");
/**
 * Bud - asset management framework.
 *
 * @see {@link https://roots.io/bud}
 * @copyright Roots {@link https://roots.io}
 */
var bud = __assign(__assign({}, api_1.api), { hooks: hooks_1.hooks,
    util: util_1.util,
    plugin: plugin_1.plugin,
    state: state_1.state,
    mode: mode_1.mode });
exports.bud = bud;
//# sourceMappingURL=index.js.map