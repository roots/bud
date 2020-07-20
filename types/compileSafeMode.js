"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.compileSafeMode = void 0;
var webpack_1 = __importDefault(require("webpack"));
var chalk_1 = __importDefault(require("chalk"));
/**
 * Display stats.
 *
 * Normal-ish webpack stdout.
 *
 * @param  {object} stats - webpack stats object
 * @return {void}
 */
var displayStats = function (stats) {
    console.log(chalk_1["default"].bgWhite.black('\n Build results \n'));
    var statsOptions = {
        all: false,
        assets: true,
        errors: true,
        warnings: true,
        colors: {
            green: '\u001b[38;5;63m'
        }
    };
    console.log(stats.toString(statsOptions));
    console.log('\n');
};
/**
 * Safe mode
 */
var compileSafeMode = function (config, webpackConfig) {
    var webpackCallback = function (err, stats) {
        if (err) {
            console.error(err.stack || err);
            if (err.details) {
                console.error(err.details);
            }
            return;
        }
        displayStats(stats);
        if (config.inProduction) {
            process.exit(0);
        }
    };
    if (!config.isProduction) {
        webpack_1["default"](webpackConfig).watch({}, webpackCallback);
    }
    else {
        webpack_1["default"](webpackConfig).run(webpackCallback);
    }
};
exports.compileSafeMode = compileSafeMode;
