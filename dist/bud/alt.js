"use strict";
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
 */
var bud;
(function (bud) {
    bud.state = state_1.state;
    api_1.api;
    hooks_1.hooks;
    util_1.util;
    plugin_1.plugin;
    mode_1.mode;
    mode_1.inProduction;
})(bud = exports.bud || (exports.bud = {}));
//# sourceMappingURL=alt.js.map