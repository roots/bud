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
exports.build = void 0;
var entry_1 = require("./entry");
var devServer_1 = require("./devServer");
var externals_1 = require("./externals");
var general_1 = require("./general");
var index_1 = require("./rules/index");
var optimization_1 = require("./optimization");
var output_1 = require("./output");
var webpackResolve_1 = require("./webpackResolve");
var plugins_1 = require("./plugins");
var build = function (bud) { return ({
    /**
     * The bud container.
     * @property {Bud} bud
     */
    bud: bud,
    /**
     * The webpack config to be passed to the compiler.
     */
    config: {},
    /**
     * Builders to handle different webpack concerns.
     */
    builders: [
        ['entry', entry_1.entry],
        ['output', output_1.output],
        ['rules', index_1.rules],
        ['devServer', devServer_1.devServer],
        ['plugins', plugins_1.plugins],
        ['resolve', webpackResolve_1.webpackResolve],
        ['externals', externals_1.externals],
        ['general', general_1.general],
    ],
    /**
     * Merge a set of configuration values into the final config.
     *
     * @property {Function} mergeConfig
     * @return {void}
     */
    mergeConfig: function (configValues) {
        this.config = __assign(__assign({}, this.config), configValues);
    },
    /**
     * Generate config values from a builder
     * @property {Function} makeConfig
     * @return {object}
     */
    makeConfig: function () {
        var _this = this;
        this.bud.features.enabled('optimize') &&
            this.builders.push(['optimization', optimization_1.optimization]);
        /** Hook: pre_webpack */
        this.doHook('pre', this.bud.options);
        /**
         * Map builder output to bud.builder.config property.
         */
        this.builders.map(function (_a) {
            var name = _a[0], builder = _a[1];
            builder = _this.bud.hooks.filter("filter_webpack_" + name, builder);
            var builderInstance = builder(_this.bud);
            _this.preBuilderHook(name, _this);
            _this.builderOut = builderInstance.make();
            _this.postBuilderHook(name, _this.builderOut);
            _this.mergeConfig(_this.builderOut);
            delete _this.builderOut;
        });
        /** Hook: post_webpack */
        this.doHook('post', this.config);
        return this.config;
    },
    /**
     * Top level hooks.
     */
    doHook: function (name) {
        var params = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            params[_i - 1] = arguments[_i];
        }
        this.bud.hooks.call(name + "_webpack", params);
    },
    /**
     * pre_{builder} hooks.
     * @property {Function} preBuilderHook
     */
    preBuilderHook: function (name) {
        var params = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            params[_i - 1] = arguments[_i];
        }
        this.bud.hooks.call("pre_" + name, params);
    },
    /**
     * post_{builder} hooks.
     * @property {Function} preBuilderHook
     */
    postBuilderHook: function (name) {
        var params = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            params[_i - 1] = arguments[_i];
        }
        this.bud.hooks.call("post_" + name, params);
    }
}); };
exports.build = build;
//# sourceMappingURL=index.js.map