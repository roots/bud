"use strict";
exports.__esModule = true;
exports.framework = void 0;
var api_1 = require("./api");
var hooks_1 = require("./hooks");
var util_1 = require("./util");
var state_1 = require("./state");
var compiler_1 = require("./compiler");
/**
 * Bud framework
 */
var framework = function () {
    /**
     * The state container
     */
    this.state = state_1.state(this);
    /**
     * State accessors
     */
    this.flags = this.state.flags;
    this.options = this.state.options;
    this.configs = this.state.configs;
    this.plugins = this.state.plugins;
    this.features = this.state.features;
    this.paths = this.state.paths;
    this.mode = this.state.flags.get('mode');
    this.inDevelopment = this.state.flags.is('mode', 'development');
    this.inProduction = this.state.flags.is('mode', 'production');
    this.util = util_1.util;
    this.compiler = compiler_1.compiler;
};
exports.framework = framework;
framework.prototype.hooks = hooks_1.hooks();
Object.values(api_1.api).forEach(function (method) {
    framework.prototype[method.name] = method;
});
//# sourceMappingURL=index.js.map