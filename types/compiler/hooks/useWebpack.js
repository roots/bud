"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.useWebpack = void 0;
var react_1 = require("react");
var webpack_1 = require("webpack");
/**
 * useProgress: Webpack ProgressPlugin
 * @return {object}
 */
var useProgress = function () {
    var _a = react_1.useState(), progressPlugin = _a[0], setProgressPlugin = _a[1];
    var _b = react_1.useState(0), percentage = _b[0], setPercentage = _b[1];
    var _c = react_1.useState(null), message = _c[0], setMessage = _c[1];
    react_1.useEffect(function () {
        !progressPlugin &&
            setProgressPlugin(new webpack_1.ProgressPlugin({
                activeModules: true,
                modules: true,
                handler: function (percentage, message) {
                    setPercentage(percentage);
                    setMessage(message);
                }
            }));
    }, []);
    return { progressPlugin: progressPlugin, percentage: percentage, message: message };
};
/**
 * Hook: useWebpack
 * @prop {compiler} compiler webpack.compiler
 * @prop {string}   options  project options
 */
var useWebpack = function (_a) {
    var compiler = _a.compiler, config = _a.config;
    var _b = useProgress(), progressPlugin = _b.progressPlugin, percentage = _b.percentage, message = _b.message;
    var _c = react_1.useState(null), progressPluginApplied = _c[0], setProgressPluginApplied = _c[1];
    react_1.useEffect(function () {
        if (progressPlugin) {
            progressPlugin.apply(compiler);
            setProgressPluginApplied(true);
        }
    }, [progressPlugin, compiler]);
    var _d = react_1.useState({}), buildStats = _d[0], setBuildStats = _d[1];
    var _e = react_1.useState([]), buildErrors = _e[0], setBuildErrors = _e[1];
    var _f = react_1.useState(null), webpackRunning = _f[0], setWebpackRunning = _f[1];
    react_1.useEffect(function () {
        var _a;
        var webpackCallback = function (err, stats) {
            setBuildErrors(err);
            setBuildStats(stats.toJson({
                version: true,
                hash: true,
                time: true,
                assets: true,
                errors: true,
                warnings: true
            }));
        };
        if (progressPluginApplied) {
            if (!webpackRunning) {
                setWebpackRunning(true);
                (config === null || config === void 0 ? void 0 : config.mode) == 'development' &&
                    !((_a = config === null || config === void 0 ? void 0 : config.features) === null || _a === void 0 ? void 0 : _a.debug) == true
                    ? compiler.watch({}, webpackCallback)
                    : compiler.run(webpackCallback);
            }
        }
    }, [progressPluginApplied, config === null || config === void 0 ? void 0 : config.mode, compiler]);
    var _g = react_1.useState([]), assets = _g[0], setAssets = _g[1];
    var _h = react_1.useState([]), warnings = _h[0], setWarnings = _h[1];
    var _j = react_1.useState([]), errors = _j[0], setErrors = _j[1];
    react_1.useEffect(function () {
        var _a, _b;
        setAssets(buildStats === null || buildStats === void 0 ? void 0 : buildStats.assets);
        setWarnings((_a = buildStats === null || buildStats === void 0 ? void 0 : buildStats.warnings) !== null && _a !== void 0 ? _a : []);
        setErrors(__spreadArrays((buildErrors !== null && buildErrors !== void 0 ? buildErrors : []), ((_b = buildStats === null || buildStats === void 0 ? void 0 : buildStats.errors) !== null && _b !== void 0 ? _b : [])));
    }, [buildStats, buildErrors]);
    return {
        assets: assets,
        errors: errors,
        hash: buildStats === null || buildStats === void 0 ? void 0 : buildStats.hash,
        time: buildStats === null || buildStats === void 0 ? void 0 : buildStats.time,
        warnings: warnings,
        percentage: percentage,
        message: message
    };
};
exports.useWebpack = useWebpack;
