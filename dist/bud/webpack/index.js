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
     */
    bud: bud,
    /**
     * The final webpack config.
     */
    final: {},
    /**
     * Builders webpack concerns.
     */
    builders: [
        ['output', output_1.output],
        ['entry', entry_1.entry],
        ['module', index_1.rules],
        ['plugins', plugins_1.plugins],
        ['resolve', webpackResolve_1.webpackResolve],
        ['externals', externals_1.externals],
        ['devServer', devServer_1.devServer],
        ['general', general_1.general],
    ],
    /**
     * Generate values from builders
     */
    make: function () {
        var _this = this;
        /**
         * Conditionally enabled: optimization
         */
        this.bud.features.enabled('optimize') &&
            this.builders.push(['optimization', optimization_1.optimization]);
        /**
         * Build
         */
        this.builders.map(function (_a) {
            var name = _a[0], builder = _a[1];
            _this.final = __assign(__assign({}, _this.final), builder(_this.bud).make());
        });
        /**
         * Return final config object
         */
        this.final = this.bud.hooks.filter('webpack_final', this.final);
        return this.final;
    }
}); };
exports.build = build;
//# sourceMappingURL=index.js.map