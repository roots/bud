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
exports.builders = exports.config = void 0;
var entry_1 = require("./entry");
var devServer_1 = require("./devServer");
var externals_1 = require("./externals");
var general_1 = require("./general");
var rules_1 = require("./rules");
var optimization_1 = require("./optimization");
var output_1 = require("./output");
var webpackResolve_1 = require("./webpackResolve");
var plugins_1 = require("./plugins");
var builders = [
    devServer_1.devServer,
    entry_1.entry,
    general_1.general,
    rules_1.rules,
    externals_1.externals,
    output_1.output,
    optimization_1.optimization,
    plugins_1.plugins,
    webpackResolve_1.webpackResolve,
];
exports.builders = builders;
var config = function (bud) {
    return builders.reduce(function (acc, curr) { return (__assign(__assign({}, (acc !== null && acc !== void 0 ? acc : [])), curr(bud))); }, {});
};
exports.config = config;
//# sourceMappingURL=index.js.map