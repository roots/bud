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
exports.babel = void 0;
var loaders_1 = require("../util/loaders");
/**
 * Babel
 *
 * @type {function} babel
 * @return {object}
 */
var babel = function (bud) { return ({
    bud: bud,
    rule: {},
    /**
     * Make babel rules
     */
    make: function () {
        this.pre();
        this.rule = {
            include: /\.jsx?|\.tsx?/,
            use: [
                {
                    loader: loaders_1.loaders.babel,
                    options: __assign(__assign({}, this.bud.state.options.babel), { cacheDirectory: true, cacheCompression: this.bud.inProduction })
                },
            ]
        };
        this.rule.test = /\.(js|jsx)$/;
        this.post();
        return this.rule;
    },
    /**
     * Hook: pre_babel
     */
    pre: function () {
        this.bud.hooks.call('pre_babel', this);
    },
    /**
     * Hook: post_babel
     */
    post: function () {
        this.bud.hooks.call('post_babel', this.rule);
    }
}); };
exports.babel = babel;
//# sourceMappingURL=babel.js.map