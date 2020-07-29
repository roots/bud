"use strict";
exports.__esModule = true;
exports.compiler = void 0;
var build_1 = require("../build");
var renderCompilerDashboard_1 = require("./renderCompilerDashboard");
var renderSafeMode_1 = require("./renderSafeMode");
/**
 * Compiler
 */
var compiler = function (bud) {
    /**
     * Use bud's default dashboard when enabled
     */
    var dashboardEnabled = bud.features.enabled('dashboard');
    /**
     * Dump config to stdout close process before build when enabled
     */
    var dumpEnabled = bud.features.enabled('dump');
    /**
     * Pre-configuration hook
     */
    bud.hooks.call('pre_config', bud);
    /**
     * webpack configuration
     */
    var compiledConfig = build_1.build(bud).makeConfig();
    /**
     * Post-configuration hook (finalizes webpack configuration)
     */
    bud.hooks.call('post_config', compiledConfig);
    /**
     * Dump if dumpEnabled conditional check is true
     */
    dumpEnabled && bud.util.dump(compiledConfig);
    /**
     * Run compiler.
     */
    dashboardEnabled
        ? renderCompilerDashboard_1.renderCompilerDashboard(bud, compiledConfig) // enabled: bud compiler
        : renderSafeMode_1.compileSafeMode(bud, compiledConfig); // disabled: more standard stats output
};
exports.compiler = compiler;
//# sourceMappingURL=compiler.js.map