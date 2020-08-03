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
exports.compiler = void 0;
var webpack_1 = require("../webpack");
var renderCompilerDashboard_1 = require("./renderCompilerDashboard");
var renderSafeMode_1 = require("./renderSafeMode");
var compiler = function (bud) {
    bud.hooks.call('pre_compiler');
    /**
     * Use bud's default dashboard when enabled
     */
    var dashboardEnabled = bud.features.enabled('dashboard');
    /**
     * webpack configuration
     */
    var compiledConfig = webpack_1.build(bud).make();
    bud.logger.info(__assign({ name: 'render compiler dashboard' }, compiledConfig), "Webpack config generator results.");
    bud.hooks.call('pre_dashboard');
    /**
     * Run compiler.
     */
    dashboardEnabled
        ? renderCompilerDashboard_1.renderCompilerDashboard(bud, compiledConfig) // enabled: bud compiler
        : renderSafeMode_1.compileSafeMode(bud, compiledConfig); // disabled: simple stats output
    bud.hooks.call('post_dashboard');
    bud.hooks.call('post_compiler');
};
exports.compiler = compiler;
//# sourceMappingURL=compiler.js.map