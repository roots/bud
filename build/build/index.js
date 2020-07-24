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
var devServer_1 = require("./devServer");
var entry_1 = require("./entry");
var externals_1 = require("./externals");
var general_1 = require("./general");
var index_1 = require("./rules/index");
var optimization_1 = require("./optimization");
var output_1 = require("./output");
var webpackResolve_1 = require("./webpackResolve");
var plugins_1 = require("./plugins");
var build = function (bud) { return ({
    bud: bud,
    config: {},
    builders: [
        ['entry', entry_1.entry],
        ['output', output_1.output],
        ['rules', index_1.rules],
        ['optimization', optimization_1.optimization],
        ['plugins', plugins_1.plugins],
        ['resolve', webpackResolve_1.webpackResolve],
        ['externals', externals_1.externals],
        ['devServer', devServer_1.devServer],
        ['general', general_1.general],
    ],
    mergeConfig: function (configValues) {
        this.config = __assign(__assign({}, this.config), configValues);
    },
    makeConfig: function () {
        var _this = this;
        this.doHook('pre', this.bud.state.options);
        this.builders.map(function (_a) {
            var name = _a[0], builder = _a[1];
            var builderInstance = builder(_this.bud);
            _this.preBuilderHook(name, _this);
            _this.builderOut = builderInstance.make();
            _this.postBuilderHook(name, _this.builderOut);
            _this.mergeConfig(_this.builderOut);
            delete _this.builderOut;
        });
        this.doHook('post', this.config);
        return this.config;
    },
    doHook: function (name) {
        var params = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            params[_i - 1] = arguments[_i];
        }
        this.bud.hooks.call(name + "_webpack", this, params);
    },
    preBuilderHook: function (name) {
        var params = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            params[_i - 1] = arguments[_i];
        }
        this.bud.hooks.call("pre_" + name, params);
    },
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