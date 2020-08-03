"use strict";
exports.__esModule = true;
exports.compiler = void 0;
var webpack_1 = require("../webpack");
var renderCompilerDashboard_1 = require("./renderCompilerDashboard");
var renderSafeMode_1 = require("./renderSafeMode");
var compiler = function (bud) {
    /**
     * Use bud's default dashboard when enabled
     */
    var dashboardEnabled = bud.features.enabled('dashboard');
    /**
     * webpack configuration
     */
    var compiledConfig = webpack_1.build(bud).make();
    bud.hooks.call('compiler.dashboard.pre');
    /**
     * Run compiler.
     */
    dashboardEnabled
        ? renderCompilerDashboard_1.renderCompilerDashboard(bud, compiledConfig) // enabled: bud compiler
        : renderSafeMode_1.compileSafeMode(bud, compiledConfig); // disabled: simple stats output
    bud.hooks.call('compiler.dashboard.post');
};
exports.compiler = compiler;
//# sourceMappingURL=compiler.js.map