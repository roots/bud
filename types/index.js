"use strict";
exports.__esModule = true;
var path_1 = require("path");
var webpack_1 = require("./builder/webpack");
var renderCompilerDashboard_1 = require("./compiler/renderCompilerDashboard");
var compileSafeMode_1 = require("./compileSafeMode");
var dump_1 = require("./util/dump");
/**
 * Load project config.
 */
var budInstance = require(path_1.join(process.cwd(), 'bud.config.js'));
var mode = budInstance.options.mode;
var dashboardEnabled = budInstance.features.dashboard;
/**
 * Process
 */
process.env.BABEL_ENV = mode;
process.env.NODE_ENV = mode;
process.on('unhandledRejection', function (error) {
    budInstance.hooks.call('compile_error', {
        bud: budInstance,
        error: error
    });
    process.exit();
});
/**
 * Project config => webpack config
 */
budInstance.hooks.call('pre_config', budInstance);
var compiledConfig = webpack_1.webpackConfig(budInstance).compile();
budInstance.hooks.call('post_config', compiledConfig);
budInstance.features.dump && dump_1.dump(compiledConfig);
/**
 * Run compiler.
 */
dashboardEnabled
    ? renderCompilerDashboard_1.renderCompilerDashboard(budInstance, compiledConfig) // enabled: bud compiler
    : compileSafeMode_1.compileSafeMode(budInstance, compiledConfig); // disabled: more standard stats output
