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
exports.webpackConfig = void 0;
var devServer_1 = require("./devServer");
var entry_1 = require("./entry");
var index_1 = require("./rules/index");
var optimization_1 = require("./optimization");
var output_1 = require("./output");
var webpackResolve_1 = require("./webpackResolve");
var index_2 = require("./plugins/index");
/**
 * Make Webpack Config
 *
 * @param  {import('../index')} bud
 * @return {object}
 */
var webpackConfig = function (bud) { return ({
    bud: bud,
    options: {
        entry: entry_1.entry(bud),
        output: output_1.output(bud),
        rules: index_1.rules(bud),
        optimization: optimization_1.optimization(bud),
        plugins: index_2.plugins(bud),
        resolve: webpackResolve_1.webpackResolve(bud),
        externals: externals(bud),
        devServer: devServer_1.devServer(bud),
        general: general(bud)
    },
    mergeConfig: function (configValues) {
        this.config = __assign(__assign({}, this.config), configValues);
    },
    compile: function () {
        this.doHook('pre', this.options);
        this.mergeConfig(this.options.entry.make());
        this.mergeConfig(this.options.output.make());
        this.mergeConfig(this.options.rules.make());
        this.mergeConfig(this.options.optimization.make());
        this.mergeConfig(this.options.plugins.make());
        this.mergeConfig(this.options.resolve.make());
        this.mergeConfig(this.options.externals.make());
        this.mergeConfig(this.options.devServer.make());
        this.mergeConfig(this.options.general.make());
        this.doHook('post', this.config);
        return this.config;
    },
    doHook: function (name) {
        var params = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            params[_i - 1] = arguments[_i];
        }
        this.bud.hooks.call(name + "_webpack", this, params);
    }
}); };
exports.webpackConfig = webpackConfig;
